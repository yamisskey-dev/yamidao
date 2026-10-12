import { Shield, Users, Heart, Server, Code, Vote, Layers } from 'lucide-react'

interface ValueCardProps {
  Icon: typeof Heart
  tone: 'primary' | 'secondary' | 'accent'
  title: string
  description: string
}

const toneClass = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
}

function ValueCard({ Icon, tone, title, description }: ValueCardProps) {
  return (
    <div className="yami-card">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`h-5 w-5 shrink-0 ${toneClass[tone]}`} />
        <h4 className="font-bold">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function AboutDAO() {
  return (
    <section id="about" className="py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12">
          <h2 className="yami-section-title">
            <span>わたしたちについて</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            <a
              href="https://hub.yami.ski/guides/ecosystem/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              YAMIエコシステム
            </a>
            のガバナンスDAO。みんなの居場所を、みんなで支えるしくみ。
          </p>
        </div>

        {/* コアバリュー（階層型） */}
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          たいせつにしていること
        </h3>
        <div className="mb-12 rounded-2xl border border-border overflow-hidden">
          {/* 上層: 目指すもの */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ValueCard Icon={Heart} tone="accent" title="メンタルファースト" description="つかう人のこころの安全がいちばん" />
            <ValueCard Icon={Shield} tone="primary" title="プライバシーファースト" description="個人情報をあつめない設計" />
          </div>
          {/* 下層: それを実現する手段 */}
          <div className="p-4 bg-muted/60 border-t border-dashed border-border">
            <ValueCard
              Icon={Users}
              tone="secondary"
              title="コミュニティ主導"
              description="みんなで決めるから、こころもプライバシーも守れる"
            />
          </div>
        </div>

        {/* 組織構成 */}
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          なりたち
        </h3>
        <div className="rounded-2xl border border-border overflow-hidden">
          {/* 上層: Operations */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ValueCard Icon={Server} tone="primary" title="やみすきー運営部" description="サーバーの運営と見守り" />
            <ValueCard Icon={Code} tone="accent" title="yamisskey-dev" description="開発とものづくり" />
          </div>
          {/* 下層: Foundation */}
          <div className="p-4 bg-muted/60 border-t border-dashed border-border">
            <ValueCard
              Icon={Vote}
              tone="secondary"
              title="YAMI DAO"
              description="お金のこと・だいじな方針・こまったときの対応"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
