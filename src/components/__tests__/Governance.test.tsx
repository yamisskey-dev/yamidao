import { render, screen } from '@testing-library/react'
import { Governance } from '../Governance'

describe('Governance', () => {
  it('セクションIDがgovernanceである', () => {
    const { container } = render(<Governance />)
    expect(container.querySelector('#governance')).toBeInTheDocument()
  })

  it('見出しが表示される', () => {
    render(<Governance />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('Snapshotへのリンクがある', () => {
    render(<Governance />)
    const link = screen.getByRole('link', { name: /Snapshot/i })
    expect(link).toHaveAttribute('href', 'https://snapshot.org/#/s:yamidao.eth')
  })

  it('Safeへのリンクがある', () => {
    render(<Governance />)
    const link = screen.getByRole('link', { name: /Safe/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('app.safe.global'))
  })
})
