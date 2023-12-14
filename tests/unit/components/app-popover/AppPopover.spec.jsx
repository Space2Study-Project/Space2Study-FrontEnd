import { render, fireEvent, waitFor } from '@testing-library/react'
import AppPopover from '~/components/app-popover/AppPopover'
import { beforeEach, vi } from 'vitest'

const closePopover = vi.fn()
const openPopover = vi.fn()

const initialItems = <div data-testid='initial-items'>Initial Items</div>
const showMoreElem = (
  <div data-testid='show-more' onClick={openPopover}>
    Show More
  </div>
)

describe('AppPopover component', () => {
  let getByTestId

  beforeEach(() => {
    const rendered = render(
      <AppPopover initialItems={initialItems} showMoreElem={showMoreElem} />
    )
    getByTestId = rendered.getByTestId
  })

  it('renders initial items and showMoreElem', () => {
    expect(getByTestId('initial-items')).toBeInTheDocument()
    expect(getByTestId('show-more')).toBeInTheDocument()
  })

  it('opens popover when showMoreElem is clicked', () => {
    fireEvent.click(getByTestId('show-more'))
    expect(openPopover).toHaveBeenCalled()
    expect(getByTestId('app-popover')).toBeInTheDocument()
  })

  it('closes popover when clicking outside', () => {
    waitFor(() => {
      fireEvent.click(getByTestId('show-more'))
      fireEvent.click(document)

      expect(closePopover).toHaveBeenCalledTimes(1)
      expect(getByTestId('app-popover')).not.toBeInTheDocument()
    })
  })

  it('triggers openPopover function when clicking on the popover', async () => {
    fireEvent.click(getByTestId('show-more'))

    const popover = getByTestId('app-popover')
    expect(popover).toBeInTheDocument()

    fireEvent.click(popover)

    await waitFor(() => {
      expect(popover).toBeInTheDocument()
    })
  })

  it('triggers onClick handler when showMoreElem is clicked', () => {
    fireEvent.click(getByTestId('show-more'))

    expect(openPopover).toHaveBeenCalled()
    expect(getByTestId('app-popover')).toBeInTheDocument()
  })
})
