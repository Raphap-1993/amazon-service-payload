# 07. Implementation Status

## Estado de fases

- Etapa preparatoria: completada.
- `Fase 0. Discovery y definición`: cerrada con placeholders temporales autorizados.
- `Fase 1. Bootstrap técnico`: completada.
- `Fase 2. Frontend base del home`: completada en base local reusable.
- `Fase 3. Homologación de marca + páginas internas estáticas`: completada en base local reusable.
- `Fase 4. Estabilización de runtime local`: completada para entorno local con Node 20.
- `Fase 5. SEO técnico + UX de legibilidad + revisión de readiness`: completada en base local reusable.
- `Fase 6. Motion premium del home con GSAP`: completada en base local reusable.

## Placeholders temporales vigentes

- cliente: `[NOMBRE TEMPORAL DEL CLIENTE]`
- rubro: `[RUBRO TEMPORAL]`
- dominio: `placeholder.local`
- módulo especial: `pendiente, dejar estructura reusable`

## Estado actual del frontend

Existe una implementación base reusable del frontend con fallback de datos, inspirada en la referencia HTML aprobada y sin copia literal de marca, textos, imágenes ni datos.

Archivos clave:

- `src/app/(frontend)/page.tsx`
- `src/components/home/HomePageView.tsx`
- `src/components/home/sections/*`
- `src/lib/home/getHomePageData.ts`
- `src/lib/home/defaultHomeData.ts`
- `src/lib/home/types.ts`
- `src/globals/HomePage.ts`
- `src/globals/Header.ts`
- `src/globals/Footer.ts`
- `src/globals/ContactPage.ts`
- `src/collections/Services.ts`
- `docs/11-admin-access-matrix.md`

## Estado actual de páginas públicas

Existen páginas públicas estáticas ya integradas al mismo chrome del home:

- `src/app/(frontend)/servicios/page.tsx`
- `src/app/(frontend)/nosotros/page.tsx`
- `src/app/(frontend)/proyectos/page.tsx`
- `src/app/(frontend)/certificaciones/page.tsx`
- `src/app/(frontend)/contacto/page.tsx`
- `src/components/site/PageShell.tsx`
- `src/components/site/PageHero.tsx`
- `src/lib/site-content/staticPages.ts`

## Alcance real cerrado en esta fase

- home con topbar, header/nav, hero, stats bar, services, about, certifications, pricing, industries, values, CTA banner, contact y footer;
- adaptación de contenido desde Payload cuando existen globals y collections;
- fallback seguro cuando aún no hay contenido cargado;
- páginas internas estáticas reutilizables para servicios, nosotros, proyectos, certificaciones y contacto;
- contenido reescrito con foco comercial B2B, tono serio y SEO seguro para Pucallpa / Perú;
- dirección visual fijada en blanco / verde / neutros claros con contraste corporativo;
- tipografía base alineada con `Barlow`, `Barlow Condensed` y `JetBrains Mono`;
- botones redondeados, transiciones sobrias y hero / footer de mayor contraste;
- escalas tipográficas y espaciados ajustados para una lectura más ordenada en home e internas;
- capa motion premium del home implementada con GSAP y `ScrollTrigger`, respetando `prefers-reduced-motion`;
- navegación pública interna real entre home y páginas estáticas, con compatibilidad para anchors legacy en el adaptador de Payload;
- `/admin` preservado como superficie separada del frontend.
- runtime local estable con PostgreSQL en Docker, Node 20 y scripts de `dev`/`build` ajustados;
- `payload.config.ts` y el perímetro del CMS corregidos para resolución ESM más predecible fuera del bundler de Next.
- metadata base, canonical, Open Graph y Twitter aplicados sobre home e internas;
- helper centralizado para `NEXT_PUBLIC_SITE_URL` usando `3004` como fallback local por defecto;
- `robots.txt` y `sitemap.xml` expuestos desde App Router;
- JSON-LD conservador tipo `LocalBusiness` expuesto desde el layout público.
- matriz mínima de acceso aplicada: `superadmin` para usuarios y settings, `admin` para operaciones y `editor` para contenido editorial.
- soporte de marca visual preparado para logo real desde `Site Settings`;
- imágenes reales del home preparadas vía `Home Page > Hero Image` y `Home Page > About Image`.
- globals editoriales de `ServicesPage` y `SpecialModulePage` activados en Payload para alinear schema y admin con la estructura ya prevista.

## Checklist de validación de fase

- `pnpm dev`
- `/admin`
- `pnpm build`
- `/robots.txt`
- `/sitemap.xml`
- responsive básico sin overflow horizontal
- no-copia literal del HTML fuente

## Fuera de alcance todavía

- copy final del cliente;
- assets e imágenes reales;
- formulario real conectado a `ContactSubmissions`;
- carga editorial real desde Payload para todas las páginas internas;
- carga editorial de imágenes para todas las páginas internas fuera del home;
- Search Console, analytics y medición SEO;
- módulo especial del negocio;
- definición final del módulo especial.

## Readiness real para publicación

Estado actual:

- la base local está estable;
- el frontend público responde;
- `/admin` responde;
- `build` responde correctamente;
- la base SEO técnica mínima ya está aplicada.

Bloqueos reales antes de publicar:

- el formulario público sigue siendo visual y no persiste todavía en `ContactSubmissions`;
- no se ha ejecutado aún el checklist operativo de VPS, backups y TLS;
- falta una revisión final con contenido real, media real y credenciales definitivas.

## Nota de validación local

- `pnpm docker:up`: correcto; PostgreSQL queda `healthy` en `127.0.0.1:55433`.
- `pnpm install`: correcto usando Node `20.20.2`.
- `pnpm dev`: correcto usando Node `20.20.2`; `GET /` y `GET /admin` responden `200`.
- `pnpm build`: correcto usando Node `20.20.2` y `NODE_OPTIONS=--max-old-space-size=4096`.
- `GET /robots.txt`: correcto.
- `GET /sitemap.xml`: correcto.
- `pnpm lint`: correcto.
- `pnpm generate:types`: correcto usando el parche idempotente de runtime incluido en `scripts/patch-runtime-deps.mjs`.
- el primer hit en frío sigue siendo más lento porque Payload hace `Pulling schema from database` al inicializar el adapter Postgres; es esperado y no bloqueante.
- la matriz mínima real de acceso está documentada en `docs/11-admin-access-matrix.md`.
