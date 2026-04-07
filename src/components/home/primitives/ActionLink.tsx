import Link from 'next/link'

import type { LinkData } from '@/lib/home/types'

type ActionLinkProps = {
  children?: React.ReactNode
  className?: string
  link: LinkData
}

const isInternalHref = (href: string) => href.startsWith('/') || href.startsWith('#')
const isExternalHref = (href: string) => href.startsWith('http://') || href.startsWith('https://')

export function ActionLink({ children, className, link }: ActionLinkProps) {
  const content = children ?? link.label
  const resolvedClassName =
    className ||
    `button-link ${link.variant === 'secondary' ? 'button-link--secondary' : 'button-link--primary'}`

  if (isInternalHref(link.href)) {
    return (
      <Link className={resolvedClassName} href={link.href}>
        {content}
      </Link>
    )
  }

  return (
    <a
      className={resolvedClassName}
      href={link.href}
      rel={isExternalHref(link.href) ? 'noreferrer' : undefined}
      target={isExternalHref(link.href) ? '_blank' : undefined}
    >
      {content}
    </a>
  )
}
