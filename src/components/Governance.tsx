import { Vote, ExternalLink, Wallet, TrendingUp, Server, Code, Users } from 'lucide-react'

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

        {/* Snapshot投票 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Vote className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Snapshot</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                ガス代無料のオフチェーン投票。1人1票で提案・投票ができます。
              </p>
            </div>
            <a
              href="https://snapshot.org/#/s:yamidao.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2 shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
              Snapshot
            </a>
          </div>
        </div>

        {/* 運用方針 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-6 w-6 text-secondary" />
            <h3 className="text-lg font-semibold">完全非営利</h3>
          </div>
          <p className="text-muted-foreground">
            収益化・見返り・特典は一切なし。すべての資金はSnapshotでの投票を経て使途が決定されます。
          </p>
        </div>

        {/* 資金の使途 */}
        <div className="mb-12 animate-fade-in-up">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            資金の使途
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="dao-card hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <Server className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">インフラ費用</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                サーバー・ドメイン・ストレージ
              </p>
            </div>
            <div className="dao-card hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <Code className="h-5 w-5 text-success" />
                <h4 className="font-semibold">開発者報酬</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                コントリビューターへの報酬
              </p>
            </div>
            <div className="dao-card hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-accent" />
                <h4 className="font-semibold">コミュニティ支援</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                イベント・ドキュメント・翻訳
              </p>
            </div>
          </div>
        </div>

        {/* Safeへのリンク */}
        <div className="dao-card glass animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Treasury</h3>
              <p className="text-sm text-muted-foreground">
                Safeマルチシグウォレットで全取引履歴を公開
              </p>
            </div>
            <a
              href="https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2 shrink-0"
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
