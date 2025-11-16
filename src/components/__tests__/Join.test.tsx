import { render, screen } from '@testing-library/react'
import { Join } from '../Join'

describe('Join', () => {
  it('セクションタイトルが表示される', () => {
    render(<Join />)
    expect(screen.getByRole('heading', { name: /Join YAMI DAO/i })).toBeInTheDocument()
  })

  it('開発者向けの参加パスが表示される', () => {
    render(<Join />)
    expect(screen.getAllByText(/開発者/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/コントリビュート/).length).toBeGreaterThan(0)
  })

  it('ユーザー向けの参加パスが表示される', () => {
    render(<Join />)
    expect(screen.getAllByText(/ユーザー/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/インスタンス/).length).toBeGreaterThan(0)
  })

  it('サポーター向けの参加パスが表示される', () => {
    render(<Join />)
    expect(screen.getAllByText(/サポーター/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/投票/).length).toBeGreaterThan(0)
  })

  it('yamisskey-devへのリンクが表示される', () => {
    render(<Join />)
    const githubLink = screen.getByRole('link', { name: /yamisskey-dev.*貢献/i })
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  it('Yamisskeyへのリンクが表示される', () => {
    render(<Join />)
    expect(screen.getAllByText(/Yamisskey/i).length).toBeGreaterThan(0)
  })

  it('参加方法の説明が表示される', () => {
    render(<Join />)
    expect(screen.getByText(/3つのパス/i)).toBeInTheDocument()
  })

  it('セクションIDがjoinである', () => {
    const { container } = render(<Join />)
    const section = container.querySelector('#join')
    expect(section).toBeInTheDocument()
  })

  it('各パスにアイコンが表示される', () => {
    const { container } = render(<Join />)
    // 開発者、ユーザー、サポーターのカードが3つ存在する
    const pathCards = container.querySelectorAll('[data-testid="join-path"]')
    expect(pathCards.length).toBe(3)
  })
})
