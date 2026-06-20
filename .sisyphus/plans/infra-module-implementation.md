# Implementation Plan: packages/infra — Pulumi Infrastructure Provisioner

## Overview

Build the `packages/infra/` Pulumi module from scratch. 12 tasks in 7 phases, each producing a working increment. The module provisions shared infrastructure (master stack — org-level secrets, Sentry team) and per-project infrastructure (template stack — Supabase, Stripe, Doppler, Sentry, Cloudflare DNS, GitHub repo).

## Architecture Decisions (confirmed via grill)

- **Monorepo**: Flat (no Turborepo). `packages/infra/` sibling to root website.
- **ESC format**: YAML files committed to repo (`packages/infra/esc/*.yaml`).
- **Python packaging**: pyproject.toml with setuptools.
- **Pulumi projects**: Two projects — master at `packages/infra/`, template in `packages/infra/template/`.
- **ESC import chain**: Per-project ESC env → imports master ESC → imports Doppler. No separate Doppler per project.
- **bin scripts**: Adapt existing `files/newproject` and `files/killproject`. Replace `doppler run` with ESC, add Cloudflare DNS step.
- **Build system**: setuptools in pyproject.toml.
- **Config flow**: `pulumi config set` for project-specific vars (project_id, name, price). ESC for shared secrets/tokens.
- **ESC stack binding**: `pulumi stack change-environment crewcircle/<project-id>` — set on the stack, not CLI flag per invocation.
- **Master stack resources**: GitHub org ActionsSecrets (DOPPLER_TOKEN, SUPABASE_ACCESS_TOKEN, SENTRY_AUTH_TOKEN, CLOUDFLARE_API_TOKEN), GitHub ActionsVariable (ESC_ENV=crewcircle/master), Sentry team ("core"). NOT in master: Doppler config, Cloudflare DNS, Stripe, Supabase projects.

## Task List

### Phase 0: Directory Scaffold
**Dependency direction:** Everything below needs `packages/infra/` to exist. These 3 tasks are independent of each other.

---

#### Task 1: Create directory structure + pyproject.toml

**Description:** Create `packages/infra/` directory skeleton with pyproject.toml (setuptools), requirements.txt, and all subdirectories. This is the filesystem foundation.

**Note on shared/ layout:** The `shared/` directory sits OUTSIDE the `src/crewcircle_infra/` package tree. This is intentional — `from shared.config import _require` only works when CWD = `packages/infra/`, which is guaranteed for Pulumi programs (runtime CWD matches project dir) and bin scripts (they `cd "$INFRA_DIR"` before running). `pip install -e .` will NOT make `shared` importable from outside `packages/infra/`. Do NOT move shared/ under src/ — that would break the pattern used by existing bin scripts that reference `shared/` relative to project root.

**Acceptance criteria:**
- [ ] `packages/infra/pyproject.toml` exists with [build-system] setuptools and [project] name="infra"
- [ ] `packages/infra/requirements.txt` lists all Pulumi SDK deps
- [ ] `packages/infra/.gitignore` prevents `.pulumi/`, `__pycache__/`, `*.egg-info/`, `.env.local` from being committed
- [ ] `packages/infra/src/crewcircle_infra/__init__.py` exists (package init — enables `pip install -e .` imports)
- [ ] `packages/infra/shared/__init__.py` exists (empty)
- [ ] `packages/infra/template/` directory exists
- [ ] `packages/infra/bin/` directory exists
- [ ] `packages/infra/esc/` directory exists

**Verification:**
- [ ] `ls packages/infra/` shows all expected subdirectories
- [ ] `python3 -m py_compile packages/infra/src/crewcircle_infra/__init__.py` passes
- [ ] `python3 -m py_compile packages/infra/shared/__init__.py` passes

**Dependencies:** None (greenfield)

**Files created:**
- `packages/infra/pyproject.toml`
- `packages/infra/requirements.txt`
- `packages/infra/.gitignore`
- `packages/infra/shared/__init__.py`
- (directories: bin/, template/, esc/)

**Estimated scope:** Small (4 files)

---

#### Task 2: Write shared/config.py

**Description:** Dotenv-loading config module. **Do NOT mirror DopplerProvider from the existing `files/account-setup/config.py`** — ESC replaces direct Doppler access. This module only reads `.env.local` files (monorepo root and `packages/infra/.env.local`) and provides `_require(key)` and `_get(key, default)` helpers. All secrets come from the bound Pulumi ESC environment, not from a Doppler client.

**Acceptance criteria:**
- [ ] `shared/config.py` loads vars from `../../.env.local` (monorepo root) and `./.env.local`
- [ ] `_require()` raises `EnvironmentError` with clear message if var missing
- [ ] `_get()` returns empty string or supplied default for missing vars
- [ ] **No `DopplerProvider` or any Doppler client class** — ESC is the sole secrets conduit
- [ ] All function signatures have Python 3.11+ type annotations

**Verification:**
- [ ] `python3 -c "from shared.config import _require, _get; print('config.py OK')"` succeeds when run from `packages/infra/`
- [ ] `grep -r 'Doppler' packages/infra/shared/config.py` returns nothing

**Dependencies:** Task 1 (directory must exist)

**Files created:**
- `packages/infra/shared/config.py`

**Estimated scope:** Small (1 file)

---

#### Task 3: Write shared/registry.py + registry.json

**Description:** Registry module for tracking provisioned projects. `registry.py` provides `register(id, name)`, `kill(id)`, `list()`, `get(id)` — reads/writes `registry.json` in the infra root. Initial `registry.json` = `{"projects": []}`.

**Note on stack dependency:** `registry.py` is pure local-file IO — it does NOT depend on the master stack being deployed. If `pulumi stack output` calls are added later (to enrich registry entries), they must handle the case where the master stack hasn't been deployed yet (catch `pulumi.CommandError` and return a sentinel or clear error message).

**Acceptance criteria:**
- [ ] `registry.py` has `register()`, `kill()`, `list()`, `get()` functions
- [ ] `register()` appends project with id, name, status="active", created_at timestamp
- [ ] `kill()` sets status="killed"
- [ ] `list()` returns all projects
- [ ] `get(id)` returns single project or None
- [ ] `registry.json` starts as `{"projects": []}`
- [ ] Thread-safe write (atomic rename pattern)
- [ ] All functions type-annotated

**Verification:**
- [ ] `python3 -c "from shared.registry import register, kill, list, get; print('registry.py OK')"` succeeds
- [ ] Running `register('test', 'Test')` creates entry in registry.json

**Dependencies:** Task 1 (directory must exist)

**Files created:**
- `packages/infra/shared/registry.py`
- `packages/infra/registry.json`

**Estimated scope:** Small (2 files)

---

### Checkpoint: Phase 0
- [ ] `python3 -c "from shared.config import _require; from shared.registry import register; print('Shared code OK')"` passes
- [ ] Directory structure matches spec

---

### Phase 1: Pulumi ESC Environments

---

#### Task 4: Write ESC environment YAMLs

**Description:** Create `esc/master.yaml` (imports Doppler `crewcircle-master/prod`) and `esc/project.yaml` (template for per-project environments). Follow Pulumi ESC YAML format — the Doppler import uses the `doppler://` protocol with project/config path.

**YAML structure (pinned — do not guess):**
- `esc/master.yaml`:
  ```yaml
  imports:
    - doppler://crewcircle-master/prod
  values:
    pulumiConfig:
      github_org: ${CC_GITHUB_USERNAME}
      doppler_token: ${DOPPLER_TOKEN}
      supabase_access_token: ${SUPABASE_ACCESS_TOKEN}
      sentry_auth_token: ${SENTRY_AUTH_TOKEN}
      cloudflare_api_token: ${CLOUDFLARE_API_TOKEN}
      sentry_org: ${CC_SENTRY_ORG}
  ```
  The `imports` key pulls all Doppler secrets into the ESC env. The `values.pulumiConfig` block maps Doppler secret names to Pulumi config keys — this is what makes `config.require("github_org")` work in `__main__.py`. Without this mapping, the config keys won't exist in the Pulumi runtime.
- `esc/project.yaml`:
  ```yaml
  imports:
    - crewcircle/master
  values:
    pulumiConfig:
      supabase_org_id: ${SUPABASE_ORG_ID}
  ```
  This imports the master ESC env (which in turn imports Doppler). The `supabase_org_id` mapping is needed for Task 7's template `__main__.py`. Project-specific config vars (project_id, name, price_cents) are NOT in ESC — they're set via `pulumi config set` at stack creation time.

**Acceptance criteria:**
- [ ] `esc/master.yaml` imports from Doppler `crewcircle-master/prod` project
- [ ] `esc/project.yaml` imports from `crewcircle/master` ESC env + has project-specific values template
- [ ] YAMLs are valid per `pulumi env init` format

**Verification:**
- [ ] `python3 -c "import yaml; yaml.safe_load(open('esc/master.yaml')); yaml.safe_load(open('esc/project.yaml'))"` passes (or just validate by eye — YAML is simple)
- [ ] File contents match the ESC YAML schema

**Dependencies:** Task 1 (esc/ directory must exist)

**Files created:**
- `packages/infra/esc/master.yaml`
- `packages/infra/esc/project.yaml`

**Estimated scope:** Small (2 files)

---

### Phase 2: Master Stack (written from scratch)

---

#### Task 5: Create Pulumi project configs for master stack

**Description:** Write `Pulumi.yaml` (project definition with runtime=python, name=infra) and `Pulumi.master.yaml` (stack config with `environment:` pointing to `crewcircle/master` ESC env). The master stack uses ESC for all secrets — no pulumi config secrets needed.

**Acceptance criteria:**
- [ ] `Pulumi.yaml` defines project name "infra", runtime "python", description
- [ ] `Pulumi.master.yaml` has `environment: crewcircle/master` entry
- [ ] No secrets in stack config (all via ESC)

**Verification:**
- [ ] `python3 -c "import yaml; yaml.safe_load(open('Pulumi.yaml')); yaml.safe_load(open('Pulumi.master.yaml'))"` passes
- [ ] Config structure matches Pulumi conventions

**Dependencies:** Task 1 (Pulumi.yaml goes in infra root)

**Files created:**
- `packages/infra/Pulumi.yaml`
- `packages/infra/Pulumi.master.yaml`

**Estimated scope:** Small (2 files)

---

#### Task 6: Write master stack __main__.py

**Description:** The core master stack program. Writes `__main__.py` with these Pulumi resources (per grill Q10):
1. GitHub org-level `ActionsSecret` for DOPPLER_TOKEN, SUPABASE_ACCESS_TOKEN, SENTRY_AUTH_TOKEN, CLOUDFLARE_API_TOKEN
2. GitHub `ActionsVariable` for ESC_ENV=crewcircle/master
3. Sentry team ("core")

Uses `pulumi.Config` to read secrets from ESC. No hardcoded values. All resources idempotent.

**Acceptance criteria:**
- [ ] All 6 resources defined (4 secrets + 1 variable + 1 team)
- [ ] Secrets read via `config.require_secret()` — no raw strings
- [ ] GitHub org name read from config via `config.require("github_org")` — sourced from the ESC environment (the existing scripts use `CC_GITHUB_USERNAME` from .env.local, which Doppler stores; the ESC master env inherits this from Doppler as `GITHUB_ORG`)
- [ ] Resources tagged with common tags
- [ ] No `as any` / type suppression patterns
- [ ] `pulumi preview` (dry-run) produces expected resource list

**Verification:**
- [ ] `python3 -m py_compile __main__.py` passes
- [ ] `pulumi preview --stack master` lists exactly: 4 ActionsSecrets, 1 ActionsVariable, 1 Sentry team
- [ ] Re-running preview = same output (deterministic)

**Dependencies:** Tasks 4 (ESC env), 5 (Pulumi configs)

**Files created:**
- `packages/infra/__main__.py`

**Estimated scope:** Medium (1 file, ~80-120 lines)

---

### Checkpoint: Phase 2
- [ ] `python3 -m py_compile packages/infra/__main__.py` passes
- [ ] `pulumi preview --stack master` produces expected resource list

---

### Phase 3: Template Stack

---

#### Task 7: Write template stack Pulumi configs + __main__.py

**Description:** Create `Pulumi.yaml` and `__main__.py` in `template/` for per-project resources. **Important: do NOT literally copy the master's Pulumi.yaml.** The template's `environment:` must reference `crewcircle/<project-id>` (not `crewcircle/master`). Create from scratch or copy + patch the `environment:` array.
1. GitHub repo (`crewcircle-au/<project-id>`, private)
2. Supabase project (via terraform-provider supabase)
3. Stripe product + monthly price (via terraform-provider humanlayer/pulumi-stripe)
4. Doppler project (via pulumiverse-doppler)
5. Sentry project (via pulumiverse-sentry)
   - **SUPABASE_ORG_ID must be available in ESC** — Supabase project creation requires the org ID under which to create the project. This is stored in Doppler as `SUPABASE_ORG_ID` and flows through the ESC chain (master → project). The template reads it via `config.require_secret("supabase_org_id")`.
6. Cloudflare DNS record (`<project-id>.crewcircle.com.au` CNAME)

**Do NOT create the Pulumi ESC env in `__main__.py`.** The per-project ESC env (`crewcircle/<project-id>`) is created by `bin/newproject` as a prerequisite step before `pulumi up` runs. The template `__main__.py` assumes the ESC env already exists and reads secrets from it. If `__main__.py` tried to create the ESC env as a Pulumi resource, it would either fail (already exists) or create a circular dependency (the stack depends on the ESC env to run, but the Pulumi program tries to manage that env).

All resources read project-specific config via `pulumi config get` (project_id, project_name, description, price_cents). Secrets for providers come from the stack's bound ESC environment.

**Acceptance criteria:**
- [ ] Template `Pulumi.yaml` references `environment: crewcircle/<project-id>` pattern
- [ ] All 6 resource types defined (NOT ESC env — handled by bin script)
- [ ] Project-specific configs read via `pulumi.Config`
- [ ] Resources tagged with project_id
- [ ] `pulumi preview` for a test project produces expected resources

**Verification:**
- [ ] `python3 -m py_compile template/__main__.py` passes
- [ ] `pulumi preview --stack test-project --cwd template` lists: repo, Supabase, Stripe product+price, Doppler project, Sentry project, Cloudflare DNS

**Dependencies:** Tasks 1 (template/ dir), 4 (ESC env template)

**Files created:**
- `packages/infra/template/Pulumi.yaml`
- `packages/infra/template/__main__.py`

**Estimated scope:** Medium-large (2 files, ~150-200 lines for __main__.py)

---

#### Task 8: Write template/requirements.txt

**Description:** Separate requirements for the template Pulumi project. Same provider SDKs as master, but only the ones needed for template resources. Include pulumi-stripe and supabase bridge providers.

**Acceptance criteria:**
- [ ] Lists pip-installable providers only: pulumi, pulumi-github, pulumi-cloudflare, pulumiverse-doppler, pulumiverse-sentry
- [ ] Version pins (>=) for reproducibility
- [ ] Does NOT include bridged providers (supabase/supabase, humanlayer/pulumi-stripe) — those are installed via `pulumi package add terraform-provider <name>` in the AGENT.md setup steps

**Verification:**
- [ ] File is valid pip requirements format
- [ ] All pip providers match imports in __main__.py
- [ ] Bridged providers are documented in AGENT.md step instead

**Dependencies:** Task 7 (exists alongside it)

**Files created:**
- `packages/infra/template/requirements.txt`

**Estimated scope:** Small (1 file)

---

### Checkpoint: Phase 3
- [ ] `python3 -m py_compile packages/infra/template/__main__.py` passes
- [ ] Template structure mirrors spec diagram

---

### Phase 4: bin Scripts

---

#### Task 9: Write bin/newproject

**Description:** Adapt `files/newproject` into `packages/infra/bin/newproject`. Changes from the existing version:
1. Create Pulumi ESC env from YAML template **before any stack operations**: `pulumi env init crewcircle/$PROJECT_ID --file esc/project.yaml`
2. Bind ESC env to stack: `pulumi stack change-environment crewcircle/$PROJECT_ID` (replaces `doppler run` wrapper). This must run AFTER the ESC env is created and AFTER `pulumi stack init`/`select`.
3. Add Cloudflare DNS record creation step (or let template __main__.py handle it via Pulumi)
4. Set project-specific pulumi configs (project_id, name, description, price_cents)
5. Update registry via shared/registry.py
6. Remove `doppler run` wrapper

Per grill Q6: adapt, don't rewrite. Keep the validation (project-id format, registry check), confirmation prompt, and output display from the original.

**Acceptance criteria:**
- [ ] Script validates project-id format (lowercase, hyphens)
- [ ] Script checks registry.json for duplicate
- [ ] Script shows project summary and prompts for confirmation
- [ ] ESC env created via `pulumi env init crewcircle/$PROJECT_ID --file esc/project.yaml` before any stack operations
- [ ] Stack init/select: `pulumi stack init "$PROJECT_ID" 2>/dev/null || pulumi stack select "$PROJECT_ID"` — same idempotent pattern as existing `files/newproject`
- [ ] `pulumi stack change-environment crewcircle/$PROJECT_ID` runs (requires stack to exist first — must run AFTER init/select)
- [ ] `pulumi config set` for project_id, project_name, description, price_cents
- [ ] `pulumi up --yes` (without doppler run)
- [ ] Script displays stack outputs after provisioning
- [ ] Registry updated via python3 -m shared.registry

**Verification:**
- [ ] `bash -n packages/infra/bin/newproject` passes (shell syntax check)
- [ ] Script handles missing esc/env gracefully

**Dependencies:** Tasks 4 (ESC yamls), 7-8 (template stack), 3 (registry.py)

**Files created:**
- `packages/infra/bin/newproject`

**Estimated scope:** Medium (1 file, ~100 lines)

---

#### Task 10: Write bin/killproject

**Description:** Adapt `files/killproject` into `packages/infra/bin/killproject`. Changes from existing:
1. Destroy via `pulumi destroy` using ESC (no doppler run)
2. Delete ESC env **after** stack is removed — you cannot `pulumi env rm` an env that a live stack references. Order:
   a. `pulumi destroy --yes` (destroys resources)
   b. `pulumi stack rm $PROJECT_ID --yes` (removes the stack, which unbinds the ESC env)
   c. `pulumi env rm crewcircle/$PROJECT_ID` (deletes the ESC env — now safe because no stack references it)
3. Remove Cloudflare DNS record (or let template __main__.py handle via pulumi destroy)
4. Archive GitHub repo
5. Update registry to "killed"
6. Remove stack

Keep the existing confirmation flow (type project ID to confirm).

**Acceptance criteria:**
- [ ] Script checks registry for project existence + not already killed
- [ ] Confirmation requires typing project ID
- [ ] `pulumi destroy --yes` with ESC stack binding
- [ ] GitHub repo archived via `gh repo archive`
- [ ] ESC env deleted: `pulumi env rm crewcircle/<project-id>`
- [ ] Registry updated to "killed"
- [ ] Stack removed: `pulumi stack rm <project-id> --yes`

**Verification:**
- [ ] `bash -n packages/infra/bin/killproject` passes

**Dependencies:** Tasks 4 (ESC envs), 3 (registry.py)

**Files created:**
- `packages/infra/bin/killproject`

**Estimated scope:** Medium (1 file, ~70 lines)

---

### Checkpoint: Phase 4
- [ ] Both scripts pass shell syntax check
- [ ] Scripts reference ESC, not Doppler directly

---

### Phase 5: Agent Instructions

---

#### Task 11: Write AGENT.md

**Description:** Create `packages/infra/AGENT.md` mirroring the structure of `files/AGENT.md`. Step-by-step guide for an LLM agent to:
1. Verify prerequisites (Pulumi CLI, ESC CLI, provider packages)
2. Configure .env.local
3. Create Pulumi ESC environments from esc/*.yaml
4. Run master stack (pulumi up)
5. Create a new project via bin/newproject
6. Kill a project via bin/killproject
7. Error reference

**Scoping rule (do NOT conflict with root AGENTS.md):**
- This AGENT.md activates **only** when the agent's context involves files under `packages/infra/`
- The root `AGENTS.md` remains authoritative for repo-wide rules (Next.js, frontend, etc.)
- Add a preamble at the top of `packages/infra/AGENT.md`: *"This file only applies when working in `packages/infra/` — refer to the root `AGENTS.md` for repo-wide rules."*

**Acceptance criteria:**
- [ ] Mirrors structure of files/AGENT.md (steps, verification commands, error reference)
- [ ] Covers all 7 steps listed above
- [ ] Includes exact CLI commands for all operations
- [ ] Includes "MUST NOT DO" section
- [ ] ESC-specific commands documented (env init, env open, stack change-environment)
- [ ] Contains scope preamble clarifying it only applies to `packages/infra/`

**Verification:**
- [ ] Reading the file produces a complete, actionable set of instructions
- [ ] All CLI commands are syntactically valid

**Dependencies:** All prior tasks (AGENT.md references the complete module)

**Files created:**
- `packages/infra/AGENT.md`

**Estimated scope:** Medium (1 file, ~200 lines)

---

### Phase 6: Smoke Test

---

#### Task 12: Smoke test — full create → verify → destroy cycle

**Description:** Run the full lifecycle on a disposable test project:
1. `pulumi preview` on master stack (verify zero unexpected changes)
2. Create Pulumi ESC environments from YAML
3. `bin/newproject smoke-test "Smoke Test" "Disposable smoke test" 0`
4. Verify all resources exist (check GitHub repo, Supabase project via API, etc.)
5. `bin/killproject smoke-test`
6. Verify cleanup (repo archived, ESC env gone, registry shows "killed")
7. Re-run `pulumi preview` on master — confirm zero diff (idempotent)

**Acceptance criteria:**
- [ ] Master stack preview shows **only** the 6 expected resources (NO unexpected diffs like "replace" or "delete")
- [ ] `pulumi preview` output is captured and manually inspected for unexpected resource changes before any `pulumi up`
- [ ] **Rollback trigger**: if preview shows changes to resources outside the expected 6 (e.g., "delete 50 resources", "replace GitHub org"), abort the smoke test immediately and investigate
- [ ] ESC envs resolve correctly: `pulumi env open crewcircle/master`
- [ ] Full create cycle completes without error
- [ ] Full destroy cycle completes without error
- [ ] Final master stack preview = zero diff from initial

**Verification:**
- [ ] All commands exit 0
- [ ] Registry starts empty, has project after create, shows "killed" after destroy

**Dependencies:** All prior tasks

**Files touched:** registry.json (modified during test)

**Estimated scope:** Medium (operational, not file-creation)

---

## Dependency Graph

```
Task 1 (scaffold) ──┬── Task 2 (config.py)  ──┐
                     ├── Task 3 (registry.py) ──┤
                     └── Task 4 (ESC yamls) ────┼── Task 5 (Pulumi config) ── Task 6 (master __main__)
                                                │
                                                └── Task 7 (template __main__) ── Task 8 (template reqs)
                                                          │
                                     Task 9 (newproject) ─┤
                                     Task 10 (killproject)┤
                                                          │
                                     Task 11 (AGENT.md) ──┘
                                                          │
                                     Task 12 (smoke) ──────┘
```

## Parallelization Opportunities

- **Tasks 2, 3, 4** can run in parallel after Task 1 completes (no deps between them)
- **Task 7 and 8** can run together
- **Tasks 9 and 10** can run in parallel (independent scripts)

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Pulumi bridged providers (Supabase, Stripe) have API quirks | High | Task 7: verify terraform provider docs first; preview before apply |
| Doppler ESC import format differs from expected | Medium | Task 4: reference Pulumi ESC docs for Doppler import syntax |
| `pulumi stack change-environment` behavior differs from grill assumptions | Medium | Task 6: test on a throwaway stack first |
| Missing API tokens for smoke test (no Doppler yet) | High | Task 12: ensure .env.local has working Doppler token; or mock the ESC env |
| Cloudflare DNS zone might not exist for test domain | Medium | Task 12: verify zone exists before smoke test |

## Open Questions (for user)

- Which specific GitHub org settings should ActionsSecrets be scoped to? (All repos vs selected?)
- What Supabase org-level config (if any) belongs in master stack vs. just having the token?
- Cloudflare DNS target for CNAME — what's the destination? (Vercel deployment URL?)
