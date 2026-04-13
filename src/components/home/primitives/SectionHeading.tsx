type SectionHeadingProps = {
  align?: 'center' | 'left'
  className?: string
  description?: string
  descriptionAs?: 'div' | 'p'
  eyebrow?: string
  eyebrowAs?: 'p' | 'span'
  tone?: 'default' | 'contrast' | 'muted'
  title: string
  titleAs?: 'h2' | 'h3'
}

export function SectionHeading({
  align = 'left',
  className,
  description,
  descriptionAs = 'p',
  eyebrow,
  eyebrowAs = 'p',
  tone = 'default',
  title,
  titleAs = 'h2',
}: SectionHeadingProps) {
  const Wrapper = titleAs
  const DescriptionWrapper = descriptionAs
  const EyebrowWrapper = eyebrowAs

  return (
    <div
      className={[
        'section-heading',
        align === 'center' ? 'section-heading--center' : '',
        tone !== 'default' ? `section-heading--${tone}` : '',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-heading-align={align}
      data-heading-tone={tone}
    >
      {eyebrow ? (
        <EyebrowWrapper className="eyebrow" data-heading-eyebrow>
          {eyebrow}
        </EyebrowWrapper>
      ) : null}
      <Wrapper data-heading-title>{title}</Wrapper>
      {description ? (
        <DescriptionWrapper className="section-heading__description" data-heading-description>
          {description}
        </DescriptionWrapper>
      ) : null}
    </div>
  )
}
