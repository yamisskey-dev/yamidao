import { render, screen } from '@testing-library/react'
import { Ecosystem } from '../Ecosystem'

describe('Ecosystem', () => {
  it('やみすきーとやみはぶへのリンクがある', () => {
    render(<Ecosystem />)
    expect(screen.getByRole('link', { name: /Misskey/ })).toHaveAttribute('href', 'https://yami.ski')
    expect(screen.getByRole('link', { name: /やみはぶ/ })).toHaveAttribute('href', 'https://hub.yami.ski/guides/ecosystem/')
  })
})
