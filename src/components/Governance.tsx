import { Vote, ExternalLink, Server, Code, Layers } from 'lucide-react'

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
        <div className="mb-12 animate-fade-in-up">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            組織構成
          </h3>

          <div className="rounded-lg border border-border overflow-hidden">
            {/* 上層: Operations */}
            <div className="p-4 bg-card/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <div className="dao-card border-l-2 border-l-secondary">
                <div className="flex items-center gap-3 mb-2">
                  <Vote className="h-5 w-5 text-secondary shrink-0" />
                  <h4 className="font-semibold text-sm">YAMI DAO</h4>
                </div>
                <p className="text-xs text-muted-foreground">予算配分・重大方針・紛争解決 / 公開・全メンバーがSnapshot投票で決定</p>
              </div>
            </div>
          </div>
        </div>

        {/* Snapshot投票 */}
        <div className="dao-card glass animate-fade-in-up">
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
              Snapshot を見る
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
