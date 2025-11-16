import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('YAMI DAOのロゴが表示される', () => {
    render(<Footer />)
    expect(screen.getAllByText(/YAMI DAO/i).length).toBeGreaterThan(0)
  })

  it('GitHubリンクが表示される', () => {
    const { container } = render(<Footer />)
    const githubLinks = container.querySelectorAll('a[href*="github.com"]')
    expect(githubLinks.length).toBeGreaterThan(0)
  })

  it('yamisskey-dev organizationへのリンクが表示される', () => {
    render(<Footer />)
    const orgLink = screen.getByRole('link', { name: /yamisskey-dev/i })
    expect(orgLink).toHaveAttribute('href', 'https://github.com/yamisskey-dev')
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

  it('Fundingセクションへのリンクが表示される', () => {
    render(<Footer />)
    const fundingLink = screen.getByRole('link', { name: /Funding/i })
    expect(fundingLink).toHaveAttribute('href', '#funding')
  })
})
