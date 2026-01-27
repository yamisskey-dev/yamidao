import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { Partner } from '@/components/Partner'

export const metadata: Metadata = {
  title: 'Partner | YAMI DAO',
  description: 'YAMI DAOのパートナー。オープンメンタルヘルスの実現に向けて、共に歩む組織・団体を募集しています。',
  openGraph: {
    title: 'Partner | YAMI DAO',
    description: 'YAMI DAOのパートナー。オープンメンタルヘルスの実現に向けて、共に歩む組織・団体を募集しています。',
  },
}

export default function PartnerPage() {
  return (
    <PageLayout>
      <Partner />
    </PageLayout>
  )
}
