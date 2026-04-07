# 06. Work Plan

## Estado real del proyecto

- Etapa preparatoria del repo: completada
- `Fase 0. Discovery y definición`: cerrada con placeholders temporales autorizados
- `Fase 1. Bootstrap técnico`: abierta
- Condición operativa actual: avanzar solo en base técnica local y documentación, sin dar por definitivo el módulo especial ni el frontend final

## Backlog por fases

### Etapa preparatoria. Base del repo

- inspeccionar el repo actual;
- crear documentación base;
- definir estructura objetivo;
- crear agentes y skills reutilizables;
- dejar estrategia de orquestación lista.

### Fase 0. Discovery y definición

- cerrar datos del cliente, dominio y branding;
- definir alcance exacto del módulo especial;
- fijar criterios de SEO, contenidos y conversión;
- validar sitemap objetivo.

### Fase 1. Bootstrap técnico

- inicializar Next.js + Payload + Tailwind + TypeScript;
- configurar adapter PostgreSQL;
- preparar estructura `src/`;
- estandarizar variables de entorno y scripts base.

### Fase 2. CMS y admin

- modelar collections y globals;
- definir access control básico;
- configurar uploads y media;
- dejar panel admin operativo.

### Fase 3. Frontend público

- construir layout base;
- conectar Home, Nosotros, Servicios y Contacto a Payload;
- agregar páginas detalle por servicio;
- asegurar responsive y UX base.

### Fase 4. Módulo especial

- modelar datos definitivos;
- construir flujo público del caso principal;
- implementar validaciones, errores y estados vacíos;
- revisar exposición segura de datos.

### Fase 5. SEO, QA y smoke

- metadata, schema y enlazado interno;
- smoke tests críticos;
- revisión de contenidos y consistencia;
- checklist de release.

### Fase 6. Deploy y hardening

- preparar VPS;
- configurar PM2 y Nginx;
- configurar backups;
- ejecutar despliegue y validación post-release.

## Dependencias entre fases

- La etapa preparatoria deja la base ordenada para trabajar sin improvisación.
- La Fase 0 desbloquea modelado y arquitectura fina.
- La Fase 1 es prerequisito técnico de todo lo demás.
- La Fase 2 debe cerrarse antes de conectar el frontend definitivo.
- La Fase 4 depende de reglas de negocio concretas.
- La Fase 6 requiere smoke y QA aprobados.

## Gate de salida de Fase 0

- cliente definido;
- rubro definido;
- dominio definido;
- módulo especial definido al menos a nivel de caso de uso, input principal y datos públicos visibles;
- criterio mínimo de branding, conversión y foco SEO inicial acordado.

Como se autorizó bootstrap sobre placeholders temporales, este gate queda parcialmente diferido. El proyecto puede avanzar técnicamente, pero la definición real del negocio sigue pendiente antes de modelar el módulo especial definitivo o el frontend final.

## Quick wins

- dejar `Services` con páginas detalle desde el inicio;
- incorporar FAQs y Testimonials porque agregan valor comercial con bajo costo;
- estandarizar SEO fields reutilizables temprano;
- dejar storage local bien resuelto desde la primera iteración.

## Riesgos técnicos

- indefinición del módulo especial;
- deriva entre contenido editable y copy hardcodeado;
- exceso de bloques genéricos que complique el admin;
- exponer media o datos sensibles sin reglas claras;
- deploy en VPS sin persistencia real de uploads.

## Orden sugerido de implementación

1. Cerrar discovery y definición del negocio.
2. Configuración base del proyecto.
3. Modelo de datos y Payload admin.
4. Layout y globals de sitio.
5. Páginas públicas principales.
6. Módulo especial.
7. SEO y polish.
8. Smoke, deploy y handoff.
