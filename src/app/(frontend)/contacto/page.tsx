import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.contact.metadata
export const revalidate = 60

export default async function ContactPage() {
  const chrome = await getHomePageData()
  const page = staticPages.contact

  return (
    <PageShell chrome={chrome}>
      <PageHero {...page.hero} />

      <section className="section section--light">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="Canales directos para consulta comercial y tecnica, con salida clara y empresarial."
              eyebrow="Canales"
              title="Informacion de contacto"
            />
            <div className="page-card-stack">
              {page.contactCards.map((item) => (
                <article className="page-card" key={item.title}>
                  <div className="card-meta">{item.meta}</div>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                  {item.link ? <ActionLink className="card-link" link={item.link} /> : null}
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              description="Formulario inicial para ordenar la consulta y dejar claro el requerimiento tecnico o comercial."
              eyebrow="Formulario"
              title="Solicitud inicial"
            />
            <form className="contact-form contact-form--page">
              <label className="form-field">
                <span>Nombre</span>
                <input autoComplete="name" name="name" placeholder="Tu nombre o empresa" type="text" />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input autoComplete="email" name="email" placeholder="correo@empresa.com" type="email" />
              </label>
              <label className="form-field">
                <span>Asunto</span>
                <input name="subject" placeholder="Tipo de requerimiento" type="text" />
              </label>
              <label className="form-field">
                <span>Mensaje</span>
                <textarea name="message" placeholder="Describe brevemente la necesidad de tu aeronave." rows={6} />
              </label>
              <button className="button-link button-link--primary contact-form__submit" type="button">
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="page-strip">
            <div>
              <div className="page-strip__label">Antes de enviar</div>
              <h2>Comparte la informacion clave para orientar mejor la primera respuesta.</h2>
            </div>
            <ul className="page-list page-list--compact">
              {page.notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
