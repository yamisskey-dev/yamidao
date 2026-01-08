import { Rocket, Coins, Vote, CheckCircle, Circle } from 'lucide-react'

export function Roadmap() {
  return (
    <section id="roadmap" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">ロードマップ</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            2025年以降の開発計画
          </p>
        </div>

        {/* タイムライン */}
        <div className="relative">
          {/* タイムライン背景線 */}
          <div className="absolute left-8 md:left-[40%] top-24 md:top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {/* Phase 1 */}
          <div className="relative mb-12 animate-fade-in-up">
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-[40%] md:text-right md:pr-8">
                <div className="mb-4 md:mb-0">
                  <div className="inline-flex items-center gap-2 status-badge status-badge-completed mb-2">
                    <CheckCircle className="h-4 w-4" />
                    完了
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Phase 1</h3>
                  <p className="text-sm text-muted-foreground">2025 Q1-Q2</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-[40%] w-6 h-6 rounded-full bg-primary border-4 border-background -translate-x-1/2"></div>

              <div className="md:w-2/5 ml-16 md:ml-0 md:pl-8">
                <div className="dao-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Rocket className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">DAO立ち上げ</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    メンバーの自己負担で運営開始
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      <span>ウェブサイト・コミュニティ基盤</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      <span>yamisskey-dev 継続開発</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative mb-12 animate-fade-in-up">
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-[40%] md:text-right md:pr-8">
                <div className="mb-4 md:mb-0">
                  <div className="inline-flex items-center gap-2 status-badge status-badge-active mb-2">
                    <CheckCircle className="h-4 w-4" />
                    進行中
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-1">Phase 2</h3>
                  <p className="text-sm text-muted-foreground">2025 Q3-Q4</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-[40%] w-6 h-6 rounded-full bg-secondary border-4 border-background -translate-x-1/2"></div>

              <div className="md:w-2/5 ml-16 md:ml-0 md:pl-8">
                <div className="dao-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Coins className="h-5 w-5 text-secondary" />
                    <h4 className="font-semibold">Web3統合</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Snapshot・Safeを本格運用し、コミュニティ主導のガバナンスを開始
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      <span>Snapshot統合（オフチェーン投票）</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      <span>Safe統合（Treasury管理）</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>Misskey認証によるメンバー確認</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative animate-fade-in-up">
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-[40%] md:text-right md:pr-8">
                <div className="mb-4 md:mb-0">
                  <div className="inline-flex items-center gap-2 status-badge status-badge-pending mb-2">
                    予定
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-1">Phase 3</h3>
                  <p className="text-sm text-muted-foreground">2026以降</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-[40%] w-6 h-6 rounded-full bg-accent border-4 border-background -translate-x-1/2"></div>

              <div className="md:w-2/5 ml-16 md:ml-0 md:pl-8">
                <div className="dao-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Vote className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold">フルDAO化</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>オンチェーン投票</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>コントリビューター報酬自動配布</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
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
