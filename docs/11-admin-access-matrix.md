# 11. Admin Access Matrix

## Objetivo

Documentar la matriz mínima real de permisos del panel admin para `superadmin`, `admin` y `editor`, sin inventar una granularidad que el código no tenga.

## Roles disponibles

- `superadmin`
- `admin`
- `editor`

## Matriz real actual

### `superadmin`

- puede entrar al panel;
- puede crear, leer, actualizar y borrar usuarios;
- puede gestionar el alta inicial y la administración de cuentas;
- puede actualizar `SiteSettings`;
- puede operar todas las superficies administrativas ya implementadas.

### `admin`

- puede autenticarse en el panel;
- puede gestionar `Header`, `Footer`, `SpecialModulePage` y `SpecialModuleEntries`;
- puede operar `ContactSubmissions`;
- puede crear, actualizar y borrar contenido en `Services`, `Media`, `FAQs` y `Testimonials`;
- no puede gestionar usuarios;
- no puede actualizar `SiteSettings`.

### `editor`

- puede autenticarse en el panel;
- puede actualizar superficies editoriales como `HomePage`, `AboutPage`, `ServicesPage` y `ContactPage`;
- puede crear y actualizar contenido en `Services`, `Media`, `FAQs` y `Testimonials`;
- no puede borrar contenido editorial;
- no puede gestionar `Users`, `SiteSettings`, `ContactSubmissions` ni `SpecialModuleEntries`.

## Alcance implementado hoy

- La colección [Users](/Users/rapha/Projects/amazon-service-payload/src/collections/Users.ts) expone `superadmin`, `admin` y `editor`.
- La colección [Users](/Users/rapha/Projects/amazon-service-payload/src/collections/Users.ts) queda restringida a `superadmin`.
- [SiteSettings](/Users/rapha/Projects/amazon-service-payload/src/globals/SiteSettings.ts) queda reservado a `superadmin` para `update`.
- [Header](/Users/rapha/Projects/amazon-service-payload/src/globals/Header.ts), [Footer](/Users/rapha/Projects/amazon-service-payload/src/globals/Footer.ts) y [SpecialModulePage](/Users/rapha/Projects/amazon-service-payload/src/globals/SpecialModulePage.ts) quedan en `admin` o `superadmin`.
- [HomePage](/Users/rapha/Projects/amazon-service-payload/src/globals/HomePage.ts), [AboutPage](/Users/rapha/Projects/amazon-service-payload/src/globals/AboutPage.ts), [ServicesPage](/Users/rapha/Projects/amazon-service-payload/src/globals/ServicesPage.ts) y [ContactPage](/Users/rapha/Projects/amazon-service-payload/src/globals/ContactPage.ts) quedan en `editor` o superior.
- [Services](/Users/rapha/Projects/amazon-service-payload/src/collections/Services.ts), [Media](/Users/rapha/Projects/amazon-service-payload/src/collections/Media.ts), [FAQs](/Users/rapha/Projects/amazon-service-payload/src/collections/FAQs.ts) y [Testimonials](/Users/rapha/Projects/amazon-service-payload/src/collections/Testimonials.ts) permiten crear/editar a `editor` o superior y borrar a `admin` o `superadmin`.
- [ContactSubmissions](/Users/rapha/Projects/amazon-service-payload/src/collections/ContactSubmissions.ts) y [SpecialModuleEntries](/Users/rapha/Projects/amazon-service-payload/src/collections/SpecialModuleEntries.ts) quedan reservados a `admin` o `superadmin`.

## Pendientes reales

- Si luego hace falta granularidad por “publicar”, “aprobar” o “borrar definitivamente”, habrá que introducir reglas adicionales.
- Si el módulo especial se vuelve más sensible, puede requerir separar lectura interna y lectura pública con mayor precisión.
