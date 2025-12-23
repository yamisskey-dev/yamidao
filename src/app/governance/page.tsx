import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { Governance } from '@/components/Governance'

export const metadata: Metadata = {
  title: 'Governance | YAMI DAO',
  description: 'YAMI DAOの組織構成と意思決定プロセス。Snapshot投票とSafe Treasuryによる透明な運営。',
  openGraph: {
    title: 'Governance | YAMI DAO',
    description: 'YAMI DAOの組織構成と意思決定プロセス。Snapshot投票とSafe Treasuryによる透明な運営。',
  },
}

export default function GovernancePage() {
  return (
    <PageLayout>
      <Governance />
    </PageLayout>
  )
}
