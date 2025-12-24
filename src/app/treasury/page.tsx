import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { Treasury } from '@/components/Treasury'

export const metadata: Metadata = {
  title: 'Treasury | YAMI DAO',
  description: 'YAMI DAOの資金管理。完全非営利・透明な運用方針とSafeマルチシグによる資金管理。',
  openGraph: {
    title: 'Treasury | YAMI DAO',
    description: 'YAMI DAOの資金管理。完全非営利・透明な運用方針とSafeマルチシグによる資金管理。',
  },
}

export default function TreasuryPage() {
  return (
    <PageLayout>
      <Treasury />
    </PageLayout>
  )
}
