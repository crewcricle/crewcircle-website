import json
from datetime import datetime, timezone
from pathlib import Path

REGISTRY_PATH = Path(__file__).parent.parent / "registry.json"


def _load() -> dict:
    if REGISTRY_PATH.exists():
        return json.loads(REGISTRY_PATH.read_text())
    return {"projects": []}


def _save(data: dict) -> None:
    REGISTRY_PATH.write_text(json.dumps(data, indent=2) + "\n")


def register(
    project_id: str,
    name: str,
    description: str,
    price_cents: int,
) -> dict:
    data = _load()
    existing = {p["id"] for p in data["projects"]}
    if project_id in existing:
        raise ValueError(f"Project '{project_id}' already registered")
    entry = {
        "id": project_id,
        "name": name,
        "description": description,
        "price_cents": price_cents,
        "status": "active",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    data["projects"].append(entry)
    _save(data)
    return entry


def kill(project_id: str) -> dict:
    data = _load()
    for p in data["projects"]:
        if p["id"] == project_id:
            if p["status"] == "killed":
                raise ValueError(f"Project '{project_id}' already killed")
            p["status"] = "killed"
            p["killed_at"] = datetime.now(timezone.utc).isoformat()
            _save(data)
            return p
    raise ValueError(f"Project '{project_id}' not found in registry")


def list_projects(status: str | None = None) -> list[dict]:
    data = _load()
    if status:
        return [p for p in data["projects"] if p["status"] == status]
    return data["projects"]


def get(project_id: str) -> dict | None:
    data = _load()
    for p in data["projects"]:
        if p["id"] == project_id:
            return p
    return None
