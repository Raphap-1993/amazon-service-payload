import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'

type SiteFooterProps = {
  brand: HomePageData['brand']
  footer: HomePageData['footer']
}

export function SiteFooter({ brand, footer }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-brand">
            <strong>{brand.name}</strong>
            <span>{brand.tagline}</span>
            <p className="body-copy">{footer.summary}</p>
            <div className="footer-badge">{footer.badge}</div>
          </div>

          <div className="footer-column">
            <div className="footer-column__label">Navegación</div>
            <div className="footer-links">
              {footer.navigation.map((item) => (
                <ActionLink className="footer-link" key={`${item.label}-${item.href}`} link={item} />
              ))}
            </div>
          </div>

          <div className="footer-column">
            <div className="footer-column__label">Contacto</div>
            <div className="footer-links">
              {footer.contact.map((item) =>
                item.href ? (
                  <ActionLink
                    className="footer-link"
                    key={`${item.label}-${item.value}`}
                    link={{ href: item.href, label: `${item.label}: ${item.value}` }}
                  />
                ) : (
                  <p className="footer-link footer-link--static" key={`${item.label}-${item.value}`}>
                    {item.label}: {item.value}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>{footer.copy}</div>
          <div className="footer-bottom__legal">
            {footer.legal.map((item) => (
              <ActionLink className="footer-link" key={`${item.label}-${item.href}`} link={item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
