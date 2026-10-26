'use client'

import { useEffect, useState } from 'react'
import { Section } from './Section'

// 公開 API の取得に失敗したときに出す値（2026-10-26 時点）
const FALLBACK = {
  proposals: 4,
  votes: 8,
  users: 839,
  notes: 170180,
  instances: 1904,
  repos: 33,
}

type StatsData = typeof FALLBACK

const tiles: { key: keyof StatsData; label: string; source: string; href: string }[] = [
  { key: 'proposals', label: '提案', source: 'Snapshot', href: 'https://snapshot.org/#/s:yamidao.eth' },
  { key: 'votes', label: '投票', source: 'Snapshot', href: 'https://snapshot.org/#/s:yamidao.eth' },
  { key: 'users', label: 'やみすきーの住人', source: 'yami.ski', href: 'https://yami.ski' },
  { key: 'notes', label: 'つぶやかれたノート', source: 'yami.ski', href: 'https://yami.ski' },
  { key: 'instances', label: 'つながるサーバー', source: 'Fediverse', href: 'https://yami.ski' },
  { key: 'repos', label: '公開リポジトリ', source: 'GitHub', href: 'https://github.com/yamisskey-dev' },
]

async function fetchSnapshot(): Promise<Partial<StatsData>> {
  const res = await fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: '{ space(id: "yamidao.eth") { proposalsCount votesCount } }' }),
  })
  if (!res.ok) throw new Error(`snapshot ${res.status}`)
  const { data } = (await res.json()) as { data: { space: { proposalsCount: number; votesCount: number } } }
  return { proposals: data.space.proposalsCount, votes: data.space.votesCount }
}

async function fetchMisskey(): Promise<Partial<StatsData>> {
  const res = await fetch('https://yami.ski/api/stats', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  })
  if (!res.ok) throw new Error(`misskey ${res.status}`)
  const data = (await res.json()) as { originalUsersCount: number; originalNotesCount: number; instances: number }
  return { users: data.originalUsersCount, notes: data.originalNotesCount, instances: data.instances }
}

async function fetchGitHub(): Promise<Partial<StatsData>> {
  const res = await fetch('https://api.github.com/orgs/yamisskey-dev')
  if (!res.ok) throw new Error(`github ${res.status}`)
  const data = (await res.json()) as { public_repos: number }
  return { repos: data.public_repos }
}

export function Stats() {
  const [stats, setStats] = useState<StatsData>(FALLBACK)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.allSettled([fetchSnapshot(), fetchMisskey(), fetchGitHub()]).then((results) => {
      if (cancelled) return
      const patch: Partial<StatsData> = {}
      for (const r of results) {
        if (r.status === 'fulfilled') Object.assign(patch, r.value)
      }
      if (Object.keys(patch).length === 0) return
      setStats((prev) => ({ ...prev, ...patch }))
      setLive(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Section id="stats" title="数字でみる">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {tiles.map(({ key, label, source, href }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="yami-acrylic flex flex-col gap-1 px-4 py-6 text-center no-underline"
          >
            <span className="yami-stat-value yami-gradient-text">{stats[key].toLocaleString('ja-JP')}</span>
            <span className="text-sm font-bold text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">{source}</span>
          </a>
        ))}
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        {live ? (
          <>
            <span className="yami-live-dot" aria-hidden="true" />
            <span>live</span>
            <span>· Snapshot / やみすきー / GitHub の公開 API から取得</span>
          </>
        ) : (
          <span>2026-10-26 時点の値。ページを開くと公開 API から最新の数字を取得します</span>
        )}
      </p>
    </Section>
  )
}
