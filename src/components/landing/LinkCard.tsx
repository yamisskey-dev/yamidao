import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface LinkCardProps {
  Icon: LucideIcon
  title: string
  href: string
  description?: string
}

// やみはぶの ServiceCard 相当。細い罫線のカード全体がリンク。
export function LinkCard({ Icon, title, href, description }: LinkCardProps) {
  const external = /^[a-z][a-z0-9+.-]*:/i.test(href)
  const Arrow = external ? ExternalLink : ArrowRight

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="yami-card flex flex-col gap-2 !p-5 no-underline text-inherit"
    >
      <span className="flex items-center gap-2 text-lg font-bold text-foreground">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        <span>{title}</span>
        <Arrow className="ml-auto h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </span>
      {description && <span className="text-sm leading-relaxed text-muted-foreground">{description}</span>}
    </a>
  )
}
