import Link from 'next/link'

import type { LinkData } from '@/lib/home/types'

type LinkTone = 'default' | 'contrast' | 'subtle'
type LinkSize = 'sm' | 'md' | 'lg'

type ActionLinkProps = {
  ariaCurrent?: 'page'
  children?: React.ReactNode
  className?: string
  leadingIcon?: React.ReactNode
  link: LinkData
  size?: LinkSize
  tone?: LinkTone
  trailingIcon?: React.ReactNode
}

const isInternalHref = (href: string) => href.startsWith('/') || href.startsWith('#')
const isExternalHref = (href: string) => href.startsWith('http://') || href.startsWith('https://')

function buildActionLinkClassName(
  className: string | undefined,
  link: LinkData,
  tone: LinkTone,
  size: LinkSize,
) {
  if (className) {
    return className
  }

  const variantClassName = link.variant === 'secondary' ? 'button-link--secondary' : 'button-link--primary'
  const toneClassName =
    tone === 'contrast'
      ? 'button-link--contrast'
      : tone === 'subtle'
        ? 'button-link--subtle'
        : 'button-link--default'
  const sizeClassName = `button-link--${size}`

  return ['button-link', variantClassName, toneClassName, sizeClassName].join(' ')
}

export function ActionLink({
  ariaCurrent,
  children,
  className,
  leadingIcon,
  link,
  size = 'md',
  tone = 'default',
  trailingIcon,
}: ActionLinkProps) {
  const content = children ?? link.label
  const resolvedClassName = buildActionLinkClassName(className, link, tone, size)
  const isButtonStyle = !className

  if (isInternalHref(link.href)) {
    return (
      <Link
        aria-current={ariaCurrent}
        className={resolvedClassName}
        data-action-link={isButtonStyle ? 'true' : undefined}
        data-link-size={size}
        data-link-tone={tone}
        data-link-variant={link.variant || 'primary'}
        href={link.href}
      >
        {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
        {content}
        {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
      </Link>
    )
  }

  return (
    <a
      aria-current={ariaCurrent}
      className={resolvedClassName}
      data-action-link={isButtonStyle ? 'true' : undefined}
      data-link-size={size}
      data-link-tone={tone}
      data-link-variant={link.variant || 'primary'}
      href={link.href}
      rel={isExternalHref(link.href) ? 'noreferrer noopener' : undefined}
      target={isExternalHref(link.href) ? '_blank' : undefined}
    >
      {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
      {content}
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </a>
  )
}
