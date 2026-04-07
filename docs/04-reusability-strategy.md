# 04. Reusability Strategy

## Qué se reutiliza entre clientes

- arquitectura base Next.js + Payload en una sola app;
- collections y globals comunes;
- bloques de marketing de baja complejidad;
- layout general, header, footer y patrones de secciones;
- manejo de media local;
- checklists de deploy y QA;
- convenciones de naming, slugs, SEO y estructura de carpetas.

## Qué branding debe cambiar por cliente

- logo;
- paleta y tokens de marca;
- tipografías;
- imágenes y assets;
- textos comerciales;
- datos de contacto;
- redes sociales;
- tono de copy;
- schema y claims del negocio.

## Qué módulos son comunes

- Home, Nosotros, Servicios, Contacto;
- media library;
- gestión de FAQs;
- testimonios;
- SEO base;
- navegación y CTAs;
- formularios de contacto;
- páginas de detalle por servicio.

## Qué piezas deben quedar configurables

- navegación principal y footer;
- home hero y secciones destacadas;
- servicios y servicios destacados;
- FAQs y testimonios;
- SEO por página;
- labels, placeholders y validaciones del módulo especial;
- visibilidad pública o privada de media;
- copy de mensajes operativos y disclaimers.

## Estrategia de reutilización real

La reutilización se hará por clonación del repo y ajuste controlado, no por una plataforma multiempresa. Eso implica:

- una rama o repo por cliente;
- branding y contenido propios en cada clon;
- mismo esqueleto técnico y documental;
- cambios comunes que puedan retroalimentar el starter base.

## Qué no se debe intentar reutilizar desde el día uno

- flujos de negocio muy específicos convertidos en framework genérico;
- generadores abstractos de schemas;
- motores complejos de bloques;
- roles o permisos altamente granulares si el panel es simple.

