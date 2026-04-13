# 15. Amazon Aviation Gap Analysis And Roadmap

## Proposito

Convertir el estado actual del sitio en un plan de cierre serio y delegable, evitando cambios aislados sin criterio de arquitectura, contenido o negocio.

## Punto De Partida

La base ya no es una demo generica. Hoy el sitio local comunica mejor:

- marca institucional y certificada;
- mantenimiento de aeronaves como servicio principal;
- OMA N.° 078 como ancla de confianza;
- Pucallpa y Amazonia peruana como territorio de posicionamiento;
- correo como canal principal de contacto;
- clientes institucionales y privados como audiencia prioritaria.

Paginas ya trabajadas:

- `Home`
- `Nosotros`
- `Servicios`
- `Proyectos`
- `Certificaciones`
- `Contacto`

## Lo Que Ya Esta Bien Encaminado

- la estructura principal del sitio ya existe y cubre el recorrido comercial minimo;
- la narrativa en espanol ya dejo de sentirse tan generica;
- el texto institucional bloqueado de gerencia ya esta integrado como fuente formal;
- el contenido rescatado de WhatsApp ya fue absorbido en pilares, mision, vision y capacidades;
- existe un back office sobre Payload que permite proyectar contenido administrable;
- el CTA principal ya esta orientado a correo y no a un flujo complejo innecesario.

## Brechas Reales Que Siguen Abiertas

### Credibilidad Y Prueba

- faltan activos reales curados de certificados, proyectos, equipo e instalaciones;
- varias afirmaciones aun dependen mas de texto que de evidencia visible;
- la pagina de certificaciones todavia puede sentirse mas documental que institucional.

### Jerarquia Comercial

- el mensaje principal ya mejoro, pero aun puede afinarse para que la propuesta de valor sea mas inmediata;
- servicios, proyectos y certificaciones todavia deben leerse como un sistema comercial unificado y no como paginas separadas.

### Contenido Administrable

- el correo ya tiene enfoque administrable, pero falta cerrar la politica completa de que contenido queda editable desde Payload y que contenido queda bloqueado;
- todavia no hay una matriz formal de gobernanza editorial por seccion.

### SEO Y Descubrimiento

- la base on-page existe, pero aun falta una pasada fina por titles, descriptions, interlinking y consistencia semantica;
- falta consolidar keywords alrededor de mantenimiento de aeronaves, OMA 078, Pucallpa, Ucayali y Amazonia peruana.

### Bilinguismo

- ya se decidio que ingles es objetivo final;
- no debe iniciarse todavia;
- antes de abrir ingles, el espanol debe quedar aprobado editorialmente y respaldado por activos reales.

### QA Visual Y Tecnico

- falta una pasada final de QA visual en desktop y mobile;
- hay detalles tecnicos menores por pulir, como consistencia visual, proporciones y posibles puntos de friccion del template;
- el formulario/contacto sigue siendo funcional para inicio de relacion, pero no representa todavia un workflow operativo completo de lead handling.

## Lo Que Falta Cerrar Para Una Version Profesional

### Fase De Cierre Inmediato

- reforzar el hero y la jerarquia de confianza del Home;
- terminar de ordenar Servicios para que mantenimiento sea dominante y capacidades actuen como respaldo;
- hacer que Certificaciones se lea como prueba institucional, no solo como lista de archivos;
- dejar Contacto totalmente consistente con el correo administrable;
- revisar Proyectos como portafolio de confianza y no solo como inventario de casos.

### Fase De Evidencia Real

- subir o curar certificados reales;
- seleccionar fotos publicables de instalaciones, equipo y trabajos;
- homologar proyectos con evidencia real y copy corto pero creible;
- definir que PDFs o imagenes deben vivir en el admin y cuales en repositorio o storage externo.

### Fase De Cierre Operativo

- dejar una politica editorial clara;
- definir responsables de actualizacion por tipo de contenido;
- establecer checklist de QA antes de publicar;
- documentar el flujo de cambios para que futuros agentes no improvisen.

## Roadmap Recomendado

### Fase 1. Cierre Del Espanol

Objetivo:

Dejar una version aprobable en espanol, coherente y profesional.

Entregables:

- Home afinado;
- Servicios afinado;
- Certificaciones afinado;
- Contacto afinado;
- metadata base revisada;
- CTA por correo consistente en todo el sitio.

Criterio de salida:

- el sitio ya puede mostrarse como marca real sin pedir disculpas por contenido demo.

### Fase 2. Evidencia Y Respaldo

Objetivo:

Transformar el sitio en una vitrina de confianza con pruebas visibles.

Entregables:

- certificados visibles y ordenados;
- proyectos con mejor evidencia;
- fotos seleccionadas de taller, equipo e instalaciones;
- consolidacion del mensaje de seriedad y certificacion.

Criterio de salida:

- el visitante entiende no solo que la empresa dice tener capacidad, sino que puede verificarla.

### Fase 3. Gobernanza De Contenido

Objetivo:

Evitar que el sitio vuelva a degradarse por cambios sin criterio.

Entregables:

- matriz de contenido editable vs bloqueado;
- fallback rules para correo, telefonos, logos, certificados y proyectos;
- checklist de publicacion;
- handoff formal para agentes.

Criterio de salida:

- cualquier nuevo agente puede trabajar sin reabrir decisiones cerradas.

### Fase 4. Ingles

Objetivo:

Construir la capa en ingles sobre una base ya aprobada en espanol.

Entregables:

- arquitectura de rutas bilingues;
- traduccion profesional y no literal;
- metadata y QA equivalentes por idioma.

Criterio de salida:

- el ingles hereda una base madura en lugar de nacer desde una capa inestable.

## Matriz De Prioridad

### Alta

- Home
- Servicios
- Certificaciones
- Contacto
- integracion de evidencia real
- gobernanza editorial minima

### Media

- Proyectos con mejor curacion
- SEO fino
- checklist QA

### Baja

- automatizaciones extra
- mejoras cosmeticas no esenciales
- ingles, hasta aprobar espanol

## Reglas De Arquitectura Y Contenido

- no tocar el texto institucional bloqueado sin aprobacion;
- no introducir copy demo nuevo;
- no abrir ingles antes de aprobar espanol;
- no usar la web publicada como fuente primaria;
- no hardcodear datos operativos que deban vivir en Payload si ya existe punto administrable;
- cualquier cambio que afecte confianza, servicios o certificaciones debe documentarse primero.

## Mapa De Delegacion Para Agentes

### Agente Arquitecto / Analista Senior

Responsabilidad:

- consolidar alcance final del sitio;
- cerrar matriz de contenido;
- definir editable vs bloqueado;
- validar dependencias entre frontend, Payload, assets y SEO.

Salida esperada:

- decision log;
- matriz de gobernanza;
- backlog priorizado por impacto y riesgo.

### Agente Frontend

Responsabilidad:

- pulir Home, Servicios, Certificaciones y Contacto;
- revisar consistencia visual;
- mejorar jerarquia de CTA y lectura mobile;
- corregir detalles visuales del template.

Salida esperada:

- interfaz mas sobria, clara y profesional;
- estilos y secciones alineados al mensaje institucional.

### Agente Payload / CMS

Responsabilidad:

- cerrar campos administrables reales;
- revisar globals, fallbacks y fuentes de contenido;
- preparar carga estable de certificados, correo y bloques clave.

Salida esperada:

- admin util de verdad para contenido sensible;
- menos hardcode y menos riesgo de incoherencia.

### Agente SEO / QA

Responsabilidad:

- revisar metadata;
- revisar headings, enlaces y coherencia semantica;
- ejecutar QA manual en rutas clave;
- detectar texto flojo, repeticion o claims sin soporte.

Salida esperada:

- sitio listo para publicacion sin errores obvios de SEO tecnico o editorial.

## Prompts Base Para Delegacion

### Prompt Para Arquitecto

Trabaja sobre `amazon-service-payload` como arquitecto de software y analista senior. Usa `docs/12`, `docs/13`, `docs/14` y `docs/15` como fuente de verdad. No reabras decisiones ya cerradas. Define la matriz final de contenido editable vs bloqueado, riesgos del flujo actual y backlog priorizado para cerrar la web de Amazon Aviation Service con foco en seriedad, certificacion, correo como CTA y espanol como fase actual.

### Prompt Para Frontend

Trabaja sobre `amazon-service-payload` con foco en `Home`, `Servicios`, `Certificaciones` y `Contacto`. No abras ingles, no introduzcas copy demo y no toques el texto institucional bloqueado. Mejora jerarquia, claridad, confianza visual y consistencia de CTA por correo. Documenta todo cambio relevante antes de cerrar.

### Prompt Para Payload

Revisa la capa CMS de `amazon-service-payload` para asegurar que correo, certificados y contenido estrategico sigan una politica clara de administracion. No rompas los fallbacks actuales. Documenta campos, globals y reglas de publicacion que deben quedar estables para futuras iteraciones.

### Prompt Para SEO / QA

Audita `Home`, `Nosotros`, `Servicios`, `Proyectos`, `Certificaciones` y `Contacto` en `amazon-service-payload`. Evalua metadatos, headings, consistencia semantica, enlaces, claridad comercial y coherencia editorial. No propongas crecer el alcance; enfocate en detectar brechas que afecten una entrega profesional inmediata.

## Proximo Paso Recomendado

No seguir modificando por intuicion.

La secuencia correcta ahora es:

1. aprobar este roadmap;
2. ejecutar una pasada final de cierre en espanol;
3. integrar evidencia real;
4. cerrar gobernanza de contenido;
5. recien despues abrir ingles.
