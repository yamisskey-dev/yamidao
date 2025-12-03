import { Wallet, Shield, Eye, Users, HelpCircle, TrendingUp, ExternalLink } from 'lucide-react'

export function Funding() {
  return (
    <section id="funding" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Funding & Treasury</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            YAMI DAO の資金運用と透明性確保の方針
          </p>
        </div>

        {/* 基本原則 */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold">基本原則</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="dao-card hover-lift">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                完全非営利運営
              </h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• 収益化・見返り・特典は一切なし</li>
                <li>• 支援の有無による待遇差は一切なし</li>
                <li>• 営利目的の広告は表示しない</li>
              </ul>
            </div>

            <div className="dao-card hover-lift">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-secondary" />
                透明性の確保
              </h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• 資金源と用途を公開</li>
                <li>• Optimism (Ethereum L2) で追跡可能</li>
                <li>• SafeとSnapshotによる透明な運営</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 現在の資金源 */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Wallet className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-semibold">資金源</h3>
          </div>

          <div className="dao-card">
            <h4 className="text-lg font-semibold mb-4">Phase 1（現在）</h4>
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-muted-foreground leading-relaxed">
                現在は<span className="font-semibold text-primary">メンバーの個人負担</span>により運営されています。
                yamisskey-devプロジェクトの運営費（サーバー、ドメイン等）は
                メンバーが自己負担で賄っています。
              </p>
            </div>

            <h4 className="text-lg font-semibold mb-4 mt-8">Phase 2以降（予定）</h4>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                DAO Treasury を Optimism (Ethereum L2) 上に構築し、透明性のある資金管理を実現します。
                Snapshotでの投票により、コミュニティ主導で民主的な資金配分の意思決定を行います。
              </p>
            </div>
          </div>
        </div>

        {/* Treasury管理 */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-success" />
            <h3 className="text-2xl font-semibold">Treasury 管理（Phase 2以降）</h3>
          </div>

          <div className="space-y-6">
            {/* コスト構造 */}
            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-4">コスト構造</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-success mb-2">✓ 完全無料（ガス代0円）</p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>投票・提案・議論（Snapshotはオフチェーン）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>全てのガバナンス活動</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-warm mb-2">△ ガス代が必要（数円程度）</p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>資金移動時のみ（Safe経由の送金・支払い）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Optimism L2の低ガス代を活用</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Optimismベースの説明 */}
            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-4">Optimism (Ethereum L2) ベースの透明性</h4>
              <p className="text-muted-foreground mb-4">
                資金移動をOptimism L2上で行うことで、低コスト（ガス代数円程度）かつ
                完全に透明性の高い運営を実現します。
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>全ての取引をOptimismブロックチェーン上で公開</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Ethereumメインネットと同等のセキュリティ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Optimism RetroPGFでの公共財資金調達</span>
                </li>
              </ul>
            </div>

            {/* Safe説明 */}
            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-4">Safe（マルチシグウォレット）</h4>
              <p className="text-muted-foreground mb-4">
                Safeは複数人の承認が必要なマルチシグウォレットです。
                単一の人物による不正な資金移動を防ぎ、分散的な資金管理を実現します。
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>例：5人のメンバーのうち3人の承認で取引実行（3-of-5マルチシグ）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>全ての取引履歴がOptimism上で公開・検証可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>Snapshotの投票結果に基づいて資金を執行</span>
                </li>
              </ul>
              <a
                href="https://app.safe.global/spaces?spaceId=3989"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-secondary inline-flex items-center gap-2 mt-4"
              >
                <ExternalLink className="h-4 w-4" />
                YAMI DAO Safe を見る
              </a>
            </div>

            {/* Snapshot説明 */}
            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-4">Snapshot（投票・提案システム）</h4>
              <p className="text-muted-foreground mb-4">
                Snapshotはガス代完全無料のオフチェーン投票プラットフォームです。
                1人1票の平等な投票権で、資金の使い道をコミュニティで決定します。
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>GitHub、Discord、ウォレットアドレスで認証</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>1人1票の平等な投票権（トークン量に依存しない）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>投票履歴は全て公開、改ざん不可能</span>
                </li>
              </ul>
              <a
                href="https://snapshot.org/#/s:yamidao.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-secondary inline-flex items-center gap-2 mt-4"
              >
                <ExternalLink className="h-4 w-4" />
                YAMI DAO Snapshot を見る
              </a>
            </div>

            {/* 資金の使途 */}
            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-4">資金の使途</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-success">1.</span>
                  <span>プロジェクト運営費（インフラ、ドメイン等）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">2.</span>
                  <span>開発者報酬（コントリビューター支援）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">3.</span>
                  <span>コミュニティ支援（困窮ユーザーの互助）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">4.</span>
                  <span>新規プロジェクト開発費</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-6 w-6 text-warm" />
            <h3 className="text-2xl font-semibold">FAQ</h3>
          </div>

          <div className="space-y-6">
            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-3">なぜ非営利運営なのか？</h4>
              <p className="text-muted-foreground">
                YAMI DAOの目的は、メンタルヘルステクノロジーによる社会貢献です。
                営利目的が絡むと本来の目的が歪む可能性があるため、
                完全非営利での運営を原則としています。
              </p>
            </div>

            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-3">運営が困難になったら？</h4>
              <p className="text-muted-foreground">
                Phase 1ではメンバーの負担可能な範囲で継続し、困難になれば終了します。
                Phase 2以降はTreasuryの状況とコミュニティの意思決定に基づいて判断します。
              </p>
            </div>

            <div className="dao-card">
              <h4 className="text-lg font-semibold mb-3">支援方法は？</h4>
              <p className="text-muted-foreground">
                Phase 2でOptimism上にTreasury構築後、Safeを使用した透明性のある支援の仕組みを構築予定です。
                また、Optimism RetroPGFへの申請により公共財としての資金調達も検討しています。
              </p>
            </div>
          </div>
        </div>

        {/* 法的事項 */}
        <div className="dao-card glass text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h4 className="text-lg font-semibold mb-4 text-foreground">法的事項</h4>
          <ul className="space-y-2">
            <li>• 日本国法に準拠</li>
            <li>• 適切な税務処理を実施</li>
            <li>• 暗号資産関連法規を遵守</li>
            <li>• 資金洗浄防止（AML）とテロ資金供与対策（CFT）に準拠</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
