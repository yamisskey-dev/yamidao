import { render, screen } from '@testing-library/react'
import { Governance } from '../Governance'

describe('Governance', () => {
  it('セクションタイトルが表示される', () => {
    render(<Governance />)
    expect(screen.getByRole('heading', { name: /Governance/i })).toBeInTheDocument()
  })

  it('Phase 2実装予定のメッセージが表示される', () => {
    render(<Governance />)
    expect(screen.getAllByText(/Phase 2/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/準備中/).length).toBeGreaterThan(0)
  })

  it('提案システムの説明が表示される', () => {
    render(<Governance />)
    expect(screen.getAllByText(/投票/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/提案/).length).toBeGreaterThan(0)
  })

  it('将来実装される機能の説明が表示される', () => {
    render(<Governance />)
    expect(screen.getAllByText(/ガバナンストークン/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/ガバナンス/).length).toBeGreaterThan(0)
  })

  it('セクションIDがgovernanceである', () => {
    const { container } = render(<Governance />)
    const section = container.querySelector('#governance')
    expect(section).toBeInTheDocument()
  })

  it('Snapshotへのリンクまたは説明が表示される', () => {
    render(<Governance />)
    expect(screen.getAllByText(/Snapshot/).length).toBeGreaterThan(0)
  })

  it('組織体系にメンバー数が表示される', () => {
    render(<Governance />)
    expect(screen.getAllByText(/YAMI DAO/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/やみすきー運営部/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/yamisskey-dev/).length).toBeGreaterThan(0)
    // メンバー数が表示される (1人, 4人, 3人)
    expect(screen.getByText('1人')).toBeInTheDocument()
    expect(screen.getByText('4人')).toBeInTheDocument()
    expect(screen.getByText('3人')).toBeInTheDocument()
  })
})
