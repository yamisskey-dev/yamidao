import { render, screen } from '@testing-library/react'
import { AboutDAO } from '../AboutDAO'

describe('AboutDAO', () => {
  it('セクションタイトルが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByRole('heading', { name: /About/i })).toBeInTheDocument()
  })

  it('YAMIエコシステムへのリンクが表示される', () => {
    render(<AboutDAO />)
    const ecosystemLink = screen.getByRole('link', { name: /YAMIエコシステム/i })
    expect(ecosystemLink).toHaveAttribute('href', 'https://hub.yami.ski/guides/ecosystem/')
  })

  it('ビジョン・ミッションが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByText(/やみすきー運営部とyamisskey-devのガバナンス基盤/)).toBeInTheDocument()
  })

  it('コアバリューが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getAllByText(/メンタルファースト/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/プライバシーファースト/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/コミュニティ主導/).length).toBeGreaterThan(0)
  })

  it('セクションIDがaboutである', () => {
    const { container } = render(<AboutDAO />)
    const section = container.querySelector('#about')
    expect(section).toBeInTheDocument()
  })
})
