# 17. Production VPS Inventory

Fecha de inspección: `2026-04-09`

## Alcance

Inspección remota hecha en modo solo lectura desde este entorno hacia:

- SSH: `debian@192.99.43.76`
- hostname: `panel.serveraps.xyz`
- panel: `Hestia`
- usuario objetivo del proyecto: `amazonaviationservice`

No se hicieron cambios remotos. Solo se consultó estado actual para documentar
la producción antes de cualquier reemplazo futuro.

## Dominio actual

- dominio: `amazonaviationservice.com`
- el sitio público responde `200`
- `x-powered-by`: `Next.js, Payload`
- `/admin` en el puerto interno actual también responde `200`

## Layout real bajo el usuario

Raíz observada:

- `/home/amazonaviationservice/apps/amazonaviationservice.com`

Estructura relevante:

- `current` -> symlink al release activo
- `releases/`
- `shared/.env`
- `shared/media`
- `shared/uploads`
- `shared/logs`
- `shared/*.json` con contenido operativo
- `backups/`
- `deploy.sh`
- `repo/`
- `repo.git/`

Release activo al momento de la inspección:

- `/home/amazonaviationservice/apps/amazonaviationservice.com/releases/20260407023209`

## PM2 y app actual

Proceso observado:

- PM2 app: `amazonaviationservice-web`
- estado: `online`
- uptime aproximado: `2D`
- usuario: `amazonaviationservice`
- Node real en producción: `20.20.0`
- `cwd`:
  `/home/amazonaviationservice/apps/amazonaviationservice.com/current`
- script:
  `/home/amazonaviationservice/apps/amazonaviationservice.com/current/node_modules/next/dist/bin/next`
- args: `start -H 127.0.0.1 -p 3003`

Logs PM2 observados:

- `/home/amazonaviationservice/.pm2/logs/amazonaviationservice-web-out.log`
- `/home/amazonaviationservice/.pm2/logs/amazonaviationservice-web-error.log`

## Nginx/Hestia

Configuración observada en:

- `/home/amazonaviationservice/conf/web/amazonaviationservice.com/nginx.conf`
- `/home/amazonaviationservice/conf/web/amazonaviationservice.com/nginx.ssl.conf`

Hallazgos:

- Hestia/Nginx publica `80/443` para `amazonaviationservice.com` y `www`;
- el proxy actual apunta a `http://127.0.0.1:3003`;
- se fuerza `X-Forwarded-Proto http` por compatibilidad con rewrites/localized
  behavior de la app actual.

## Variables operativas no sensibles observadas

Desde `shared/.env`:

- `NODE_ENV=production`
- `PORT=3003`
- `NEXT_PUBLIC_SITE_URL="https://amazonaviationservice.com"`
- `MEDIA_ROOT_DIR="/home/amazonaviationservice/apps/amazonaviationservice.com/shared/media"`
- `DATABASE_URL`: presente y redacted en esta documentación

## Puertos escuchando en el VPS

Puertos relevantes observados:

- `80` y `443`: `nginx`
- `8080` y `8443`: `apache2`
- `8083`: `hestia-nginx`
- `8081`: `apache2` local
- `8084`: `nginx` local
- `5432`: `postgres`
- `3306`: `mariadbd`
- `6379`: `redis-server`
- `22`: `sshd`

Puertos de apps/procesos Node observados:

- `3003`: `next-server` de `amazonaviationservice`
- `3001`: `next-server` de `poweramazonica`
- `3005`: `next-server` de `huelehuele`
- `3000`: `next-server` de `huelehuele`
- `3101`: `next-server` de `aivar`
- `3107`: `next-server` de `agingenieros`
- `4000`: proceso `node` adicional ya en uso

Puertos PM2 internos observados:

- `3002`: daemon PM2 de otro usuario
- `3100`: daemon PM2 de otro usuario

Conclusión operativa:

- `3003` está ocupado por la app viva de `amazonaviationservice.com`
- `3004` no estaba en escucha al momento de la inspección

## Deploy script actual

Archivo observado:

- `/home/amazonaviationservice/apps/amazonaviationservice.com/deploy.sh`

Hallazgos:

- clona `git@github.com:Raphap-1993/amazonaviationservice-web.git`
- despliega en `releases/<timestamp>`
- mueve `current` al nuevo release
- usa PM2 con nombre `amazonaviationservice-web`
- fija `HOST=127.0.0.1`
- fija `PORT=3003`

## Implicaciones para este repo local

- este VPS ya tiene una app viva del mismo dominio y del mismo usuario;
- no se debe sobrescribir producción directamente desde el estado local actual;
- primero hay que decidir estrategia de cutover:
  `3004` en paralelo y luego cambio de proxy, o reemplazo directo sobre `3003`;
- la ruta correcta a documentar para producción es
  `/home/amazonaviationservice/apps/amazonaviationservice.com`, no
  `/home/amazonaviationservice/app`;
- si se suben cambios locales más adelante, deben integrarse con este layout
  real de `current`/`releases`/`shared`.
