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

  it('Snapshot統合が表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Snapshot統合/)).toBeInTheDocument()
  })

  it('Safe統合が表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Safe統合/)).toBeInTheDocument()
  })

  it('Misskey認証が表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Misskey認証/)).toBeInTheDocument()
  })

  it('セクションIDがroadmapである', () => {
    const { container } = render(<Roadmap />)
    const section = container.querySelector('#roadmap')
    expect(section).toBeInTheDocument()
  })
})
