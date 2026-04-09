# 10. Local Runtime Stability

## Causa raíz

La inestabilidad local no venía del frontend nuevo, sino del runtime base:

- el repo declaraba `engines.node < 23`, pero `.nvmrc` apuntaba a `22`;
- la sesión local estaba corriendo con Node `22.22.2`;
- `pnpm dev` usaba `next dev --webpack`, que mostraba timeouts intermitentes en la primera compilación de rutas;
- `pnpm build` estaba limitado a `NODE_OPTIONS=--max-old-space-size=1024`, un valor demasiado bajo para Next 16 + Payload + admin;
- `payload.config.ts` y varios archivos del perímetro CMS no eran importables de forma consistente fuera del bundler por resolución ESM deficiente.

## Causa confirmada

Se confirmó lo siguiente:

- con Node `22.22.2`, el entorno era inconsistente para este repo;
- con Node `20.20.2`, `next dev` levantó estable y respondió `200` en `/` y `/admin`;
- con Node `20.20.2`, `next build` completó correctamente;
- el primer request en frío sigue tardando porque Payload hace `Pulling schema from database`, pero después responde con normalidad.

## Cambios aplicados

- `.nvmrc` actualizado a `20.20.2`;
- `package.json` ajustado para exigir Node `<21`;
- `package.json` ajustado a `next dev` en vez de `next dev --webpack`;
- `package.json` ajustado a `NODE_OPTIONS=--max-old-space-size=4096 next build`;
- `payload.config.ts` actualizado a imports explícitos `.ts` para el perímetro del CMS;
- collections y globals cargados por Payload actualizados para usar imports relativos compatibles con ESM fuera del bundler;
- `scripts/patch-runtime-deps.mjs` incorporado para aplicar workarounds idempotentes a `undici` y al bin de Payload durante `postinstall`;
- `tsconfig.json` actualizado con `allowImportingTsExtensions`.

## Pasos correctos de arranque

### Camino recomendado

1. usar Node `20.20.2`;
2. preparar variables locales:

```bash
cp .env.example .env
```

3. levantar PostgreSQL:

```bash
pnpm docker:up
```

4. instalar dependencias:

```bash
pnpm install
```

5. arrancar desarrollo:

```bash
pnpm dev
```

6. validar producción local:

```bash
pnpm build
```

### Si todavía no tienes Node 20 instalado

Se puede validar de forma temporal con:

```bash
npx -y node@20 $(which pnpm) install --frozen-lockfile
npx -y node@20 $(which pnpm) dev
npx -y node@20 $(which pnpm) build
```

## Validación real

- `pnpm docker:up`: correcto
- `pnpm docker:ps`: PostgreSQL `healthy`
- `npx -y node@20 $(which pnpm) install --frozen-lockfile`: correcto
- `npx -y node@20 $(which pnpm) dev`: correcto
- `GET /`: `200 OK`
- `GET /admin`: `200 OK`
- `npx -y node@20 $(which pnpm) build`: correcto
- `pnpm generate:types`: correcto

## Riesgos residuales

- la primera respuesta en frío puede tardar varios segundos por el `schema pull` inicial del adapter Postgres.

## Conclusión operativa

El proyecto quedó estable para desarrollo local y build siempre que se use Node 20. El bloqueo principal no era el frontend ni Payload como producto, sino la combinación de:

- Node incorrecto,
- modo `dev` menos estable,
- límite de memoria demasiado bajo para `build`.
