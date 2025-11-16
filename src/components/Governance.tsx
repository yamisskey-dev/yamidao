import { Vote, ExternalLink, Lightbulb, Users, TrendingUp, Network, Github, Shield } from 'lucide-react'

export function Governance() {
  return (
    <section id="governance" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Governance</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            コミュニティ主導の投票・提案システム
          </p>
        </div>

        {/* Phase 2 実装予定のお知らせ */}
        <div className="dao-card glass mb-12 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warm/20 mb-6">
            <Vote className="h-10 w-10 text-warm" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Phase 2 で実装予定</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Optimism L2上でのガバナンス機能は現在準備中です。Snapshotを使用したオフチェーン投票、
            Safeによる透明性の高いTreasury管理を Phase 2 で実装予定です。
          </p>
          <div className="status-badge status-badge-pending inline-flex">
            準備中
          </div>
        </div>

        {/* 組織体系 */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <h3 className="text-2xl font-semibold mb-6">組織体系</h3>
          <p className="text-muted-foreground mb-8">
            YAMI DAOは、<span className="font-semibold text-secondary">やみすきー運営部</span>と
            <span className="font-semibold text-accent">yamisskey-dev</span>を統括する
            ガバナンス組織として機能します。
            運営と開発の癒着を防ぎ、透明性の高い意思決定を実現しています。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="dao-card hover-lift">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">YAMI DAO</h4>
                    <span className="text-lg font-bold text-primary">1人</span>
                  </div>
                  <p className="text-xs text-muted-foreground">統括・ガバナンス層</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>予算配分の決定</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>全体方針の投票</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Treasury管理</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">透明化:</span> Snapshot + Safe
                </p>
              </div>
            </div>

            <div className="dao-card hover-lift">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">やみすきー運営部</h4>
                    <span className="text-lg font-bold text-secondary">4人</span>
                  </div>
                  <p className="text-xs text-muted-foreground">サーバー運営組織</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>サーバー運営</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>モデレーション</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>ユーザーサポート</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">透明化:</span> 重要決定をSnapshot記録
                </p>
              </div>
            </div>

            <div className="dao-card hover-lift">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Github className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">yamisskey-dev</h4>
                    <span className="text-lg font-bold text-accent">3人</span>
                  </div>
                  <p className="text-xs text-muted-foreground">開発組織</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Yamisskey開発</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>日常的な技術判断</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>コードレビュー</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">透明化:</span> GitHub + Snapshot
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 透明性の仕組み */}
        <div className="dao-card glass mb-12 animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">透明性の二重保証</h3>
              <p className="text-muted-foreground text-sm">
                GitHubとブロックチェーンを組み合わせて、技術的透明性と経済的透明性を両立します。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Github className="h-5 w-5 text-accent" />
                GitHub記録（技術的透明性）
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>全てのコード変更</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Issue・PR・コードレビュー</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>yamisskey-devの日常業務</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Vote className="h-5 w-5 text-primary" />
                Snapshot記録（組織・資金の透明性）
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>予算配分・資金使用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>運営部・開発の重要決定</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>組織の戦略・方針変更</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 将来実装される機能の紹介 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">提案システム</h3>
                <p className="text-muted-foreground text-sm">
                  Snapshotでコミュニティメンバーが新機能やプロジェクトの方向性について提案を作成し、
                  ガス代0円で議論・投票できます。
                </p>
              </div>
            </div>
          </div>

          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Vote className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">投票機能</h3>
                <p className="text-muted-foreground text-sm">
                  1人1票の平等な投票権で、重要な意思決定に参加できます。
                  Snapshotを使用したオフチェーン投票のため、ガス代は完全無料です。
                </p>
              </div>
            </div>
          </div>

          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">メンバーシップ</h3>
                <p className="text-muted-foreground text-sm">
                  GitHub貢献者、Discord参加者、ガバナンストークン保有者など、
                  プライバシーに配慮した形でDAO運営に参加できます。
                </p>
              </div>
            </div>
          </div>

          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Treasury管理</h3>
                <p className="text-muted-foreground text-sm">
                  SafeでマルチシグウォレットによりDAO資金を管理。
                  使い道をコミュニティで決定し、透明性の高い運営を実現します。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optimism & Snapshot リンク */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-muted-foreground mb-4">
            Phase 2 では <span className="font-semibold text-primary">Optimism L2</span> 上で、
            <span className="font-semibold text-secondary"> Snapshot</span>（オフチェーン投票）と
            <span className="font-semibold text-accent"> Safe</span>（Treasury管理）を使用します。
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://snapshot.org"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-secondary inline-flex items-center gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              Snapshot
            </a>
            <a
              href="https://app.safe.global"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-secondary inline-flex items-center gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              Safe
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
