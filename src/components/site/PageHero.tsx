import type { LinkData } from '@/lib/home/types'

import { ActionLink } from '@/components/home/primitives/ActionLink'

type PageHeroProps = {
  actions?: LinkData[]
  badges?: string[]
  description: string
  eyebrow: string
  title: string
}

export function PageHero({ actions = [], badges = [], description, eyebrow, title }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero__description">{description}</p>

          {actions.length > 0 ? (
            <div className="page-hero__actions">
              {actions.map((action) => (
                <ActionLink key={`${action.label}-${action.href}`} link={action} />
              ))}
            </div>
          ) : null}
        </div>

        <aside className="page-hero__panel">
          <div className="page-hero__panel-label">Datos clave</div>
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
