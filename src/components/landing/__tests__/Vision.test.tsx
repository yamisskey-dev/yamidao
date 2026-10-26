import { render, screen } from '@testing-library/react'
import { Vision } from '../Vision'

describe('Vision', () => {
  it('Retro Funding の展望を issue へのリンク付きで表示する', () => {
    render(<Vision />)
    expect(screen.getAllByText(/Retro Funding/).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /#5/ })).toHaveAttribute(
      'href',
      'https://github.com/yamisskey-dev/yamidao/issues/5',
    )
  })

  it('Optimism とトークン経済に触れている', () => {
    render(<Vision />)
    expect(screen.getAllByText(/Optimism/).length).toBeGreaterThan(0)
    expect(screen.getByText(/YAMI トークン/)).toBeInTheDocument()
  })
})
