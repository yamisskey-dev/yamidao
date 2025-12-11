import { Shield, Users, Heart } from 'lucide-react'

export function AboutDAO() {
  return (
    <section id="about" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            <a href="https://hub.yami.ski/guides/ecosystem/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">やみすきーエコシステム</a>のガバナンスDAO
          </p>
        </div>

        {/* ビジョン・ミッション（統合・簡潔化） */}
        <div className="dao-card glass mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg text-muted-foreground leading-relaxed">
            やみすきー運営部とyamisskey-devのガバナンス基盤。メンタルファーストとプライバシーファーストを、コミュニティ主導で守ります。
          </p>
        </div>

        {/* コアバリュー（基盤型） */}
        <div className="rounded-lg border border-border overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* 上層: 目指すもの */}
          <div className="p-4 bg-card/50">
            <span className="text-xs font-mono font-semibold text-muted-foreground">Values Layer</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="dao-card border-l-2 border-l-accent hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-5 w-5 text-accent shrink-0" />
                  <h4 className="font-semibold text-sm">メンタルファースト</h4>
                </div>
                <p className="text-xs text-muted-foreground">ユーザーの心の安全を最優先に設計・運営方針を決定</p>
              </div>
              <div className="dao-card border-l-2 border-l-primary hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  <h4 className="font-semibold text-sm">プライバシーファースト</h4>
                </div>
                <p className="text-xs text-muted-foreground">個人情報を収集しない技術・運営を選択</p>
              </div>
            </div>
          </div>

          {/* 下層: それを実現する手段 */}
          <div className="p-4 bg-secondary/5 border-t border-dashed border-secondary/20">
            <span className="text-xs font-mono font-semibold text-muted-foreground">Foundation Layer</span>
            <div className="dao-card border-l-2 border-l-secondary mt-3 hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-secondary shrink-0" />
                <h4 className="font-semibold text-sm">コミュニティ主導</h4>
              </div>
              <p className="text-xs text-muted-foreground">コミュニティ主導だからこそ、メンタルファーストとプライバシーファーストを守れる</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
