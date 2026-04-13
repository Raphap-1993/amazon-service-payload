'use client'

import { useState, type FormEvent } from 'react'

import { submitPublicContactForm } from '@/lib/contact/publicContactForm'
import type { ContactFormFieldData } from '@/lib/home/types'

type ReferenceHomeContactFormProps = {
  fields: ContactFormFieldData[]
  successMessage: string
  submitLabel: string
}

function readField(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim()
}

export function ReferenceHomeContactForm({
  fields,
  successMessage,
  submitLabel,
}: ReferenceHomeContactFormProps) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = readField(formData, 'nombre')
    const email = readField(formData, 'email')
    const subject = readField(formData, 'asunto') || 'Solicitud de mantenimiento'
    const message = readField(formData, 'mensaje')

    try {
      setState('submitting')
      setFeedbackMessage('')

      await submitPublicContactForm({
        email,
        message,
        name,
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
    <form action="#" aria-label="Formulario de contacto Amazon Aviation Service" method="POST" noValidate onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="ref-form-group" key={field.name}>
          <label className="ref-form-label" htmlFor={`ref-${field.name}`}>
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              className="ref-form-textarea"
              id={`ref-${field.name}`}
              name={field.name}
              placeholder={field.placeholder}
              required={field.name === 'mensaje'}
            />
          ) : (
            <input
              autoComplete={field.name === 'email' ? 'email' : field.name === 'nombre' ? 'name' : 'off'}
              className="ref-form-input"
              id={`ref-${field.name}`}
              name={field.name}
              placeholder={field.placeholder}
              required={field.name === 'nombre' || field.name === 'email' || field.name === 'asunto'}
              type={field.type}
            />
          )}
        </div>
      ))}

      {feedbackMessage ? (
        <p className="ref-form-feedback" data-state={state}>
          {feedbackMessage}
        </p>
      ) : null}

      <button className="ref-form-submit" data-submitted={state === 'success'} disabled={state === 'submitting'} type="submit">
        {state === 'submitting' ? 'Enviando...' : state === 'success' ? 'Mensaje enviado' : submitLabel}
      </button>
    </form>
  )
}
