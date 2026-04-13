# 16. Phase 1 Spanish Closure

## Objetivo de esta fase

Cerrar una primera pasada seria sobre `Home`, `Servicios`, `Certificaciones` y `Contacto` sin abrir ingles ni reabrir decisiones de alcance ya cerradas.

## Cambios aplicados

### Home

- se reforzo el topbar para comunicar OMA N°078, Pucallpa y el caracter institucional del servicio;
- se reescribio el hero para priorizar mantenimiento, inspeccion y reparacion con una narrativa mas institucional;
- se agregaron slides curatoriales al hero para evitar una lectura generica o demasiado automatica;
- se ajustaron trust items, stats, CTA banner y bloque de certificaciones para que la propuesta de valor se lea con mas confianza y menos relleno.

### Servicios

- se afino la metadata SEO de la pagina;
- se mejoro el hero para que hable de mantenimiento como frente principal;
- se reemplazo copy autorreferencial de la pagina por una lectura mas comercial y tecnica;
- se reforzo la relacion entre mantenimiento, inspeccion, reparacion y capacidades publicadas.

### Certificaciones

- se afino la metadata SEO de la pagina;
- se fortalecio la lectura institucional del hero;
- se mejoraron introducciones, guardrails y explicaciones para que la pagina se lea como prueba y no como simple lista de PDFs;
- se reforzo el cierre de CTA por correo con mejor contexto.

### Contacto

- se afino la metadata SEO de la pagina;
- se elimino lenguaje interno tipo `Backoffice` visible para usuario final;
- se hizo que el formulario utilice `formTitle` y `formDescription` ya presentes en la capa de datos;
- se agrego el campo `Tipo de aeronave`;
- se mejoro la estructura del correo generado por `mailto`;
- se corrigio el `tel:` por defecto para que use un telefono valido aun cuando el texto visible contenga dos numeros.

## Validacion realizada

- `pnpm exec tsc --noEmit -p tsconfig.json` paso correctamente.

## Riesgos o limites observados

- la validacion HTTP desde este sandbox fue inestable durante el hot reload de `next dev`;
- el servidor local aparece vivo, pero no todas las consultas por `curl` respondieron de forma consistente desde este entorno;
- por eso, la validacion fuerte de esta fase se apoya en compilacion limpia y en la estructura de codigo ya revisada.

## Lo siguiente correcto

1. revisar visualmente la web local en desktop y mobile;
2. ajustar detalles finos de jerarquia o tono que se detecten en esa revision;
3. entrar a Fase 2 con evidencia real: certificados, proyectos, equipo e instalaciones;
4. no abrir ingles hasta aprobar la capa en espanol.
