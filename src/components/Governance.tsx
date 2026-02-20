import { Vote, ExternalLink, Shield, Wallet, Scale } from 'lucide-react'

export function Governance() {
  return (
    <section id="governance" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">しくみ</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            みんなで決めて、みんなで守る
          </p>
        </div>

        {/* 意思決定方針 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">きめかた</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">投票のルール</h4>
              <p className="text-sm text-muted-foreground">
                ひとり1票。トークンをたくさん持っていても、投票の重さは同じです。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">なりすまし対策</h4>
              <p className="text-sm text-muted-foreground">
                Misskey認証とETHウォレット連携で、ひとり1票をまもっています。投票のときに自動で確認します。
              </p>
            </div>
          </div>
        </div>

        {/* 資金運用方針 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-6 w-6 text-accent" />
            <h3 className="text-lg font-semibold">お金のつかいかた</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">非営利です</h4>
              <p className="text-sm text-muted-foreground">
                もうけも、見返りも、特典もなし。支援してもしなくても、みんな同じです。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">なにに使うの？</h4>
              <p className="text-sm text-muted-foreground">
                サーバー代・開発や運営の報酬・コミュニティのために使います。つかいみちはSnapshotでみんなが決めます。
              </p>
            </div>
          </div>
        </div>

        {/* Snapshot + Treasury 並列表示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          {/* きめる */}
          <div className="dao-card hover-lift">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Vote className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">きめる</h3>
              <p className="text-muted-foreground text-sm mb-4">
                ガス代なしで投票できます
              </p>
              <a
                href="https://snapshot.org/#/s:yamidao.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Snapshot
              </a>
            </div>
          </div>

          {/* まもる */}
          <div className="dao-card hover-lift">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">まもる</h3>
              <p className="text-muted-foreground text-sm mb-4">
                みんなの承認で動かすお金の管理
              </p>
              <a
                href="https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Safe
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
