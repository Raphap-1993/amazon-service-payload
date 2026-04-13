export type PublicContactPayload = {
  aircraft?: string
  company?: string
  email: string
  message: string
  name: string
  phone?: string
  sourcePage?: string
  subject?: string
}

export type PublicContactResponse = {
  error?: string
  ok: boolean
  saved?: boolean
  submissionId?: number
}

export async function submitPublicContactForm(
  payload: PublicContactPayload,
): Promise<PublicContactResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const result = (await response.json().catch(() => null)) as PublicContactResponse | null

  if (!response.ok) {
    throw new Error(result?.error || 'No se pudo enviar el mensaje. Intente nuevamente.')
  }

  return result || { ok: true }
}
