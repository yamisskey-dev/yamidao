import type { LucideIcon } from 'lucide-react'
import { Landmark, Coins, EyeOff, Blocks, DoorOpen, Scale, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Section } from './Section'

type Status = 'active' | 'preparing' | 'planned'

const statusLabel: Record<Status, { text: string; className: string }> = {
  active: { text: '進行中', className: 'status-badge status-badge-active' },
  preparing: { text: '準備中', className: 'status-badge status-badge-completed' },
  planned: { text: '構想中', className: 'status-badge status-badge-pending' },
}

interface VisionItem {
  Icon: LucideIcon
  status: Status
  title: string
  description: React.ReactNode
  links: { label: string; href: string }[]
}

// GitHub issues と ROADMAP.md に書いてある展望を、ひとつずつカードにする。
const items: VisionItem[] = [
  {
    Icon: Landmark,
    status: 'preparing',
    title: 'Optimism の公共財になる',
    description: (
      <>
        Optimism の <strong>Retro Funding</strong> は「すでに役に立った公共財に、あとから報いる」しくみ。
        Optimism 上で動く非営利のメンタルヘルス OSS として、インパクトを示して申請をめざします。
      </>
    ),
    links: [
      { label: 'issue #5', href: 'https://github.com/yamisskey-dev/yamidao/issues/5' },
      { label: 'Retro Funding', href: 'https://community.optimism.io/docs/governance/get-a-grant/' },
    ],
  },
  {
    Icon: Coins,
    status: 'active',
    title: '「承認」を経済にする',
    description: (
      <>
        Yamix は menhera.jp の精神を継ぐ人生相談。気持ちを受け止める「承認」を <strong>YAMI トークン</strong>
        にして、相談する人と答える人のあいだで循環させます。ためこむと減る、減価通貨の設計。
      </>
    ),
    links: [
      { label: 'Yamix', href: 'https://mix.yami.ski' },
      { label: 'issue #6', href: 'https://github.com/yamisskey-dev/yamidao/issues/6' },
    ],
  },
  {
    Icon: EyeOff,
    status: 'preparing',
    title: '匿名でも、ひとり 1 票',
    description: (
      <>
        ゼロ知識証明（<strong>Semaphore</strong>）で、メンバーであることだけを証明して投票。
        「誰が何に入れたか」を誰も追えないから、センシティブな議題でも率直に決められます。
      </>
    ),
    links: [{ label: 'ROADMAP.md', href: 'https://github.com/yamisskey-dev/yamidao/blob/main/ROADMAP.md' }],
  },
  {
    Icon: Blocks,
    status: 'planned',
    title: 'コントラクトで動く DAO',
    description: (
      <>
        Snapshot のオフチェーン投票から、<strong>Optimism 上のオンチェーン投票</strong>へ。
        SBT でメンバーシップを証明し、可決した報酬はコントラクトが自動で配ります。
      </>
    ),
    links: [{ label: 'issue #1', href: 'https://github.com/yamisskey-dev/yamidao/issues/1' }],
  },
  {
    Icon: DoorOpen,
    status: 'active',
    title: 'だれでも入れる DAO',
    description: (
      <>
        手作業のホワイトリストはやめました。Misskey 認証だけで投票権が付くように。
        つぎは、やみすきー以外のサーバーからも参加できるしくみへ。
      </>
    ),
    links: [{ label: 'issue #4', href: 'https://github.com/yamisskey-dev/yamidao/issues/4' }],
  },
  {
    Icon: Scale,
    status: 'planned',
    title: 'モデレーションをみんなで',
    description: (
      <>
        ルールは投票で決める。緊急対応は運営が即時に。異議申立ては匿名で審議して、結果はオンチェーンに。
        「完全民主制」と「安全」を両立する 3 層モデル。
      </>
    ),
    links: [{ label: 'これから', href: '/roadmap' }],
  },
]

export function Vision() {
  return (
    <Section id="vision" title="めざすところ" dots>
      <p className="mx-auto -mt-4 mb-8 max-w-2xl text-center text-sm text-muted-foreground">
        Optimism の上で、メンタルヘルスの公共財をつくる。できていないことも、ぜんぶ issue に書いてあります。
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, status, title, description, links }) => (
          <article key={title} className="yami-acrylic flex flex-col gap-3 px-6 py-7">
            <div className="flex items-center justify-between">
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <span className={statusLabel[status].className}>{statusLabel[status].text}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="flex-1 text-sm leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-2">
              {links.map(({ label, href }) =>
                href.startsWith('/') ? (
                  <Link key={href} href={href} className="yami-chip no-underline">
                    {label}
                  </Link>
                ) : (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="yami-chip no-underline">
                    {label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ),
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
