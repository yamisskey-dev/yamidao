import { Hero } from '@/components/Hero'
import { AboutDAO } from '@/components/AboutDAO'
import { Governance } from '@/components/Governance'
import { Roadmap } from '@/components/Roadmap'
import { Join } from '@/components/Join'
import { Footer } from '@/components/Footer'
import { GitHubCorner } from '@/components/GitHubCorner'

export default function Home() {
  return (
    <div className="min-h-screen">
      <GitHubCorner />
      <Hero />
      <AboutDAO />
      <Governance />
      <Roadmap />
      <Join />
      <Footer />
    </div>
  )
}
