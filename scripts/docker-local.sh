#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/docker-compose.yml"
ENV_FILE="$ROOT_DIR/.env"
PROJECT_NAME="amazon-service-payload-local"
ACTION="${1:-up}"
MIN_DOCKER_VERSION="${DOCKER_MIN_VERSION:-24.0.0}"
MIN_COMPOSE_VERSION="${DOCKER_COMPOSE_MIN_VERSION:-2.20.0}"

if [[ $# -gt 0 ]]; then
  shift
fi

COMPOSE_CMD=()
COMPOSE_ENV_ARGS=()
COMPOSE_KIND=""

normalize_version() {
  printf '%s' "$1" | sed -E 's/^[^0-9]*([0-9]+([.][0-9]+)*).*/\1/'
}

version_gte() {
  local left_raw right_raw
  local -a left_parts right_parts
  local max_parts i left_part right_part

  left_raw="$(normalize_version "${1:-}")"
  right_raw="$(normalize_version "${2:-}")"

  if [[ -z "$left_raw" || -z "$right_raw" ]]; then
    return 1
  fi

  IFS='.' read -r -a left_parts <<<"$left_raw"
  IFS='.' read -r -a right_parts <<<"$right_raw"

  max_parts="${#left_parts[@]}"
  if (( ${#right_parts[@]} > max_parts )); then
    max_parts="${#right_parts[@]}"
  fi

  for (( i = 0; i < max_parts; i += 1 )); do
    left_part="${left_parts[i]:-0}"
    right_part="${right_parts[i]:-0}"

    if (( 10#$left_part > 10#$right_part )); then
      return 0
    fi

    if (( 10#$left_part < 10#$right_part )); then
      return 1
    fi
  done

  return 0
}

get_docker_client_version() {
  docker --version 2>/dev/null | sed -E 's/^Docker version ([^,]+),.*/\1/'
}

get_docker_server_version() {
  docker version --format '{{.Server.Version}}' 2>/dev/null || true
}

get_compose_version() {
  if [[ "$COMPOSE_KIND" == "plugin" ]]; then
    docker compose version --short 2>/dev/null ||
      docker compose version 2>/dev/null | sed -E 's/.*v?([0-9]+([.][0-9]+)+).*/\1/'
    return 0
  fi

  docker-compose version --short 2>/dev/null ||
    docker-compose version 2>/dev/null | sed -E 's/.* version ([0-9]+([.][0-9]+)+).*/\1/'
}

print_version_requirements() {
  cat >&2 <<EOF
[docker] Baseline soportado por el repo:
  - Docker CLI >= ${MIN_DOCKER_VERSION}
  - Docker Compose >= ${MIN_COMPOSE_VERSION}
[docker] Recomendacion:
  - valida con pnpm docker:doctor
  - usa docker compose v2 como camino preferido
EOF
}

resolve_compose_cmd() {
  if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD=("docker" "compose")
    COMPOSE_KIND="plugin"
    return 0
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD=("docker-compose")
    COMPOSE_KIND="legacy"
    return 0
  fi

  cat >&2 <<'EOF'
[docker] No encontramos 'docker compose' ni 'docker-compose'.
[docker] Instala Docker antes de usar los servicios locales del repo.
EOF
  exit 1
}

ensure_supported_versions() {
  local docker_version compose_version

  docker_version="$(get_docker_client_version)"
  compose_version="$(get_compose_version)"

  if ! version_gte "$docker_version" "$MIN_DOCKER_VERSION"; then
    cat >&2 <<EOF
[docker] Docker CLI demasiado antigua: '${docker_version:-unknown}'.
EOF
    print_version_requirements
    exit 1
  fi

  if ! version_gte "$compose_version" "$MIN_COMPOSE_VERSION"; then
    cat >&2 <<EOF
[docker] Docker Compose demasiado antigua: '${compose_version:-unknown}'.
EOF
    print_version_requirements
    exit 1
  fi
}

print_daemon_help() {
  local current_context
  current_context="$(docker context show 2>/dev/null || printf 'unknown')"

  cat >&2 <<EOF
[docker] No hay un daemon Docker disponible para el contexto '${current_context}'.
[docker] Flujo soportado por el repo:
  1. deja operativo tu runtime Docker
  2. ejecuta pnpm docker:up
EOF

  if [[ "$current_context" == "colima" ]]; then
    cat >&2 <<'EOF'
[docker] El contexto activo es Colima. Si ese es tu runtime, primero debería responder:
  colima start
EOF
  fi
}

ensure_daemon() {
  if docker ps >/dev/null 2>&1; then
    return 0
  fi

  print_daemon_help
  exit 1
}

resolve_env_args() {
  if [[ -f "$ENV_FILE" ]]; then
    COMPOSE_ENV_ARGS=(--env-file "$ENV_FILE")
  fi
}

doctor() {
  local docker_version compose_version current_context server_version

  docker_version="$(get_docker_client_version)"
  compose_version="$(get_compose_version)"
  current_context="$(docker context show 2>/dev/null || printf 'unknown')"

  if ! version_gte "$docker_version" "$MIN_DOCKER_VERSION"; then
    cat >&2 <<EOF
[docker] Docker CLI demasiado antigua: '${docker_version:-unknown}'.
EOF
    print_version_requirements
    exit 1
  fi

  if ! version_gte "$compose_version" "$MIN_COMPOSE_VERSION"; then
    cat >&2 <<EOF
[docker] Docker Compose demasiado antigua: '${compose_version:-unknown}'.
EOF
    print_version_requirements
    exit 1
  fi

  if ! docker ps >/dev/null 2>&1; then
    print_daemon_help
    exit 1
  fi

  server_version="$(get_docker_server_version)"

  cat <<EOF
[docker] Runtime local OK
[docker] Context: ${current_context}
[docker] Docker CLI: ${docker_version}
[docker] Docker Server: ${server_version:-unknown}
[docker] Docker Compose: ${compose_version}
EOF
}

run_compose() {
  if [[ ${#COMPOSE_ENV_ARGS[@]} -gt 0 ]]; then
    "${COMPOSE_CMD[@]}" "${COMPOSE_ENV_ARGS[@]}" -p "$PROJECT_NAME" -f "$COMPOSE_FILE" "$@"
    return 0
  fi

  "${COMPOSE_CMD[@]}" -p "$PROJECT_NAME" -f "$COMPOSE_FILE" "$@"
}

resolve_compose_cmd
ensure_supported_versions
resolve_env_args

case "$ACTION" in
  up)
    ensure_daemon
    run_compose up -d --remove-orphans "$@"
    ;;
  down)
    ensure_daemon
    run_compose down "$@"
    ;;
  ps)
    ensure_daemon
    run_compose ps "$@"
    ;;
  logs)
    ensure_daemon
    run_compose logs -f --tail=150 "$@"
    ;;
  config)
    run_compose config "$@"
    ;;
  doctor)
    doctor
    ;;
  *)
    cat >&2 <<'EOF'
[docker] Uso: bash scripts/docker-local.sh <up|down|ps|logs|config|doctor>
EOF
    exit 1
    ;;
esac
