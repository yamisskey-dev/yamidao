import { render, screen } from '@testing-library/react'
import { Governance } from '../Governance'

describe('Governance', () => {
  it('セクションタイトルが表示される', () => {
    render(<Governance />)
    expect(screen.getByRole('heading', { name: /ガバナンス/i })).toBeInTheDocument()
  })

  it('意思決定方針が表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/意思決定方針/)).toBeInTheDocument()
    expect(screen.getByText(/投票ルール/)).toBeInTheDocument()
    expect(screen.getByText(/1人1票/)).toBeInTheDocument()
  })

  it('Sybil攻撃対策の説明が表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/Misskey認証とETHウォレット連携でSybil攻撃対策済み/)).toBeInTheDocument()
    expect(screen.getByText(/投票権は投票時に自動確認されます/)).toBeInTheDocument()
  })

  it('Snapshotへのリンクが表示される', () => {
    render(<Governance />)
    const snapshotLink = screen.getByRole('link', { name: /Snapshot/i })
    expect(snapshotLink).toHaveAttribute('href', 'https://snapshot.org/#/s:yamidao.eth')
  })

  it('Safeへのリンクが表示される', () => {
    render(<Governance />)
    const safeLink = screen.getByRole('link', { name: /Safe/i })
    expect(safeLink).toHaveAttribute('href', expect.stringContaining('app.safe.global'))
  })

  it('資金運用方針が表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/資金運用方針/)).toBeInTheDocument()
    expect(screen.getByText(/完全非営利/)).toBeInTheDocument()
    expect(screen.getByText(/資金の使途/)).toBeInTheDocument()
  })

  it('セクションIDがgovernanceである', () => {
    const { container } = render(<Governance />)
    const section = container.querySelector('#governance')
    expect(section).toBeInTheDocument()
  })
})
