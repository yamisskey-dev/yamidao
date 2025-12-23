import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'App | YAMI DAO',
  description: 'YAMI DAO App。ウォレット接続でDAOに参加。Snapshot投票、Safe Treasury管理。',
  openGraph: {
    title: 'App | YAMI DAO',
    description: 'YAMI DAO App。ウォレット接続でDAOに参加。Snapshot投票、Safe Treasury管理。',
  },
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
