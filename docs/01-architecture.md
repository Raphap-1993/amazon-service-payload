# 01. Architecture

## Arquitectura mínima viable

La arquitectura recomendada es una sola aplicación Node.js con Next.js y Payload integrados, expuesta detrás de Nginx y ejecutada con PM2. PostgreSQL actúa como única persistencia relacional y el media se almacena localmente en el VPS en una ruta persistente fuera del directorio efímero del release.

## Por qué se eligió este stack

- Next.js: resuelve frontend público, rutas, rendering híbrido y API del proyecto en un solo framework.
- Payload CMS: aporta panel admin, modelado de collections/globals, control de acceso y uploads sin montar un backoffice aparte.
- PostgreSQL: suficiente para contenido, envíos de contacto y módulo especial sin complejidad extra.
- Payload Postgres adapter: mantiene alineado el modelo con Payload y simplifica persistencia.
- TypeScript: mejora consistencia y reduce errores de integración.
- TailwindCSS: acelera construcción de UI reusable sin crear un sistema visual excesivamente rígido.
- PM2 + Nginx: stack pragmático y común para despliegues en VPS.
- Storage local: suficiente para starter y para volúmenes iniciales bajos o medios.

## Componentes del sistema

- Navegador web del usuario.
- Frontend Next.js para páginas públicas.
- Payload CMS para admin, colecciones, globals y endpoints integrados.
- PostgreSQL para datos estructurados.
- Storage local para media subido desde admin.
- PM2 para gestión del proceso Node.
- Nginx como reverse proxy, TLS y caché básica de assets.

## Flujo entre frontend, Payload, PostgreSQL y media local

1. El usuario público accede a una ruta servida por Next.js.
2. La página obtiene contenido desde Payload, idealmente por acceso server-side interno.
3. Payload consulta PostgreSQL usando su propio adapter.
4. Si la vista necesita imágenes o documentos, se sirven desde la ruta pública del storage local.
5. Un administrador gestiona contenido y media desde `/admin`.
6. Payload persiste contenido en PostgreSQL y archivos en disco local según la colección de media.

## Decisión clave: una sola app, no varias

- Simplifica despliegue.
- Reduce duplicación de tipos, autenticación y configuración.
- Facilita mantenimiento por equipos pequeños.
- Encaja con el objetivo de starter reusable y rápido de clonar.

## Por qué no se usará una segunda capa Drizzle separada

Payload ya usa Drizzle internamente en su adapter para PostgreSQL. Agregar una capa manual extra generaría:

- doble definición del modelo de datos;
- mayor riesgo de desalineación entre schema, admin y queries;
- más migraciones y mantenimiento;
- decisiones técnicas innecesarias para este tipo de proyecto.

La regla es clara: si un dato pertenece al dominio administrado por Payload, se modela en Payload. Solo se evaluará una capa aparte cuando exista una necesidad excepcional y explícitamente aprobada.

## Estructura objetivo de alto nivel

```text
/src
  /app
    /(frontend)
    /api
  /collections
  /globals
  /blocks
  /components
  /lib
  /types
/agents
/skills
/docs
/infra
/scripts
/tests/smoke
payload.config.ts
```

## Principios de arquitectura

- Mantener una sola fuente de verdad para contenido y configuración.
- Reutilizar patrones de páginas y bloques antes de crear piezas ad hoc.
- Separar claramente contenido reusable, contenido fijo del sitio y lógica del módulo especial.
- Diseñar para claridad operativa antes que para sofisticación técnica.

