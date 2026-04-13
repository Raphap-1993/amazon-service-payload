export default function FrontendLoading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="loading-shell"
      id="contenido-principal"
      tabIndex={-1}
    >
      <span className="sr-only">Cargando contenido publico</span>

      <div className="loading-topbar">
        <div className="container loading-topbar__inner">
          <div className="loading-line loading-line--long" />
          <div className="loading-pill loading-pill--meta" />
        </div>
      </div>

      <div className="loading-header">
        <div className="container loading-header__inner">
          <div className="loading-brand" />
          <div className="loading-nav">
            <div className="loading-pill" />
            <div className="loading-pill" />
            <div className="loading-pill" />
          </div>
        </div>
      </div>

      <section className="loading-hero">
        <div className="container loading-hero__grid">
          <div className="loading-card loading-card--copy">
            <div className="loading-line loading-line--eyebrow" />
            <div className="loading-line loading-line--title" />
            <div className="loading-line loading-line--title loading-line--title-alt" />
            <div className="loading-line loading-line--body" />
            <div className="loading-line loading-line--body loading-line--medium" />
            <div className="loading-actions">
              <div className="loading-pill loading-pill--cta" />
              <div className="loading-pill loading-pill--cta loading-pill--secondary" />
            </div>
          </div>

          <div className="loading-card loading-card--visual" />
        </div>
      </section>

      <section className="section">
        <div className="container loading-grid">
          <div className="loading-card loading-card--block" />
          <div className="loading-card loading-card--block" />
          <div className="loading-card loading-card--block" />
        </div>
      </section>
    </main>
  )
}
