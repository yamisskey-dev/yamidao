import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('footerタグとして実装されている', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('コピーライトが表示される', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`, 'i'))).toBeInTheDocument()
  })

  it('外部リンクがtarget="_blank"で開く', () => {
    render(<Footer />)
    const externalLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.startsWith('http')
    )
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('ページリンクが正しいhrefを持つ', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/governance')
    expect(hrefs).toContain('/roadmap')
    expect(hrefs).toContain('/join')
    expect(hrefs).toContain('/partner')
  })

  it('コミュニティリンクがある', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /Misskey/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Discord/i })).toBeInTheDocument()
  })

  it('ガバナンスリンクがある', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /Snapshot/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Safe/i })).toBeInTheDocument()
  })
})
