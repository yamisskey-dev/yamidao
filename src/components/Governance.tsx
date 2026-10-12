import { Vote, ExternalLink, Shield, Wallet, Scale, Eye } from 'lucide-react'

const actions = [
  {
    Icon: Vote,
    title: 'きめる',
    description: 'ガス代なしで投票できます',
    label: 'Snapshot',
    href: 'https://snapshot.org/#/s:yamidao.eth',
  },
  {
    Icon: Shield,
    title: 'まもる',
    description: 'みんなの承認で動かすお金の管理',
    label: 'Safe',
    href: 'https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2',
  },
  {
    Icon: Eye,
    title: 'みる',
    description: 'お金の流れはぜんぶ公開されています',
    label: 'Etherscan',
    href: 'https://etherscan.io/name-lookup-search?id=yami.eth',
  },
]

export function Governance() {
  return (
    <section id="governance" className="py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12">
          <h2 className="yami-section-title">
            <span>しくみ</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">みんなで決めて、みんなで守る</p>
        </div>

        {/* 意思決定方針 */}
        <div className="yami-card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold">きめかた</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2">投票のルール</h4>
              <p className="text-sm text-muted-foreground">
                ひとり1票。トークンをたくさん持っていても、投票の重さは同じです。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">なりすまし対策</h4>
              <p className="text-sm text-muted-foreground">
                Misskey認証とETHウォレット連携で、ひとり1票をまもっています。投票のときに自動で確認します。
              </p>
            </div>
          </div>
        </div>

        {/* 資金運用方針 */}
        <div className="yami-card mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold">お金のつかいかた</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2">非営利です</h4>
              <p className="text-sm text-muted-foreground">
                もうけも、見返りも、特典もなし。支援してもしなくても、みんな同じです。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">なにに使うの？</h4>
              <p className="text-sm text-muted-foreground">
                サーバー代・開発や運営の報酬・コミュニティのために使います。つかいみちはSnapshotでみんなが決めます。
              </p>
            </div>
          </div>
        </div>

        {/* Snapshot + Treasury + 透明性 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map(({ Icon, title, description, label, href }) => (
            <div key={href} className="yami-card flex flex-col items-center text-center">
              <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-primary/15 text-primary mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-5 flex-1">{description}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className="yami-btn yami-btn-accent w-full">
                <ExternalLink className="h-4 w-4" />
                {label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
