# 05. Deployment VPS

## Estrategia de deploy en VPS

Se recomienda un despliegue simple con una sola app Node gestionada por PM2, Nginx como proxy inverso y PostgreSQL como servicio persistente. El media debe guardarse en una ruta compartida y persistente del VPS, no dentro del release compilado.

## Convención operativa para este repo

El VPS corre sobre Hestia y ya tiene varios usuarios productivos. Para este
proyecto solo se debe trabajar dentro del usuario:

- `amazonaviationservice`

Convención sugerida:

- panel/orquestación web: `Hestia`
- usuario del sistema: `amazonaviationservice`
- home del proyecto: `/home/amazonaviationservice`
- root operativo del deploy: `/home/amazonaviationservice/apps/amazonaviationservice.com`
- release activo: `/home/amazonaviationservice/apps/amazonaviationservice.com/current`
- variables compartidas: `/home/amazonaviationservice/apps/amazonaviationservice.com/shared/.env`
- media persistente: `/home/amazonaviationservice/apps/amazonaviationservice.com/shared/media`
- logs de app sugeridos: `/home/amazonaviationservice/apps/amazonaviationservice.com/shared/logs`
- logs PM2 actuales observados: `/home/amazonaviationservice/.pm2/logs`

Implicaciones:

- `PM2` debe correr bajo el usuario `amazonaviationservice`;
- la app no debe desplegarse en `root` ni dentro del home de otros usuarios del
  VPS;
- `Hestia` administra el dominio y el proxy web, pero la app Node debe quedar
  aislada bajo `/home/amazonaviationservice/apps/amazonaviationservice.com`;
- `MEDIA_ROOT_DIR` debe apuntar al directorio persistente de `shared/media`.

## Snapshot productivo observado el `2026-04-09`

Inspección hecha por SSH en modo solo lectura sobre `debian@192.99.43.76`.
No se aplicaron cambios remotos.

Estado observado:

- `amazonaviationservice.com` está servido por Hestia/Nginx y hoy hace proxy a
  `127.0.0.1:3003`;
- el release activo es
  `/home/amazonaviationservice/apps/amazonaviationservice.com/releases/20260407023209`;
- `current` apunta a ese release;
- el proceso productivo actual corre en PM2 como `amazonaviationservice-web`;
- `PORT=3003` está en uso por la app viva;
- `3004` está libre al momento de la inspección, lo que permite una validación
  paralela antes de hacer cutover si así se decide.

Referencia detallada:

- `docs/17-production-vps-inventory.md`

## Topología recomendada

- `Nginx` expone `80/443`
- `PM2` mantiene el proceso de la app
- `Next.js + Payload` corren en un puerto interno
- `PostgreSQL` vive en el mismo VPS o en un servicio gestionado
- `storage local` persiste fuera del directorio del build

## Variables de entorno mínimas

- `NODE_ENV`
- `PORT`
- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `CRON_SECRET` si se agregan tareas
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL_TO`
- `MEDIA_ROOT_DIR`
- `MEDIA_BASE_URL`

Valores concretos recomendados para este repo en VPS:

- `PORT=3004` para validar esta nueva versión en paralelo sin tocar la app viva
- `PORT=3003` solo cuando se haga el reemplazo definitivo de la app actual
- `NEXT_PUBLIC_SITE_URL=https://[dominio-real]`
- `MEDIA_ROOT_DIR=/home/amazonaviationservice/apps/amazonaviationservice.com/shared/media`
- `DEPLOY_ROOT_DIR=/home/amazonaviationservice/apps/amazonaviationservice.com`
  si se usa el `ecosystem.config.cjs` del repo
- `PM2_LOG_DIR=/home/amazonaviationservice/.pm2/logs` como referencia operativa
- `DEPLOY_USER=amazonaviationservice`

## PM2

Recomendaciones:

- usar un solo proceso en etapas iniciales;
- reinicio automático por caída;
- logs separados de app y errores;
- script de reload sin downtime cuando sea viable.

Para este repo:

- ejecutar PM2 con el usuario `amazonaviationservice`;
- tomar `cwd` desde
  `/home/amazonaviationservice/apps/amazonaviationservice.com/current`;
- leer el `.env` compartido desde
  `/home/amazonaviationservice/apps/amazonaviationservice.com/shared/.env`;
- asumir que los logs reales de PM2 viven en `/home/amazonaviationservice/.pm2/logs`.

Artefactos operativos ya preparados en `infra/`:

- `infra/pm2/ecosystem.config.cjs`
- `infra/nginx/site.conf`

## Nginx

Responsabilidades:

- TLS y redirección HTTP -> HTTPS;
- proxy hacia el puerto interno de la app;
- cabeceras básicas de seguridad;
- caché razonable de assets estáticos.

Para este repo, el upstream esperado es:

- `127.0.0.1:3004`

En un VPS con Hestia, la configuración efectiva de `Nginx` y dominio debe vivir
en el dominio del usuario `amazonaviationservice`, sin reutilizar usuarios ni
vhosts de otros proyectos.

## PostgreSQL

Recomendaciones:

- base y usuario dedicados por proyecto;
- backup diario automático;
- acceso restringido por red y credenciales fuertes;
- monitoreo básico de espacio y conexión.

## Storage local

Ruta sugerida:

- releases de app:
  `/home/amazonaviationservice/apps/amazonaviationservice.com/current`
- storage persistente:
  `/home/amazonaviationservice/apps/amazonaviationservice.com/shared/media`

Principios:

- separar archivos persistentes del código desplegado;
- normalizar nombres de archivo;
- permitir assets públicos y privados con convención clara;
- preparar futura migración a object storage sin cambiar contratos internos.

## Backups

### Base de datos

- `pg_dump` diario;
- retención mínima de 7 a 14 días;
- copia fuera del VPS si el presupuesto lo permite.

### Media

- snapshot o `rsync` diario del directorio de media;
- verificar restauración al menos una vez por trimestre.

### Configuración

- versionar `infra/` y plantillas operativas;
- documentar restauración y rotación de secretos.

## Checklist de readiness VPS

- DNS listo
- firewall configurado
- TLS emitido
- PostgreSQL operativo
- carpeta persistente de media creada
- usuario Linux/Hestia `amazonaviationservice` confirmado y con permisos correctos
- PM2 instalado
- Nginx configurado
- estrategia de backup validada

## Secuencia mínima sugerida

1. entrar y trabajar solo dentro del usuario `amazonaviationservice`;
2. preparar
   `/home/amazonaviationservice/apps/amazonaviationservice.com/shared/{media,uploads}`;
3. dejar `.env` productivo en `shared/.env`;
4. publicar el release en `current`;
5. arrancar o recargar PM2 con el `ecosystem.config.cjs` del repo;
6. decidir si Hestia seguirá apuntando a `127.0.0.1:3003` o si se hará una
   validación paralela en `127.0.0.1:3004` antes del switch;
7. validar dominio real, `/admin`, uploads y logs.
