import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { Resend } from 'resend'

import configPromise from '@payload-config'

type RequestBody = {
  aircraft?: unknown
  company?: unknown
  email?: unknown
  message?: unknown
  name?: unknown
  phone?: unknown
  sourcePage?: unknown
  subject?: unknown
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function readTextarea(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/\r/g, '').trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeSourcePage(value: unknown) {
  const sourcePage = readString(value, 160)

  if (!sourcePage) {
    return '/contacto'
  }

  if (sourcePage.startsWith('/')) {
    return sourcePage
  }

  return '/contacto'
}

function buildEmailLines({
  aircraft,
  company,
  email,
  message,
  name,
  phone,
  sourcePage,
  subject,
}: {
  aircraft: string
  company: string
  email: string
  message: string
  name: string
  phone: string
  sourcePage: string
  subject: string
}) {
  return [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Asunto: ${subject}`,
    company ? `Empresa o entidad: ${company}` : null,
    aircraft ? `Tipo de aeronave: ${aircraft}` : null,
    phone ? `Telefono: ${phone}` : null,
    `Origen: ${sourcePage}`,
    '',
    message,
  ].filter((line): line is string => Boolean(line))
}

export async function POST(request: Request) {
  let body: RequestBody | null = null

  try {
    body = (await request.json()) as RequestBody
  } catch {
    return NextResponse.json({ error: 'Solicitud invalida.' }, { status: 400 })
  }

  const name = readString(body?.name, 160)
  const email = readString(body?.email, 180).toLowerCase()
  const subject = readString(body?.subject, 180) || 'Consulta desde el sitio web'
  const message = readTextarea(body?.message, 6000)
  const phone = readString(body?.phone, 80)
  const company = readString(body?.company, 160)
  const aircraft = readString(body?.aircraft, 160)
  const sourcePage = normalizeSourcePage(body?.sourcePage)

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Complete nombre, correo y mensaje antes de enviar.' },
      { status: 400 },
    )
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Ingrese un correo valido.' }, { status: 400 })
  }

  const payload = await getPayload({ config: await configPromise })
  const siteSettings = (await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
  })) as {
    contactEmail?: string | null
    siteName?: string | null
  }

  const recipientEmail = readString(siteSettings?.contactEmail, 180).toLowerCase()

  if (!recipientEmail || !EMAIL_REGEX.test(recipientEmail)) {
    return NextResponse.json(
      { error: 'No hay un correo de destino configurado en Payload.' },
      { status: 500 },
    )
  }

  const submission = await payload.create({
    collection: 'contact-submissions',
    data: {
      aircraft,
      company,
      email,
      message,
      name,
      phone,
      sourcePage,
      status: 'new',
      subject,
    },
    overrideAccess: true,
  })

  const resendApiKey = process.env.RESEND_API_KEY
  const resendFromEmail = readString(process.env.RESEND_FROM_EMAIL, 180)
  const resendFromName =
    readString(process.env.RESEND_FROM_NAME, 120) ||
    readString(siteSettings?.siteName, 120) ||
    'Formulario Web'

  if (!resendApiKey || !resendFromEmail) {
    await payload.update({
      collection: 'contact-submissions',
      id: submission.id,
      data: {
        notes: 'Lead guardado, pero el servidor no tiene configurado RESEND_API_KEY o RESEND_FROM_EMAIL.',
      },
      overrideAccess: true,
    })

    return NextResponse.json(
      {
        error:
          'El mensaje se guardo, pero el correo saliente no esta configurado todavia en el servidor.',
        ok: false,
        saved: true,
        submissionId: submission.id,
      },
      { status: 503 },
    )
  }

  const emailLines = buildEmailLines({
    aircraft,
    company,
    email,
    message,
    name,
    phone,
    sourcePage,
    subject,
  })

  const textBody = emailLines.join('\n')
  const htmlBody = `
    <div style="font-family:Arial,sans-serif;color:#102c27;line-height:1.6">
      <h2 style="margin:0 0 16px">Nueva consulta desde el sitio web</h2>
      <p style="margin:0 0 12px"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 12px"><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 12px"><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
      ${company ? `<p style="margin:0 0 12px"><strong>Empresa o entidad:</strong> ${escapeHtml(company)}</p>` : ''}
      ${aircraft ? `<p style="margin:0 0 12px"><strong>Tipo de aeronave:</strong> ${escapeHtml(aircraft)}</p>` : ''}
      ${phone ? `<p style="margin:0 0 12px"><strong>Telefono:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p style="margin:0 0 12px"><strong>Origen:</strong> ${escapeHtml(sourcePage)}</p>
      <hr style="margin:20px 0;border:none;border-top:1px solid #d7e3dc" />
      <p style="margin:0 0 8px"><strong>Mensaje</strong></p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `

  try {
    const resend = new Resend(resendApiKey)
    const result = await resend.emails.send({
      from: `${resendFromName} <${resendFromEmail}>`,
      html: htmlBody,
      replyTo: email,
      subject: `[Contacto Web] ${subject}`,
      text: textBody,
      to: [recipientEmail],
    })

    await payload.update({
      collection: 'contact-submissions',
      id: submission.id,
      data: {
        notes: result.data?.id
          ? `Correo enviado por Resend. Email ID: ${result.data.id}`
          : 'Correo enviado por Resend.',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error desconocido al enviar correo con Resend.'

    await payload.update({
      collection: 'contact-submissions',
      id: submission.id,
      data: {
        notes: `Lead guardado, pero Resend fallo: ${message}`,
      },
      overrideAccess: true,
    })

    return NextResponse.json(
      {
        error: 'El mensaje se guardo, pero no se pudo enviar el correo de notificacion.',
        ok: false,
        saved: true,
        submissionId: submission.id,
      },
      { status: 502 },
    )
  }
}
