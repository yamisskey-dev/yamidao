import { Vote, ExternalLink, Github, Shield, Users, Wallet, Server, Code, Layers } from 'lucide-react'

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

        {/* 組織構成（基盤型） */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            組織構成
          </h3>

          <div className="rounded-lg border border-border overflow-hidden">
            {/* 上層: Operations */}
            <div className="p-4 bg-card/50">
              <span className="text-xs font-mono font-semibold text-muted-foreground">Operations Layer</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="dao-card border-l-2 border-l-primary">
                  <div className="flex items-center gap-3 mb-2">
                    <Server className="h-5 w-5 text-primary shrink-0" />
                    <h4 className="font-semibold text-sm">やみすきー運営部</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">サーバー運営・モデレーション / 非公開・限られたメンバーで迅速に判断</p>
                </div>
                <div className="dao-card border-l-2 border-l-success">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="h-5 w-5 text-success shrink-0" />
                    <h4 className="font-semibold text-sm">yamisskey-dev</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">開発・技術判断 / 公開・コアチーム + コントリビューターがPR・Issueで議論</p>
                </div>
              </div>
            </div>

            {/* 下層: Foundation */}
            <div className="p-4 bg-secondary/5 border-t border-dashed border-secondary/20">
              <span className="text-xs font-mono font-semibold text-muted-foreground">Foundation Layer</span>
              <div className="dao-card border-l-2 border-l-secondary mt-3">
                <div className="flex items-center gap-3 mb-2">
                  <Vote className="h-5 w-5 text-secondary shrink-0" />
                  <h4 className="font-semibold text-sm">YAMI DAO</h4>
                </div>
                <p className="text-xs text-muted-foreground">予算配分・重大方針・紛争解決 / 公開・全メンバーがSnapshot投票で決定</p>
              </div>
            </div>
          </div>
        </div>

        {/* Web3インフラ */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            透明性のインフラ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dao-card hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <Vote className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Snapshot</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                ガス代無料のオフチェーン投票。1人1票で提案・投票ができます。
              </p>
              <a
                href="https://snapshot.org/#/s:yamidao.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Snapshot を見る
              </a>
            </div>

            <div className="dao-card hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="h-5 w-5 text-success" />
                <h4 className="font-semibold">Safe</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                マルチシグウォレットで資金を管理。複数人の承認が必要です。
              </p>
              <a
                href="https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Safe を見る
              </a>
            </div>
          </div>
        </div>

        {/* 透明性の仕組み */}
        <div className="dao-card glass mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-semibold mb-4">透明性の二重保証</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Github className="h-4 w-4 text-accent" />
                <span className="font-medium text-sm">GitHub（技術）</span>
              </div>
              <p className="text-sm text-muted-foreground">
                コード変更・Issue・PRがすべて公開
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Vote className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Snapshot（組織・資金）</span>
              </div>
              <p className="text-sm text-muted-foreground">
                予算配分・重要決定の投票履歴を公開
              </p>
            </div>
          </div>
        </div>

        {/* 資金運用方針 */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            資金運用方針
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="dao-card">
              <h4 className="font-semibold mb-2">完全非営利</h4>
              <p className="text-sm text-muted-foreground">
                収益化・見返り・特典は一切なし。支援の有無による待遇差もありません。
              </p>
            </div>
            <div className="dao-card">
              <h4 className="font-semibold mb-2">資金の使途</h4>
              <p className="text-sm text-muted-foreground">
                インフラ費・開発者報酬・コミュニティ支援に使用。Snapshotで決定。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
