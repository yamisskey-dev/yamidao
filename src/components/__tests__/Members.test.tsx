import { render, screen } from '@testing-library/react'
import { Members } from '../Members'

describe('Members', () => {
  it('セクションタイトルが表示される', () => {
    render(<Members />)
    expect(screen.getByRole('heading', { name: /Members/i })).toBeInTheDocument()
  })

  it('プライバシー保護の方針が表示される', () => {
    render(<Members />)
    expect(screen.getByText(/プライバシー保護の方針/i)).toBeInTheDocument()
    expect(screen.getByText(/メンタルヘルスという繊細な領域において/i)).toBeInTheDocument()
  })

  it('ウォレットアドレスのみで参加可能と表示される', () => {
    render(<Members />)
    expect(screen.getByText(/ウォレットアドレスのみで参加可能/i)).toBeInTheDocument()
  })

  it('実名やメールアドレスは不要と表示される', () => {
    render(<Members />)
    expect(screen.getByText(/実名やメールアドレスは不要/i)).toBeInTheDocument()
  })

  it('匿名で貢献できることが表示される', () => {
    render(<Members />)
    expect(screen.getByText(/匿名で貢献できる環境を提供/i)).toBeInTheDocument()
  })

  it('参加の呼びかけが表示される', () => {
    render(<Members />)
    expect(screen.getByText(/あなたも匿名で貢献できます/i)).toBeInTheDocument()
  })

  it('「参加する」CTAが表示される', () => {
    render(<Members />)
    const joinLinks = screen.getAllByText(/参加/i)
    expect(joinLinks.length).toBeGreaterThan(0)
  })

  it('GitHubリンクが表示される', () => {
    render(<Members />)
    const githubLink = screen.getByRole('link', { name: /GitHubで貢献を見る/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/yamisskey-dev')
  })

  it('セクションIDがmembersである', () => {
    const { container } = render(<Members />)
    const section = container.querySelector('#members')
    expect(section).toBeInTheDocument()
  })

  it('個人のプロフィール情報は表示されない（プライバシー保護）', () => {
    render(<Members />)
    // i0z0mやhitalinといった個人名は表示されない
    expect(screen.queryByText('i0z0m')).not.toBeInTheDocument()
    expect(screen.queryByText('hitalin')).not.toBeInTheDocument()
  })
})
