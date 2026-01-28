import { render, screen } from '@testing-library/react'
import { Join } from '../Join'
import { AuthProvider } from '@/contexts/AuthContext'

// テスト用のラッパー
function renderWithAuth(ui: React.ReactElement) {
  return render(<AuthProvider>{ui}</AuthProvider>)
}

describe('Join', () => {
  it('セクションタイトルが表示される', () => {
    renderWithAuth(<Join />)
    expect(screen.getByRole('heading', { name: /参加する/i })).toBeInTheDocument()
  })

  it('プライバシー方針が表示される', () => {
    renderWithAuth(<Join />)
    expect(screen.getByText(/匿名で参加可能/)).toBeInTheDocument()
    expect(screen.getByText(/ウォレットアドレスやGitHubアカウント/)).toBeInTheDocument()
  })

  it('つくるパスが表示される', () => {
    renderWithAuth(<Join />)
    expect(screen.getByText(/つくる/)).toBeInTheDocument()
    expect(screen.getByText(/コード・ドキュメント・翻訳/)).toBeInTheDocument()
  })

  it('つかうパスが表示される', () => {
    renderWithAuth(<Join />)
    expect(screen.getByText(/つかう/)).toBeInTheDocument()
    expect(screen.getByText(/やみすきーに登録/)).toBeInTheDocument()
  })

  it('つなぐパスが表示される', () => {
    renderWithAuth(<Join />)
    expect(screen.getByText(/つなぐ/)).toBeInTheDocument()
    expect(screen.getByText(/メンバーシップ取得/)).toBeInTheDocument()
  })

  it('GitHubへのリンクが表示される', () => {
    renderWithAuth(<Join />)
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/yamisskey-dev')
  })

  it('やみすきーへのリンクが表示される', () => {
    renderWithAuth(<Join />)
    const yamiLink = screen.getByRole('link', { name: /やみすきー/i })
    expect(yamiLink).toHaveAttribute('href', 'https://yami.ski')
  })

  it('Guildへのリンクが表示される', () => {
    renderWithAuth(<Join />)
    const guildLink = screen.getByRole('link', { name: /Guild/i })
    expect(guildLink).toHaveAttribute('href', 'https://guild.xyz/yamidao')
  })

  it('セクションIDがjoinである', () => {
    const { container } = renderWithAuth(<Join />)
    const section = container.querySelector('#join')
    expect(section).toBeInTheDocument()
  })
})
