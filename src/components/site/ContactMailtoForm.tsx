'use client'

import type { FormEvent } from 'react'

type ContactMailtoFormProps = {
  recipientEmail: string
  submitLabel: string
}

function readField(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim()
}

export function ContactMailtoForm({ recipientEmail, submitLabel }: ContactMailtoFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = readField(formData, 'name')
    const company = readField(formData, 'company')
    const email = readField(formData, 'email')
    const phone = readField(formData, 'phone')
    const subject = readField(formData, 'subject') || 'Consulta sobre mantenimiento de aeronave'
    const message = readField(formData, 'message')

    const bodyLines = [
      name ? `Nombre: ${name}` : null,
      company ? `Empresa: ${company}` : null,
      email ? `Correo: ${email}` : null,
      phone ? `Telefono: ${phone}` : null,
      null,
      message ? message : null,
    ].filter((line): line is string => Boolean(line))

    const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`

    window.location.href = mailtoHref
  }

  return (
    <form className="contact-form contact-form--page" onSubmit={handleSubmit}>
      <div className="contact-form__header">
        <h3>Prepara el correo comercial</h3>
        <p>Completa los datos basicos y se abrira tu cliente de correo con el mensaje listo para enviar.</p>
      </div>

      <label className="form-field">
        <span>Nombre</span>
        <input autoComplete="name" name="name" placeholder="Tu nombre" required type="text" />
      </label>

      <label className="form-field">
        <span>Empresa</span>
        <input autoComplete="organization" name="company" placeholder="Nombre de la empresa" type="text" />
      </label>

      <label className="form-field">
        <span>Email</span>
        <input autoComplete="email" name="email" placeholder="correo@empresa.com" type="email" />
      </label>

      <label className="form-field">
        <span>Telefono</span>
        <input autoComplete="tel" name="phone" placeholder="+00 000 000 000" type="tel" />
      </label>

      <label className="form-field">
        <span>Asunto</span>
        <input name="subject" placeholder="Tipo de requerimiento" type="text" />
      </label>

      <label className="form-field">
        <span>Mensaje</span>
        <textarea
          name="message"
          placeholder="Describe brevemente la aeronave, la necesidad y la prioridad."
          required
          rows={6}
        />
      </label>

      <p className="body-copy">
        El mensaje se prepara localmente y se envia al correo principal administrado desde el Backoffice.
      </p>

      <button className="button-link button-link--primary contact-form__submit" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}
