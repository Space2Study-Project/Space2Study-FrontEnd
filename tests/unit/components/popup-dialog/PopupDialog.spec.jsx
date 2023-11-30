import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, vi } from 'vitest'

import PopupDialog from '~/components/popup-dialog/PopupDialog'

const closeModal = vi.fn()
const closeModalAfterDelay = vi.fn()

describe('Popup dialog test', () => {
  const props = {
    content: 'content',
    paperProps: 'paper props',
    timerId: 'timer id',
    closeModal: closeModal,
    closeModalAfterDelay: closeModalAfterDelay
  }

  beforeEach(() => {
    render(<PopupDialog {...props} />)
  })

  it('should render PopupDialog component', () => {
    const popupElement = screen.getByTestId('popup')
    expect(popupElement).toBeInTheDocument()
  })

  it('should be shown content text', () => {
    const content = screen.getByText(props.content)

    expect(content).toBeInTheDocument()
  })

  it('should imitate click on the close button and popup should be closed', async () => {
    const closeButton = screen.getByTestId('popup').querySelector('button')
    fireEvent.click(closeButton)

    vi.fn(() => {
      expect(closeModal).toHaveBeenCalledTimes(1)
    })
  })

  it('should imitate click with delay and popup should be closed', async () => {
    const popup = screen.getByTestId('popup')
    fireEvent.click(popup)
    fireEvent.click(popup)

    await vi.fn(() => {
      expect(closeModalAfterDelay).toHaveBeenCalledTimes(2)
    })
  })
})
