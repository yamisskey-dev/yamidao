import { Code, Users, Github, ExternalLink, Shield, Vote, Cloud } from 'lucide-react'

export function Join() {
  return (
    <section id="join" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            プライバシーを守りながら、あなたの形で貢献できます
          </p>
        </div>

        {/* Misskeyアカウントで参加（メイン） */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">MisskeyアカウントでDAOに参加</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              やみすきーのアカウントでYAMI DAOメンバーになれます。匿名で参加可能です。
            </p>
            <button
              className="dao-btn-primary inline-flex items-center gap-2 text-lg py-3 px-8 opacity-50 cursor-not-allowed"
              disabled
            >
              <Cloud className="h-5 w-5" />
              Coming Soon
            </button>
            <p className="text-xs text-muted-foreground mt-4">
              Misskey認証によるDAO参加機能を開発中
            </p>
          </div>
        </div>

        {/* メンバーができること */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in-up">
          <div className="dao-card hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <Vote className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">提案・投票</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              DAOの提案に投票。1人1票の公平な意思決定。
            </p>
          </div>
          <div className="dao-card hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-5 w-5 text-secondary" />
              <h4 className="font-semibold">匿名で参加</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Misskeyアカウントのみで参加。実名・メールアドレス不要。
            </p>
          </div>
        </div>

        {/* 他の参加方法 */}
        <div className="animate-fade-in-up">
          <h3 className="text-lg font-semibold mb-6 text-center text-muted-foreground">今すぐ参加できます</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dao-card hover-lift">
              <div className="flex items-center gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">コントリビュート</h4>
                  <p className="text-xs text-muted-foreground">コード・ドキュメント・翻訳</p>
                </div>
                <a
                  href="https://github.com/yamisskey-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dao-btn-secondary inline-flex items-center gap-2 text-sm shrink-0"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
            <div className="dao-card hover-lift">
              <div className="flex items-center gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">フィードバック</h4>
                  <p className="text-xs text-muted-foreground">やみすきーを使って改善に貢献</p>
                </div>
                <a
                  href="https://yami.ski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dao-btn-secondary inline-flex items-center gap-2 text-sm shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                  やみすきー
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
