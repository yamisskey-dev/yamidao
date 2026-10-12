import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Users, MessageSquare, Cloud, Vote, Shield, KeyRound, Eye } from 'lucide-react'

const pageLinks = [
  { href: '/about', label: 'わたしたちについて' },
  { href: '/governance', label: 'しくみ' },
  { href: '/roadmap', label: 'これから' },
  { href: '/join', label: 'はいる' },
]

const communityLinks = [
  { href: 'https://yami.ski', label: 'Misskey', Icon: Cloud },
  { href: 'https://discord.gg/WMgzEBvr8b', label: 'Discord', Icon: MessageCircle },
  { href: 'https://vrc.group/YMSKY.5787', label: 'VRChat', Icon: Users },
  { href: 'https://chat.yami.ski', label: 'Element', Icon: MessageSquare },
]

const governanceLinks = [
  { href: 'https://snapshot.org/#/s:yamidao.eth', label: 'Snapshot', Icon: Vote },
  {
    href: 'https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2',
    label: 'Safe',
    Icon: Shield,
  },
  { href: 'https://guild.xyz/yami', label: 'Guild', Icon: KeyRound },
  { href: 'https://etherscan.io/name-lookup-search?id=yami.eth', label: 'Etherscan', Icon: Eye },
]

const linkClass = 'inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* ロゴ・説明 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold">YAMI DAO</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">オープンメンタルヘルス</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">ページ</h4>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">コミュニティ</h4>
            <ul className="space-y-2">
              {communityLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">ガバナンス</h4>
            <ul className="space-y-2">
              {governanceLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">© {currentYear} YAMI DAO</p>
      </div>
    </footer>
  )
}
