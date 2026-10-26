import { Cloud, HeartHandshake, MessageCircleQuestion, Lock, FileText, Newspaper, Flag, MessageCircle, Compass } from 'lucide-react'
import { Section } from './Section'
import { LinkCard } from './LinkCard'

// やみはぶ (hub.yami.ski/guides/ecosystem) のサービス一覧から。DAO はこれら全部のサーバー代と方針を持つ。
const services = [
  { Icon: Cloud, title: 'Misskey', href: 'https://yami.ski', description: '病んでいい場所。闇でいい場所。エコシステムの中心' },
  { Icon: HeartHandshake, title: 'Yamix', href: 'https://mix.yami.ski', description: 'AI と人間が対等に答える人生相談' },
  { Icon: MessageCircleQuestion, title: 'Neo Quesdon', href: 'https://neo-quesdon.yami.ski', description: 'Fediverse 連携の匿名質問箱' },
  { Icon: Lock, title: 'Element', href: 'https://chat.yami.ski', description: 'E2EE の分散型チャット（Matrix）' },
  { Icon: FileText, title: 'CryptPad', href: 'https://pad.yami.ski', description: 'E2EE で共同編集できるオフィス' },
  { Icon: Newspaper, title: 'EmDash', href: 'https://dash.yami.ski', description: 'プラットフォームに依存しない発信' },
  { Icon: Flag, title: 'CTFd', href: 'https://ctf.yami.ski', description: 'セキュリティを学ぶ CTF' },
  { Icon: MessageCircle, title: 'Discord', href: 'https://discord.gg/WMgzEBvr8b', description: '雑談・通話・ゲームの溜まり場' },
  { Icon: Compass, title: 'やみはぶ', href: 'https://hub.yami.ski/guides/ecosystem/', description: 'ぜんぶのサービスと使い方はこちら' },
]

export function Ecosystem() {
  return (
    <Section id="ecosystem" title="DAO が支えるもの">
      <p className="mx-auto -mt-4 mb-8 max-w-2xl text-center text-sm text-muted-foreground">
        ここに並ぶサービスのサーバー代・方針・困ったときの判断を、YAMI DAO が持っています。
        ぜんぶオープンソースで、ぜんぶノーログ。
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <LinkCard key={s.href} {...s} />
        ))}
      </div>
    </Section>
  )
}
