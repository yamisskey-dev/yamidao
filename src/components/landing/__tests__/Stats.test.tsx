import { render, screen, waitFor } from '@testing-library/react'
import { Stats } from '../Stats'

describe('Stats', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('取得に失敗してもフォールバックの数字を表示する', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('offline')) as unknown as typeof fetch
    render(<Stats />)
    expect(screen.getByText('提案')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('839')).toBeInTheDocument()
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    expect(screen.queryByText('live')).not.toBeInTheDocument()
  })

  it('Snapshot から取得した値で上書きする', async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (String(url).includes('snapshot')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { space: { proposalsCount: 12, votesCount: 40 } } }),
        })
      }
      return Promise.reject(new Error('offline'))
    }) as unknown as typeof fetch
    render(<Stats />)
    await waitFor(() => expect(screen.getByText('12')).toBeInTheDocument())
    expect(screen.getByText('40')).toBeInTheDocument()
    expect(screen.getByText('live')).toBeInTheDocument()
  })
})
