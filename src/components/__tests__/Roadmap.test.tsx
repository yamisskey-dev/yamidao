import { render, screen } from '@testing-library/react'
import { Roadmap } from '../Roadmap'

describe('Roadmap', () => {
  it('セクションタイトルが表示される', () => {
    render(<Roadmap />)
    expect(screen.getByRole('heading', { name: /Roadmap/i })).toBeInTheDocument()
  })

  it('Phase 1のマイルストーンが表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Phase 1/i)).toBeInTheDocument()
    expect(screen.getByText(/DAO立ち上げ/)).toBeInTheDocument()
  })

  it('Phase 2のマイルストーンが表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Phase 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Web3統合/)).toBeInTheDocument()
  })

  it('Phase 3のマイルストーンが表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Phase 3/i)).toBeInTheDocument()
    expect(screen.getByText(/フルDAO化/)).toBeInTheDocument()
  })

  it('2025年のマイルストーンが表示される', () => {
    render(<Roadmap />)
    expect(screen.getAllByText(/2025/).length).toBeGreaterThan(0)
  })

  it('トークン関連のマイルストーンが表示される', () => {
    render(<Roadmap />)
    expect(screen.getAllByText(/トークン/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/ガバナンス/).length).toBeGreaterThan(0)
  })

  it('セクションIDがroadmapである', () => {
    const { container } = render(<Roadmap />)
    const section = container.querySelector('#roadmap')
    expect(section).toBeInTheDocument()
  })

  it('タイムライン要素が表示される', () => {
    const { container } = render(<Roadmap />)
    const timeline = container.querySelector('[data-testid="timeline"]')
    expect(timeline).toBeInTheDocument()
  })
})
