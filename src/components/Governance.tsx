import { Vote, ExternalLink, Shield, Wallet, Scale } from 'lucide-react'

export function Governance() {
  return (
    <section id="governance" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Governance</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            透明で分散型の意思決定と資金管理
          </p>
        </div>

        {/* 意思決定方針 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">意思決定方針</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">投票ルール</h4>
              <p className="text-sm text-muted-foreground">
                1人1票、平等な投票権。トークン保有量による重み付けはありません。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">提案プロセス</h4>
              <p className="text-sm text-muted-foreground">
                現在ホワイトリスト制。Misskey認証によるSybil対策後、自動で追加予定。
              </p>
            </div>
          </div>
        </div>

        {/* 資金運用方針 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-6 w-6 text-accent" />
            <h3 className="text-lg font-semibold">資金運用方針</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">完全非営利</h4>
              <p className="text-sm text-muted-foreground">
                収益化・見返り・特典は一切なし。支援の有無による待遇差もありません。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">資金の使途</h4>
              <p className="text-sm text-muted-foreground">
                インフラ費・開発者報酬・コミュニティ支援に使用。Snapshotで決定。
              </p>
            </div>
          </div>
        </div>

        {/* Snapshot + Treasury 並列表示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          {/* Snapshot */}
          <div className="dao-card glass">
            <div className="flex items-center gap-3 mb-4">
              <Vote className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Snapshot</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              ガス代無料のオフチェーン投票。1人1票で提案・投票ができます。
            </p>
            <a
              href="https://snapshot.org/#/s:yamidao.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Snapshot
            </a>
          </div>

          {/* Treasury */}
          <div className="dao-card glass">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-secondary" />
              <h3 className="text-lg font-semibold">Treasury</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Safeマルチシグウォレットで全取引履歴を公開しています。
            </p>
            <a
              href="https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Safe
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
