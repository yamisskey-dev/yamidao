import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { Join } from '@/components/Join'

export const metadata: Metadata = {
  title: 'Join | YAMI DAO',
  description: 'YAMI DAOへの参加方法。つくる・つかう・つなぐ、あなたの形で貢献できます。匿名参加可能。',
  openGraph: {
    title: 'Join | YAMI DAO',
    description: 'YAMI DAOへの参加方法。つくる・つかう・つなぐ、あなたの形で貢献できます。匿名参加可能。',
  },
}

export default function JoinPage() {
  return (
    <PageLayout>
      <Join />
    </PageLayout>
  )
}
