import { Code, Users, Heart, Github, ExternalLink, ArrowRight } from 'lucide-react'

export function Join() {
  return (
    <section id="join" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join YAMI DAO</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            3つのパスで参加しよう
          </p>
        </div>

        {/* 参加方法の説明 */}
        <div className="dao-card glass text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-2xl font-semibold mb-4">誰でも参加できます</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            YAMI DAO は、やみすきーとその開発に情熱を持つすべての人に開かれています。
            開発者、ユーザー、サポーターとして、あなたの形で貢献してください。
          </p>
        </div>

        {/* 3つの参加パス */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* 開発者パス */}
          <div
            className="dao-card hover-lift animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            data-testid="join-path"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Code className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">開発者</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                オープンソースプロジェクトに貢献して、メンタルヘルステックの未来を一緒に創りましょう。
              </p>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>GitHubでコントリビュート</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>コード、ドキュメント、翻訳</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>バグ報告、機能提案</span>
                </div>
              </div>

              <a
                href="https://github.com/yamisskey-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <Github className="h-5 w-5" />
                yamisskey-dev に貢献
              </a>
            </div>
          </div>

          {/* ユーザーパス */}
          <div
            className="dao-card hover-lift animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
            data-testid="join-path"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">ユーザー</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Yamisskeyインスタンスに参加して、安全なコミュニティの一員になりましょう。
              </p>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-secondary mt-1">•</span>
                  <span>インスタンスに登録</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-secondary mt-1">•</span>
                  <span>フィードバックを提供</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-secondary mt-1">•</span>
                  <span>コミュニティを育てる</span>
                </div>
              </div>

              <a
                href="https://yami.ski"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                やみすきー に参加
              </a>
            </div>
          </div>

          {/* サポーターパス */}
          <div
            className="dao-card hover-lift animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            data-testid="join-path"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
                <Heart className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">サポーター</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Snapshotでの投票やOptimism上のガバナンスに参加しましょう。
              </p>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-1">•</span>
                  <span>Snapshotで投票（Phase 2）</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-1">•</span>
                  <span>Optimism L2で提案作成</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-1">•</span>
                  <span>RetroPGFで公共財支援</span>
                </div>
              </div>

              <button
                disabled
                className="w-full px-6 py-3 rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
              >
                Phase 2 で実装予定
              </button>
            </div>
          </div>
        </div>

        {/* 追加情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="dao-card">
            <h3 className="text-xl font-semibold mb-4">コントリビューションガイド</h3>
            <p className="text-muted-foreground mb-4">
              はじめての方でも安心して貢献できるよう、詳細なガイドを用意しています。
            </p>
            <a
              href="https://github.com/yamisskey-dev/yamisskey/blob/master/DEVELOPMENT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              ガイドを読む
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="dao-card">
            <h3 className="text-xl font-semibold mb-4">コミュニティ</h3>
            <p className="text-muted-foreground mb-4">
              DiscordやElementで、他のメンバーと交流しましょう。
            </p>
            <div className="space-y-3">
              <a
                href="https://discord.gg/WMgzEBvr8b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-2"
              >
                Discord に参加
                <ArrowRight className="h-4 w-4" />
              </a>
              <br />
              <a
                href="https://chat.yami.ski"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-2"
              >
                Element に参加
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
