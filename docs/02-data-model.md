# 02. Data Model

## Criterio general

El modelo debe cubrir un sitio corporativo reusable con un mínimo de collections y globals, evitando un CMS excesivamente abstracto. Se recomienda partir de entidades concretas y solo extraer bloques o relaciones cuando la reutilización sea evidente.

## Collections base

### `Users`

- Uso: acceso al admin.
- Campos clave: `name`, `email`, `role`, `isActive`, `lastLoginAt`.
- Tipo de acceso: privado.

### `Media`

- Uso: imágenes, documentos y assets subidos desde admin.
- Campos clave: `alt`, `caption`, `folder`, `visibility`, `file`.
- Tipo de acceso: mixto, según visibilidad y ruta pública.

### `Services`

- Uso: catálogo de servicios y posibles páginas detalle.
- Campos clave: `title`, `slug`, `summary`, `content`, `featuredImage`, `icon`, `isFeatured`, `seo`.
- Relaciones: `featuredImage -> Media`.
- Tipo de acceso: lectura pública, escritura privada.

### `ContactSubmissions`

- Uso: registro de formularios de contacto.
- Campos clave: `name`, `email`, `phone`, `message`, `sourcePage`, `status`, `notes`.
- Tipo de acceso: privado.

### `FAQs` recomendado

- Motivo: alta reutilización y bajo costo de modelado.
- Campos clave: `question`, `answer`, `category`, `isPublished`, `relatedService`.
- Relaciones: `relatedService -> Services`.

### `Testimonials` recomendado

- Motivo: social proof reusable en múltiples clientes.
- Campos clave: `name`, `role`, `company`, `quote`, `photo`, `isFeatured`.
- Relaciones: `photo -> Media`.

### `SpecialModuleEntries` recomendado como placeholder

- Uso: colección del módulo público especial.
- Nota: es un placeholder del starter y debe renombrarse cuando el caso de negocio real esté definido.
- Campos base propuestos:
  - `title`
  - `slug`
  - `publicCode`
  - `documentType`
  - `documentNumber`
  - `status`
  - `issuedAt`
  - `expiresAt`
  - `summary`
  - `publicNotes`
  - `internalNotes`
  - `attachment`
  - `ownerName`
- Relaciones: `attachment -> Media`.
- Tipo de acceso: lectura pública filtrada y segura; edición privada.

## Globals base

### `SiteSettings`

- Configuración del sitio.
- Campos sugeridos: `siteName`, `domain`, `defaultSeo`, `contactInfo`, `socialLinks`, `branding`.

### `Header`

- Navegación principal.
- Campos sugeridos: `logo`, `navItems`, `cta`.

### `Footer`

- Pie de página.
- Campos sugeridos: `logo`, `columns`, `legalLinks`, `contactInfo`, `socialLinks`.

### `HomePage`

- Contenido principal de home.
- Campos sugeridos: `hero`, `featuredServices`, `trustSection`, `faqPreview`, `seo`.

### `AboutPage`

- Contenido de nosotros.
- Campos sugeridos: `hero`, `story`, `values`, `teamSnippet`, `seo`.

### `ContactPage`

- Contenido de contacto.
- Campos sugeridos: `hero`, `contactCards`, `formIntro`, `mapEmbed`, `seo`.

## Globals recomendados adicionales

### `ServicesPage`

- Conviene agregarlo para separar el contenido editorial de la página índice del contenido unitario de `Services`.

### `SpecialModulePage`

- Conviene agregarlo si el módulo especial tiene landing propia con hero, instrucciones, FAQs y disclaimers.

## Relaciones principales

- `Services.featuredImage -> Media`
- `Testimonials.photo -> Media`
- `FAQs.relatedService -> Services`
- `SpecialModuleEntries.attachment -> Media`
- `Globals.*.seo` reutiliza un grupo común de campos SEO

## Campos públicos y privados

### Públicos

- contenido editorial publicado;
- imágenes o documentos marcados para exposición pública;
- resultados acotados del módulo especial;
- metadata SEO.

### Privados

- usuarios y roles;
- envíos de contacto;
- notas internas;
- flags operativos;
- archivos internos o adjuntos restringidos.

## Bloques reutilizables

Se recomienda un sistema de bloques pequeño y controlado para evitar rigidez sin caer en sobreingeniería.

Bloques sugeridos:

- Hero
- RichText
- CTA
- FeatureGrid
- Logos
- FAQList
- TestimonialsStrip

## SEO settings: recomendación

Sí conviene reutilizar un grupo de campos SEO en collections y globals con:

- `metaTitle`
- `metaDescription`
- `canonicalUrl`
- `ogImage`
- `noIndex`
- `schemaType`

No hace falta un CMS SEO separado.

## Páginas detalle por servicio

Sí conviene habilitarlas desde `Services`, porque:

- mejoran posicionamiento orgánico;
- evitan duplicar copy en una sola página larga;
- agregan reutilización entre clientes.

## Páginas SEO por norma o sector

No deben entrar en la base mínima por defecto. Deben agregarse solo si el negocio exige estrategia orgánica específica por sector, norma o ubicación.

## Módulo especial del negocio

El diseño base del módulo especial debe responder estas preguntas antes de implementarse:

- qué consulta pública resuelve;
- por qué identificador busca el usuario;
- qué datos pueden exponerse públicamente;
- qué reglas de validación y rate limiting necesita;
- si requiere histórico, expiración o documentos adjuntos.

Mientras no exista definición exacta, `SpecialModuleEntries` funciona como placeholder reusable del starter.

Regla para abrir implementación:

- no convertir `SpecialModuleEntries` en schema definitivo hasta definir nombre real del módulo, identificador de consulta, ruta pública y reglas de exposición.
