import { render, screen } from '@testing-library/react'
import { Hero } from '../Hero'

describe('Hero', () => {
  it('DAOビジョンのタイトルが表示される', () => {
    render(<Hero />)
    expect(screen.getByText('YAMI DAO')).toBeInTheDocument()
  })

  it('サブタイトルが表示される', () => {
    render(<Hero />)
    expect(screen.getByText('Mental Health Tech Collective')).toBeInTheDocument()
  })

  it('メインメッセージが表示される', () => {
    render(<Hero />)
    expect(screen.getByText(/プライバシー/)).toBeInTheDocument()
    expect(screen.getByText(/メンタルヘルス/)).toBeInTheDocument()
  })

  it('アクションボタンが表示される', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /プロジェクトを見る/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /DAOに参加/ })).toBeInTheDocument()
  })

  it('セクションIDがheroである', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('#hero')
    expect(section).toBeInTheDocument()
  })
})
