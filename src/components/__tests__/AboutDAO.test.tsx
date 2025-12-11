import { render, screen } from '@testing-library/react'
import { AboutDAO } from '../AboutDAO'

describe('AboutDAO', () => {
  it('セクションタイトルが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByRole('heading', { name: /About DAO/i })).toBeInTheDocument()
  })

  it('YAMI DAOのビジョンが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByText(/YAMIエコシステム/)).toBeInTheDocument()
    expect(screen.getByText(/のガバナンスDAO/)).toBeInTheDocument()
  })

  it('組織のミッションが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getAllByText(/プライバシー保護/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/分散型ガバナンス/).length).toBeGreaterThan(0)
  })

  it('コアバリューが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByText(/Privacy by Design/)).toBeInTheDocument()
    expect(screen.getByText(/Decentralized Governance/)).toBeInTheDocument()
    expect(screen.getByText(/Mental Health First/)).toBeInTheDocument()
  })

  it('セクションIDがaboutである', () => {
    const { container } = render(<AboutDAO />)
    const section = container.querySelector('#about')
    expect(section).toBeInTheDocument()
  })
})
