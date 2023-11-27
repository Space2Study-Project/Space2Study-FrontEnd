import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScrollToTopButton, {
  scrollToTop
} from '~/components/scroll-to-top-button/ScrollToTopButton'

window.scrollTo = vi.fn()

describe('ScrollToTopButton dialog test', () => {
  beforeEach(() => {
    render(<ScrollToTopButton element={{ current: window }} />)
  })

  it('should show ArrowUpwardRoundedIcon', async () => {
    fireEvent.scroll(window, { target: { scrollTop: 500 } })

    await waitFor(() =>
      expect(screen.getByTestId('ArrowUpwardRoundedIcon')).toBeInTheDocument()
    )
  })
  it('should call function scrollTo', async () => {
    fireEvent.scroll(window, { target: { scrollTop: 500 } })

    const button = screen.queryByTestId('ArrowUpwardRoundedIcon')

    fireEvent.click(button)

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0
    })
  })
})
describe('scrollToTop function test', () => {
  it('should scroll to top with smooth behavior', () => {
    const element = { current: { scrollTo: vi.fn() } }

    scrollToTop(element)

    expect(element.current.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0
    })
  })
})
