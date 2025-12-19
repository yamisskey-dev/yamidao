import { render, screen } from '@testing-library/react'
import { Hero } from '../Hero'

describe('Hero', () => {
  it('DAOビジョンのタイトルが表示される', () => {
    render(<Hero />)
    expect(screen.getByText('YAMI DAO')).toBeInTheDocument()
  })

  it('ロゴが表示される', () => {
    render(<Hero />)
    expect(screen.getByAltText('YAMI DAO Logo')).toBeInTheDocument()
  })

  it('メインメッセージが表示される', () => {
    render(<Hero />)
    expect(screen.getByText(/プライバシー保護/)).toBeInTheDocument()
    expect(screen.getByText(/メンタルヘルス/)).toBeInTheDocument()
  })

  it('参加ボタンが表示される', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /参加する/ })).toBeInTheDocument()
  })

  it('セクションIDがheroである', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('#hero')
    expect(section).toBeInTheDocument()
  })

  it('オープンソースとWeb3の理念が表示される', () => {
    render(<Hero />)
    expect(screen.getByText(/オープンソース/)).toBeInTheDocument()
    expect(screen.getByText(/Web3/)).toBeInTheDocument()
  })
})
