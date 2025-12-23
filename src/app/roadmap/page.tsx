import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { Roadmap } from '@/components/Roadmap'

export const metadata: Metadata = {
  title: 'Roadmap | YAMI DAO',
  description: 'YAMI DAOの2025年以降の開発計画。Web3統合からフルDAO化までのロードマップ。',
  openGraph: {
    title: 'Roadmap | YAMI DAO',
    description: 'YAMI DAOの2025年以降の開発計画。Web3統合からフルDAO化までのロードマップ。',
  },
}

export default function RoadmapPage() {
  return (
    <PageLayout>
      <Roadmap />
    </PageLayout>
  )
}
