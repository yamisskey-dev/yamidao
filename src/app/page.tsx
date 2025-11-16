import { Hero } from '@/components/Hero'
import { AboutDAO } from '@/components/AboutDAO'
import { Governance } from '@/components/Governance'
import { Funding } from '@/components/Funding'
import { Members } from '@/components/Members'
import { Roadmap } from '@/components/Roadmap'
import { Join } from '@/components/Join'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutDAO />
      <Governance />
      <Funding />
      <Members />
      <Roadmap />
      <Join />
      <Footer />
    </div>
  )
}
