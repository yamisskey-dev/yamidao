'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Laptop, Moon, Sun } from 'lucide-react'

// やみはぶと同じく 自動 → ライト → ダーク を順に切り替える円形ボタン
const order = ['system', 'light', 'dark'] as const
type Theme = (typeof order)[number]

const icons = {
  system: Laptop,
  light: Sun,
  dark: Moon,
} as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // SSR 時は theme が不定なので、hydration 後にだけ実際のアイコンを出す
  useEffect(() => setMounted(true), [])

  const current: Theme = mounted && (order as readonly string[]).includes(theme ?? '') ? (theme as Theme) : 'system'
  const Icon = icons[current]

  const cycle = () => {
    const next = order[(order.indexOf(current) + 1) % order.length]
    setTheme(next)
  }

  return (
    <button type="button" className="yami-icon-button" onClick={cycle} aria-label="テーマを切り替える">
      <Icon className="h-[1.125rem] w-[1.125rem]" />
    </button>
  )
}
