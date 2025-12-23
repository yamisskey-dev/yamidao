import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { GitHubCorner } from '@/components/GitHubCorner'
import { ArrowRight, Shield, Heart, Users, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GitHubCorner />

      {/* Hero Section - Full viewport height */}
      <section className="flex-1 min-h-screen relative flex items-center justify-center px-4 md:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
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
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Mental Health Tech Collective
            </p>
          </div>

          {/* Value Props */}
          <div className="mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Heart className="h-4 w-4" />
                メンタルファースト
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                <Shield className="h-4 w-4" />
                プライバシーファースト
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                <Users className="h-4 w-4" />
                コミュニティ主導
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/app"
              className="dao-btn-primary inline-flex items-center gap-2 text-lg py-3 px-8"
            >
              <Rocket className="h-5 w-5" />
              Launch App
            </Link>
            <Link
              href="/about"
              className="dao-btn-secondary inline-flex items-center gap-2 text-lg py-3 px-8"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
