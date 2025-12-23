import { Navbar } from '@/components/Navbar'
import { GitHubCorner } from '@/components/GitHubCorner'
import { Hero } from '@/components/Hero'
import { AboutDAO } from '@/components/AboutDAO'
import { Governance } from '@/components/Governance'
import { Roadmap } from '@/components/Roadmap'
import { Join } from '@/components/Join'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
