import { render, screen } from '@testing-library/react'
import { AboutDAO } from '../AboutDAO'

describe('AboutDAO', () => {
  it('セクションタイトルが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByRole('heading', { name: /DAOについて/i })).toBeInTheDocument()
  })

  it('YAMIエコシステムへのリンクが表示される', () => {
    render(<AboutDAO />)
    const ecosystemLink = screen.getByRole('link', { name: /YAMIエコシステム/i })
    expect(ecosystemLink).toHaveAttribute('href', 'https://hub.yami.ski/guides/ecosystem/')
  })

  it('コアバリューが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getAllByText(/メンタルファースト/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/プライバシーファースト/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/コミュニティ主導/).length).toBeGreaterThan(0)
  })

  it('組織構成が表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByText(/組織構成/)).toBeInTheDocument()
    expect(screen.getByText(/やみすきー運営部/)).toBeInTheDocument()
    expect(screen.getByText(/yamisskey-dev/)).toBeInTheDocument()
  })

  it('セクションIDがaboutである', () => {
    const { container } = render(<AboutDAO />)
    const section = container.querySelector('#about')
    expect(section).toBeInTheDocument()
  })
})
