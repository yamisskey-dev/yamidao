'use client'

import { Handshake, ExternalLink, Code, Copy, Check, Users, ShieldCheck, XCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const BANNER_URL = 'https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-banner.svg'
const SITE_URL = 'https://dao.yami.ski'

export function Partner() {
  return (
    <section id="partner" className="py-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">パートナー</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            金で買えない。追跡しない。載るのは仲間だけ。
          </p>
        </div>

        {/* 連携団体について */}
        <div className="dao-card glass mb-8 animate-fade-in-up">
          <p className="text-muted-foreground text-sm leading-relaxed">
            YAMI DAOでは、やみすきー上に連携団体の情報を掲載する仕組みがあります。
            これは商業広告ではありません。居場所であり続けながら、必要なときに外部支援へつながれる導線を用意することが目的です。
          </p>
        </div>

        {/* 掲載条件・基準 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="dao-card animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">掲載条件</h3>
            </div>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>YAMI DAOに会員として参加すること</li>
              <li>DAOの意思決定に参加し、責任を共有すること</li>
              <li>掲載料は無料</li>
            </ul>
          </div>

          <div className="dao-card animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">掲載基準</h3>
            </div>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>実在し、活動実績が確認できる団体</li>
              <li>やみすきーの理念（当事者の居場所・プライバシー重視）を理解している</li>
            </ul>
          </div>
        </div>

        {/* 対象外 */}
        <div className="dao-card mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">対象外</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            スピリチュアル・情報商材・マルチ等は対象外です。公的窓口の単純リスト掲載もしません（形だけの導線は作らない）。
          </p>
        </div>

        {/* プライバシー */}
        <div className="dao-card glass mb-8 animate-fade-in-up">
          <h3 className="text-lg font-semibold mb-3">プライバシー</h3>
          <ul className="text-muted-foreground text-sm space-y-2">
            <li>トラッキング・外部スクリプト・Cookieは不使用</li>
            <li>利用者情報は連携団体と一切共有しない</li>
            <li>誰が見たか・誰が使ったかを運営は把握しない</li>
          </ul>
        </div>

        {/* お問い合わせ */}
        <div className="dao-card mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Handshake className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">お問い合わせ</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            パートナーシップにご興味のある団体は、Xよりご連絡ください。
          </p>
          <a
            href="https://x.com/yamidao_eth"
            target="_blank"
            rel="noopener noreferrer"
            className="dao-btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Xでメッセージ
          </a>
        </div>

        {/* バナー素材 */}
        <BannerSection />
      </div>
    </section>
  )
}

function BannerSection() {
  const [copied, setCopied] = useState(false)

  const embedCode = `<a href="${SITE_URL}" target="_blank" rel="noopener noreferrer">
  <img src="${BANNER_URL}" alt="YAMI DAO" width="480" height="160" />
</a>`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = embedCode
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="dao-card animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <Code className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">パートナーバナー</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        パートナーサイトに掲載いただけるバナー素材です
      </p>

      <div className="bg-muted/30 rounded-lg p-3 mb-4 flex items-center justify-center">
        <Image
          src={BANNER_URL}
          alt="YAMI DAO Banner"
          width={240}
          height={80}
          className="max-w-full h-auto"
          unoptimized
        />
      </div>

      <div className="relative">
        <pre className="bg-muted/50 rounded-lg p-4 text-xs overflow-x-auto">
          <code className="text-muted-foreground">{embedCode}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-card hover:bg-muted transition-colors"
          title="コピー"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  )
}
