'use client'

import { useEffect, useMemo, useState } from 'react'

type MediaLibraryHelperProps = {
  browseHref?: string
  browseLabel?: string
  createHref?: string
  createLabel?: string
  note?: string
}

const actionStyle = {
  alignItems: 'center',
  background: 'transparent',
  border: '1px solid rgba(133, 220, 82, 0.25)',
  borderRadius: '999px',
  color: '#85dc52',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: '0.8125rem',
  fontWeight: 600,
  gap: '0.4rem',
  padding: '0.55rem 0.9rem',
  textDecoration: 'none',
} as const

export function MediaLibraryHelper({
  browseHref = '/admin/collections/media',
  browseLabel = 'Abrir Media Library',
  createHref = '/admin/collections/media/create',
  createLabel = 'Subir nueva imagen',
  note = 'Si no aparece el boton nativo del selector, usa estos accesos y luego vuelve a seleccionar la imagen aqui.',
}: MediaLibraryHelperProps) {
  const [modalMode, setModalMode] = useState<null | 'browse' | 'create'>(null)

  useEffect(() => {
    if (!modalMode) {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalMode(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [modalMode])

  const modalConfig = useMemo(() => {
    if (modalMode === 'browse') {
      return {
        href: browseHref,
        title: 'Biblioteca de imagenes',
      }
    }

    if (modalMode === 'create') {
      return {
        href: createHref,
        title: 'Crear o subir imagen',
      }
    }

    return null
  }, [browseHref, createHref, modalMode])

  return (
    <>
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gap: '0.75rem',
          marginTop: '0.75rem',
          paddingTop: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button onClick={() => setModalMode('browse')} style={actionStyle} type="button">
            {browseLabel}
          </button>
          <button onClick={() => setModalMode('create')} style={actionStyle} type="button">
            {createLabel}
          </button>
        </div>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.62)',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {note}
        </p>
      </div>

      {modalConfig ? (
        <div
          aria-modal="true"
          role="dialog"
          style={{
            alignItems: 'center',
            background: 'rgba(7, 24, 22, 0.72)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            inset: 0,
            justifyContent: 'center',
            padding: '2rem',
            position: 'fixed',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#111411',
              border: '1px solid rgba(133, 220, 82, 0.16)',
              borderRadius: '1.25rem',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
              display: 'grid',
              gap: '1rem',
              height: 'min(88vh, 980px)',
              maxWidth: '1280px',
              overflow: 'hidden',
              width: 'min(92vw, 1280px)',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
              }}
            >
              <div style={{ display: 'grid', gap: '0.25rem' }}>
                <strong style={{ fontSize: '1rem', fontWeight: 700 }}>{modalConfig.title}</strong>
                <span
                  style={{
                    color: 'rgba(255, 255, 255, 0.58)',
                    fontSize: '0.8rem',
                  }}
                >
                  Selecciona, sube o revisa archivos sin salir del formulario.
                </span>
              </div>
              <button
                aria-label="Cerrar modal de Media Library"
                onClick={() => setModalMode(null)}
                style={{
                  ...actionStyle,
                  padding: '0.45rem 0.8rem',
                }}
                type="button"
              >
                Cerrar
              </button>
            </div>

            <iframe
              src={modalConfig.href}
              style={{
                background: '#0d0f0d',
                border: 'none',
                display: 'block',
                height: '100%',
                width: '100%',
              }}
              title={modalConfig.title}
            />

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.56)',
                fontSize: '0.78rem',
                padding: '0.9rem 1.25rem 1.1rem',
              }}
            >
              Cuando termines, cierra este modal y vuelve a seleccionar la imagen en el campo.
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
