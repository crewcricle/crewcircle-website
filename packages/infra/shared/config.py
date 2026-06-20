from __future__ import annotations
import os
from dataclasses import dataclass
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


_repo_root = Path(__file__).parent.parent.parent.parent  # shared/ -> packages/ -> repo root
_load_dotenv(_repo_root / ".env.local")


def _require(key: str) -> str:
    val = os.environ.get(key, "")
    if not val:
        raise EnvironmentError(
            f"\nMissing required env var: {key}\n"
            f"Add it to .env.local in the monorepo root.\n"
        )
    return val


def _get(key: str, default: str = "") -> str:
    return os.environ.get(key, default)


@dataclass(frozen=True)
class Config:
    doppler_master_project: str
    github_username: str
    sentry_org: str


def load_config() -> Config:
    return Config(
        doppler_master_project=_get("CC_DOPPLER_MASTER_PROJECT", "crewcircle-master"),
        github_username=_require("CC_GITHUB_USERNAME"),
        sentry_org=_get("CC_SENTRY_ORG", "crewcircle"),
    )
