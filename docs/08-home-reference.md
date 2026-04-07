# 08. Home Reference

## Fuente de referencia obligatoria

La referencia estructural y visual del home proviene del archivo local:

- `/Users/rapha/Downloads/amazon-aviation-service.html`

Ese HTML define la composición, el ritmo de layout y el tono corporativo que deben reinterpretarse en esta fase.

## Qué se reinterpreta

- topbar operativo;
- header con lockup de marca, navegación y CTA;
- hero a dos columnas con copy comercial a la izquierda y visual protagonista a la derecha;
- barra de métricas o credenciales;
- grillas de servicios, certificaciones, pricing, industrias y valores;
- bloque institucional “about” con highlights y media;
- CTA banner antes del cierre;
- bloque de contacto con datos visibles y shell de formulario;
- footer robusto con branding, navegación, contacto y legales.

## Qué no se copia literalmente

- textos del ejemplo;
- nombre de marca, logo y claims sectoriales;
- teléfonos, correos, direcciones o datos reales;
- imágenes remotas o assets externos;
- certificaciones, licencias o promesas específicas del ejemplo;
- estructura de copy exacta por sección.

## Estructura objetivo del home

- topbar
- header / nav
- hero a dos columnas
- stats bar
- services section
- about section
- certifications section
- pricing section
- services detail / industries section
- values section
- CTA banner
- contact section
- footer

## Dirección visual congelada

- paleta dominante: blanco / verde profundo / verde técnico / grises limpios;
- contraste derivado del sitio real `https://amazonaviationservice.com/es`, pero con una lectura más clara, más blanca y más empresarial;
- headings contundentes con `Barlow Condensed`;
- cuerpo y navegación con `Barlow`;
- microdatos y labels técnicos con `JetBrains Mono`;
- hero de alto impacto con contraste fuerte;
- cards y bloques con bordes visibles, botones redondeados y composición industrial-comercial;
- footer oscuro, robusto y empresarial;
- responsive real en móvil y desktop.

## Mapeo CMS real del home

- `Header`: topbar, navegación principal y CTA del header.
- `HomePage`: hero, stats, about teaser, certifications, pricing, industries, values y CTA banner.
- `Services`: cards de servicios publicadas para la grilla del home.
- `ContactPage`: datos del bloque de contacto y textos del shell del formulario.
- `Footer`: resumen institucional, links de navegación, contacto y legales.
- `SiteSettings`: nombre de marca, tagline, dominio y datos generales reutilizables.

## Base reusable ya implementada

- home renderizado desde `src/app/(frontend)/page.tsx`;
- adaptador único Payload -> frontend en `src/lib/home/getHomePageData.ts`;
- contrato de datos del home en `src/lib/home/types.ts`;
- fallbacks seguros en `src/lib/home/defaultHomeData.ts`;
- composición del home en secciones reutilizables dentro de `src/components/home/`.

## Pendiente para fases posteriores

- copy final del cliente;
- imágenes y assets reales;
- conexión real del formulario a `ContactSubmissions`;
- detalle dinámico por servicio;
- polish fino de UX, motion y SEO técnico avanzado.

## Agentes responsables

- `architect-agent`: mantiene la frontera entre adaptador, componentes y schema.
- `frontend-agent`: implementa y evoluciona secciones reutilizables.
- `ux-agent`: refina hero, jerarquía visual y responsive.
- `payload-agent`: asegura que las secciones sigan siendo CMS-friendly.
- `qa-docs-agent`: valida fidelidad, no-copia literal y consistencia documental.
