import { render, fireEvent, waitFor } from '@testing-library/react'

import AppPopover from '~/components/app-popover/AppPopover'

const initialItems = <div data-testid='initial-items'>Initial Items</div>
const showMoreElem = <div data-testid='show-more'>Show More</div>

describe('AppPopover component', () => {
  it('renders initial items and showMoreElem', () => {
    const { getByTestId } = render(
      <AppPopover initialItems={initialItems} showMoreElem={showMoreElem} />
    )

    expect(getByTestId('initial-items')).toBeInTheDocument()
    expect(getByTestId('show-more')).toBeInTheDocument()
  })

  it('opens popover when showMoreElem is clicked', () => {
    const { getByTestId } = render(
      <AppPopover initialItems={initialItems} showMoreElem={showMoreElem} />
    )

    fireEvent.click(getByTestId('show-more'))

    expect(getByTestId('app-popover')).toBeInTheDocument()
  })

  it('hides element when hideElem is true and popover is open', () => {
    const { getByTestId, getByText } = render(
      <AppPopover
        hideElem
        initialItems={initialItems}
        showMoreElem={showMoreElem}
      />
    )

    fireEvent.click(getByTestId('show-more'))

    const initialItemsWrapper = getByText('Initial Items').parentElement
    expect(initialItemsWrapper).toHaveStyle('visibility: hidden')
  })

  it('closes popover when clicking outside', () => {
    const { getByTestId } = render(
      <AppPopover initialItems={initialItems} showMoreElem={showMoreElem} />
    )
    waitFor(() => {
      fireEvent.click(getByTestId('show-more'))
      fireEvent.click(document)

      expect(getByTestId('app-popover')).not.toBeInTheDocument()
    })
  })
})
