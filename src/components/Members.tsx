import { Github, Users, ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'

export function Members() {
  return (
    <section id="members" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Members</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            プライバシーを守りながら貢献する
          </p>
        </div>

        {/* プライバシー方針 */}
        <div className="dao-card glass mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">プライバシー保護の方針</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                YAMI DAOでは、メンバーのプライバシーを最優先します。
                メンタルヘルスという繊細な領域において、参加者の個人情報を公開する必要はありません。
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>ウォレットアドレスのみで参加可能</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>実名やメールアドレスは不要</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>匿名で貢献できる環境を提供</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 参加の呼びかけ */}
        <div className="dao-card glass text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Users className="h-16 w-16 text-primary mx-auto mb-6" />
          <h4 className="text-2xl font-semibold mb-4">あなたも匿名で貢献できます</h4>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            YAMI DAOは、やみすきーとその開発に情熱を持つすべての人に開かれています。
            顔や名前を公開する必要はありません。ウォレットアドレスやGitHubアカウントだけで、
            自由に貢献し、ガバナンスに参加できます。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#join" className="dao-btn-primary inline-flex items-center gap-2">
              参加する
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://github.com/yamisskey-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-secondary inline-flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              GitHubで貢献を見る
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
