import type { HomePageData } from './types'

export const defaultHomeData: HomePageData = {
  topbarText:
    'Mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa con respaldo OMA N°078.',
  supportLabel: 'Base operativa',
  supportValue: 'Pucallpa',
  brand: {
    name: 'Amazon Aviation Service',
    logoAlt: 'Amazon Aviation Service',
    tagline: 'OMA N°078 · Pucallpa, Peru',
  },
  navItems: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Certificaciones', href: '/certificaciones' },
    { label: 'Contacto', href: '/contacto' },
  ],
  headerCta: {
    label: 'Solicitar cotizacion',
    href: '/contacto',
    variant: 'primary',
  },
  hero: {
    eyebrow: 'Mantenimiento aeronautico en Pucallpa',
    title: 'Mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa.',
    subtitle: 'Capacidad tecnica para aeronaves hasta 5700 kg',
    description:
      'Amazon Aviation Service atiende desde Pucallpa a operadores que requieren mantenimiento, inspeccion y reparacion de aeronaves con seguridad operacional, trazabilidad tecnica y soporte documental visible.',
    actions: [
      { label: 'Solicitar cotizacion', href: '/contacto', variant: 'primary' },
      { label: 'Ver servicios', href: '/servicios', variant: 'secondary' },
    ],
    trustItems: [
      { value: 'OMA N°078', label: 'Organizacion de mantenimiento aprobada por la DGAC.' },
      { value: 'Pucallpa', label: 'Base operativa en Yarinacocha, Ucayali.' },
      { value: 'RAP 145 / 43 / 65', label: 'Marco regulatorio visible para mantenimiento e inspeccion.' },
    ],
    visualBadge: 'Base operativa en la Amazonia peruana',
    cornerLabel: 'Seguridad operacional y trazabilidad',
    imageAlt: 'Amazon Aviation Service en operacion tecnica',
    slides: [],
  },
  stats: [
    { value: 'OMA N°078', label: 'respaldo regulatorio visible' },
    { value: 'Pucallpa', label: 'base operativa en Ucayali' },
    { value: '5700 kg', label: 'capacidad declarada de aeronaves atendidas' },
    { value: 'RAP 145 / 43 / 65', label: 'referencias de trabajo visibles' },
  ],
  servicesSection: {
    eyebrow: 'Servicios aeronauticos',
    title: 'Servicios para operadores que necesitan disponibilidad y control tecnico',
    description:
      'Desde Pucallpa, Amazon Aviation Service presenta una propuesta clara: mantenimiento, inspeccion y reparacion de aeronaves con respaldo documental y enfoque operativo.',
  },
  services: [
    {
      title: 'Inspeccion programada y no programada',
      description:
        'Inspecciones tecnicas alineadas con la lista de capacidades y con referencias RAP para diagnostico, seguimiento y control documental.',
      meta: 'Inspeccion',
      href: '/servicios',
    },
    {
      title: 'Reparacion de aeronaves',
      description:
        'Trabajos de mantenimiento correctivo y reparacion con foco en integridad estructural, disponibilidad y ejecucion tecnica ordenada.',
      meta: 'Reparacion',
      href: '/servicios',
    },
    {
      title: 'Mantenimiento preventivo',
      description:
        'Acciones orientadas a reducir indisponibilidad, sostener el rendimiento operativo y dar continuidad a la aeronavegabilidad.',
      meta: 'Prevencion',
      href: '/servicios',
    },
  ],
  aboutSection: {
    eyebrow: 'Nosotros',
    title: 'Operacion tecnica aprobada por la DGAC con base en Pucallpa.',
    description:
      'Amazon Aviation Service S.A.C. es una organizacion de mantenimiento aprobada por la DGAC con base operativa en Pucallpa, enfocada en seguridad operacional, aeronavegabilidad y calidad verificable.',
    highlights: [
      'Organizacion de mantenimiento aprobada OMA N°078.',
      'Sistema de gestion de calidad orientado a trazabilidad y control tecnico.',
      'Capacidades documentadas para mantenimiento, inspeccion y reparacion.',
    ],
    imageAlt: 'Base operativa y soporte tecnico en Pucallpa',
    placeholderLabel: 'Base operativa',
  },
  certificationsSection: {
    eyebrow: 'Respaldo regulatorio',
    title: 'Certificaciones y documentos para validar confianza operativa',
    description:
      'Certificacion OMA, lista de capacidades y documentos complementarios disponibles para consulta desde un mismo recorrido.',
    items: [
      {
        title: 'Certificado OMA N°078',
        description: 'Documento principal que acredita a Amazon Aviation Service ante la DGAC.',
        meta: 'DGAC',
        linkLabel: 'Ver documento',
        linkUrl:
          'https://amazonaviationservice.com/wp-content/uploads/2024/09/Certificado-OMA-N%C2%B0078.pdf',
      },
      {
        title: 'Lista de capacidades OMA 78',
        description:
          'Relacion de habilitaciones tecnicas y alcances visibles para mantenimiento e inspeccion.',
        meta: 'Capacidades',
        linkLabel: 'Abrir PDF',
        linkUrl:
          'https://amazonaviationservice.com/wp-content/uploads/2024/09/OMA_78_Lista_de_Capacidades.pdf',
      },
      {
        title: 'Capacidades UFA',
        description: 'Soporte documental complementario vinculado al alcance tecnico visible.',
        meta: 'UFA',
        linkLabel: 'Revisar soporte',
        linkUrl:
          'https://amazonaviationservice.com/wp-content/uploads/2024/11/lista-de-capacidades.pdf',
      },
    ],
  },
  pricingSection: {
    eyebrow: 'Proyectos',
    title: 'Proyectos y trabajos que respaldan la experiencia operativa',
    description:
      'Los proyectos ayudan a validar experiencia tecnica, secuencia de trabajo y capacidad de ejecucion sin depender de testimonios genericos.',
    items: [
      {
        badge: 'Proyecto 01',
        title: 'Pilatus Porter FAP-331',
        description:
          'Caso documentado con etapas visibles desde ingreso a OMA hasta culminacion del trabajo.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
      {
        badge: 'Proyecto 02',
        title: 'Cessna P206 PNP-251',
        description:
          'Trabajo documentado con secuencia tecnica visible y control documental por etapas.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
      {
        badge: 'Proyecto 03',
        title: 'Reparacion estructural PNP-257',
        description:
          'Caso orientado a reparacion estructural mayor con evidencia de ejecucion tecnica.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
    ],
  },
  industriesSection: {
    eyebrow: 'Capacidades',
    title: 'Capacidades tecnicas dentro del alcance documentado',
    description:
      'El enfoque principal no es hablar de industrias de forma generica, sino mostrar capacidades concretas que ayuden a evaluar alcance y confianza.',
    items: [
      {
        title: 'Reparacion estructural mayor',
        description:
          'Intervenciones estructurales con control tecnico y soporte documental dentro del alcance visible.',
        meta: 'Estructuras',
      },
      {
        title: 'Inspeccion especializada',
        description:
          'Capacidades asociadas a pruebas no destructivas, zona caliente e inspeccion boroscopica dentro del material documentado.',
        meta: 'Inspeccion',
      },
      {
        title: 'Motor y componentes',
        description:
          'Remocion e instalacion de motor, soldadura y armado de componentes dentro de la evidencia documental disponible.',
        meta: 'Taller',
      },
    ],
  },
  valuesSection: {
    eyebrow: 'Criterio operativo',
    title: 'Una marca tecnica, confiable y orientada a seguridad operacional',
    description:
      'Amazon Aviation Service comunica una identidad sobria, confiable y enfocada en mantenimiento aeronautico con respaldo regulatorio.',
    items: [
      {
        title: 'Mision',
        description:
          'Atender necesidades de mantenimiento aeronautico con calidad tecnica, control documental y foco en seguridad operacional.',
      },
      {
        title: 'Enfoque',
        description:
          'Sostener una operacion confiable para operadores que valoran claridad tecnica, disponibilidad y cumplimiento.',
      },
      {
        title: 'Pilares',
        description:
          'Personal capacitado, informacion tecnica actualizada, herramientas y estructura operativa alineada al trabajo aeronautico.',
      },
    ],
  },
  ctaBanner: {
    title: 'Coordina una evaluacion inicial para tu aeronave',
    description:
      'Comparte el tipo de aeronave, la necesidad principal y el contexto operativo para recibir una primera orientacion comercial y tecnica.',
    actions: [
      { label: 'Enviar solicitud', href: '/contacto', variant: 'primary' },
      { label: 'Ver certificaciones', href: '/certificaciones', variant: 'secondary' },
    ],
  },
  contactSection: {
    eyebrow: 'Contacto',
    title: 'Contacto comercial y tecnico desde Pucallpa',
    description:
      'Amazon Aviation Service atiende consultas sobre mantenimiento, inspeccion y reparacion de aeronaves con un canal directo para coordinacion inicial.',
    formTitle: 'Solicita informacion o cotizacion',
    formDescription:
      'Comparte la necesidad principal de tu aeronave y los datos basicos de operacion para orientar la siguiente conversacion.',
    formButtonLabel: 'Enviar solicitud',
    cards: [
      {
        label: 'Correo',
        value: 'aasperu@amazonaviationservice.com',
        href: 'mailto:aasperu@amazonaviationservice.com',
        hrefLabel: 'Escribir ahora',
      },
      {
        label: 'Telefonos',
        value: '+51 952633100 / +51 945266795',
        href: 'tel:+51952633100',
        hrefLabel: 'Llamar',
      },
      {
        label: 'Base operativa',
        value: 'Av. El Triunfo Mz. C Lt. 1, Yarinacocha - Pucallpa - Peru',
        href: 'https://www.google.com/maps/search/?api=1&query=Av.+El+Triunfo+Mz.+C+Lt.+1,+Yarinacocha,+Pucallpa,+Peru',
        hrefLabel: 'Ver ubicacion',
      },
    ],
  },
  footer: {
    summary:
      'Mantenimiento, inspeccion y reparacion de aeronaves desde Pucallpa con respaldo OMA N°078, enfoque en seguridad operacional y soporte documental visible.',
    navigation: [
      { label: 'Inicio', href: '/' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Certificaciones', href: '/certificaciones' },
      { label: 'Contacto', href: '/contacto' },
    ],
    contact: [
      {
        label: 'Correo',
        value: 'aasperu@amazonaviationservice.com',
        href: 'mailto:aasperu@amazonaviationservice.com',
      },
      {
        label: 'Telefono',
        value: '+51 952633100',
        href: 'tel:+51952633100',
      },
      {
        label: 'Base',
        value: 'Yarinacocha, Pucallpa, Peru',
      },
    ],
    legal: [
      { label: 'Certificaciones', href: '/certificaciones' },
      { label: 'Contacto', href: '/contacto' },
    ],
    copy: '© 2026 Amazon Aviation Service S.A.C. Todos los derechos reservados.',
    badge: 'OMA N°078 · DGAC · Pucallpa, Peru',
  },
}
