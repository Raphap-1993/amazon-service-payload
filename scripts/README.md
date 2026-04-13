# Scripts

Scripts operativos y de soporte del repo.

Scripts vigentes:

- `docker-local.sh`: wrapper soportado para levantar, bajar, inspeccionar y
  validar PostgreSQL local, incluyendo baseline de versiones y `doctor`.
- `patch-runtime-deps.mjs`: workaround idempotente para bugs de `undici` y
  del bin de Payload que pueden romper comandos del CLI fuera del bundler.
- `ops/payload-sync-public-globals.mjs`: exporta, compara y opcionalmente
  sincroniza globals públicos de Payload desde una URL fuente hacia la base
  local, dejando backups JSON en `/tmp`.

Scripts razonables a incorporar más adelante:

- backup de base de datos;
- backup o sincronización de media;
- smoke checks post-deploy;
- seed opcional de contenido inicial;
- verificación más estricta de variables de entorno.

Regla: mantener scripts simples, idempotentes y documentados.
