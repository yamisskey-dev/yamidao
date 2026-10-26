import type { ComponentType } from 'react'
import { Rocket, Key, Scale, CheckCircle, Circle, ExternalLink } from 'lucide-react'
import { OptimismMark } from '@/components/OptimismMark'

type Status = 'completed' | 'active' | 'planned' | 'idea'

const statusMeta: Record<Status, { label: string; badge: string; dot: string; text: string }> = {
  completed: { label: '完了', badge: 'status-badge-completed', dot: 'bg-primary', text: 'text-primary' },
  active: { label: '進行中', badge: 'status-badge-active', dot: 'bg-secondary', text: 'text-secondary' },
  planned: { label: '予定', badge: 'status-badge-pending', dot: 'bg-accent', text: 'text-accent' },
  idea: { label: '構想中', badge: 'status-badge-pending', dot: 'bg-muted-foreground', text: 'text-muted-foreground' },
}

interface Item {
  done?: boolean
  text: string
  href?: string
}

interface Phase {
  number: number
  status: Status
  year: string
  Icon: ComponentType<{ className?: string }>
  title: string
  lead: string
  items: Item[]
  tech: string[]
}

const issue = (n: number) => `https://github.com/yamisskey-dev/yamidao/issues/${n}`

// ROADMAP.md と GitHub issues の内容。文言は「これから」ページ向けにやわらかくしてある。
const phases: Phase[] = [
  {
    number: 1,
    status: 'completed',
    year: '2025',
    Icon: Rocket,
    title: 'DAO 立ち上げ',
    lead: 'メンバーの持ち出しではじまりました。投票とお金は、最初からオンチェーンに。',
    items: [
      { done: true, text: 'ウェブサイトとコミュニティの土台づくり' },
      { done: true, text: 'yamisskey-dev 継続開発' },
      { done: true, text: 'Snapshot 統合（ガス代なしで投票できるように）' },
      { done: true, text: 'Safe 統合（Optimism 上の 2/2 マルチシグで Treasury 管理）' },
    ],
    tech: ['Next.js', 'Snapshot', 'Safe', 'Optimism'],
  },
  {
    number: 2,
    status: 'active',
    year: '2026',
    Icon: Key,
    title: '認証・プライバシー',
    lead: 'ひとり 1 票を Misskey アカウントで保証し、匿名でも投票できるしくみへ。',
    items: [
      { done: true, text: 'Misskey 認証（MiAuth）でメンバーを確認' },
      { done: true, text: 'ETH ウォレット連携（1 アカウント = 1 アドレス）' },
      { done: true, text: 'Snapshot の投票権をこのサイトの API で自動判定', href: issue(4) },
      { text: 'Semaphore のゼロ知識証明で匿名投票' },
      { text: 'Optimism Retro Funding に申請', href: issue(5) },
    ],
    tech: ['MiAuth', 'SIWE', 'Cloudflare D1', 'Semaphore'],
  },
  {
    number: 3,
    status: 'planned',
    year: '2027〜',
    Icon: OptimismMark,
    title: 'フル DAO 化',
    lead: 'Snapshot のオフチェーン投票から、Optimism 上のコントラクトへ。決まったことが自動で実行される。',
    items: [
      { text: 'オンチェーン投票', href: issue(1) },
      { text: 'SBT と EAS でメンバーシップをオンチェーン証明' },
      { text: 'がんばった人への報酬をコントラクトが自動で配る' },
      { text: 'Yamix の YAMI トークン経済とつなぐ', href: issue(6) },
      { text: 'ほかのやみすきー系サーバーとの相互認証' },
    ],
    tech: ['Solidity', 'SBT', 'EAS', 'Optimism'],
  },
  {
    number: 4,
    status: 'idea',
    year: '未定',
    Icon: Scale,
    title: 'みんなで見守る',
    lead: 'Misskey サーバーの運営と DAO をひとつに。民主化するところと、すぐ動くところを分ける。',
    items: [
      { text: 'コミュニティルールの追加・変更を投票で' },
      { text: 'モデレーターの任命・信任投票' },
      { text: '異議申立てを匿名で審議し、結果はオンチェーンに' },
      { text: 'Misskey Admin API と Cloudflare Workers で投票結果を反映' },
    ],
    tech: ['Misskey API', 'Workers', 'Semaphore', 'Safe'],
  },
]

function PhaseCard({ phase }: { phase: Phase }) {
  const meta = statusMeta[phase.status]
  return (
    <div className="relative mb-12 last:mb-0">
      <div className="md:flex md:items-start md:gap-8">
        <div className="md:w-[40%] md:text-right md:pr-8">
          <div className="mb-4 md:mb-0">
            <div className={`status-badge ${meta.badge} mb-2`}>
              {phase.status === 'completed' && <CheckCircle className="h-4 w-4" />}
              {phase.status === 'active' && <span className="yami-live-dot" aria-hidden="true" />}
              {meta.label}
            </div>
            <h3 className={`text-2xl font-bold ${meta.text} mb-1`}>Phase {phase.number}</h3>
            <p className="text-sm text-muted-foreground">{phase.year}</p>
          </div>
        </div>

        <div
          className={`absolute left-8 md:left-[40%] w-6 h-6 rounded-full ${meta.dot} border-4 border-background -translate-x-1/2`}
        />

        <div className="md:w-2/5 ml-16 md:ml-0 md:pl-8">
          <div className="yami-card">
            <div className="flex items-center gap-2 mb-2">
              <phase.Icon className={`h-5 w-5 ${meta.text}`} />
              <h4 className="font-bold">{phase.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{phase.lead}</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {phase.items.map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  {item.done ? (
                    <CheckCircle className="mt-0.5 h-4 w-4 text-success shrink-0" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span>
                    {item.text}
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 inline-flex items-center gap-0.5 text-xs text-primary hover:underline"
                      >
                        #{item.href.split('/').pop()}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {phase.tech.map((t) => (
                <span key={t} className="yami-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Roadmap() {
  return (
    <section id="roadmap" className="py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12">
          <h2 className="yami-section-title">
            <span>これから</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            オフチェーンの投票からはじめて、Optimism 上のコントラクトで動く DAO へ。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {phases.map((phase) => (
              <span key={phase.number} className={`status-badge ${statusMeta[phase.status].badge}`}>
                {phase.status === 'completed' ? <CheckCircle className="h-3.5 w-3.5" /> : null}
                {phase.title}
              </span>
            ))}
          </div>
        </div>

        {/* タイムライン */}
        <div className="relative">
          <div className="absolute left-8 md:left-[40%] top-24 md:top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
          {phases.map((phase) => (
            <PhaseCard key={phase.number} phase={phase} />
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          技術構成は{' '}
          <a
            href="https://github.com/yamisskey-dev/yamidao/blob/main/ROADMAP.md"
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            ROADMAP.md
          </a>
、できていないことは{' '}
          <a
            href="https://github.com/yamisskey-dev/yamidao/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            GitHub issues
          </a>
          に。
        </p>
      </div>
    </section>
  )
}
