import type { HomePageData } from './types'

export const defaultHomeData: HomePageData = {
  topbarText:
    'Cotiza reparaciones, mantenimiento e inspecciones de aeronaves con mano de obra calificada y respaldo OMA N°078 en Pucallpa.',
  supportLabel: 'Atención comercial',
  supportValue: 'Solicita tu evaluación por correo',
  brand: {
    name: 'Amazon Aviation Service',
    logoAlt: 'Amazon Aviation Service',
    shortName: 'Amazon Aviation',
    tagline: 'Service S.A.C. · OMA N°078',
    footerSubline: 'S.A.C. · Pucallpa, Perú',
  },
  theme: {
    accent: '#78c04c',
    accentSoft: 'rgba(120, 192, 76, 0.16)',
    accentStrong: '#2f7d32',
    bg: '#eef4ef',
    lineDark: 'rgba(16, 44, 39, 0.14)',
    lineStrong: 'rgba(16, 44, 39, 0.22)',
    muted: '#c7dad2',
    mutedDark: '#516a63',
    paper: '#edf4ef',
    paperMuted: '#e2ebe4',
    paperTint: '#f7faf7',
    surface: '#0f312c',
    surfaceMuted: '#173e37',
    surfaceStrong: '#0a221f',
    text: '#f5fbf8',
    textDark: '#102c27',
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
    label: 'Solicitar Servicio',
    href: '/contacto',
    variant: 'primary',
  },
  headerPhone: '+51 952 633 100',
  hero: {
    eyebrow: 'OMA N°078 — Autorizado DGAC Perú',
    title: 'Reparación y\nMantenimiento de\nAeronaves',
    subtitle: 'Aeronaves hasta 5 700 kg',
    description:
      'Bienvenido a Amazon Aviation Service, donde la excelencia en el mantenimiento y reparación de aeronaves en Pucallpa es nuestra misión. Desde nuestros inicios, nos hemos comprometido a proporcionar servicios de aviación de la más alta calidad.',
    actions: [
      { label: 'Ver Servicios', href: '#servicios', variant: 'primary' },
      { label: 'Contactar', href: '#contacto', variant: 'secondary' },
    ],
    trustItems: [
      { value: 'OMA N°078', label: 'Certificación DGAC' },
      { value: '40+ años', label: 'Experiencia técnica' },
      { value: 'RAP 145', label: 'Marco regulatorio' },
    ],
    badgeNumber: '078',
    badgeText: 'OMA DGAC Perú',
    regulationsLabel: 'Regulaciones aplicadas',
    regulations: ['RAP 145', 'RAP 43', 'RAP 65'],
    visualBadge: 'Amazon Aviation Service',
    cornerLabel: 'Aeronaves hasta 5 700 kg',
    imageAlt: 'Amazon Aviation Service - Mantenimiento de aeronaves en Pucallpa',
    slides: [
      {
        label: 'OMA N°078',
        title: 'Reparación y Mantenimiento de Aeronaves',
        description:
          'Amazon Aviation Service brinda mantenimiento, reparación e inspección técnica con respaldo regulatorio y foco en continuidad operacional.',
        imageAlt: 'Amazon Aviation Service - Mantenimiento de aeronaves en Pucallpa',
        visualBadge: 'Amazon Aviation Service',
        cornerLabel: 'Aeronaves hasta 5 700 kg',
      },
    ],
  },
  tickerItems: [
    { icon: '✈', value: 'Reparación Estructural Mayor' },
    { icon: '🔍', value: 'Pruebas No Destructivas' },
    { icon: '🔥', value: 'Inspección de Zona Caliente (HSI)' },
    { icon: '🔭', value: 'Inspección Boroscópica' },
    { icon: '⚙️', value: 'Remoción e Instalación de Motor' },
    { icon: '🎨', value: 'Pintura de Aeronave' },
    { icon: '🛠', value: 'Soldadura Autógena y Eléctrica' },
  ],
  stats: [
    { value: 'OMA N°078', label: 'Certificación DGAC' },
    { value: '40+ años', label: 'Experiencia técnica' },
    { value: 'RAP 145', label: 'Marco regulatorio' },
    { value: 'Pucallpa', label: 'Base operativa en Ucayali' },
  ],
  servicesSection: {
    eyebrow: 'Servicios MRO',
    title: 'SERVICIOS ESPECIALIZADOS',
    description: '',
    secondaryDescription: '',
    imageAlt: 'Servicios de reparación y mantenimiento aeronáutico',
    imageCaption: '',
    placeholderLabel: '✈',
    items: [
      {
        icon: '📋',
        title: 'Inspección Programada y No Programada',
        description:
          'Realizamos inspecciones periódicas y de emergencia conforme a los manuales del fabricante y las normativas DGAC vigentes bajo RAP 145.',
      },
      {
        icon: '🔧',
        title: 'Reparación de Aeronaves',
        description:
          'Reparaciones estructurales mayores, componentes y sistemas. Capacidad certificada para aeronaves hasta 5 700 kg de peso máximo de despegue.',
      },
      {
        icon: '⚙️',
        title: 'Mantenimiento Preventivo',
        description:
          'Programas de mantenimiento preventivo que incluyen el cumplimiento de Directivas de Aeronavegabilidad (ADs), Service Bulletins (SBs) y Service Letters (SLs).',
      },
    ],
  },
  services: [
    {
      title: 'Inspección Programada y No Programada',
      description:
        'Realizamos inspecciones periódicas y de emergencia conforme a los manuales del fabricante y las normativas DGAC vigentes bajo RAP 145.',
      meta: '📋',
      href: '/servicios',
    },
    {
      title: 'Reparación de Aeronaves',
      description:
        'Reparaciones estructurales mayores, componentes y sistemas. Capacidad certificada para aeronaves hasta 5 700 kg de peso máximo de despegue.',
      meta: '🔧',
      href: '/servicios',
    },
    {
      title: 'Mantenimiento Preventivo',
      description:
        'Programas de mantenimiento preventivo que incluyen el cumplimiento de Directivas de Aeronavegabilidad (ADs), Service Bulletins (SBs) y Service Letters (SLs).',
      meta: '⚙️',
      href: '/servicios',
    },
  ],
  aboutSection: {
    eyebrow: 'Quiénes somos',
    title: 'AMAZON AVIATION SERVICE S.A.C.',
    description:
      'Amazon Aviation Service S.A.C. es una organización de mantenimiento aprobada e identificada por la DGAC con el número OMA N°078 y dirección legal en Av. El Triunfo Mz. C Lote 01, Yarinacocha - Pucallpa - Perú.',
    secondaryDescription:
      'Cuenta con un Sistema de Gestión de Calidad con un sistema de mantenimiento e inspección y un sistema de calidad implementados para asegurar buenas prácticas de mantenimiento y aeronavegabilidad.',
    imageCaption: '',
    highlights: [
      'Mantenimiento de línea',
      'Cumplimiento de ADs, SBs y SLs',
      'Cumplimiento CAPs',
      'Sistema de Gestión de Calidad',
    ],
    imageAlt: 'Base operativa y soporte técnico en Pucallpa',
    secondaryImageAlt: 'Operaciones de mantenimiento aeronáutico en Amazon Aviation Service',
    placeholderLabel: '✈',
  },
  capabilitiesSection: {
    eyebrow: 'Lista de Capacidades',
    title: 'HABILITACIONES CERTIFICADAS',
    description:
      'Capacidades técnicas publicadas para evidenciar alcance, respaldo documental y ejecución especializada dentro del marco OMA.',
    items: [
      'Reparación estructural mayor',
      'Pruebas no destructivas por líquidos penetrantes',
      'Inspección de zona caliente (HSI)',
      'Inspección boroscópica',
      'Remoción e instalación de motor',
      'Soldadura autógena',
      'Soldadura eléctrica',
      'Ensamblaje de mangueras flexibles',
      'Ensamblaje de cables de controles de vuelo',
      'Pintura de aeronave, componentes y otros',
      'Desarmado y armado de ruedas',
    ],
    omaNumber: 'N°078',
    omaLabel: 'Organización de Mantenimiento Aprobada — DGAC Perú',
    omaBody:
      'Amazon Aviation Service S.A.C. opera bajo la autoridad de la Dirección General de Aeronáutica Civil del Perú con aprobación OMA N°078, cumpliendo los reglamentos RAP 145, RAP 43 y RAP 65.',
    regulationsLabel: 'Marcos regulatorios aplicados',
    regulations: ['RAP 145', 'RAP 43', 'RAP 65'],
  },
  missionVisionSection: {
    items: [
      {
        icon: '🎯',
        label: 'Misión',
        text:
          'Proveer un servicio de mantenimiento aeronáutico de primer nivel, respaldado por experiencia y calidad técnica avanzada, con estándares rigurosos y garantía integral en cada mantenimiento.',
      },
      {
        icon: '🔭',
        label: 'Visión',
        text:
          'Ofrecer un mantenimiento aeronáutico de excelencia, con precisión y compromiso con la seguridad, para ser líderes del sector aeronáutico.',
      },
    ],
  },
  leadershipSection: {
    eyebrow: 'Equipo directivo',
    title: 'LIDERAZGO',
    members: [
      {
        title: 'Rudolf Wiedler Eberli',
        meta: 'Fundador',
        description:
          'Fundador de Amazon Aviation Service, recordado con respeto por su trayectoria como mecánico aeronáutico con licencias FAA, Suiza y DGAC-Perú y por un legado de más de 40 años de experiencia al servicio de la aviación.',
        photoAlt: 'Rudolf Wiedler Eberli — Fundador Amazon Aviation Service',
      },
      {
        title: 'Nayra Saavedra Alvis',
        meta: 'Gerente Responsable',
        description:
          'Abogada con experiencia en el sector aeronáutico y una de las fundadoras principales.',
        photoAlt: 'Nayra Saavedra Alvis — Gerente Responsable Amazon Aviation Service',
      },
    ],
  },
  certificationsSection: {
    eyebrow: 'Documentos oficiales',
    title: 'CERTIFICACIONES',
    description: '',
    items: [
      {
        icon: '📜',
        title: 'Certificado OMA N°078',
        description:
          'Certificación oficial emitida por la DGAC que acredita a Amazon Aviation Service S.A.C. como Organización de Mantenimiento Aprobada.',
        meta: 'DGAC',
        linkLabel: 'Descargar PDF →',
      },
      {
        icon: '📋',
        title: 'OMA 78 — Lista de Capacidades',
        description:
          'Listado oficial de habilitaciones y capacidades técnicas aprobadas bajo el certificado OMA N°078 de la DGAC Perú.',
        meta: 'Capacidades',
        linkLabel: 'Descargar PDF →',
      },
      {
        icon: '📄',
        title: 'Lista de Capacidades — UFA',
        description:
          'Capacidades certificadas de la Unidad Fija Adicional (UFA), complementaria a las habilitaciones del OMA principal.',
        meta: 'UFA',
        linkLabel: 'Descargar PDF →',
      },
    ],
  },
  pricingSection: {
    eyebrow: 'Proyectos',
    title: 'Trabajos que muestran calidad de ejecución y capacidad real',
    description:
      'Los proyectos permiten revisar evidencia de ejecución técnica, criterio de reparación y control del trabajo antes de iniciar una consulta.',
    items: [
      {
        badge: 'Proyecto 01',
        title: 'Pilatus Porter FAP-331',
        description:
          'Caso institucional con etapas visibles desde ingreso a OMA hasta cierre del trabajo y entrega documentada.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
      {
        badge: 'Proyecto 02',
        title: 'Cessna P206 PNP-251',
        description:
          'Intervención documentada para mostrar criterio técnico, secuencia de trabajo y control por etapas.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
      {
        badge: 'Proyecto 03',
        title: 'Reparación estructural PNP-257',
        description:
          'Reparación estructural mayor con evidencia de ejecución técnica, calidad de terminación y cierre del trabajo.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
    ],
  },
  projectsSection: {
    eyebrow: 'Casos realizados',
    title: 'PROYECTOS',
    items: [
      { icon: '✈', title: 'Pilatus Porter FAP-331', detail: 'Fuerza Aérea del Perú' },
      { icon: '✈', title: 'Cessna P206 — PNP 251', detail: 'Policía Nacional del Perú' },
      { icon: '🔧', title: 'Reparación Estructural PNP 257', detail: 'Policía Nacional del Perú' },
      { icon: '🏫', title: 'Amazon Flight School', detail: 'Escuela de vuelo' },
      { icon: '🪖', title: 'Ejército del Perú — EP 811', detail: 'Fuerzas Armadas' },
      { icon: '✈', title: 'Aero Andino Survey — Pilatus Porter', detail: 'Aviación civil' },
      { icon: '✈', title: 'Aero Andino Survey — Skymaster', detail: 'Aviación civil' },
      { icon: '✈', title: 'Air Majoro', detail: 'Operador aéreo' },
    ],
    stagesLabel: 'Etapas del proceso en OMA',
    stages: [
      'Ingreso a OMA',
      'Decapado',
      'Trabajos',
      'Culminación',
      'Reparaciones',
      'Trabajo culminado',
    ],
  },
  industriesSection: {
    eyebrow: 'Capacidades de taller',
    title: 'Capacidades que fortalecen nuestra propuesta de reparación aeronáutica',
    description:
      'No hablamos solo de servicio: mostramos capacidades concretas para evaluar alcance, calidad de ejecución y confiabilidad operacional.',
    items: [
      {
        title: 'Reparación estructural mayor',
        description:
          'Intervenciones estructurales con criterio técnico, supervisión del trabajo y soporte documental dentro del alcance visible.',
        meta: 'Estructuras',
      },
      {
        title: 'Inspección especializada',
        description:
          'Pruebas no destructivas, zona caliente e inspección boroscópica para diagnóstico más preciso y mejor toma de decisiones.',
        meta: 'Inspección',
      },
      {
        title: 'Motor y componentes',
        description:
          'Remoción e instalación de motor, soldadura y armado de componentes con mano de obra calificada y evidencia documental.',
        meta: 'Taller',
      },
    ],
  },
  valuesSection: {
    eyebrow: 'Nuestro enfoque',
    title: 'Calidad, mano de obra calificada y criterio técnico en cada intervención',
    description:
      'La propuesta comercial de Amazon Aviation Service descansa en ejecutar bien, documentar bien y responder con seriedad a cada cliente.',
    items: [
      {
        title: 'Calidad de reparación',
        description:
          'Cada intervención debe reflejar control técnico, terminación responsable y una reparación que inspire confianza.',
      },
      {
        title: 'Mano de obra calificada',
        description:
          'Trabajamos con personal técnico calificado para sostener criterio de ejecución, disciplina operacional y mejores resultados.',
      },
      {
        title: 'Compromiso operativo',
        description:
          'Acompañar al cliente con claridad comercial, seguimiento del trabajo y soporte documental hasta el cierre.',
      },
    ],
  },
  ctaBanner: {
    title: 'Solicita una evaluación comercial y técnica para la reparación de tu aeronave',
    description:
      'Comparte el tipo de aeronave, la condición del equipo y la necesidad principal para orientar una respuesta de mantenimiento o reparación.',
    actions: [
      { label: 'Solicitar evaluación técnica', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'primary' },
      { label: 'Ver certificaciones', href: '/certificaciones', variant: 'secondary' },
    ],
  },
  contactSection: {
    eyebrow: 'Contáctenos',
    title: 'CONTÁCTENOS',
    description: '',
    formTitle: 'Envíenos un Mensaje',
    formDescription: '',
    formButtonLabel: 'Enviar Mensaje →',
    formSuccessMessage: '✓ Mensaje enviado — le contactaremos a la brevedad',
    formFields: [
      { label: 'Nombre', name: 'nombre', placeholder: 'Su nombre completo', type: 'text' },
      { label: 'Email', name: 'email', placeholder: 'correo@empresa.com', type: 'email' },
      { label: 'Asunto', name: 'asunto', placeholder: 'Ej: Solicitud de mantenimiento', type: 'text' },
      { label: 'Mensaje', name: 'mensaje', placeholder: 'Describa su requerimiento...', type: 'textarea' },
    ],
    cards: [
      {
        icon: '📍',
        label: 'Dirección',
        value: 'Av. El Triunfo Mz. C Lt. 1, Yarinacocha - Pucallpa - Perú',
        hrefLabel: '',
      },
      {
        icon: '✉️',
        label: 'Correo electrónico',
        value: 'aasperu@amazonaviationservice.com',
        href: 'mailto:aasperu@amazonaviationservice.com',
        hrefLabel: '',
      },
      {
        icon: '📞',
        label: 'Teléfonos',
        value: '+51 952 633 100',
        href: 'tel:+51952633100',
        hrefLabel: '',
      },
    ],
    floatingActions: {
      whatsapp: {
        label: 'WhatsApp',
        href: 'https://wa.me/51952633100',
      },
      phone: {
        label: 'Llamar',
        href: 'tel:+51952633100',
      },
    },
  },
  footer: {
    summary:
      'Organización de Mantenimiento Aprobada por la DGAC con OMA N°078. Reparación, mantenimiento e inspección de aeronaves hasta 5 700 kg en Pucallpa, Ucayali.',
    navigation: [
      { label: 'Inicio', href: '/' },
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Certificaciones', href: '/certificaciones' },
      { label: 'Contacto', href: '/contacto' },
    ],
    contact: [
      {
        label: 'Base',
        value: 'Av. El Triunfo Mz. C Lote 01\nYarinacocha · Pucallpa · Perú',
      },
      {
        label: 'Correo',
        value: 'aasperu@amazonaviationservice.com',
        href: 'mailto:aasperu@amazonaviationservice.com',
      },
      {
        label: 'Teléfono',
        value: '+51 952 633 100',
        href: 'tel:+51952633100',
      },
      {
        label: 'Teléfono',
        value: '+51 945 266 795',
        href: 'tel:+51945266795',
      },
    ],
    legal: [
      { label: 'Política de Privacidad', href: '#' },
      { label: 'Certificaciones', href: '/certificaciones' },
    ],
    copy: '© 2025 Amazon Aviation Service S.A.C. · OMA N°078 · DGAC Perú · Todos los derechos reservados',
    badge: '🛡 OMA N°078 — DGAC Perú',
  },
}
