import { Code, Users, Github, ExternalLink, Wallet, Shield, Cloud } from 'lucide-react'

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

        {/* 匿名で参加可能 */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">匿名で参加可能</h3>
          </div>
          <p className="text-muted-foreground">
            ウォレットアドレスやGitHubアカウントのみで参加できます。実名・メールアドレスは不要です。
          </p>
        </div>

        {/* 3つの参加方法 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          {/* つくる */}
          <div className="dao-card glass">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">つくる</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              コード・ドキュメント・翻訳で貢献
            </p>
            <a
              href="https://github.com/yamisskey-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          {/* つかう */}
          <div className="dao-card glass">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-secondary" />
              <h3 className="text-lg font-semibold">つかう</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              やみすきーに登録してフィードバック
            </p>
            <a
              href="https://yami.ski"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              やみすきー
            </a>
          </div>

          {/* つなぐ */}
          <div className="dao-card glass">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold">つなぐ</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              ウォレット接続でメンバーシップ取得
            </p>
            <a
              href="https://guild.xyz/yamidao"
              target="_blank"
              rel="noopener noreferrer"
              className="dao-btn-primary inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Guild
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
