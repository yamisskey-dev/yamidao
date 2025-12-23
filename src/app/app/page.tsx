'use client'

import { PageLayout } from '@/components/PageLayout'
import { Wallet, Vote, Shield, Cloud, ExternalLink, CheckCircle } from 'lucide-react'

export default function AppPage() {
  return (
    <PageLayout>
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">App</h1>
            <div className="section-divider mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground">
              ウォレット接続でDAOに参加
            </p>
          </div>

          {/* Connect Wallet Card */}
          <div className="dao-card glass mb-8 animate-fade-in-up">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Wallet className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Connect Wallet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                ウォレットを接続してYAMI DAOメンバーとして参加しましょう。匿名で参加可能です。
              </p>
              <button className="dao-btn-primary inline-flex items-center gap-2 text-lg py-3 px-8">
                <Wallet className="h-5 w-5" />
                Connect Wallet
              </button>
              <p className="text-xs text-muted-foreground mt-4">
                MetaMask, WalletConnect, Coinbase Wallet対応
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Snapshot Voting */}
            <div className="dao-card hover-lift animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <Vote className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Snapshot投票</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                ガス代無料でDAOの提案に投票。1人1票の公平な意思決定。
              </p>
              <a
                href="https://snapshot.org/#/s:yamidao.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Snapshot
              </a>
            </div>

            {/* Safe Treasury */}
            <div className="dao-card hover-lift animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-success" />
                <h3 className="text-lg font-semibold">Safe Treasury</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                マルチシグで管理された透明な資金運用。
              </p>
              <a
                href="https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2"
                target="_blank"
                rel="noopener noreferrer"
                className="dao-btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Safe
              </a>
            </div>
          </div>

          {/* Coming Soon: Misskey Auth */}
          <div className="dao-card border-dashed animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <Cloud className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">Misskey認証</h3>
                  <span className="status-badge status-badge-active text-xs">Coming Soon</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  やみすきーアカウントでメンバーシップを確認。ウォレット不要でも参加可能になります。
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground/50" />
                    <span>やみすきーアカウントでログイン</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground/50" />
                    <span>ウォレットとの連携（オプション）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground/50" />
                    <span>プライバシー保護された認証</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
