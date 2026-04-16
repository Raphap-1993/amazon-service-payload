'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'

import { buildMediaObjectPosition } from '@/components/home/primitives/mediaObjectPosition'
import type { ProjectTileData } from '@/lib/home/types'

type ReferenceProjectGalleryProps = {
  items: ProjectTileData[]
}

function ProjectIcon() {
  return (
    <svg aria-hidden="true" className="ref-flat-icon ref-project-icon-svg" fill="none" viewBox="0 0 24 24">
      <path
        d="M2.5 12.2 9.3 10l3.3-5 2.1.7-1.1 4 4 2 3.3-1.1.7 2.1-5 3.3-2.2 6.8-1.8-.5.5-6.2-2-2-6.2.5-.5-1.8 6.8-2.2"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function getPhotoLabel(count: number) {
  return `${count} foto${count === 1 ? '' : 's'}`
}

export function ReferenceProjectGallery({ items }: ReferenceProjectGalleryProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const activeProject = activeProjectIndex !== null ? items[activeProjectIndex] : null
  const gallery = activeProject?.gallery || []
  const activeImage = gallery[activeImageIndex]
  const hasMultipleImages = gallery.length > 1

  useEffect(() => {
    if (activeProjectIndex === null) {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProjectIndex(null)
        return
      }

      if (gallery.length < 2) {
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((value) => (value + 1) % gallery.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((value) => (value - 1 + gallery.length) % gallery.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeProjectIndex, gallery.length])

  const closeModal = () => {
    setActiveProjectIndex(null)
  }

  const openProject = (index: number) => {
    setActiveImageIndex(0)
    setActiveProjectIndex(index)
  }

  const showPrevious = () => {
    setActiveImageIndex((value) => (value - 1 + gallery.length) % gallery.length)
  }

  const showNext = () => {
    setActiveImageIndex((value) => (value + 1) % gallery.length)
  }

  return (
    <>
      <div className="ref-projects-grid" role="list">
        {items.map((item, index) => {
          const hasGallery = item.gallery.length > 0

          return (
            <article className="ref-project-list-item" data-fade-up="true" key={item.title} role="listitem">
              {hasGallery ? (
                <button
                  aria-label={`Ver galería de ${item.title}`}
                  className="ref-project-card ref-project-card-button"
                  onClick={() => openProject(index)}
                  type="button"
                >
                  <div className="ref-project-card-top">
                    <div className="ref-project-icon">
                      <ProjectIcon />
                    </div>
                    <span className="ref-project-count-badge">{getPhotoLabel(item.gallery.length)}</span>
                  </div>
                  <div className="ref-project-name">{item.title}</div>
                  <div className="ref-project-detail">{item.detail}</div>
                  <div className="ref-project-footer">
                    <span className="ref-project-footer-cta">Ver galería</span>
                  </div>
                </button>
              ) : (
                <div className="ref-project-card">
                  <div className="ref-project-card-top">
                    <div className="ref-project-icon">
                      <ProjectIcon />
                    </div>
                  </div>
                  <div className="ref-project-name">{item.title}</div>
                  <div className="ref-project-detail">{item.detail}</div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {activeProject && activeImage?.url ? (
        <div aria-modal="true" className="ref-project-modal" role="dialog" aria-labelledby="project-gallery-title">
          <button aria-label="Cerrar galería" className="ref-project-modal-backdrop" onClick={closeModal} type="button" />
          <div className="ref-project-modal-panel">
            <div className="ref-project-modal-header">
              <div className="ref-project-modal-copy">
                <div className="ref-project-modal-detail">{activeProject.detail}</div>
                <h3 className="ref-project-modal-title" id="project-gallery-title">
                  {activeProject.title}
                </h3>
                <div className="ref-project-modal-counter">
                  {activeImageIndex + 1} / {gallery.length} · {getPhotoLabel(gallery.length)}
                </div>
              </div>
              <button className="ref-project-modal-close" onClick={closeModal} type="button">
                Cerrar
              </button>
            </div>

            <div className="ref-project-modal-body">
              {hasMultipleImages ? (
                <button
                  aria-label="Foto anterior"
                  className="ref-project-modal-nav ref-project-modal-nav-prev"
                  onClick={showPrevious}
                  type="button"
                >
                  Anterior
                </button>
              ) : null}

              <div className="ref-project-modal-stage">
                <div className="ref-project-modal-image-shell">
                  <img
                    alt={activeImage.alt}
                    className="ref-project-modal-image"
                    src={activeImage.url}
                    style={buildMediaObjectPosition(activeImage.focalX, activeImage.focalY)}
                  />
                </div>
                {activeImage.caption ? <p className="ref-project-modal-caption">{activeImage.caption}</p> : null}
              </div>

              {hasMultipleImages ? (
                <button
                  aria-label="Foto siguiente"
                  className="ref-project-modal-nav ref-project-modal-nav-next"
                  onClick={showNext}
                  type="button"
                >
                  Siguiente
                </button>
              ) : null}
            </div>

            {hasMultipleImages ? (
              <div className="ref-project-modal-thumbs" role="list" aria-label="Miniaturas de la galería">
                {gallery.map((image, index) =>
                  image.url ? (
                    <button
                      aria-label={`Ver foto ${index + 1}`}
                      className={`ref-project-modal-thumb ${index === activeImageIndex ? 'is-active' : ''}`}
                      key={`${image.url}-${index}`}
                      onClick={() => setActiveImageIndex(index)}
                      type="button"
                    >
                      <img
                        alt=""
                        aria-hidden="true"
                        className="ref-project-modal-thumb-image"
                        src={image.url}
                        style={buildMediaObjectPosition(image.focalX, image.focalY)}
                      />
                    </button>
                  ) : null,
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
