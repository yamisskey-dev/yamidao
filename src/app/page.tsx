import { Vote, Shield, KeyRound, Eye } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Section } from '@/components/landing/Section'
import { LinkCard } from '@/components/landing/LinkCard'
import { GetStarted } from '@/components/landing/GetStarted'

const tools = [
  { Icon: Vote, title: 'Snapshot', href: 'https://snapshot.org/#/s:yamidao.eth', description: 'ガス代なしで投票する' },
  {
    Icon: Shield,
    title: 'Safe',
    href: 'https://app.safe.global/home?safe=oeth:0x9D315c45B721132674D1aBED44F642b2dE24A1c2',
    description: 'みんなの承認で動かすお金の管理',
  },
  { Icon: KeyRound, title: 'Guild', href: 'https://guild.xyz/yami', description: 'ウォレットをつないでメンバーになる' },
  {
    Icon: Eye,
    title: 'Etherscan',
    href: 'https://etherscan.io/name-lookup-search?id=yami.eth',
    description: 'お金の流れをぜんぶ見る',
  },
]

export default function Home() {
  return (
    <div className="yami-landing min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-4 md:pt-6">
          <Hero />
          <Features />

          <Section id="tools" title="ガバナンス" dots>
            <div className="grid gap-4 sm:grid-cols-2">
              {tools.map((tool) => (
                <LinkCard key={tool.href} {...tool} />
              ))}
            </div>
          </Section>

          <GetStarted />
        </div>
      </main>
      <Footer />
    </div>
  )
}
