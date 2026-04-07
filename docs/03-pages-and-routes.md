# 03. Pages And Routes

## Mapa del sitio

- `/`
- `/nosotros`
- `/servicios`
- `/proyectos`
- `/certificaciones`
- `/contacto`
- `/[modulo-especial]`
- `/admin`

## Rutas públicas

### Home

- Ruta: `/`
- Objetivo: presentar propuesta de valor, servicios destacados, respaldo OMA y confianza inicial.
- Estado actual: home implementado con navegación hacia páginas internas estáticas.

### Nosotros

- Ruta: `/nosotros`
- Objetivo: explicar trayectoria, enfoque y credenciales.

### Servicios

- Ruta: `/servicios`
- Objetivo: listar servicios principales, capacidades técnicas y llamados a contacto.

### Proyectos

- Ruta: `/proyectos`
- Objetivo: mostrar casos recuperados como evidencia técnica y soporte comercial.

### Certificaciones

- Ruta: `/certificaciones`
- Objetivo: concentrar verificación documental, OMA y lista de capacidades.

### Contacto

- Ruta: `/contacto`
- Objetivo: concentrar formulario estático de fase, datos de contacto y CTA comercial.

### Módulo especial

- Ruta base: `/[modulo-especial]`
- Objetivo: resolver la consulta pública distintiva del negocio.
- Nota: esta ruta es placeholder y debe reemplazarse por el slug real al cerrar la `Fase 0`.
- Variantes opcionales:
  - `/[modulo-especial]/resultado`
  - `/[modulo-especial]/[codigo]`

## Rutas admin

- `/admin`
- `/admin/login`
- `/admin/collections/*`
- `/admin/globals/*`

Nota: la superficie exacta dependerá de la configuración final de Payload.

## Rutas API

### Payload

- `/api/[collection]`
- `/api/globals/[global]`
- `/api/users/*`

### API de proyecto

- `/api/contact`
- `/api/[modulo-especial]/search`
- `/api/health` recomendado para smoke y monitoreo básico

## Flujo de navegación principal

1. El usuario aterriza en Home.
2. Navega a Servicios, Proyectos o Certificaciones según su intención.
3. Si necesita validar confianza, revisa Nosotros y Certificaciones.
4. Si desea convertir, llega a Contacto o CTA contextual.
5. Si usa el módulo especial, ejecuta búsqueda/validación y recibe resultado claro con siguiente paso.

## Principios de routing

- URLs limpias y semánticas.
- Una ruta pública por intención principal.
- Evitar anidar rutas complejas si no aportan claridad.
- Mantener admin y frontend claramente separados.
- Priorizar páginas estáticas claras para Home, Servicios, Nosotros, Proyectos, Certificaciones y Contacto antes de abrir detalle dinámico.
