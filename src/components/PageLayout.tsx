import { Navbar } from './Navbar'
import { GitHubCorner } from './GitHubCorner'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GitHubCorner />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
