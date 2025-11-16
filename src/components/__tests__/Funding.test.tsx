import { render, screen } from '@testing-library/react'
import { Funding } from '../Funding'

describe('Funding', () => {
  it('セクションタイトルが表示される', () => {
    render(<Funding />)
    expect(screen.getByRole('heading', { name: /Funding & Treasury/i })).toBeInTheDocument()
  })

  it('基本原則が表示される', () => {
    render(<Funding />)
    expect(screen.getAllByText(/完全非営利運営/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/透明性/i).length).toBeGreaterThan(0)
  })

  it('資金源の説明が表示される', () => {
    render(<Funding />)
    expect(screen.getAllByText(/資金源/i).length).toBeGreaterThan(0)
  })

  it('Ethereumベースの記載がある', () => {
    render(<Funding />)
    expect(screen.getAllByText(/Ethereum/i).length).toBeGreaterThan(0)
  })

  it('Treasuryの説明が表示される', () => {
    render(<Funding />)
    expect(screen.getAllByText(/Treasury/i).length).toBeGreaterThan(0)
  })

  it('透明性確保の仕組みが表示される', () => {
    render(<Funding />)
    expect(screen.getAllByText(/ブロックチェーン/i).length).toBeGreaterThan(0)
  })

  it('セクションIDがfundingである', () => {
    const { container } = render(<Funding />)
    const section = container.querySelector('#funding')
    expect(section).toBeInTheDocument()
  })

  it('FAQセクションが表示される', () => {
    render(<Funding />)
    expect(screen.getAllByText(/FAQ/i).length).toBeGreaterThan(0)
  })

  it('非営利運営の理由が説明されている', () => {
    render(<Funding />)
    expect(screen.getAllByText(/非営利/i).length).toBeGreaterThan(0)
  })
})
