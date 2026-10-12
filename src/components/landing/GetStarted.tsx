import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from './Section'

const items = [
  { icon: '🌙', title: 'YAMI DAO を知る', label: 'わたしたちについて', href: '/about' },
  { icon: '🗳️', title: '決めかたを読む', label: 'しくみ', href: '/governance' },
  { icon: '🛤️', title: 'これからを見る', label: 'これから', href: '/roadmap' },
  { icon: '🚪', title: 'メンバーになる', label: 'はいる', href: '/join' },
]

export function GetStarted() {
  return (
    <Section id="get-started" title="はじめる">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {items.map((item) => (
          <div key={item.href} className="yami-acrylic flex flex-col items-center gap-3 px-6 py-10 text-center">
            <div className="text-4xl leading-none" aria-hidden="true">
              {item.icon}
            </div>
            <b className="text-lg text-foreground">{item.title}</b>
            <Link href={item.href} className="yami-btn yami-btn-accent mt-2">
              {item.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}
