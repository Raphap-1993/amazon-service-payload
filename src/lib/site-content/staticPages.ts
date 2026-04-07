import type { Metadata } from 'next'

import type { LinkData } from '@/lib/home/types'

type SimpleCard = {
  bullets?: string[]
  description: string
  link?: LinkData
  meta?: string
  title: string
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://placeholder.local:3000'
const siteUrl = /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`
const metadataBase = new URL(siteUrl)

function buildMetadata(title: string, description: string, path: string): Metadata {
  const pageUrl = new URL(path, metadataBase).toString()

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'es_PE',
      siteName: 'Amazon Aviation Service',
      title,
      description,
      url: pageUrl,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const staticPages = {
  services: {
    metadata: buildMetadata(
      'Servicios de mantenimiento y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
      'Inspeccion programada, mantenimiento preventivo y reparacion de aeronaves en Pucallpa. Revisa servicios, proyectos y certificaciones de Amazon Aviation Service.',
      '/servicios',
    ),
    hero: {
      eyebrow: 'Servicios aeronauticos',
      title: 'Servicios orientados a disponibilidad, seguridad y continuidad operacional.',
      description:
        'Amazon Aviation Service atiende mantenimiento, inspeccion y reparacion de aeronaves desde Pucallpa con una propuesta centrada en capacidad tecnica, trazabilidad y respaldo regulatorio visible. Si quieres ampliar contexto, revisa proyectos y certificaciones antes de contactar.',
      actions: [
        { label: 'Solicitar cotizacion', href: '/contacto', variant: 'primary' as const },
        { label: 'Ver certificaciones', href: '/certificaciones', variant: 'secondary' as const },
      ],
      badges: ['OMA N°078', 'Pucallpa · Ucayali', 'RAP 145 / 43 / 65'],
    },
    coreServices: [
      {
        title: 'Inspeccion programada y no programada',
        meta: 'Inspeccion',
        description:
          'Se ejecutan inspecciones tecnicas alineadas con la lista de capacidades visible y con referencias regulatorias para operadores que necesitan control, diagnostico y trazabilidad.',
      },
      {
        title: 'Reparacion de aeronaves',
        meta: 'Reparacion',
        description:
          'La propuesta combina mantenimiento rutinario, correcciones estructurales y trabajos de reparacion con enfoque en integridad, disponibilidad y documentacion tecnica.',
      },
      {
        title: 'Mantenimiento preventivo',
        meta: 'Prevencion',
        description:
          'Inspecciones regulares, ajustes, calibraciones y reemplazo proactivo de componentes para reducir indisponibilidad y proteger el rendimiento operativo.',
      },
    ] satisfies SimpleCard[],
    capabilities: [
      'Mantenimiento de linea',
      'Cumplimiento de ADs, SBs y SLs',
      'Cumplimiento de CAPs',
      'Reparacion estructural mayor',
      'Inspeccion de zona caliente e inspeccion boroscopica',
      'Remocion e instalacion de motor',
    ],
    differentiators: [
      {
        title: 'Respuesta tecnica clara',
        description:
          'Cada solicitud puede orientarse con un punto de partida claro: tipo de aeronave, necesidad principal, prioridad operativa y siguiente paso comercial.',
      },
      {
        title: 'Soporte documentado',
        description:
          'La propuesta comercial se apoya en capacidad regulada, lista de alcances y experiencia operativa demostrable.',
      },
      {
        title: 'Alcance regional con lectura nacional',
        description:
          'La base operativa esta en Pucallpa, con una propuesta de servicios entendible para operadores que buscan soporte tecnico en la region y en el mercado peruano.',
      },
    ] satisfies SimpleCard[],
  },
  about: {
    metadata: buildMetadata(
      'Nosotros y capacidad tecnica en Pucallpa | Amazon Aviation Service',
      'Conoce el perfil corporativo, la base en Pucallpa, las habilitaciones y el respaldo regulatorio de Amazon Aviation Service antes de revisar servicios y certificaciones.',
      '/nosotros',
    ),
    hero: {
      eyebrow: 'Nosotros',
      title: 'Una operacion tecnica regulada, con liderazgo visible y capacidad real en Pucallpa.',
      description:
        'Amazon Aviation Service se presenta como una organizacion seria, regulada y confiable, apoyada en OMA 078, sistema de calidad, liderazgo visible y habilitaciones tecnicas documentadas. Antes de tomar una decision, revisa servicios, proyectos y certificaciones.',
      actions: [
        { label: 'Ver certificaciones', href: '/certificaciones', variant: 'primary' as const },
        { label: 'Contactar al equipo', href: '/contacto', variant: 'secondary' as const },
      ],
      badges: ['OMA N°078', 'DGAC', 'Base operativa en Pucallpa'],
    },
    profile: [
      'Amazon Aviation Service S.A.C. es una organizacion de mantenimiento aprobada por la DGAC con OMA N°078 y base operativa en Yarinacocha, Pucallpa.',
      'Su propuesta de valor combina mantenimiento, inspeccion y reparacion con foco en seguridad operacional, trazabilidad y calidad verificable.',
    ],
    leadership: [
      {
        title: 'Rudolf Wiedler Eberli',
        meta: 'Fundador',
        description:
          'Especialista tecnico con trayectoria en mantenimiento, reparaciones estructurales, motores y soldadura, con una presencia clave en la base tecnica de la marca.',
      },
      {
        title: 'Nayra Saavedra Alvis',
        meta: 'Gerente Responsable',
        description:
          'Figura de direccion y continuidad institucional, vinculada al orden regulatorio, la certificacion DGAC y la conduccion operativa del negocio.',
      },
    ] satisfies SimpleCard[],
    qualityBlocks: [
      {
        title: 'Sistema de gestion de calidad',
        description:
          'La empresa comunica control de mantenimiento, inspeccion y buenas practicas de aeronavegabilidad bajo referencias RAP 145.340 y 145.400.',
      },
      {
        title: 'Experiencia y especializacion',
        description:
          'La experiencia visible abarca reparaciones, alteraciones, pintura, soldadura y fabricacion de componentes estructurales.',
      },
      {
        title: 'Pilares operativos',
        description:
          'Personal capacitado, informacion tecnica actualizada, herramientas y una infraestructura alineada al trabajo tecnico.',
      },
    ] satisfies SimpleCard[],
    certifications: [
      'Reparacion estructural mayor',
      'Pruebas no destructivas por liquidos penetrantes',
      'Inspeccion de zona caliente (HSI)',
      'Inspeccion boroscopica',
      'Remocion e instalacion de motor',
      'Soldadura autogena y electrica',
      'Ensamblaje de mangueras flexibles y cables de control',
      'Pintura de aeronave, componentes y otros',
      'Desarmado y armado de ruedas',
    ],
    missionVision: [
      {
        title: 'Mision',
        description:
          'Proveer mantenimiento aeronautico de primer nivel con experiencia, calidad tecnica y estandares rigurosos.',
      },
      {
        title: 'Vision',
        description:
          'Sostener una operacion de mantenimiento aeronautico de excelencia, con precision y compromiso con la seguridad.',
      },
    ] satisfies SimpleCard[],
  },
  projects: {
    metadata: buildMetadata(
      'Proyectos de mantenimiento y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
      'Revisa proyectos y trabajos realizados por Amazon Aviation Service en inspeccion, reparacion estructural y mantenimiento aeronautico en Pucallpa. Si buscas un servicio similar, ve a servicios o contacto.',
      '/proyectos',
    ),
    hero: {
      eyebrow: 'Proyectos',
      title: 'Casos reales que convierten capacidad tecnica en confianza visible.',
      description:
        'Los proyectos presentados muestran experiencia de trabajo, etapas ejecutadas y evidencia operativa para una lectura comercial mas confiable y mejor sustentada. Complementa esta pagina con servicios y certificaciones.',
      actions: [
        { label: 'Solicitar referencia', href: '/contacto', variant: 'primary' as const },
        { label: 'Ver servicios', href: '/servicios', variant: 'secondary' as const },
      ],
      badges: ['Casos reales', 'Evidencia operativa', 'Taller y campo'],
    },
    intro: [
      'Los proyectos documentados prueban la ejecucion real sobre aeronaves y operadores concretos.',
      'El portafolio funciona como soporte tecnico y comercial para consultas nuevas.',
    ],
    cases: [
      {
        title: 'Pilatus Porter FAP-331',
        meta: 'Caso documentado',
        description: 'Trabajo documentado desde ingreso a OMA hasta culminacion de labores.',
        bullets: ['Ingreso a OMA', 'Decapado', 'Trabajos', 'Culminacion de trabajo'],
      },
      {
        title: 'Cessna P206 PNP-251',
        meta: 'Caso documentado',
        description: 'Caso con etapas tecnicas claras y trazabilidad por secuencia de trabajo.',
        bullets: ['Ingreso a OMA', 'Decapado', 'Trabajos', 'Culminacion de trabajo'],
      },
      {
        title: 'Reparacion estructural PNP-257',
        meta: 'Caso documentado',
        description: 'Evidencia de ejecucion enfocada en trabajo estructural mayor.',
        bullets: ['Trabajos realizados', 'Trabajo culminado'],
      },
      {
        title: 'Amazon Flight School',
        meta: 'Caso documentado',
        description: 'Proyecto con secuencia operativa visible y soporte de taller.',
        bullets: ['Ingreso a OMA', 'Decapado', 'Trabajos'],
      },
      {
        title: 'Ejercito del Peru - EP 811',
        meta: 'Caso documentado',
        description: 'Caso institucional que refuerza capacidad de ejecucion y disciplina operativa.',
        bullets: ['Ingreso a OMA', 'Trabajos', 'Culminado'],
      },
      {
        title: 'Aero Andino Survey y Air Majoro',
        meta: 'Casos documentados',
        description: 'Proyectos sobre Pilatus Porter, Skymaster y trabajos de reparacion.',
        bullets: ['Ingreso a OMA', 'Trabajos', 'Culminacion o reparaciones'],
      },
    ] satisfies SimpleCard[],
  },
  certifications: {
    metadata: buildMetadata(
      'Certificaciones DGAC y OMA N°078 en Pucallpa | Amazon Aviation Service',
      'Consulta el certificado OMA N°078, la lista de capacidades y los documentos de respaldo tecnico de Amazon Aviation Service. Si quieres avanzar, revisa servicios o contacto.',
      '/certificaciones',
    ),
    hero: {
      eyebrow: 'Certificaciones',
      title: 'Respaldo documental y regulatorio visible para una decision con menos riesgo.',
      description:
        'La certificacion OMA, la lista de capacidades y los documentos asociados ofrecen una base visible para validar el alcance tecnico y reducir incertidumbre al momento de contactar. Vincula esta lectura con servicios y proyectos.',
      actions: [
        { label: 'Abrir contacto', href: '/contacto', variant: 'primary' as const },
        { label: 'Volver a servicios', href: '/servicios', variant: 'secondary' as const },
      ],
      badges: ['OMA N°078', 'DGAC', 'PDFs disponibles'],
    },
    intro: [
      'La documentacion visible confirma la certificacion OMA N°078 y la existencia de una lista de capacidades asociada.',
      'El alcance presentado se mantiene dentro de los documentos reales accesibles desde esta web.',
    ],
    documents: [
      {
        title: 'Certificado OMA N°078',
        meta: 'Documento regulatorio',
        description:
          'Acredita a la organizacion ante la DGAC y funciona como la pieza principal de validacion para visitantes y operadores.',
        link: {
          label: 'Ver PDF',
          href: 'https://amazonaviationservice.com/wp-content/uploads/2024/09/Certificado-OMA-N%C2%B0078.pdf',
          variant: 'secondary',
        },
      },
      {
        title: 'Lista de capacidades OMA 78',
        meta: 'Documento regulatorio',
        description:
          'Relaciona habilitaciones y limitaciones visibles para mantenimiento e inspeccion.',
        link: {
          label: 'Abrir PDF',
          href: 'https://amazonaviationservice.com/wp-content/uploads/2024/09/OMA_78_Lista_de_Capacidades.pdf',
          variant: 'secondary',
        },
      },
      {
        title: 'Capacidades UFA',
        meta: 'Documento complementario',
        description:
          'Soporte documental complementario relacionado con el alcance tecnico visible.',
        link: {
          label: 'Revisar PDF',
          href: 'https://amazonaviationservice.com/wp-content/uploads/2024/11/lista-de-capacidades.pdf',
          variant: 'secondary',
        },
      },
    ] satisfies SimpleCard[],
    guardrails: [
      'El alcance operativo debe revisarse junto a la lista de capacidades vigente.',
      'La informacion presentada se limita a documentos y referencias visibles.',
      'Los documentos se presentan con lenguaje tecnico y respaldo verificable.',
    ],
  },
  contact: {
    metadata: buildMetadata(
      'Contacto para mantenimiento y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
      'Solicita informacion o cotizacion para mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa, Ucayali. Revisa servicios, proyectos y certificaciones antes de enviar tu consulta.',
      '/contacto',
    ),
    hero: {
      eyebrow: 'Contacto',
      title: 'Un canal comercial y tecnico claro para operadores que necesitan respuesta.',
      description:
        'El contacto esta pensado para cotizaciones, consultas tecnicas y coordinacion inicial desde Pucallpa, con una presentacion clara y empresarial. Si estas evaluando una solicitud, revisa servicios y certificaciones primero.',
      actions: [
        {
          label: 'Escribir por correo',
          href: 'mailto:aasperu@amazonaviationservice.com',
          variant: 'primary' as const,
        },
        { label: 'Llamar ahora', href: 'tel:+51952633100', variant: 'secondary' as const },
      ],
      badges: ['Respuesta tecnica', 'Pucallpa', 'Canales directos'],
    },
    contactCards: [
      {
        title: 'Correo comercial',
        meta: 'Email',
        description: 'aasperu@amazonaviationservice.com',
        link: {
          label: 'Enviar correo',
          href: 'mailto:aasperu@amazonaviationservice.com',
          variant: 'secondary',
        },
      },
      {
        title: 'Telefonos',
        meta: 'Llamadas',
        description: '+51 952633100 / +51 945266795',
        link: {
          label: 'Llamar',
          href: 'tel:+51952633100',
          variant: 'secondary',
        },
      },
      {
        title: 'Base operativa',
        meta: 'Ubicacion',
        description: 'Av. El Triunfo Mz. C Lt. 1, Yarinacocha - Pucallpa - Peru',
        link: {
          label: 'Ver mapa',
          href: 'https://www.google.com/maps/search/?api=1&query=Av.+El+Triunfo+Mz.+C+Lt.+1,+Yarinacocha,+Pucallpa,+Peru',
          variant: 'secondary',
        },
      },
    ] satisfies SimpleCard[],
    notes: [
      'Comparte el modelo o tipo de aeronave para orientar mejor la primera respuesta.',
      'Indica si la necesidad es inspeccion, mantenimiento o reparacion, y el nivel de urgencia.',
      'Agrega ubicacion, telefono y una breve descripcion del requerimiento tecnico.',
    ],
  },
}
