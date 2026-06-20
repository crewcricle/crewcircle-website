# Spec: packages/infra — Pulumi Infrastructure Provisioner

## Objective

The infra module is the infrastructure provisioning system for CrewCircle. It does two things:

1. **Master stack** (one-time): Sets up shared infrastructure — GitHub organization settings, Doppler project structure, Supabase org settings, Sentry team setup. Runs once after account-setup. (Needs to be written from scratch.)

2. **Template stack** (per-project): Provisions infrastructure for each new product/idea — Supabase project + API keys, Stripe product/price config, Doppler project with env vars, Sentry project, Cloudflare DNS subdomain. Run via `bin/newproject`.

**Success criteria:**
- `pulumi up` on master stack completes without errors
- `bin/newproject <id> <name> <desc> [price]` creates a fully provisioned project in ~60s
- `bin/killproject <id>` tears down all project resources and archives the GitHub repo
- All secrets managed through Pulumi ESC (with Doppler as upstream source)

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Pulumi | ≥3.120 | IaC engine (Python SDK) |
| Pulumi ESC | ≥1.x | Environments, Secrets & Configuration |
| Pulumi Cloudflare | ≥5.x | DNS zones, records |
| Pulumi GitHub | ≥6.x | Repos, secrets |
| pulumiverse-doppler | ≥1.x | Secret management (via ESC import) |
| pulumiverse-sentry | ≥1.x | Error monitoring |
| Supabase TF provider | bridged | Project management |
| Stripe TF provider (humanlayer) | bridged | Product/prices |
| Python | ≥3.11 | Pulumi programs |
| Doppler CLI | latest | Secret injection (legacy, via ESC) |
| GitHub CLI (gh) | latest | Repo management |

## Commands

```bash
# ── Prerequisites ──────────────────────────────────────────────────
pip install pulumi pulumi-cloudflare pulumi-github \
  pulumiverse-doppler pulumiverse-sentry --break-system-packages
pulumi package add terraform-provider supabase/supabase
pulumi package add terraform-provider humanlayer/pulumi-stripe

# ── Master stack (one-time, after account-setup) ───────────────────
cd packages/infra

# Create Pulumi ESC environments (imports Doppler secrets)
pulumi env init crewcircle/master --type pulumi
pulumi env init crewcircle/project-template --type pulumi
# Configure each ESC env to import from Doppler crewcircle-master/prod

# Init and deploy master stack
pulumi stack init master 2>/dev/null || pulumi stack select master
pulumi stack change-secrets-provider "awskms://alias/pulumi-esc-master"  # if needed
pulumi up --yes

# ── Create a new project ───────────────────────────────────────────
cd packages/infra
./bin/newproject <project-id> "<Name>" "<Description>" [price-cents]
# Example: ./bin/newproject local-biz-au "Local Biz" "AU SMB automation" 19900

# ── Destroy a project ──────────────────────────────────────────────
cd packages/infra
./bin/killproject <project-id>

# ── Verify stack outputs ───────────────────────────────────────────
pulumi stack output

# ── List registered projects ───────────────────────────────────────
python3 -c "
import json
data = json.load(open('registry.json'))
for p in data.get('projects', []):
    print(f\"{p['id']}: {p['name']} ({p['status']})\")
"
```

## Project Structure

```
packages/infra/
├── __main__.py              ← Master stack Pulumi entrypoint (needs writing)
├── requirements.txt         ← Python deps for Pulumi
├── Pulumi.yaml              ← Pulumi project config
├── Pulumi.master.yaml       ← Master stack config
├── registry.json            ← Project registry (committed, auto-updated)
├── bin/
│   ├── newproject           ← Create project script (exists in files/)
│   └── killproject          ← Destroy project script (exists in files/)
├── shared/
│   ├── __init__.py
│   ├── config.py            ← Reads .env.local, same pattern as account-setup
│   └── registry.py          ← Read/write registry.json
├── template/
│   ├── __main__.py           ← Per-project Pulumi program (provisions resources)
│   ├── Pulumi.yaml
│   └── requirements.txt
└── esc/
    ├── master.yaml           ← ESC environment: imports Doppler crewcircle-master/prod
    └── project.yaml          ← ESC environment template: per-project secrets
```

## Pulumi ESC Architecture

Secrets flow follows two tiers:

```
                    ┌─────────────────────┐
                    │  Doppler            │
                    │  crewcircle-master/ │
                    │  prod               │
                    └─────────┬───────────┘
                              │ imported by
                              ▼
                    ┌─────────────────────┐
                    │  Pulumi ESC         │
                    │  crewcircle/master  │ ← master stack environment
                    │  crewcircle/<proj>  │ ← per-project environments
                    └─────────┬───────────┘
                              │ consumed by
                              ▼
                    ┌─────────────────────┐
                    │  Pulumi stacks      │
                    │  master             │
                    │  <project-id>       │
                    └─────────────────────┘
```

- **Master ESC env** (`crewcircle/master`): Imports the full Doppler `crewcircle-master/prod` project. Master stack uses this.
- **Project ESC env** (`crewcircle/<project-id>`): Created dynamically by `newproject`. Imports a subset of Doppler secrets + adds project-specific values (Supabase URL, Stripe price ID, etc.).
- Template stacks declare `environment: crewcircle/<project-id>` in their `Pulumi.yaml`.

## Code Style

Follow the exact same conventions as `packages/account-setup/`:

```python
# shared/config.py — mirrors account-setup/config.py pattern
from __future__ import annotations
import os
from pathlib import Path

def _load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key not in os.environ and value:
            os.environ[key] = value

_repo_root = Path(__file__).parent.parent.parent.parent
_load_dotenv(_repo_root / ".env.local")
_load_dotenv(Path(__file__).parent / ".env.local")

def _require(key: str) -> str:
    val = os.environ.get(key, "")
    if not val:
        raise EnvironmentError(f"Missing required env var: {key}")
    return val

def _get(key: str, default: str = "") -> str:
    return os.environ.get(key, default)
```

**Conventions:**
- Python 3.11+ type annotations on all functions
- No external Python deps beyond Pulumi SDKs and bridged providers
- Shell scripts use `set -euo pipefail`
- Never hardcode any org name, project name, or secret
- All secrets injected via Pulumi ESC (Doppler is upstream, not direct)
- Pulumi programs use `pulumi.Config` + ESC environments — never `os.environ`

## Master Stack Resources (to write from scratch)

| Resource | Provider | Purpose |
|----------|----------|---------|
| GitHub org secrets | GitHub | Doppler token, shared CI vars |
| Doppler master config | doppler | Ensure master project has correct structure |
| Sentry org/team setup | Sentry | Shared error tracking org |
| Supabase org access | Supabase TF | Org-level token for project creation |

**Not in master stack:**
- Cloudflare DNS (per-project — each project gets `<project>.crewcircle.com.au`)
- Stripe (per-project — each project has its own products/prices)
- Individual Supabase projects (per-project)

## Template Stack Resources (per-project)

| Resource | Provider | Purpose |
|----------|----------|---------|
| GitHub repo | GitHub | `github.com/crewcircle-au/<project-id>` (private) |
| Supabase project | Supabase TF | New project with auto-generated API keys |
| Stripe product + price | Stripe TF | Product with monthly price |
| Doppler project | doppler | New project with env vars from template |
| Sentry project | Sentry | Error tracking per-project |
| Cloudflare DNS record | Cloudflare | `CNAME <project-id>.crewcircle.com.au → ...` |
| Pulumi ESC env | Pulumi ESC | `crewcircle/<project-id>` with project secrets |

## Testing Strategy

| Level | What | How |
|-------|------|-----|
| Lint | Python syntax + type checks | `python3 -m py_compile __main__.py` |
| Dry-run | Preview before apply | `pulumi preview` (always run before `up`) |
| Smoke | Project creates/destroys cleanly | `bin/newproject test-project "Test" "test" 0 && bin/killproject test-project` |
| Idempotency | Re-running = zero diff | Run `pulumi up` twice, second = 0 changes |
| ESC validation | Env resolves correctly | `pulumi env open crewcircle/test-project` |
| Registry | JSON stays consistent | Verify read/write round-trip with registry.py |

## Boundaries

- **Always do:**
  - Run `pulumi preview` before `pulumi up`
  - Use Pulumi ESC for secrets — never `os.environ` in Pulumi programs
  - Update `registry.json` after create/destroy
  - Verify stack outputs after provisioning
  - Run `pulumi env open` to verify ESC environment resolves before stack operations

- **Ask first:**
  - Destroying the master stack (`pulumi destroy` on master)
  - Adding new Pulumi providers (new TF-bridged providers)
  - Changing the template structure (affects all future projects)
  - Deleting a project from registry without destroying infra first
  - Changing ESC environment topology (adding/removing upstream imports)

- **Never do:**
  - Hardcode any API token, secret, or credential in any file
  - Run `pulumi destroy` on master stack without explicit human approval
  - Edit `registry.json` manually (always through `registry.py`)
  - Commit `.env.local`, `.pulumi/`, or `Pulumi.<project>.yaml`
  - Run `killproject` without confirmation double-check
  - Store secrets in stack config (`pulumi config set --secret`) when they belong in ESC

## Success Criteria

1. [ ] Master stack (written from scratch) provisions: GitHub org secrets, Doppler master config, Sentry team, Supabase org access
2. [ ] `bin/newproject` creates: GitHub repo, Supabase project, Stripe product+price, Doppler project, Sentry project, Cloudflare DNS record (`<project>.crewcircle.com.au`)
3. [ ] `bin/killproject` destroys: All cloud resources, archives GitHub repo, removes from registry
4. [ ] All secrets flow: `.env.local` → Doppler → Pulumi ESC → Pulumi stacks (never hardcoded)
5. [ ] Re-running `pulumi up` on any stack = zero diff (idempotent)
6. [ ] `registry.json` is always consistent after create/destroy operations
7. [ ] Pulumi ESC environments resolve correctly with Doppler imports

## Implementation Plan

```
Phase A ── Scaffold module structure & shared code
  │
  ▼
Phase B ── Write Pulumi ESC environments
  │
  ▼
Phase C ── Write master stack (__main__.py + Pulumi configs)
  │
  ▼
Phase D ── Write template stack (template/__main__.py)
  │
  ▼
Phase E ── Implement/refine bin scripts (newproject, killproject)
  │
  ▼
Phase F ── Write AGENT.md + documentation
  │
  ▼
Phase G ── Smoke test full create → list → destroy cycle
```

### Phase A — Scaffold & Shared Code

Files to create:
- `packages/infra/shared/__init__.py`
- `packages/infra/shared/config.py` — mirrors account-setup pattern
- `packages/infra/shared/registry.py` — JSON read/write for project registry
- `packages/infra/registry.json` — initial `{"projects": []}`
- `packages/infra/requirements.txt`

**Verify:** `python3 -c "from shared.config import _require; print('ok')"`

### Phase B — Pulumi ESC Environments

Files to create:
- `packages/infra/esc/master.yaml` — imports Doppler `crewcircle-master/prod`
- ESC environment for project template

**Verify:** `pulumi env open crewcircle/master` shows all expected secrets

### Phase C — Master Stack

Files to create:
- `packages/infra/Pulumi.yaml`
- `packages/infra/__main__.py`
- `packages/infra/Pulumi.master.yaml`

**Resources:** GitHub org secrets, Doppler master config, Sentry team, Supabase org access

**Verify:** `pulumi preview` on master stack produces expected resource list

### Phase D — Template Stack

Files to create:
- `packages/infra/template/Pulumi.yaml`
- `packages/infra/template/__main__.py`
- `packages/infra/template/requirements.txt`

**Resources per project:** GitHub repo, Supabase project, Stripe product+price, Doppler project, Sentry project, Cloudflare DNS record

**Verify:** `bin/newproject test-project "Test" "test" 0` completes without error

### Phase E — bin Scripts

Files to refine (exist in `files/`):
- `packages/infra/bin/newproject` — must also create ESC env and Cloudflare DNS
- `packages/infra/bin/killproject` — must also delete ESC env and Cloudflare DNS

**Verify:** Full create → list → destroy cycle works end-to-end

### Phase F — Agent Instructions

File to create:
- `packages/infra/AGENT.md` — step-by-step agent guide (mirror of `files/AGENT.md`)

### Phase G — Smoke Test

- Create test project → verify all resources exist → destroy → verify cleanup
- Confirm re-running `pulumi up` on master stack = zero diff

## Open Questions

1. Which specific Supabase org-level resources need configuring in master vs. purely handled via the access token for project creation?
2. What GitHub org settings/secrets should the master stack manage?
3. Do the existing `files/newproject` and `files/killproject` scripts need changes beyond adding ESC + Cloudflare DNS steps?
4. Should Pulumi ESC environments be defined as YAML files in the repo or created/managed entirely via CLI?
