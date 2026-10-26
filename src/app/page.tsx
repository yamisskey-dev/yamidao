import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/landing/Hero'
import { Stats } from '@/components/landing/Stats'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Vision } from '@/components/landing/Vision'
import { GetStarted } from '@/components/landing/GetStarted'

export default function Home() {
  return (
    <div className="yami-landing min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-4 md:pt-6">
          <Hero />
          <Stats />
          <HowItWorks />
          <Vision />
          <GetStarted />
        </div>
      </main>
      <Footer />
    </div>
  )
}
