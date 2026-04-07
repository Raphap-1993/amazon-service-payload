import type { HomePageData } from '@/lib/home/types'

type StatsBarProps = {
  items: HomePageData['stats']
}

export function StatsBar({ items }: StatsBarProps) {
  return (
    <section className="stats-bar" aria-label="Métricas de confianza">
      <div className="container">
        {items.map((item) => (
          <div className="metric" key={`${item.label}-${item.value}`}>
            <strong>{item.value}</strong>
            <div className="metric-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
