# Estructura objetivo de `src`

```text
src/
  app/
    (frontend)/
    api/
  collections/
  globals/
  blocks/
  components/
  lib/
  types/
```

## Intención de cada carpeta

- `app/(frontend)`: rutas públicas y composición visual.
- `app/api`: endpoints propios del proyecto.
- `collections`: definiciones de collections de Payload.
- `globals`: definiciones de globals de Payload.
- `blocks`: bloques reutilizables de contenido.
- `components`: componentes de UI y composición.
- `lib`: utilidades de dominio, integración y helpers.
- `types`: tipos compartidos.

## Regla de diseño

El código debe favorecer claridad de lectura y alineación con Payload, evitando capas artificiales o duplicación de contratos.

