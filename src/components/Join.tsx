'use client'

import Image from 'next/image'
import { Code, Users, Link2, Github, ExternalLink, Shield, Wallet } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'

const paths = [
  {
    Icon: Code,
    title: 'つくる',
    description: 'コード・ドキュメント・翻訳でかかわる',
    ButtonIcon: Github,
    label: 'GitHub',
    href: 'https://github.com/yamisskey-dev',
  },
  {
    Icon: Users,
    title: 'つかう',
    description: 'やみすきーに登録してつかってみる',
    ButtonIcon: ExternalLink,
    label: 'やみすきー',
    href: 'https://yami.ski',
  },
  {
    Icon: Link2,
    title: 'つなぐ',
    description: 'ウォレットをつないでメンバーになる',
    ButtonIcon: ExternalLink,
    label: 'Guild',
    href: 'https://guild.xyz/yami',
  },
]

export function Join() {
  const { user, isAuthenticated, isLoading } = useAuth()
  return (
    <section id="join" className="py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12">
          <h2 className="yami-section-title">
            <span>はいる</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">あなたのペースで、あなたのやり方で</p>
        </div>

        {/* プライバシー方針（簡潔版） */}
        <div className="yami-card mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">名前を出さなくても大丈夫</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            ウォレットアドレスやGitHubアカウントだけで参加できます。実名もメールアドレスもいりません。
          </p>
        </div>

        {/* 3つの参加パス */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {paths.map(({ Icon, title, description, ButtonIcon, label, href }) => (
            <div key={href} className="yami-card flex flex-col items-center text-center">
              <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-primary/15 text-primary mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-5 flex-1">{description}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className="yami-btn yami-btn-accent w-full">
                <ButtonIcon className="h-4 w-4" />
                {label}
              </a>
            </div>
          ))}
        </div>

        {/* Misskey認証 / メンバーカード */}
        {isLoading ? (
          <div className="yami-card">
            <div className="flex items-center justify-center py-4">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : isAuthenticated && user ? (
          <div className="yami-card overflow-hidden">
            {/* Member card header */}
            <div className="bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 -mx-6 -mt-6 px-6 py-4 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-primary">YAMI DAO Member</span>
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
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center ring-4 ring-primary/20">
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
