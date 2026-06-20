# AGENT INSTRUCTIONS: Deploy / Manage CrewCircle Infrastructure

You are an LLM coding agent. Follow these instructions exactly and in order.
Do not skip steps. Do not ask clarifying questions — all required information
is provided here or will be fetched from files you are told to read.

---

## CONTEXT

This package at `packages/infra/` manages CrewCircle's cloud infrastructure
using Pulumi (Python) with Pulumi ESC for secrets management.

### Architecture

```
packages/infra/
├── __main__.py              ← Master stack (org-level resources)
├── Pulumi.yaml              ← Project definition
├── Pulumi.master.yaml       ← Master stack config (ESC binding)
├── esc/
│   ├── master.yaml          ← ESC env for master (imports Doppler)
│   └── project.yaml         ← ESC env template for per-project stacks
├── shared/
│   ├── __init__.py
│   ├── config.py            ← Dotenv loader + Config dataclass
│   └── registry.py          ← registry.json CRUD (project lifecycle)
├── bin/
│   ├── newproject           ← Create a project stack + ESC env + deploy
│   └── killproject          ← Destroy a project stack + ESC env
├── template/
│   ├── Pulumi.yaml          ← Template project definition
│   ├── __main__.py          ← Template stack (per-project resources)
│   └── requirements.txt     ← Template Python dependencies
├── src/crewcircle_infra/
│   └── __init__.py
├── requirements.txt         ← Master Python dependencies
├── pyproject.toml
└── AGENT.md                 ← THIS FILE
```

### Two Stacks

| Stack | Pulumi.yaml | Purpose |
|---|---|---|
| **master** | `__main__.py` | GitHub org secrets, Sentry team (run once) |
| **per-project** | `template/__main__.py` | Supabase, Stripe, GitHub repo, Cloudflare DNS, Doppler, Sentry project |

### ESC Environment Import Chain

```
Doppler crewcircle-master/prod  ← credentials live here
  └── crewcircle/master         ← imports Doppler, maps to pulumiConfig
        └── crewcircle/<id>     ← imports master, adds per-project config
```

---

## TASK 1 — Deploy Master Stack

Run when: Initial setup, or after updating master stack resources.

```bash
cd packages/infra

# Install master Python dependencies
pip install -r requirements.txt

# Create / select master stack
pulumi stack init master 2>/dev/null || pulumi stack select master

# Bind ESC environment
pulumi config env add crewcircle/master --yes

# Preview
pulumi preview

# Deploy
pulumi up --yes
```

**What it creates:**
- GitHub Actions Secrets: DOPPLER_TOKEN, SUPABASE_ACCESS_TOKEN, SENTRY_AUTH_TOKEN, CLOUDFLARE_API_TOKEN
- GitHub Actions Variable: ESC_ENV=crewcircle/master
- Sentry team: core

**Prerequisites:**
- Doppler project `crewcircle-master/prod` with all secrets populated
- ESC environment `crewcircle/master` created and pointing at that Doppler
- `pulumi` CLI installed and logged in
- Pulumi access token available via `PULUMI_ACCESS_TOKEN` env var

---

## TASK 2 — Provision a New Project

```bash
cd packages/infra
./bin/newproject <project-id> "<Name>" "<Description>" [price-cents]
```

Example:
```bash
./bin/newproject local-biz-au "Local Biz" "AU SMB automation" 19900
```

**What the script does:**
1. Validates project-id (lowercase, hyphens, no duplicates)
2. Creates ESC env `crewcircle/<project-id>` importing `crewcircle/master`
3. Inits/selects Pulumi stack `project-infra/<project-id>`
4. Binds ESC env to stack
5. Sets pulumi config: project_id, project_name, description, price_cents
6. Runs `pulumi up` to provision all resources
7. Registers project in registry.json

**What it creates (per project):**
- Supabase project (free tier)
- Stripe product + monthly price
- GitHub private repo
- Cloudflare DNS records (api.*.crewcircle.com.au, *.crewcircle.com.au)
- Doppler project with Supabase URL/keys synced
- Sentry project

**Prerequisites:**
- Master stack deployed (Task 1)
- ESC env `crewcircle/master` exists
- Cloudflare zone is set up (zone_id in ESC)

---

## TASK 3 — Destroy a Project

```bash
cd packages/infra
./bin/killproject <project-id>
```

**What the script does:**
1. Confirms project exists in registry and is not already killed
2. Prompts for project-id confirmation
3. Runs `pulumi destroy` on the project stack
4. Archives GitHub repo (if CC_GITHUB_USERNAME is set)
5. Updates registry.json (marks as killed)
6. Removes Pulumi stack (unbinds ESC env)
7. Deletes ESC env `crewcircle/<project-id>`

---

## TASK 4 — Emergency / Manual Operations

### Read outputs from a project stack
```bash
cd packages/infra/template
pulumi stack select <project-id>
pulumi stack output
```

### Inspect ESC environment values
```bash
pulumi env open crewcircle/master
pulumi env open crewcircle/<project-id>
```

### Update ESC environment after Doppler changes
ESC imports resolve at runtime from Doppler — no manual sync needed.
To verify new values resolve:
```bash
pulumi env open crewcircle/master | python3 -m json.tool
```

---

## ERROR REFERENCE

| Error | Cause | Fix |
|---|---|---|
| `config.require("github_org")` fails | ESC env not bound or missing doppler variable | Check `pulumi env open crewcircle/master` |
| `pulumi config env add` fails | ESC env doesn't exist | `pulumi env init crewcircle/<id> --file esc/project.yaml` |
| `ModuleNotFoundError: supabase` | Bridged provider not installed | `pulumi package add terraform-provider supabase/supabase` |
| `ModuleNotFoundError: stripe` | Bridged provider not installed | `pulumi package add terraform-provider humanlayer/pulumi-stripe` |
| `DOPPLER_TOKEN not found in env` | No .env.local or Doppler not linked | Check `pulumi env open crewcircle/master` resolves doppler_token |

---

## WHAT YOU MUST NOT DO

- Do not hardcode any email, name, company, or domain values in Pulumi code
- Do not run `pulumi destroy` on the master stack
- Do not delete registry.json unless you want to lose project tracking
- Do not commit .env.local, registry.json, .pulumi/, or Pulumi.*.yaml files
- Do not skip ESC setup — secrets must never be hardcoded in YAML configs
