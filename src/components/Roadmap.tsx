import { Rocket, Coins, Vote, CheckCircle, Clock } from 'lucide-react'

export function Roadmap() {
  return (
    <section id="roadmap" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Roadmap</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            YAMI DAO の開発ロードマップ - 2025年以降
          </p>
        </div>

        {/* タイムライン */}
        <div className="relative" data-testid="timeline">
          {/* タイムライン背景線 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {/* Phase 1 */}
          <div className="relative mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-1/2 md:text-right md:pr-8">
                <div className="mb-4 md:mb-0">
                  <div className="inline-flex items-center gap-2 status-badge status-badge-active mb-2">
                    <CheckCircle className="h-4 w-4" />
                    進行中
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Phase 1</h3>
                  <p className="text-sm text-muted-foreground">2025 Q1-Q2</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background -translate-x-1/2"></div>

              <div className="md:w-1/2 ml-16 md:ml-0 md:pl-8">
                <div className="dao-card hover-lift">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    DAO立ち上げ
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>YAMI DAO ウェブサイト構築</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>コミュニティ基盤の整備</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-warm mt-0.5 flex-shrink-0" />
                      <span>yamisskey-dev プロジェクト継続開発</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-1/2 md:text-right md:pr-8">
                <div className="mb-4 md:mb-0">
                  <div className="inline-flex items-center gap-2 status-badge status-badge-pending mb-2">
                    予定
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-2">Phase 2</h3>
                  <p className="text-sm text-muted-foreground">2025 Q3-Q4</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-secondary border-4 border-background -translate-x-1/2"></div>

              <div className="md:w-1/2 ml-16 md:ml-0 md:pl-8">
                <div className="dao-card hover-lift">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-secondary" />
                    Web3統合
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>ガバナンストークン発行（Optimism）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>Snapshot統合（オフチェーン投票）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>Safe統合（Treasury管理）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>ウォレット接続機能（MetaMask等）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>提案システム実装</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-1/2 md:text-right md:pr-8">
                <div className="mb-4 md:mb-0">
                  <div className="inline-flex items-center gap-2 status-badge status-badge-pending mb-2">
                    予定
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-2">Phase 3</h3>
                  <p className="text-sm text-muted-foreground">2026以降</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-accent border-4 border-background -translate-x-1/2"></div>

              <div className="md:w-1/2 ml-16 md:ml-0 md:pl-8">
                <div className="dao-card hover-lift">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Vote className="h-5 w-5 text-accent" />
                    フルDAO化
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>オンチェーン投票（Governor契約）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Treasury管理システム</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>コントリビューター報酬自動配布</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>サブDAO設立サポート</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>エコシステム拡大</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
