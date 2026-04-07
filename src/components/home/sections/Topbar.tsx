type TopbarProps = {
  supportLabel: string
  supportValue: string
  topbarText: string
}

export function Topbar({ supportLabel, supportValue, topbarText }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="container">
        <span>{topbarText}</span>
        <div className="topbar__meta">
          <small>{supportLabel}</small>
          <strong>{supportValue}</strong>
        </div>
      </div>
    </div>
  )
}
