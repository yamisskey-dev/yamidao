'use client'

import Image from 'next/image'
import { Code, Users, Link2, Github, ExternalLink, Shield, Wallet } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'

export function Join() {
  const { user, isAuthenticated, isLoading } = useAuth()
  return (
    <section id="join" className="py-16 px-4 md:px-8 bg-primary/5">
      <div className="max-w-5xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">はいる</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            あなたのペースで、あなたのやり方で
          </p>
        </div>

        {/* プライバシー方針（簡潔版） */}
        <div className="dao-card glass mb-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">名前を出さなくても大丈夫</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            ウォレットアドレスやGitHubアカウントだけで参加できます。実名もメールアドレスもいりません。
          </p>
        </div>

        {/* 3つの参加パス */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* つくる */}
          <div className="dao-card hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">つくる</h3>
              <p className="text-muted-foreground text-sm mb-4">
                コード・ドキュメント・翻訳でかかわる
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

          {/* つかう */}
          <div className="dao-card hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">つかう</h3>
              <p className="text-muted-foreground text-sm mb-4">
                やみすきーに登録してつかってみる
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

          {/* つなぐ */}
          <div className="dao-card hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Link2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">つなぐ</h3>
              <p className="text-muted-foreground text-sm mb-4">
                ウォレットをつないでメンバーになる
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

        {/* Misskey認証 / メンバーカード */}
        {isLoading ? (
          <div className="dao-card glass animate-fade-in-up">
            <div className="flex items-center justify-center py-4">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : isAuthenticated && user ? (
          <div className="dao-card glass animate-fade-in-up overflow-hidden">
            {/* Member card header */}
            <div className="bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 -mx-6 -mt-6 px-6 py-4 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">YAMI DAO Member</span>
              </div>
            </div>

            {/* User info */}
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.displayName || user.account}
                  width={64}
                  height={64}
                  className="rounded-full ring-4 ring-primary/20"
                  unoptimized
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold">{user.displayName || user.account}</h3>
                <p className="text-sm text-muted-foreground">{user.handle}</p>
                {user.ethAddress && (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Wallet className="h-3 w-3" />
                    <span className="font-mono">
                      {user.ethAddress.slice(0, 6)}...{user.ethAddress.slice(-4)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <LoginForm />
        )}

      </div>
    </section>
  )
}
