# 18. Production Deploy Plan

Fecha de preparación: `2026-04-09`

## Objetivo

Definir el plan de deploy para subir este workspace local al VPS cuando se
autorice el cutover.

Regla operativa:

- la fuente de verdad será este repo local;
- la app viva actual en `amazonaviationservice.com` se trata como demo y solo
  como referencia operativa;
- no se usará el `deploy.sh` actual del VPS para este deploy, porque ese script
  clona otro repo y fija `PORT=3003`.

## Base observada en producción

Referencias:

- [docs/17-production-vps-inventory.md](/Users/rapha/Projects/amazon-service-payload/docs/17-production-vps-inventory.md)
- [docs/05-deployment-vps.md](/Users/rapha/Projects/amazon-service-payload/docs/05-deployment-vps.md)

Estado base confirmado:

- acceso SSH operativo por `debian@192.99.43.76`;
- `sudo -n` disponible;
- usuario objetivo: `amazonaviationservice`;
- root real del proyecto:
  `/home/amazonaviationservice/apps/amazonaviationservice.com`;
- Hestia usa la template `amazonaviationservice-next`;
- esa template hoy proxea a `127.0.0.1:3003`;
- `3004` está libre y es el puerto recomendado para alinear producción con este
  repo.

## Blockers previos al deploy

Estos puntos deben resolverse antes de subir:

1. Normalizar Node local a `20.x`.
   Hoy el workspace local corre con `Node 22.22.2`, pero el repo pide
   `>=20.9.0 <21` y el VPS usa `20.20.0`.

2. Corregir `pnpm lint`.
   Estado actual:
   - error en `infra/pm2/ecosystem.config.cjs` por `require()` prohibido;
   - warning en `src/globals/Header.ts` por `linkGroup` sin uso.

3. Corregir `pnpm build`.
   Estado actual:
   - TypeScript falla en
     [src/app/(frontend)/servicios/page.tsx](/Users/rapha/Projects/amazon-service-payload/src/app/(frontend)/servicios/page.tsx)
     porque `featuredService` no tiene `href` en su tipo actual.

Conclusión:

- hoy no hay que desplegar todavía;
- primero hay que dejar el repo con `lint` y `build` en verde bajo Node `20`.

## Estrategia recomendada

La estrategia recomendada es:

1. validar el workspace local bajo Node `20`;
2. subir este workspace local por `rsync` a un release timestamped en el VPS;
3. construir ese release en el VPS con el `.env` compartido;
4. arrancar una versión nueva en `127.0.0.1:3004`;
5. verificar por `curl` interno;
6. cambiar Hestia para que el dominio apunte a `3004`;
7. dejar la demo vieja viva en `3003` por un corto período de rollback;
8. limpiar la demo vieja solo después de la validación final.

Razonamiento:

- evita depender de GitHub o del repo demo actual del VPS;
- conserva el layout `current` / `releases` / `shared`;
- mantiene rollback rápido;
- alinea producción con el puerto estándar del repo: `3004`.

## Variables del runbook

```bash
export VPS_HOST=192.99.43.76
export VPS_SSH="debian@$VPS_HOST"
export APP_USER=amazonaviationservice
export APP_ROOT=/home/$APP_USER/apps/amazonaviationservice.com
export HESTIA_NGINX_TPL=/usr/local/hestia/data/templates/web/nginx/amazonaviationservice-next.tpl
export HESTIA_NGINX_STPL=/usr/local/hestia/data/templates/web/nginx/amazonaviationservice-next.stpl
export TS=$(date +%Y%m%d%H%M%S)
export STAGE_DIR=/tmp/amazon-service-payload-$TS
export RELEASE_DIR=$APP_ROOT/releases/$TS
```

## Fase 1. Preflight local

Ejecutar localmente y no continuar hasta dejar esto en verde:

```bash
node -v
pnpm -v
pnpm lint
pnpm build
```

Check esperado:

- `node -v` debe ser `v20.x`;
- `pnpm lint` debe terminar sin errores;
- `pnpm build` debe terminar correctamente.

## Fase 2. Backup remoto

Crear respaldo mínimo antes de tocar release o proxy:

```bash
ssh "$VPS_SSH" "sudo -n bash -lc '
  mkdir -p \"$APP_ROOT/backups/$TS\"
  readlink -f \"$APP_ROOT/current\" > \"$APP_ROOT/backups/$TS/current-release.txt\"
  cp \"$APP_ROOT/shared/.env\" \"$APP_ROOT/backups/$TS/shared.env.bak\"
  cp \"$HESTIA_NGINX_TPL\" \"$APP_ROOT/backups/$TS/amazonaviationservice-next.tpl.bak\"
  cp \"$HESTIA_NGINX_STPL\" \"$APP_ROOT/backups/$TS/amazonaviationservice-next.stpl.bak\"
'"
```

## Fase 3. Subir el workspace local

Subir el estado local actual a un staging temporal en `/tmp`.

Excluir artefactos que no deben viajar:

- `.git`
- `node_modules`
- `.next`
- `.pnpm-store`
- `tsconfig.tsbuildinfo`
- `.env`
- `media`
- `data`

Comando:

```bash
rsync -az \
  --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.pnpm-store' \
  --exclude 'tsconfig.tsbuildinfo' \
  --exclude '.env' \
  --exclude 'media' \
  --exclude 'data' \
  /Users/rapha/Projects/amazon-service-payload/ \
  "$VPS_SSH:$STAGE_DIR/"
```

## Fase 4. Crear release y construir en el VPS

Promover el staging a un release real y construirlo como
`amazonaviationservice`.

```bash
ssh "$VPS_SSH" "sudo -n bash -lc '
  install -d -o \"$APP_USER\" -g \"$APP_USER\" \"$RELEASE_DIR\"
  rsync -a --delete \"$STAGE_DIR/\" \"$RELEASE_DIR/\"
  chown -R \"$APP_USER:$APP_USER\" \"$RELEASE_DIR\"
  ln -sfn \"$APP_ROOT/shared/.env\" \"$RELEASE_DIR/.env\"
  su - \"$APP_USER\" -c \"
    cd $RELEASE_DIR &&
    corepack enable >/dev/null 2>&1 || true &&
    corepack prepare pnpm@10.30.3 --activate >/dev/null 2>&1 || true &&
    pnpm install --frozen-lockfile &&
    pnpm build
  \"
'"
```

Check esperado:

- el release queda construido sin tocar aún `current`;
- la demo actual sigue atendiendo en `3003`.

## Fase 5. Preview interno en `3004`

Arrancar una instancia preview del nuevo release sin tocar todavía el dominio
público.

```bash
ssh "$VPS_SSH" "sudo -n bash -lc '
  su - \"$APP_USER\" -c \"
    set -a &&
    source $APP_ROOT/shared/.env &&
    export NODE_ENV=production &&
    export PORT=3004 &&
    pm2 delete amazon-service-payload-preview >/dev/null 2>&1 || true &&
    pm2 start $RELEASE_DIR/node_modules/next/dist/bin/next \
      --name amazon-service-payload-preview \
      -- start -H 127.0.0.1 -p 3004 &&
    pm2 save
  \"
'"
```

Validación interna:

```bash
ssh "$VPS_SSH" "curl -I -s http://127.0.0.1:3004 && printf '\n' && curl -I -s http://127.0.0.1:3004/admin"
```

Check esperado:

- `GET /` responde `200`;
- `GET /admin` responde `200`.

## Fase 6. Cutover Hestia a `3004`

Cuando se autorice el deploy real:

1. actualizar la template Hestia `amazonaviationservice-next.tpl` y
   `amazonaviationservice-next.stpl` de `3003` a `3004`;
2. re-aplicar la template al dominio;
3. regenerar la conf web del dominio;
4. cambiar `current` al nuevo release;
5. arrancar la app final del repo.

### 6.1 Cambiar template Hestia

```bash
ssh "$VPS_SSH" "sudo -n bash -lc '
  sed -i \"s/127.0.0.1:3003/127.0.0.1:3004/g\" \"$HESTIA_NGINX_TPL\"
  sed -i \"s/127.0.0.1:3003/127.0.0.1:3004/g\" \"$HESTIA_NGINX_STPL\"
  /usr/local/hestia/bin/v-change-web-domain-proxy-tpl amazonaviationservice amazonaviationservice.com amazonaviationservice-next yes
  /usr/local/hestia/bin/v-rebuild-web-domain amazonaviationservice amazonaviationservice.com yes
'"
```

### 6.2 Activar release nuevo

```bash
ssh "$VPS_SSH" "sudo -n bash -lc '
  ln -sfn \"$RELEASE_DIR\" \"$APP_ROOT/current\"
  su - \"$APP_USER\" -c \"
    cd $APP_ROOT/current &&
    set -a &&
    source $APP_ROOT/shared/.env &&
    export NODE_ENV=production &&
    export PORT=3004 &&
    if pm2 describe amazon-service-payload >/dev/null 2>&1; then
      pm2 restart amazon-service-payload --update-env
    else
      pm2 start ecosystem.config.cjs --only amazon-service-payload
    fi
    pm2 save
  \"
'"
```

## Fase 7. Validación post-cutover

Checks mínimos:

```bash
curl -I -L --max-redirs 3 -s https://amazonaviationservice.com
ssh "$VPS_SSH" "curl -I -s http://127.0.0.1:3004 && printf '\n' && curl -I -s http://127.0.0.1:3004/admin"
ssh "$VPS_SSH" "sudo -n bash -lc 'su - \"$APP_USER\" -c \"pm2 list; pm2 describe amazon-service-payload\"'"
```

Checklist:

- dominio público responde `200`;
- `/admin` responde `200`;
- PM2 muestra `amazon-service-payload` en `online`;
- media sigue apuntando a `shared/media`;
- no hay errores nuevos en logs.

## Fase 8. Limpieza posterior

Solo después de validar:

1. decidir si se apaga la demo vieja `amazonaviationservice-web` en `3003`;
2. decidir si se elimina `amazon-service-payload-preview`;
3. opcionalmente podar releases viejos dejando los últimos `N`;
4. dejar documentado el release activado y la hora del cutover.

## Rollback

Si el cutover falla:

1. volver la template Hestia de `3004` a `3003`;
2. re-aplicar proxy template y rebuild del dominio;
3. restaurar `current` al release previo guardado en
   `backups/<timestamp>/current-release.txt`;
4. confirmar que la demo vieja siga viva en `3003`;
5. detener `amazon-service-payload` o `amazon-service-payload-preview`.

Comandos base:

```bash
ssh "$VPS_SSH" "sudo -n bash -lc '
  PREV_RELEASE=\$(cat \"$APP_ROOT/backups/$TS/current-release.txt\")
  sed -i \"s/127.0.0.1:3004/127.0.0.1:3003/g\" \"$HESTIA_NGINX_TPL\"
  sed -i \"s/127.0.0.1:3004/127.0.0.1:3003/g\" \"$HESTIA_NGINX_STPL\"
  /usr/local/hestia/bin/v-change-web-domain-proxy-tpl amazonaviationservice amazonaviationservice.com amazonaviationservice-next yes
  /usr/local/hestia/bin/v-rebuild-web-domain amazonaviationservice amazonaviationservice.com yes
  ln -sfn \"\$PREV_RELEASE\" \"$APP_ROOT/current\"
  su - \"$APP_USER\" -c \"
    pm2 delete amazon-service-payload >/dev/null 2>&1 || true
    pm2 delete amazon-service-payload-preview >/dev/null 2>&1 || true
    pm2 save
  \"
'"
```

## Decisiones ya tomadas

- no desplegar todavía;
- usar el workspace local como fuente de verdad;
- mantener el layout real del VPS bajo
  `/home/amazonaviationservice/apps/amazonaviationservice.com`;
- apuntar la nueva versión a `3004` para alinear repo y producción;
- usar `rsync` desde local, no `git clone` desde el VPS;
- conservar rollback rápido manteniendo la demo en `3003` hasta validar.
