import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { SectionHeading } from '../primitives/SectionHeading'

type ContactSectionProps = {
  section: HomePageData['contactSection']
}

export function ContactSection({ section }: ContactSectionProps) {
  return (
    <section className="section section--light section--contact" id="contacto">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
          />

          <div className="contact-card-grid">
            {section.cards.map((item) => (
              <article className="contact-card" key={`${item.label}-${item.value}`}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
                {item.href ? (
                  <ActionLink
                    className="card-link"
                    link={{ href: item.href, label: item.hrefLabel, variant: 'secondary' }}
                  />
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <form className="contact-form">
          <div className="contact-form__header">
            <h3>{section.formTitle}</h3>
            <p>{section.formDescription}</p>
          </div>

          <label className="form-field">
            <span>Nombre</span>
            <input autoComplete="name" name="name" placeholder="Tu nombre o empresa" type="text" />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input autoComplete="email" name="email" placeholder="correo@empresa.com" type="email" />
          </label>

          <label className="form-field">
            <span>Teléfono</span>
            <input autoComplete="tel" name="phone" placeholder="+00 000 000 000" type="tel" />
          </label>

          <label className="form-field">
            <span>Mensaje</span>
            <textarea name="message" placeholder="Cuéntanos brevemente tu requerimiento." rows={5} />
          </label>

          <button className="button-link button-link--primary contact-form__submit" type="button">
            {section.formButtonLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
