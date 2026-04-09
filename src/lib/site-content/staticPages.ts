import type { Metadata } from 'next'

import type { LinkData } from '@/lib/home/types'
import { getMetadataBase } from '@/lib/site-config'

type SimpleCard = {
  bullets?: string[]
  description: string
  link?: LinkData
  meta?: string
  title: string
}

const metadataBase = getMetadataBase()

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
      'Servicios aeronauticos y mantenimiento de aeronaves en Pucallpa | Amazon Aviation Service',
      'Mantenimiento de aeronaves, inspeccion tecnica, reparacion y capacidades certificadas con respaldo OMA N°078 en Pucallpa. Revisa servicios, proyectos y certificaciones de Amazon Aviation Service.',
      '/servicios',
    ),
    hero: {
      eyebrow: 'Servicios aeronauticos',
      title: 'Mantenimiento de aeronaves como eje principal, con inspeccion, reparacion y soporte tecnico certificado.',
      description:
        'Amazon Aviation Service atiende mantenimiento, inspeccion y reparacion de aeronaves desde Pucallpa con una propuesta centrada en capacidad tecnica, trazabilidad documental y respaldo regulatorio visible. La empresa trabaja para FAP del Peru y entidades privadas con lectura regional y nacional.',
      actions: [
        { label: 'Escribir por correo', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'primary' as const },
        { label: 'Ver certificaciones', href: '/certificaciones', variant: 'secondary' as const },
      ],
      badges: ['OMA N°078', 'Pucallpa · Ucayali', 'Amazonia peruana'],
    },
    coreServices: [
      {
        title: 'Mantenimiento de aeronaves',
        meta: 'Mantenimiento',
        description:
          'Servicio principal orientado a conservar la aeronave en condiciones operativas seguras, con continuidad tecnica, control documental y soporte de taller.',
      },
      {
        title: 'Inspeccion programada y no programada',
        meta: 'Inspeccion',
        description:
          'Inspecciones tecnicas alineadas con la lista de capacidades y con referencias regulatorias para diagnostico, seguimiento y control documental.',
      },
      {
        title: 'Reparacion de aeronaves',
        meta: 'Reparacion',
        description:
          'Trabajos de mantenimiento correctivo y reparacion con foco en integridad estructural, disponibilidad y ejecucion tecnica ordenada.',
      },
      {
        title: 'Cumplimiento tecnico y documental',
        meta: 'Soporte',
        description:
          'Acompanamiento en capacidades visibles, referencias RAP y documentacion tecnica para sostener una operacion clara, verificable y lista para auditoria.',
      },
    ] satisfies SimpleCard[],
    capabilities: [
      'Mantenimiento de linea',
      'Cumplimiento de ADs, SBs y SLs',
      'Cumplimiento de CAPs',
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
    differentiators: [
      {
        title: 'Operacion certificada',
        description:
          'La propuesta comercial se apoya en OMA N°078, lista de capacidades visible y una narrativa coherente con el trabajo aeronautico regulado.',
      },
      {
        title: 'Atencion a cliente publico y privado',
        description:
          'La comunicacion apunta a FAP del Peru y entidades privadas que valoran claridad tecnica, disponibilidad y continuidad de servicio.',
      },
      {
        title: 'Amazonia peruana como territorio de marca',
        description:
          'La base operativa esta en Pucallpa, con una lectura regional que ayuda a posicionar la empresa en la Amazonia peruana sin perder alcance nacional.',
      },
    ] satisfies SimpleCard[],
  },
  about: {
    metadata: buildMetadata(
      'Nosotros y respaldo institucional en Pucallpa | Amazon Aviation Service',
      'Conoce el perfil corporativo, la base en Pucallpa, las habilitaciones y el respaldo regulatorio de Amazon Aviation Service antes de revisar servicios y certificaciones.',
      '/nosotros',
    ),
    hero: {
      eyebrow: 'Nosotros',
      title: 'Seriedad, certificacion y continuidad operativa desde Pucallpa.',
      description:
        'Amazon Aviation Service se presenta como una organizacion tecnica seria, regulada y confiable, apoyada en OMA N.° 078, liderazgo visible y habilitaciones documentadas. Antes de tomar una decision, revisa servicios, proyectos y certificaciones.',
      actions: [
        { label: 'Ver certificaciones', href: '/certificaciones', variant: 'primary' as const },
        { label: 'Escribir por correo', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'secondary' as const },
      ],
      badges: ['OMA N°078', 'DGAC', 'Base operativa en Pucallpa'],
    },
    profile: [
      'Amazon Aviation Service S.A.C. es una Organizacion de Mantenimiento Aeronautico certificada por la DGAC (OMA N.° 078), con base principal en Pucallpa, dedicada al mantenimiento de aeronaves conforme a los estandares tecnicos y regulatorios vigentes.',
      'La empresa fue fundada por el Sr. Rudolf Wiedler Eberli, especialista en mantenimiento aeronautico con amplia experiencia y licencias internacionales, quien contribuyo a la consolidacion tecnica del taller.',
      'Este proyecto fue desarrollado a nivel familiar y empresarial, logrando la certificacion como Organizacion de Mantenimiento Aeronautico (OMA N.° 078).',
      'Actualmente, la empresa se encuentra bajo la direccion de Nayra Saavedra Alvis Vda. de Wiedler, abogada con amplia experiencia en temas aeronauticos, quien ha asumido la gestion y conduccion de la organizacion, participando en el proceso de certificacion ante la DGAC y garantizando la continuidad operativa, el cumplimiento normativo y el fortalecimiento institucional.',
      'La empresa cuenta con un equipo de tecnicos altamente calificados y en constante capacitacion, lo que permite asegurar la prestacion de servicios confiables y seguros, con proyeccion de crecimiento y participacion en el desarrollo de la aviacion a nivel regional y nacional.',
    ],
    leadership: [
      {
        title: 'Rudolf Wiedler Eberli',
        meta: 'Fundador',
        description:
          'Especialista tecnico con trayectoria en mantenimiento aeronautico y consolidacion del taller como base de trabajo certificada.',
      },
      {
        title: 'Nayra Saavedra Alvis Vda. de Wiedler',
        meta: 'Direccion',
        description:
          'Responsable de la continuidad institucional, el cumplimiento normativo y la conduccion de la organizacion ante la DGAC.',
      },
    ] satisfies SimpleCard[],
    qualityBlocks: [
      {
        title: 'Sistema de gestion de calidad',
        description:
          'Cuenta con un Sistema de Gestion de Calidad que articula mantenimiento e inspeccion para asegurar buenas practicas de mantenimiento y aeronavegabilidad, de acuerdo con las referencias RAP 145.340 y 145.400.',
      },
      {
        title: 'Nuestro personal',
        description:
          'Cuenta con un equipo de profesionales altamente capacitados en diversas areas del mantenimiento aeronautico, comprometidos con la seguridad y la excelencia en la aviacion civil. El personal participa en programas de capacitacion continua y actualizacion tecnica para mantenerse al dia con la evolucion tecnologica y los estandares del sector.',
      },
      {
        title: 'Nuestros pilares',
        description:
          'La operacion se sostiene sobre personal capacitado y con experiencia, informacion tecnica actualizada y equipos y herramientas alineados al trabajo tecnico.',
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
          'Proveer un servicio de mantenimiento aeronautico de primer nivel, respaldado por experiencia y calidad tecnica avanzada, con estandares rigurosos y una garantia integral en cada mantenimiento. Nos especializamos en la aplicacion de procedimientos tecnicos precisos y el uso de componentes certificados, asegurando la maxima confiabilidad y rendimiento de las aeronaves a nuestro servicio.',
      },
      {
        title: 'Vision',
        description:
          'Nuestra vision es ofrecer un mantenimiento aeronautico de excelencia, combinando garantia, experiencia y calidad tecnica avanzada con precision y un firme compromiso con la seguridad. Buscamos cumplir con los mas altos estandares de la industria para asegurar un rendimiento y confiabilidad superior con el objetivo de ser lideres en el sector aeronautico.',
      },
    ] satisfies SimpleCard[],
  },
  projects: {
    metadata: buildMetadata(
      'Proyectos de mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
      'Revisa proyectos y trabajos realizados por Amazon Aviation Service en mantenimiento, inspeccion y reparacion estructural de aeronaves en Pucallpa. Si buscas un servicio similar, revisa servicios, certificaciones o contacto.',
      '/proyectos',
    ),
    hero: {
      eyebrow: 'Proyectos',
      title: 'Proyectos y trabajos que respaldan capacidad tecnica certificada.',
      description:
        'Esta seleccion resume trabajos reales vinculados a mantenimiento, inspeccion y reparacion de aeronaves, con una lectura comercial orientada a confianza, capacidad tecnica y continuidad operacional.',
      actions: [
        { label: 'Escribir por correo', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'primary' as const },
        { label: 'Ver servicios', href: '/servicios', variant: 'secondary' as const },
      ],
      badges: ['Casos reales', 'Clientes institucionales y privados', 'Taller y campo'],
    },
    intro: [
      'Los proyectos documentados ayudan a demostrar que Amazon Aviation Service no solo comunica capacidades: tambien muestra ejecucion real sobre aeronaves y operadores concretos.',
      'Este portafolio funciona como respaldo comercial para solicitudes nuevas, porque permite ver tipos de trabajo, secuencia de intervencion y disciplina operativa.',
    ],
    portfolioSignals: [
      'Intervenciones documentadas por etapas, desde ingreso a OMA hasta cierre de trabajo.',
      'Experiencia visible en mantenimiento, inspeccion y reparacion estructural.',
      'Soporte a clientes institucionales y operadores privados con lectura tecnica y comercial.',
    ],
    cases: [
      {
        title: 'Pilatus Porter FAP-331',
        meta: 'Cliente institucional',
        description:
          'Caso documentado con secuencia de trabajo visible desde ingreso a OMA, preparacion de superficie, intervencion tecnica y culminacion.',
        bullets: ['Ingreso a OMA', 'Decapado', 'Trabajos ejecutados', 'Culminacion de trabajo'],
      },
      {
        title: 'Cessna P206 PNP-251',
        meta: 'Mantenimiento y reparacion',
        description:
          'Trabajo con trazabilidad por etapas para mostrar disciplina de taller, secuencia tecnica y cierre operativo.',
        bullets: ['Ingreso a OMA', 'Decapado', 'Trabajos ejecutados', 'Culminacion de trabajo'],
      },
      {
        title: 'Reparacion estructural PNP-257',
        meta: 'Reparacion estructural',
        description:
          'Caso orientado a evidenciar capacidad de reparacion estructural mayor y ejecucion tecnica sobre una necesidad especifica.',
        bullets: ['Evaluacion tecnica', 'Trabajos realizados', 'Trabajo culminado'],
      },
      {
        title: 'Amazon Flight School',
        meta: 'Operador privado',
        description:
          'Proyecto con lectura operativa clara, útil para mostrar soporte tecnico de taller sobre aeronaves de uso recurrente.',
        bullets: ['Ingreso a OMA', 'Decapado', 'Trabajos ejecutados'],
      },
      {
        title: 'Ejercito del Peru - EP 811',
        meta: 'Cliente institucional',
        description:
          'Trabajo institucional que refuerza capacidad de ejecucion, orden documental y seriedad operativa en intervenciones visibles.',
        bullets: ['Ingreso a OMA', 'Trabajos ejecutados', 'Culminado'],
      },
      {
        title: 'Aero Andino Survey y Air Majoro',
        meta: 'Operadores privados',
        description:
          'Casos publicados sobre Pilatus Porter, Skymaster y trabajos de reparacion que amplian el soporte comercial del portafolio.',
        bullets: ['Ingreso a OMA', 'Trabajos ejecutados', 'Culminacion o reparaciones'],
      },
    ] satisfies SimpleCard[],
  },
  certifications: {
    metadata: buildMetadata(
      'Certificaciones DGAC y OMA N°078 en Pucallpa | Amazon Aviation Service',
      'Consulta el certificado OMA N°078, la lista de capacidades, el sistema de gestion de calidad y los documentos de respaldo tecnico de Amazon Aviation Service.',
      '/certificaciones',
    ),
    hero: {
      eyebrow: 'Certificaciones',
      title: 'Respaldo documental y regulatorio visible para una decision con menos riesgo.',
      description:
        'La certificacion OMA, la lista de capacidades, el sistema de gestion de calidad y los documentos asociados ofrecen una base visible para validar el alcance tecnico y reducir incertidumbre al momento de contactar.',
      actions: [
        { label: 'Escribir por correo', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'primary' as const },
        { label: 'Volver a servicios', href: '/servicios', variant: 'secondary' as const },
      ],
      badges: ['OMA N°078', 'DGAC', 'PDFs disponibles'],
    },
    intro: [
      'La documentacion visible confirma la certificacion OMA N°078 y la existencia de una lista de capacidades asociada.',
      'El alcance presentado se mantiene dentro de los documentos reales accesibles desde esta web y se usa como respaldo comercial antes de una consulta tecnica.',
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
          'Relaciona habilitaciones, limitaciones y alcances visibles para mantenimiento e inspeccion.',
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
          'Soporte documental complementario relacionado con el alcance tecnico visible y la continuidad de la operacion.',
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
      'Los documentos se presentan con lenguaje tecnico, ordenado y respaldo verificable.',
    ],
  },
  contact: {
    metadata: buildMetadata(
      'Contacto por correo para mantenimiento de aeronaves en Pucallpa | Amazon Aviation Service',
      'Solicita informacion o cotizacion para mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa, Ucayali. El correo es el canal preferente para consultas tecnicas y comerciales.',
      '/contacto',
    ),
    hero: {
      eyebrow: 'Contacto',
      title: 'Un canal comercial y tecnico claro para operadores que necesitan respuesta.',
      description:
        'El contacto esta pensado para cotizaciones, consultas tecnicas y coordinacion inicial desde Pucallpa, con una presentacion clara y empresarial. Si estas evaluando una solicitud, escribe por correo primero y revisa servicios y certificaciones.',
      actions: [
        {
          label: 'Escribir por correo',
          href: 'mailto:aasperu@amazonaviationservice.com',
          variant: 'primary' as const,
        },
        { label: 'Ver certificaciones', href: '/certificaciones', variant: 'secondary' as const },
      ],
      badges: ['Respuesta tecnica', 'Pucallpa', 'Canales directos'],
    },
    contactCards: [
      {
        title: 'Correo comercial',
        meta: 'Email',
        description: 'aasperu@amazonaviationservice.com',
        link: {
          label: 'Escribir por correo',
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
      'Si buscas una respuesta formal, escribe por correo y deja el tipo de aeronave como primer dato.',
      'Indica si la necesidad es inspeccion, mantenimiento o reparacion, y el nivel de urgencia.',
      'Agrega ubicacion, telefono, fecha tentativa y una breve descripcion del requerimiento tecnico.',
    ],
  },
}
