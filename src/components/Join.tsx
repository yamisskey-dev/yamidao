import { Code, Users, Heart, Github, ExternalLink, Shield } from 'lucide-react'

export function Join() {
  return (
    <section id="join" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">参加する</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            プライバシーを守りながら、あなたの形で貢献できます
          </p>
        </div>

        {/* プライバシー方針（簡潔版） */}
        <div className="dao-card glass mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">匿名で参加可能</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            ウォレットアドレスやGitHubアカウントのみで参加できます。実名・メールアドレスは不要です。
          </p>
        </div>

        {/* 3つの参加パス */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 開発者 */}
          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">開発者</h3>
              <p className="text-muted-foreground text-sm mb-4">
                コード・ドキュメント・翻訳で貢献
              </p>
              <a
                href="https://github.com/yamisskey-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* ユーザー */}
          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ユーザー</h3>
              <p className="text-muted-foreground text-sm mb-4">
                やみすきーに登録してフィードバック
              </p>
              <a
                href="https://yami.ski"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                やみすきー
              </a>
            </div>
          </div>

          {/* サポーター */}
          <div className="dao-card hover-lift animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">サポーター</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Guildでメンバーシップを取得
              </p>
              <a
                href="https://guild.xyz/yamidao"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Guild
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
