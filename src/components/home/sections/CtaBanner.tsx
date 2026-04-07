import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'

type CtaBannerProps = {
  section: HomePageData['ctaBanner']
}

export function CtaBanner({ section }: CtaBannerProps) {
  return (
    <section className="cta-wrap cta-wrap--featured">
      <div className="container">
        <div className="cta-banner">
          <h2>{section.title}</h2>
          <p>{section.description}</p>

          <div className="cta-banner__actions">
            {section.actions.map((link) => (
              <ActionLink key={`${link.label}-${link.href}`} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
