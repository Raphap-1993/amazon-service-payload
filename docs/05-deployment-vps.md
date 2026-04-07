# 05. Deployment VPS

## Estrategia de deploy en VPS

Se recomienda un despliegue simple con una sola app Node gestionada por PM2, Nginx como proxy inverso y PostgreSQL como servicio persistente. El media debe guardarse en una ruta compartida y persistente del VPS, no dentro del release compilado.

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

## PM2

Recomendaciones:

- usar un solo proceso en etapas iniciales;
- reinicio automático por caída;
- logs separados de app y errores;
- script de reload sin downtime cuando sea viable.

Artefactos esperados futuros en `infra/`:

- `infra/pm2/ecosystem.config.cjs`
- `infra/nginx/site.conf`

## Nginx

Responsabilidades:

- TLS y redirección HTTP -> HTTPS;
- proxy hacia el puerto interno de la app;
- cabeceras básicas de seguridad;
- caché razonable de assets estáticos.

## PostgreSQL

Recomendaciones:

- base y usuario dedicados por proyecto;
- backup diario automático;
- acceso restringido por red y credenciales fuertes;
- monitoreo básico de espacio y conexión.

## Storage local

Ruta sugerida:

- releases de app: `/var/www/[project]/current`
- storage persistente: `/var/www/[project]/shared/media`

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
- usuario de deploy con permisos correctos
- PM2 instalado
- Nginx configurado
- estrategia de backup validada
