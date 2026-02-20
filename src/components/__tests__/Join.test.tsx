import { render, screen } from '@testing-library/react'
import { Join } from '../Join'
import { AuthProvider } from '@/contexts/AuthContext'

function renderWithAuth(ui: React.ReactElement) {
  return render(<AuthProvider>{ui}</AuthProvider>)
}

describe('Join', () => {
  it('セクションIDがjoinである', () => {
    const { container } = renderWithAuth(<Join />)
    expect(container.querySelector('#join')).toBeInTheDocument()
  })

  it('見出しが表示される', () => {
    renderWithAuth(<Join />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('GitHubへのリンクがある', () => {
    renderWithAuth(<Join />)
    const link = screen.getByRole('link', { name: /GitHub/i })
    expect(link).toHaveAttribute('href', 'https://github.com/yamisskey-dev')
  })

  it('やみすきーへのリンクがある', () => {
    renderWithAuth(<Join />)
    const link = screen.getByRole('link', { name: /やみすきー/i })
    expect(link).toHaveAttribute('href', 'https://yami.ski')
  })

  it('Guildへのリンクがある', () => {
    renderWithAuth(<Join />)
    const link = screen.getByRole('link', { name: /Guild/i })
    expect(link).toHaveAttribute('href', 'https://guild.xyz/yamidao')
  })
})
