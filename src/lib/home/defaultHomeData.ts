import type { HomePageData } from './types'

export const defaultHomeData: HomePageData = {
  topbarText:
    'Mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa con respaldo OMA N°078, atencion a FAP y privados, y foco en la Amazonia peruana.',
  supportLabel: 'Base operativa',
  supportValue: 'Pucallpa, Ucayali',
  brand: {
    name: 'Amazon Aviation Service',
    logoAlt: 'Amazon Aviation Service',
    tagline: 'OMA N°078 · Pucallpa · DGAC',
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
    label: 'Escribir por correo',
    href: 'mailto:aasperu@amazonaviationservice.com',
    variant: 'primary',
  },
  hero: {
    eyebrow: 'OMA N°078 · DGAC Peru',
    title: 'Mantenimiento de aeronaves en Pucallpa con respaldo OMA N°078 y trazabilidad tecnica.',
    subtitle: 'Capacidad tecnica para aeronaves hasta 5700 kg',
    description:
      'Amazon Aviation Service atiende desde Pucallpa a operadores publicos y privados que necesitan mantenimiento, inspeccion y reparacion de aeronaves bajo criterios de seguridad operacional, control documental y cumplimiento visible.',
    actions: [
      { label: 'Escribir por correo', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'primary' },
      { label: 'Ver servicios', href: '/servicios', variant: 'secondary' },
    ],
    trustItems: [
      { value: 'OMA N°078', label: 'Organizacion de mantenimiento aprobada por la DGAC.' },
      { value: 'FAP y privados', label: 'Atencion a entidades publicas y operadores privados.' },
      { value: 'Amazonia peruana', label: 'Base operativa con alcance regional y nacional.' },
    ],
    visualBadge: 'Operacion tecnica certificada',
    cornerLabel: 'Seguridad operacional, control y trazabilidad',
    imageAlt: 'Amazon Aviation Service en operacion tecnica',
    slides: [],
  },
  stats: [
    { value: 'OMA N°078', label: 'respaldo regulatorio visible' },
    { value: 'Pucallpa', label: 'base principal en Ucayali' },
    { value: '5700 kg', label: 'capacidad declarada de aeronaves atendidas' },
    { value: 'FAP / privados', label: 'clientes objetivo con perfil institucional y comercial' },
  ],
  servicesSection: {
    eyebrow: 'Servicios principales',
    title: 'Mantenimiento de aeronaves como eje principal, con inspeccion y reparacion de respaldo',
    description:
      'Desde Pucallpa, Amazon Aviation Service presenta una propuesta tecnica seria para operadores que necesitan disponibilidad, cumplimiento y un interlocutor con respaldo documental.',
  },
  services: [
    {
      title: 'Mantenimiento de aeronaves',
      description:
        'Servicio principal orientado a conservar la aeronave en condiciones operativas seguras, con orden tecnico, continuidad y trazabilidad documental.',
      meta: 'Mantenimiento',
      href: '/servicios',
    },
    {
      title: 'Inspeccion programada y no programada',
      description:
        'Inspecciones tecnicas alineadas con la lista de capacidades y con referencias regulatorias para diagnostico, seguimiento y control documental.',
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
      title: 'Cumplimiento tecnico y documental',
      description:
        'Acompanamiento en capacidades visibles, referencias RAP y documentacion tecnica para sostener una operacion clara y verificable.',
      meta: 'Soporte',
      href: '/servicios',
    },
  ],
  aboutSection: {
    eyebrow: 'Nosotros',
    title: 'Operacion tecnica certificada desde Pucallpa con alcance regional.',
    description:
      'Amazon Aviation Service S.A.C. es una organizacion de mantenimiento aeronautico certificada por la DGAC (OMA N.° 078), con base principal en Pucallpa y una propuesta centrada en seguridad operacional, aeronavegabilidad y calidad verificable.',
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
    title: 'Documentos y capacidades para validar el alcance tecnico',
    description:
      'Certificacion OMA, lista de capacidades y documentos complementarios reunidos en un recorrido simple para reducir incertidumbre antes del contacto.',
    items: [
      {
        title: 'Certificado OMA N°078',
        description: 'Documento principal que acredita a Amazon Aviation Service ante la DGAC y respalda la lectura institucional del sitio.',
        meta: 'DGAC',
        linkLabel: 'Ver documento',
        linkUrl:
          'https://amazonaviationservice.com/wp-content/uploads/2024/09/Certificado-OMA-N%C2%B0078.pdf',
      },
      {
        title: 'Lista de capacidades OMA 78',
        description: 'Relacion de habilitaciones tecnicas visibles para mantenimiento e inspeccion.',
        meta: 'Capacidades',
        linkLabel: 'Abrir PDF',
        linkUrl:
          'https://amazonaviationservice.com/wp-content/uploads/2024/09/OMA_78_Lista_de_Capacidades.pdf',
      },
      {
        title: 'Capacidades UFA',
        description: 'Soporte documental complementario para revisar alcance tecnico y referencias de consulta.',
        meta: 'UFA',
        linkLabel: 'Revisar soporte',
        linkUrl:
          'https://amazonaviationservice.com/wp-content/uploads/2024/11/lista-de-capacidades.pdf',
      },
    ],
  },
  pricingSection: {
    eyebrow: 'Proyectos',
    title: 'Proyectos reales que respaldan la operacion',
    description:
      'Los proyectos permiten ver secuencia tecnica, control documental y capacidad de ejecucion real antes de iniciar una consulta.',
    items: [
      {
        badge: 'Proyecto 01',
        title: 'Pilatus Porter FAP-331',
        description: 'Caso institucional con etapas visibles desde ingreso a OMA hasta cierre del trabajo.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
      {
        badge: 'Proyecto 02',
        title: 'Cessna P206 PNP-251',
        description: 'Intervencion documentada para mostrar secuencia tecnica y control por etapas.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
      {
        badge: 'Proyecto 03',
        title: 'Reparacion estructural PNP-257',
        description: 'Reparacion estructural mayor con evidencia de ejecucion tecnica y terminacion del trabajo.',
        cta: { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      },
    ],
  },
  industriesSection: {
    eyebrow: 'Capacidades',
    title: 'Capacidades tecnicas dentro del alcance certificado',
    description:
      'El sitio no vende conceptos vacios: muestra capacidades concretas para evaluar alcance, seguridad y confiabilidad.',
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
          'Pruebas no destructivas, zona caliente e inspeccion boroscopica para diagnostico y seguimiento.',
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
      'Amazon Aviation Service comunica una identidad sobria, regulada y enfocada en mantenimiento aeronautico con respaldo visible.',
    items: [
      {
        title: 'Mision',
        description:
          'Atender necesidades de mantenimiento aeronautico con calidad tecnica, control documental y foco en seguridad operacional.',
      },
      {
        title: 'Enfoque',
        description:
          'Sostener una operacion confiable para clientes que necesitan claridad tecnica, disponibilidad y cumplimiento.',
      },
      {
        title: 'Pilares',
        description:
          'Personal capacitado, informacion tecnica actualizada y herramientas alineadas al trabajo aeronautico.',
      },
    ],
  },
  ctaBanner: {
    title: 'Coordina una evaluacion inicial para tu aeronave',
    description:
      'Comparte el tipo de aeronave, la necesidad principal y el contexto operativo para recibir una primera orientacion comercial por correo.',
    actions: [
      { label: 'Escribir por correo', href: 'mailto:aasperu@amazonaviationservice.com', variant: 'primary' },
      { label: 'Ver certificaciones', href: '/certificaciones', variant: 'secondary' },
    ],
  },
  contactSection: {
    eyebrow: 'Contacto',
    title: 'Contacto comercial y tecnico desde Pucallpa',
    description:
      'Amazon Aviation Service atiende consultas sobre mantenimiento, inspeccion y reparacion de aeronaves con un canal directo por correo para coordinacion inicial.',
    formTitle: 'Solicita informacion o cotizacion tecnica',
    formDescription:
      'Comparte la necesidad principal de tu aeronave, el tipo de operacion y el contexto basico para orientar la siguiente conversacion.',
    formButtonLabel: 'Enviar por correo',
    cards: [
      {
        label: 'Correo',
        value: 'aasperu@amazonaviationservice.com',
        href: 'mailto:aasperu@amazonaviationservice.com',
        hrefLabel: 'Escribir por correo',
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
      'Mantenimiento, inspeccion y reparacion de aeronaves desde Pucallpa con respaldo OMA N°078, foco en seguridad operacional y soporte documental visible.',
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
    copy: 'Copyright 2026 Amazon Aviation Service S.A.C. Todos los derechos reservados.',
    badge: 'OMA N°078 · DGAC · Pucallpa, Peru',
  },
}
