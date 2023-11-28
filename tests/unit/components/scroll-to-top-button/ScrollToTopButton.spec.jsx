// import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'

// window.scrollTo = vi.fn()

// describe('ScrollToTopButton dialog test', () => {
//   beforeEach(() => {
//     render(<ScrollToTopButton element={{ current: window }} />)
//   })

//   it('should show ArrowUpwardRoundedIcon', async () => {
//     fireEvent.scroll(window, { target: { scrollTop: 500 } })

//     await waitFor(() =>
//       expect(screen.getByTestId('ArrowUpwardRoundedIcon')).toBeInTheDocument()
//     )
//   })
//   it('should call function scrollTo', async () => {
//     fireEvent.scroll(window, { target: { scrollTop: 500 } })

//     const button = screen.queryByTestId('ArrowUpwardRoundedIcon')

//     fireEvent.click(button)

//     expect(window.scrollTo).toHaveBeenCalledWith({
//       behavior: 'smooth',
//       top: 0
//     })
//   })
// })
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import { jest } from 'jest'
// Mock scrollTo function
window.scrollTo = jest.fn()

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

    const button = screen.getByTestId('ArrowUpwardRoundedIcon')

    fireEvent.click(button)

    // Use jest's mock function to check if scrollTo is called with the expected arguments
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })
})
