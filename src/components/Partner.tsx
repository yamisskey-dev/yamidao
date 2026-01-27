'use client'

import { Handshake, ExternalLink, Code, Copy, Check } from 'lucide-react'
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
            居場所であり続けながら、必要なときに外部支援へつながる導線。
          </p>
        </div>

        {/* 掲載ポリシー */}
        <div className="dao-card mb-8 animate-fade-in-up">
          <ul className="text-muted-foreground text-sm space-y-2">
            <li><span className="text-foreground font-medium">趣旨:</span> 掲載と引き換えに、外部支援窓口としての役割を担う</li>
            <li><span className="text-foreground font-medium">条件:</span> 実在確認・理念理解・プライバシー方針に同意</li>
            <li><span className="text-foreground font-medium">対象外:</span> スピリチュアル・情報商材・マルチ・公的窓口リスト</li>
            <li><span className="text-foreground font-medium">掲載料:</span> 無料（広告ではない）</li>
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
