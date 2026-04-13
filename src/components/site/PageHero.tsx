import type { LinkData } from '@/lib/home/types'

import { ActionLink } from '@/components/home/primitives/ActionLink'

type PageHeroProps = {
  actions?: LinkData[]
  badges?: string[]
  description: string
  eyebrow: string
  panelLabel?: string
  panelTone?: 'default' | 'glass' | 'contrast'
  variant?: 'default' | 'compact' | 'feature'
  title: string
}

export function PageHero({
  actions = [],
  badges = [],
  description,
  eyebrow,
  panelLabel = 'Datos clave',
  panelTone = 'contrast',
  variant = 'default',
  title,
}: PageHeroProps) {
  const isCompact = variant === 'compact'
  const heroClassName = ['page-hero', `page-hero--${variant}`].join(' ')
  const panelClassName = ['page-hero__panel', `page-hero__panel--${panelTone}`].join(' ')

  return (
    <section className={heroClassName} data-page-hero-variant={variant}>
      <div className="container page-hero__grid" data-page-hero-layout={isCompact ? 'compact' : 'default'}>
        <header className="page-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero__description" data-page-hero-description>
            {description}
          </p>

          {actions.length > 0 ? (
            <div className="page-hero__actions" data-page-hero-actions>
              {actions.map((action, index) => (
                <ActionLink
                  key={`${action.label}-${action.href}`}
                  link={action}
                  size={index === 0 ? 'lg' : 'md'}
                  tone={index === 0 ? 'default' : 'contrast'}
                />
              ))}
            </div>
          ) : null}
        </header>

        <aside
          className={panelClassName}
          aria-label={`${panelLabel} de la pagina`}
          data-page-hero-panel-tone={panelTone}
        >
          <div className="page-hero__panel-label">{panelLabel}</div>
          <div className="page-meta-list">
            {badges.map((badge) => (
              <div className="page-meta-chip" key={badge}>
                {badge}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
