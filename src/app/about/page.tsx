import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { AboutDAO } from '@/components/AboutDAO'

export const metadata: Metadata = {
  title: 'About | YAMI DAO',
  description: 'YAMI DAOのビジョンと価値観。メンタルファースト、プライバシーファースト、コミュニティ主導の理念。',
  openGraph: {
    title: 'About | YAMI DAO',
    description: 'YAMI DAOのビジョンと価値観。メンタルファースト、プライバシーファースト、コミュニティ主導の理念。',
  },
}

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutDAO />
    </PageLayout>
  )
}
