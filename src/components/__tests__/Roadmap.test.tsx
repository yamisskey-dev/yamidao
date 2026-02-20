import { render, screen } from '@testing-library/react'
import { Roadmap } from '../Roadmap'

describe('Roadmap', () => {
  it('セクションIDがroadmapである', () => {
    const { container } = render(<Roadmap />)
    expect(container.querySelector('#roadmap')).toBeInTheDocument()
  })

  it('見出しが表示される', () => {
    render(<Roadmap />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('全Phaseが表示される', () => {
    render(<Roadmap />)
    expect(screen.getByText(/Phase 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Phase 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Phase 3/i)).toBeInTheDocument()
  })
})
