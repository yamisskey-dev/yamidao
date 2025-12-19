import { render, screen } from '@testing-library/react'
import { Governance } from '../Governance'

describe('Governance', () => {
  it('セクションタイトルが表示される', () => {
    render(<Governance />)
    expect(screen.getByRole('heading', { name: /Governance/i })).toBeInTheDocument()
  })

  it('組織構成が表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/組織構成/)).toBeInTheDocument()
    expect(screen.getByText(/やみすきー運営部/)).toBeInTheDocument()
    expect(screen.getByText(/yamisskey-dev/)).toBeInTheDocument()
    expect(screen.getByText(/YAMI DAO/)).toBeInTheDocument()
  })

  it('Web3インフラが表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/透明性のインフラ/)).toBeInTheDocument()
  })

  it('Snapshotへのリンクが表示される', () => {
    render(<Governance />)
    const snapshotLink = screen.getByRole('link', { name: /Snapshot を見る/i })
    expect(snapshotLink).toHaveAttribute('href', 'https://snapshot.org/#/s:yamidao.eth')
  })

  it('Safeへのリンクが表示される', () => {
    render(<Governance />)
    const safeLink = screen.getByRole('link', { name: /Safe を見る/i })
    expect(safeLink).toHaveAttribute('href', expect.stringContaining('app.safe.global'))
  })

  it('透明性の二重保証が表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/透明性の二重保証/)).toBeInTheDocument()
    expect(screen.getByText(/GitHub（技術）/)).toBeInTheDocument()
    expect(screen.getByText(/Snapshot（組織・資金）/)).toBeInTheDocument()
  })

  it('資金運用方針が表示される', () => {
    render(<Governance />)
    expect(screen.getByText(/資金運用方針/)).toBeInTheDocument()
    expect(screen.getByText(/完全非営利/)).toBeInTheDocument()
  })

  it('セクションIDがgovernanceである', () => {
    const { container } = render(<Governance />)
    const section = container.querySelector('#governance')
    expect(section).toBeInTheDocument()
  })
})
