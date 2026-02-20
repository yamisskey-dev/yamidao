import { render, screen } from '@testing-library/react'
import { AboutDAO } from '../AboutDAO'

describe('AboutDAO', () => {
  it('セクションIDがaboutである', () => {
    const { container } = render(<AboutDAO />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })

  it('見出しが表示される', () => {
    render(<AboutDAO />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('YAMIエコシステムへのリンクがある', () => {
    render(<AboutDAO />)
    const link = screen.getByRole('link', { name: /YAMIエコシステム/i })
    expect(link).toHaveAttribute('href', 'https://hub.yami.ski/guides/ecosystem/')
  })
})
