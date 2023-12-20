import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import AppPopover from '~/components/app-popover/AppPopover'
import { beforeEach, vi } from 'vitest'

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

  it('opens and closes popover correctly', () => {
    fireEvent.click(getByTestId('show-more'))
    expect(openPopover).toHaveBeenCalled()
    expect(getByTestId('app-popover')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByTestId('app-popover'), {
      key: 'Escape',
      code: 'Escape'
    })
    waitFor(() => {
      expect(getByTestId('app-popover')).not.toBeInTheDocument()
    })
  })
})
