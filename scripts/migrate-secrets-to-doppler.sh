#!/usr/bin/env bash
set -euo pipefail

PROJECT="${1:-}"
ENV_FILE="${2:-}"

if [[ -z "$PROJECT" || -z "$ENV_FILE" ]]; then
  echo "Usage: $0 <doppler-project> <env-file>"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Env file not found: $ENV_FILE"
  exit 1
fi

echo "Migrating secrets from $ENV_FILE to Doppler project: $PROJECT"

while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^\s*# ]] && continue
  [[ -z "${line// }" ]] && continue

  if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
    key="${BASH_REMATCH[1]}"
    value="${BASH_REMATCH[2]}"
    value="${value#\"}"
    value="${value%\"}"
    value="${value#\'}"
    value="${value%\'}"

    echo "  -> $key"
    printf '%s' "$value" | doppler secrets upload "$key" --project "$PROJECT" --config dev >/dev/null 2>&1 || true
  fi
done < "$ENV_FILE"

echo "Done. Verify with: doppler secrets --project $PROJECT --config dev"
