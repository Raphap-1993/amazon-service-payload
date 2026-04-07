# 00. Project Brief

## Resumen ejecutivo

Se propone un starter reusable por clonación para webs corporativas con contenido editable, panel administrativo simple y un módulo público especial orientado al negocio. La base técnica se construirá con Next.js + Payload CMS + PostgreSQL, manteniendo una sola aplicación y una arquitectura mínima viable para acelerar implementación, reducir divergencia técnica y facilitar mantenimiento.

## Contexto del proyecto

- Cliente: `[NOMBRE TEMPORAL DEL CLIENTE]`
- Rubro: `[RUBRO TEMPORAL]`
- Dominio: `placeholder.local`
- Tipo de solución: web corporativa informativa + panel administrativo simple
- Módulo público especial: `pendiente, dejar estructura reusable`
- Descripción del módulo especial: `placeholder funcional hasta definir el caso real del negocio`

## Estado actual de fase

- Etapa preparatoria del repo: completada.
- `Fase 0. Discovery y definición`: cerrada con placeholders temporales autorizados.
- `Fase 1. Bootstrap técnico`: abierta.
- Criterio operativo vigente: el bootstrap actual es válido para base técnica local, pero el módulo especial y el contenido definitivo siguen pendientes de definición real.

## Objetivo del negocio

- Publicar una presencia web profesional y administrable.
- Permitir actualización de contenidos sin dependencia continua de desarrollo.
- Incluir un módulo público diferenciador que responda a una necesidad concreta del negocio.
- Reutilizar la base técnica en futuros clientes con cambios controlados de branding, contenido y reglas del módulo especial.

## Alcance

- Sitio público con páginas base: Home, Nosotros, Servicios y Contacto.
- Panel admin en Payload para contenido, media, servicios y módulo especial.
- Integración Next.js + Payload en una sola unidad desplegable.
- PostgreSQL como única base de datos.
- Storage local de media en VPS.
- Base preparada para SEO técnico y contenidos reutilizables.
- Preparación documental, organizativa y de orquestación del repo.

## Exclusiones

- Multitenancy.
- Microservicios.
- Arquitectura enterprise innecesaria.
- Doble modelado ORM con una capa manual adicional de Drizzle.
- Automatizaciones complejas de marketing, CRM o ERP.
- App móvil o backoffice separado del admin de Payload.

## Stack definido

- Next.js
- Payload CMS
- PostgreSQL
- Payload Postgres adapter
- Drizzle solo a través de Payload
- TypeScript
- TailwindCSS
- PM2
- Nginx
- Storage local en VPS

## Supuestos iniciales

- El repositorio se usará como starter por clonación y personalización, no como plataforma multiempresa.
- El módulo público especial tendrá complejidad baja o media y podrá resolverse dentro del mismo runtime de la app.
- El cliente administrará contenido editorial y activos media desde Payload.
- El volumen de tráfico y media no exige object storage desde el día uno.

## Riesgos

- Definir tarde las reglas exactas del módulo especial puede afectar modelo de datos, SEO y UX.
- Si no se fijan naming conventions desde el inicio, el starter pierde reutilización real.
- Migrar luego a object storage o colas puede requerir ajustes si hoy se mezclan responsabilidades.
- Un exceso de flexibilidad en bloques o schemas puede generar sobreingeniería.
- Falta de criterios de contenido y SEO tempranos puede retrasar salida a producción.

## Fases recomendadas

- Etapa preparatoria del repo: documentación base, agentes, skills y estrategia de orquestación.
0. Discovery y aterrizaje del MVP.
1. Bootstrap del proyecto y configuración base del stack.
2. Modelado CMS y panel administrativo.
3. Frontend público y composición de páginas.
4. Implementación del módulo público especial.
5. SEO, QA, smoke tests y endurecimiento.
6. Deploy en VPS y checklist de salida.
