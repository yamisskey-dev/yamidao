import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative py-20 px-4 md:px-8 overflow-hidden gradient-bg"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative">
        {/* メインコンテンツ */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              YAMI DAO
            </span>
          </h1>
          <div className="flex justify-center">
            <Image
              src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
              alt="YAMI DAO Logo"
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>
        </div>

        <div className="mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg md:text-xl mb-6 leading-relaxed text-muted-foreground">
            <span className="text-primary font-semibold">プライバシー保護</span> × <span className="text-secondary font-semibold">メンタルヘルス</span>
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            <span className="text-accent font-semibold">オープンソース</span> × <span className="text-primary font-semibold">Web3</span>
          </p>
        </div>

        {/* CTAボタン */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Link
            href="#join"
            className="dao-btn-primary"
          >
            参加する
          </Link>
        </div>
      </div>
    </section>
  )
}
