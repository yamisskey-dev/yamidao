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
            やみすきーエコシステムのガバナンスDAO
          </p>
        </div>

        {/* ビジョン・ミッション（統合・簡潔化） */}
        <div className="dao-card glass mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg text-muted-foreground leading-relaxed">
            YAMI DAOは、やみすきーとその関連プロジェクトを分散型ガバナンスで運営する組織です。
            メンタルヘルスに配慮したプライバシー保護型のソーシャルメディアを、
            コミュニティ主導で持続可能に運営することを目指しています。
          </p>
        </div>

        {/* コアバリュー（コンパクト版） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="dao-card text-center hover-lift">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">Privacy by Design</h4>
            <p className="text-sm text-muted-foreground">プライバシーを第一に</p>
          </div>

          <div className="dao-card text-center hover-lift">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-3">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h4 className="font-semibold mb-1">Decentralized</h4>
            <p className="text-sm text-muted-foreground">分散型ガバナンス</p>
          </div>

          <div className="dao-card text-center hover-lift">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
              <Heart className="h-6 w-6 text-accent" />
            </div>
            <h4 className="font-semibold mb-1">Mental Health First</h4>
            <p className="text-sm text-muted-foreground">メンタルヘルスを最優先</p>
          </div>
        </div>
      </div>
    </section>
  )
}
