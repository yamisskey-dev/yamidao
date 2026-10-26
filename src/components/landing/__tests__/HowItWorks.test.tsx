import { render, screen, within } from '@testing-library/react'
import { HowItWorks } from '../HowItWorks'

describe('HowItWorks', () => {
  it('4つのステップを順番に表示する', () => {
    const { container } = render(<HowItWorks />)
    const steps = within(container.querySelector('ol') as HTMLElement).getAllByRole('listitem')
    expect(steps).toHaveLength(4)
    expect(steps[0]).toHaveTextContent('Misskey')
    expect(steps[1]).toHaveTextContent('ウォレット')
    expect(steps[2]).toHaveTextContent('Snapshot')
    expect(steps[3]).toHaveTextContent('Safe')
  })

  it('投票権 API へのリンクがある', () => {
    render(<HowItWorks />)
    expect(screen.getByRole('link', { name: /voting-power/i })).toHaveAttribute(
      'href',
      'https://dao.yami.ski/api/governance/voting-power',
    )
  })
})
