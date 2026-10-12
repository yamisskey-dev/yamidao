'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Github, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { UserMenu } from '@/components/auth/UserMenu'
import { ThemeToggle } from '@/components/ThemeToggle'

const navLinks = [
  { href: '/about', label: 'わたしたちについて' },
  { href: '/governance', label: 'しくみ' },
  { href: '/roadmap', label: 'これから' },
]

// misskey-hub-next 風ヘッダー: 左にロゴ＋サイト名、中央にナビ、右に円形ボタンとログイン
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen, closeMobileMenu])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const linkClass = (href: string) =>
    `inline-flex items-center gap-1 text-sm transition-colors hover:text-primary ${
      pathname === href ? 'text-primary font-bold' : 'text-muted-foreground'
    }`

  return (
    <header className="yami-header">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-8 h-16">
          {/* ロゴ＋サイト名 */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground md:pr-8 md:border-r md:border-border"
          >
            <Image
              src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
            YAMI DAO
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 右側ツール */}
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/yamisskey-dev/yamidao"
              target="_blank"
              rel="noopener noreferrer"
              className="yami-icon-button hidden md:inline-grid"
              aria-label="GitHub"
            >
              <Github className="h-[1.125rem] w-[1.125rem]" />
            </a>
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link href="/join" className="yami-btn yami-btn-accent text-sm py-2 px-5 hidden md:inline-flex">
                はいる
              </Link>
            )}
            <button
              className="yami-icon-button md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="メニュー"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* モバイルナビ */}
        {isMobileMenuOpen && (
          <nav id="mobile-menu" className="md:hidden py-4 border-t border-border" aria-label="メインナビゲーション">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href)}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/yamisskey-dev/yamidao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              {!isLoading && !isAuthenticated && (
                <Link
                  href="/join"
                  className="yami-btn yami-btn-accent text-sm py-2.5 mt-2"
                  onClick={closeMobileMenu}
                >
                  はいる
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
