'use client'

import { useState, type FormEvent } from 'react'

import { submitPublicContactForm } from '@/lib/contact/publicContactForm'

type ContactMailtoFormProps = {
  successMessage: string
  submitLabel: string
}

function readField(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim()
}

export function ContactMailtoForm({ submitLabel, successMessage }: ContactMailtoFormProps) {
  const formHintId = 'contact-mailto-form-hint'
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = readField(formData, 'name')
    const company = readField(formData, 'company')
    const aircraft = readField(formData, 'aircraft')
    const email = readField(formData, 'email')
    const phone = readField(formData, 'phone')
    const subject = readField(formData, 'subject') || 'Consulta tecnica sobre mantenimiento de aeronaves'
    const message = readField(formData, 'message')

    try {
      setState('submitting')
      setFeedbackMessage('')

      await submitPublicContactForm({
        aircraft,
        company,
        email,
        message,
        name,
        phone,
        sourcePage: window.location.pathname,
        subject,
      })

      form.reset()
      setState('success')
      setFeedbackMessage(successMessage)
    } catch (error) {
      setState('error')
      setFeedbackMessage(
        error instanceof Error ? error.message : 'No se pudo enviar el mensaje. Intente nuevamente.',
      )
    }
  }

  return (
    <form className="contact-form contact-form--page" onSubmit={handleSubmit}>
      <label className="form-field contact-form__field">
        <span>Nombre</span>
        <input
          autoComplete="name"
          className="contact-form__input"
          name="name"
          placeholder="Tu nombre"
          required
          type="text"
        />
      </label>

      <label className="form-field contact-form__field">
        <span>Empresa o entidad</span>
        <input
          autoComplete="organization"
          className="contact-form__input"
          name="company"
          placeholder="Nombre de la empresa o entidad"
          type="text"
        />
      </label>

      <label className="form-field contact-form__field">
        <span>Tipo de aeronave</span>
        <input
          className="contact-form__input"
          name="aircraft"
          placeholder="Ej. Cessna 208, Pilatus Porter, etc."
          type="text"
        />
      </label>

      <label className="form-field contact-form__field">
        <span>Email</span>
        <input
          autoComplete="email"
          className="contact-form__input"
          name="email"
          placeholder="correo@empresa.com"
          type="email"
        />
      </label>

      <label className="form-field contact-form__field">
        <span>Telefono</span>
        <input
          autoComplete="tel"
          className="contact-form__input"
          inputMode="tel"
          name="phone"
          placeholder="+00 000 000 000"
          type="tel"
        />
      </label>

      <label className="form-field contact-form__field">
        <span>Tipo de requerimiento</span>
        <input
          className="contact-form__input"
          name="subject"
          placeholder="Mantenimiento, inspeccion, reparacion, cotizacion..."
          type="text"
        />
      </label>

      <label className="form-field contact-form__field">
        <span>Mensaje</span>
        <textarea
          className="contact-form__textarea"
          name="message"
          placeholder="Describe el contexto operativo, la necesidad principal y cualquier dato que ayude a orientar la primera respuesta."
          required
          rows={6}
        />
      </label>

      <p className="body-copy contact-form__hint" id={formHintId}>
        El mensaje se registrara en el sistema y se enviara al correo configurado desde Payload.
      </p>

      {feedbackMessage ? (
        <p className="body-copy contact-form__feedback" data-state={state}>
          {feedbackMessage}
        </p>
      ) : null}

      <button
        aria-describedby={formHintId}
        className="button-link button-link--primary contact-form__submit"
        disabled={state === 'submitting'}
        type="submit"
      >
        {state === 'submitting' ? 'Enviando...' : state === 'success' ? 'Mensaje enviado' : submitLabel}
      </button>
    </form>
  )
}
