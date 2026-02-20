import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { GitHubCorner } from '@/components/GitHubCorner'
import { Footer } from '@/components/Footer'
import { ArrowRight, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GitHubCorner />

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center px-4 md:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-breathe"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-breathe [animation-delay:2s]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-breathe [animation-delay:4s]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Logo & Title */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <Image
                src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
                alt="YAMI DAO Logo"
                width={120}
                height={120}
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                YAMI DAO
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/70 max-w-md mx-auto leading-relaxed">
              ここは、あなたがあなたのままでいられる場所。
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
            <Link
              href="/join"
              className="dao-btn-primary inline-flex items-center gap-2 text-lg py-3 px-8"
            >
              <Users className="h-5 w-5" />
              はいる
            </Link>
            <Link
              href="/about"
              className="dao-btn-secondary inline-flex items-center gap-2 text-lg py-3 px-8"
            >
              わたしたちについて
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
