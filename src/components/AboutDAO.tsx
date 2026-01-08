import { Shield, Users, Heart, Server, Code, Vote, Layers } from 'lucide-react'

export function AboutDAO() {
  return (
    <section id="about" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">DAOについて</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            <a href="https://hub.yami.ski/guides/ecosystem/" target="_blank" rel="noopener noreferrer" className="external-link">YAMIエコシステム</a>のガバナンスDAO
          </p>
        </div>

        {/* コアバリュー（階層型） */}
        <div className="mb-12 rounded-lg border border-border overflow-hidden animate-fade-in-up">
          {/* 上層: 目指すもの */}
          <div className="p-4 bg-card/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="dao-card border-l-2 border-l-accent hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-5 w-5 text-accent shrink-0" />
                  <h4 className="font-semibold text-sm">メンタルファースト</h4>
                </div>
                <p className="text-xs text-muted-foreground">ユーザーの心の安全を最優先に</p>
              </div>
              <div className="dao-card border-l-2 border-l-primary hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  <h4 className="font-semibold text-sm">プライバシーファースト</h4>
                </div>
                <p className="text-xs text-muted-foreground">個人情報を収集しない設計</p>
              </div>
            </div>
          </div>

          {/* 下層: それを実現する手段 */}
          <div className="p-4 bg-secondary/5 border-t border-dashed border-secondary/20">
            <div className="dao-card border-l-2 border-l-secondary hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-secondary shrink-0" />
                <h4 className="font-semibold text-sm">コミュニティ主導</h4>
              </div>
              <p className="text-xs text-muted-foreground">コミュニティ主導だからこそ、メンタルファーストとプライバシーファーストを守れる</p>
            </div>
          </div>
        </div>

        {/* 組織構成 */}
        <div className="animate-fade-in-up">
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
                  <p className="text-xs text-muted-foreground">サーバー運営・モデレーション</p>
                </div>
                <div className="dao-card border-l-2 border-l-success">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="h-5 w-5 text-success shrink-0" />
                    <h4 className="font-semibold text-sm">yamisskey-dev</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">開発・技術判断</p>
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
                <p className="text-xs text-muted-foreground">予算配分・重大方針・紛争解決</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
