import Link from 'next/link'
import { PageLayout } from '@/components/PageLayout'

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">ページが見つかりません</p>
          <Link href="/" className="yami-btn yami-btn-accent">
            トップへもどる
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
