type SectionHeadingProps = {
  align?: 'center' | 'left'
  description?: string
  eyebrow?: string
  title: string
}

export function SectionHeading({
  align = 'left',
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading--center' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
