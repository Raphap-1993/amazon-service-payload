# 12. Amazon Aviation Delivery Plan

## Objetivo de esta fase

Cerrar la web de Amazon Aviation Service con nivel profesional, usando como fuente de verdad el trabajo local en este repo y no la web publicada actual.

## Decisiones ya cerradas

- objetivo principal: posicionamiento de marca y presentacion profesional de servicios;
- canal principal de conversion: correo;
- idiomas objetivo finales: espanol e ingles;
- clientes prioritarios: FAP del Peru y entidades privadas;
- posicionamiento de marca: seriedad, confiabilidad y certificacion;
- foco SEO geografico: Amazonia peruana;
- fecha critica: cambios sustanciales en 2 horas y cierre fuerte en 8 horas;
- texto historico institucional: no debe reescribirse ni resumirse sin aprobacion.

## Fuente de verdad de contenido

La fuente principal pasa a ser este repo local.

Fuentes secundarias permitidas:

- contenido util rescatable de `amazonaviationservice.com`;
- certificados, PDFs, logos, fotos y material real ya existente;
- mensajes y textos entregados por gerencia via WhatsApp.

La web publicada actual solo se usa como referencia, no como base a copiar de forma literal.

## Hallazgos operativos

- el repo local ya tiene buena base tecnica y editorial para Home, Servicios, Nosotros, Proyectos, Certificaciones y Contacto;
- el repo actual esta centrado en espanol;
- hoy existen redirects legacy de `/es/*` hacia rutas en espanol, pero no existe una arquitectura bilingue completa equivalente a la web vieja;
- por eso, una entrega seria en 2 horas debe priorizar espanol profesional y limpieza editorial;
- el ingles debe tratarse como fase inmediata siguiente, no como improvisacion en caliente.

## Estado Actual Del Sprint

La segunda ola de trabajo ya dejo una base editorial mas consistente para el sitio.

Estado por pagina:

- `Home`: reforzado como marca institucional, con foco en OMA N.° 078, Pucallpa, Amazonia peruana y CTA por correo.
- `Nosotros`: cerrado con el texto institucional bloqueado de gerencia y con respaldo de personal, pilares, mision y vision.
- `Proyectos`: curado como portafolio tecnico-comercial, no como galeria generica.
- `Servicios`: orientado a mantenimiento como servicio principal, seguido por inspeccion, reparacion y capacidades.
- `Certificaciones`: enmarcado como respaldo documental y regulatorio visible.
- `Contacto`: orientado al correo como canal principal y con fallback administrable desde back office.

Los siguientes ajustes siguen siendo importantes, pero ya no son bloqueantes para comunicar la marca:

- refinamiento fino de `Servicios`, `Certificaciones` y `Contacto` en el template final;
- revision visual del logo para evitar advertencias de proporciones en Next/Image;
- preparacion del bilinguismo como fase posterior, una vez que el espanol quede completamente validado.

## Texto institucional bloqueado

Este texto debe conservarse tal cual, salvo aprobacion explicita de gerencia:

> Amazon Aviation Service S.A.C. es una Organización de Mantenimiento Aeronáutico certificada por la DGAC (OMA N.° 078), con base principal en Pucallpa, dedicada al mantenimiento de aeronaves conforme a los estándares técnicos y regulatorios vigentes.  
> La empresa fue fundada por el Sr. Rudolf Wiedler Eberli, especialista en mantenimiento aeronáutico con amplia experiencia y licencias internacionales, quien contribuyó a la consolidación técnica del taller.  
> Este proyecto fue desarrollado a nivel familiar y empresarial, logrando la certificación como Organización de Mantenimiento Aeronáutico (OMA N.° 078).  
> Actualmente, la empresa se encuentra bajo la dirección de Nayra Saavedra Alvis Vda. de Wiedler, abogada con amplia experiencia en temas aeronáuticos, quien ha asumido la gestión y conducción de la organización, participando en el proceso de certificación ante la DGAC y garantizando la continuidad operativa, el cumplimiento normativo y el fortalecimiento institucional.  
> La empresa cuenta con un equipo de técnicos altamente calificados y en constante capacitación, lo que permite asegurar la prestación de servicios confiables y seguros, con proyección de crecimiento y participación en el desarrollo de la aviación a nivel regional y nacional.

## Sprint de 2 horas

Objetivo: dejar una version local claramente mas profesional, coherente y presentable.

Alcance:

- limpiar cualquier copy demo o placeholder residual del frontend;
- reforzar Home con mensaje de marca serio, certificado y orientado a servicios;
- actualizar la pagina Nosotros con el texto institucional bloqueado;
- consolidar Servicios con foco en mantenimiento, inspeccion, reparacion y capacidades visibles;
- consolidar Certificaciones para mostrar OMA, lista de capacidades y evidencias documentales;
- ajustar Contacto para priorizar correo como CTA principal;
- asegurar consistencia visual y narrativa entre Home, Nosotros, Servicios, Certificaciones y Contacto.

Fuera de este sprint:

- bilinguismo completo bien implementado;
- reestructuracion grande del CMS;
- automatizaciones complejas de leads;
- cambios de arquitectura no esenciales.

## Sprint de 8 horas

Objetivo: dejar la web lista para entrega fuerte y delegacion posterior.

Alcance:

- terminar homologacion editorial del sitio completo;
- integrar activos reales de proyectos, instalaciones, equipo y certificados;
- dejar backlog claro para version en ingles;
- refinar SEO on-page con foco en Amazonia peruana;
- validar navegacion, metadata, contacto y calidad visual;
- documentar backlog delegado por agentes.

## Backlog prioritario

### Prioridad alta

- eliminar copy placeholder;
- fijar mensaje principal de Home;
- cerrar Nosotros con texto oficial;
- ordenar Servicios segun valor comercial real;
- hacer visibles certificaciones y PDFs;
- alinear Contacto a correo.

### Prioridad media

- integrar galeria de proyectos reales;
- integrar fotos de instalaciones y equipo;
- pulir metadata SEO por pagina;
- preparar estructura para ingles.

### Prioridad baja

- automatizacion adicional de leads;
- ampliaciones no esenciales del CMS;
- experimentos UX o motion adicionales.

## Insumos locales detectados

Se detecto una carpeta de trabajo en:

- `/Users/rapha/Downloads/amazon_`

Contenido detectado hasta ahora:

- `WhatsApp Image 2026-04-08 at 1.49.26 p.m..jpeg`
- `WhatsApp Image 2026-04-08 at 1.49.26 p.m. (1).jpeg`
- `WhatsApp Image 2026-04-08 at 1.49.26 p.m. (2).jpeg`
- `WhatsApp Image 2026-04-08 at 1.49.26 p.m. (3).jpeg`
- `WhatsApp Image 2026-04-08 at 1.49.26 p.m. (4).jpeg`

Estos archivos deben revisarse para extraer:

- textos de gerencia;
- posibles servicios priorizados;
- claims aprobados;
- nombres de proyectos o capacidades;
- pruebas visuales reutilizables.

## Texto Rescatado De WhatsApp

Las capturas revisadas aportaron texto util y directo para la narrativa del sitio. Lo rescatable se resume asi:

- `Nuestro personal`: equipo profesional, altamente capacitado, con formacion continua y compromiso con seguridad y excelencia.
- `Nuestros pilares`: personal capacitado, informacion tecnica actualizada, equipos y herramientas.
- `Habilitaciones`: reparacion estructural mayor, PND por liquidos penetrantes, inspeccion de zona caliente, inspeccion boroscopica, remocion e instalacion de motor, soldadura autogena, soldadura electrica, ensamblaje de mangueras flexibles, ensamblaje de cables de control, pintura de aeronave y desarmado/armado de ruedas.
- `Mision`: mantenimiento aeronautico de primer nivel, con calidad tecnica avanzada, garantia integral, procedimientos precisos y uso de componentes certificados.
- `Vision`: mantenimiento aeronautico de excelencia, con precision, compromiso con seguridad y aspiracion de liderazgo sectorial.

Este material ya no debe tratarse como referencia secundaria vaga: es insumo editorial real para la version profesional en espanol.

## Preguntas abiertas que siguen bloqueando

- cuales son exactamente los 3 a 5 servicios prioritarios que deben quedar visibles en la version final del CMS;
- cual correo exacto debe quedar como CTA principal;
- que activos del folder `amazon_` son publicables de inmediato;
- si alguno de los PDFs y fotos necesita curacion manual antes de ser publicado.

## Criterio de exito

Se considera exito de esta fase si:

- la web local deja de sentirse como base reusable y pasa a sentirse como marca real;
- el mensaje principal transmite seriedad, respaldo tecnico y certificacion;
- la pagina Nosotros queda institucionalmente correcta;
- Certificaciones y Servicios se vuelven los ejes de confianza;
- el plan de trabajo posterior queda delegable a agentes sin ambiguedad.
