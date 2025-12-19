import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('YAMI DAOのロゴが表示される', () => {
    render(<Footer />)
    expect(screen.getAllByText(/YAMI DAO/i).length).toBeGreaterThan(0)
  })

  it('コピーライトが表示される', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`, 'i'))).toBeInTheDocument()
  })

  it('DAO組織の説明が表示される', () => {
    render(<Footer />)
    expect(screen.getByText(/Mental Health Tech/i)).toBeInTheDocument()
  })

  it('全てのリンクがtarget="_blank"で開く', () => {
    render(<Footer />)
    const externalLinks = screen.getAllByRole('link')
    const filteredLinks = externalLinks.filter(link =>
      link.getAttribute('href')?.startsWith('http')
    )
    filteredLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('フッターがfooterタグとして実装されている', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('ナビゲーションリンクが表示される', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /Governance/i })).toHaveAttribute('href', '#governance')
    expect(screen.getByRole('link', { name: /Roadmap/i })).toHaveAttribute('href', '#roadmap')
    expect(screen.getByRole('link', { name: /Join/i })).toHaveAttribute('href', '#join')
  })

  it('コミュニティリンクが表示される', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /Misskey/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Discord/i })).toBeInTheDocument()
  })

  it('ガバナンスリンクが表示される', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /Snapshot/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Safe/i })).toBeInTheDocument()
  })
})
