import { Shield, Users, Lock, Heart } from 'lucide-react'

export function AboutDAO() {
  return (
    <section id="about" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About DAO</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            やみすきーエコシステムのガバナンスDAO
          </p>
        </div>

        {/* ビジョン・ミッション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              ビジョン
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              やみすきーとその関連プロジェクトを通じて、
              メンタルヘルスに配慮したプライバシー保護型のソーシャルメディアを実現。
              誰もが安心して参加できるコミュニティを構築します。
            </p>
          </div>

          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <Heart className="h-6 w-6 text-secondary" />
              ミッション
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              やみすきーインスタンスとyamisskey-devの開発を、
              分散型ガバナンスで運営。コミュニティ主導の透明性の高い意思決定を通じて、
              オープンソースで持続可能なエコシステムを構築します。
            </p>
          </div>
        </div>

        {/* コアバリュー */}
        <div className="dao-card glass animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-2xl font-semibold mb-6 text-center">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Privacy by Design</h4>
              <p className="text-sm text-muted-foreground">
                プライバシーを第一に考えた設計
              </p>
            </div>

            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Decentralized Governance</h4>
              <p className="text-sm text-muted-foreground">
                コミュニティ主導の分散型ガバナンス
              </p>
            </div>

            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Mental Health First</h4>
              <p className="text-sm text-muted-foreground">
                メンタルヘルスを最優先に
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
