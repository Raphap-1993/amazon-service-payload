import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { isEditorOrAbove } from '../lib/payload/access.ts'
import { seoGroup } from '../lib/payload/fields.ts'

const mediaLibraryHelperComponent = {
  path: './src/components/payload/MediaLibraryHelper.tsx#MediaLibraryHelper',
}

const defaultLeadershipSection = {
  description:
    'La conduccion actual y el legado fundacional se presentan con una lectura sobria, respetuosa y alineada con la trayectoria de la empresa.',
  eyebrow: 'Liderazgo',
  title: 'Continuidad institucional y liderazgo visible',
}

const defaultLeadershipMembers = [
  {
    description:
      'Su vision y trabajo contribuyeron a la consolidacion tecnica del taller y hoy forman parte del legado institucional de la empresa.',
    meta: 'Legado fundador',
    title: 'Rudolf Wiedler Eberli',
  },
  {
    description:
      'Responsable de la continuidad institucional, la conduccion actual de la organizacion y la relacion con la DGAC.',
    meta: 'Direccion general',
    title: 'Nayra Saavedra Alvis Vda. de Wiedler',
  },
]

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: publicRead,
    update: isEditorOrAbove,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Seriedad, certificacion y continuidad operativa desde Pucallpa.',
      admin: {
        description: 'Titulo principal del hero de la pagina Nosotros.',
      },
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Amazon Aviation Service se presenta como una organizacion tecnica seria, regulada y confiable, apoyada en OMA N.° 078, liderazgo visible y habilitaciones documentadas. Antes de tomar una decision, revisa servicios, proyectos y certificaciones.',
      admin: {
        description: 'Descripcion principal del hero. Debe mantenerse institucional y sobria.',
      },
    },
    {
      name: 'storyTitle',
      type: 'text',
      defaultValue: 'Amazon Aviation Service como operacion tecnica y regulada',
      admin: {
        description: 'Titulo del bloque institucional principal.',
      },
    },
    {
      name: 'storyBody',
      type: 'textarea',
      defaultValue:
        'Amazon Aviation Service S.A.C. es una Organizacion de Mantenimiento Aeronautico certificada por la DGAC (OMA N.° 078), con base principal en Pucallpa, dedicada al mantenimiento de aeronaves conforme a los estandares tecnicos y regulatorios vigentes.\n\nLa empresa se consolido a partir del impulso fundador del Sr. Rudolf Wiedler Eberli, cuya trayectoria tecnica y aporte al taller forman parte del legado institucional de Amazon Aviation Service.\n\nEste proyecto fue desarrollado a nivel familiar y empresarial, logrando la certificacion como Organizacion de Mantenimiento Aeronautico (OMA N.° 078).\n\nActualmente, la empresa se encuentra bajo la direccion de Nayra Saavedra Alvis Vda. de Wiedler, responsable de la gestion institucional, la continuidad operativa, el cumplimiento normativo y la relacion de la organizacion ante la DGAC.\n\nLa empresa cuenta con un equipo de tecnicos altamente calificados y en constante capacitacion, lo que permite asegurar la prestacion de servicios confiables y seguros, con proyeccion de crecimiento y participacion en el desarrollo de la aviacion a nivel regional y nacional.',
      admin: {
        description:
          'Cuerpo del bloque institucional. Usa una linea en blanco para separar parrafos.',
      },
    },
    {
      name: 'values',
      label: 'Mission And Vision',
      type: 'array',
      defaultValue: [
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
      ],
      admin: {
        description: 'Tarjetas del bloque Mision y vision en la pagina Nosotros.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'leadershipSection',
      label: 'Leadership Section',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          defaultValue: defaultLeadershipSection.eyebrow,
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          defaultValue: defaultLeadershipSection.title,
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          defaultValue: defaultLeadershipSection.description,
          admin: {
            description: 'Texto breve para contextualizar el liderazgo actual y el legado fundacional.',
          },
        },
        {
          name: 'members',
          label: 'Leadership Members',
          type: 'array',
          defaultValue: defaultLeadershipMembers.map((member) => ({
            description: member.description,
            meta: member.meta,
            title: member.title,
          })),
          fields: [
            {
              name: 'title',
              label: 'Nombre',
              type: 'text',
              required: true,
            },
            {
              name: 'meta',
              label: 'Cargo',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Descripcion',
              type: 'textarea',
              required: true,
            },
            {
              name: 'photo',
              label: 'Foto',
              type: 'relationship',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  contains: 'image',
                },
              },
              admin: {
                allowCreate: true,
                appearance: 'drawer',
                components: {
                  afterInput: [mediaLibraryHelperComponent],
                },
                description:
                  'Selecciona una foto desde Media Library. Recomendado: retrato cuadrado o vertical con el rostro centrado.',
              },
            },
            {
              name: 'photoAlt',
              label: 'Texto alternativo de la foto',
              type: 'text',
            },
          ],
        },
      ],
    },
    seoGroup(),
  ],
}
