# Starter corporativo Next.js + Payload

Base organizativa y documental para un starter reusable de sitio corporativo con panel administrativo simple, construido sobre Next.js, Payload CMS y PostgreSQL.

## Estado actual

La etapa preparatoria del repositorio quedó completada y el bootstrap técnico local ya fue abierto con placeholders temporales controlados.

El proyecto queda en una transición entre cierre de `Fase 0` y apertura de `Fase 1` con estos valores base:

- `NOMBRE_DEL_CLIENTE`: `[NOMBRE TEMPORAL DEL CLIENTE]`
- `RUBRO_DEL_CLIENTE`: `[RUBRO TEMPORAL]`
- `DOMINIO`: `placeholder.local`
- `MÓDULO_PÚBLICO_ESPECIAL`: `pendiente, dejar estructura reusable`

## Estado de fase

- Base organizativa del starter: completada
- Fase 0 con placeholders temporales: cerrada
- Bootstrap técnico local: en curso
- Bloqueos actuales: definición final del módulo especial y contenido real del cliente

## Documentos clave

- `docs/00-project-brief.md`
- `docs/01-architecture.md`
- `docs/02-data-model.md`
- `docs/03-pages-and-routes.md`
- `docs/04-reusability-strategy.md`
- `docs/05-deployment-vps.md`
- `docs/06-work-plan.md`
- `docs/07-implementation-status.md`
- `docs/08-home-reference.md`
- `docs/09-orchestration-strategy.md`

## Carpetas base

- `agents/`: agentes del proyecto y reglas de coordinación.
- `skills/`: playbooks reutilizables por tarea.
- `src/`: estructura objetivo del código de aplicación.
- `infra/`: plantillas y convenciones de infraestructura.
- `scripts/`: utilidades operativas del entorno local y soporte.
- `tests/smoke/`: pruebas mínimas de humo a incorporar en fases posteriores.

## Runtime local normalizado

Fuente transversal:

- `/Users/rapha/Projects/LOCAL_RUNTIME_STANDARD.md`

Flujo soportado:

```bash
pnpm install
cp .env.example .env
pnpm docker:up
pnpm dev
```

Puertos reservados:

- app web y admin Payload: `http://127.0.0.1:3004`
- PostgreSQL: `127.0.0.1:55433`

Comandos Docker soportados:

```bash
pnpm docker:up
pnpm docker:down
pnpm docker:ps
pnpm docker:logs
pnpm docker:config
pnpm docker:doctor
```

Baseline soportado para tooling local:

- Docker CLI: `>= 24.0.0`
- Docker Compose: `>= 2.20.0`

Buena práctica del repo:

- no fijar una versión exacta de Docker Desktop en código;
- fijar un baseline mínimo probado y validarlo en el wrapper;
- ejecutar `pnpm docker:doctor` antes de diagnosticar fallos de runtime.

Regla:

- no usar `docker compose up -d` como flujo principal del repo;
- si se necesita ajustar el puerto host de PostgreSQL, usar `POSTGRES_HOST_PORT`
  y mantener `DATABASE_URL` alineado.
