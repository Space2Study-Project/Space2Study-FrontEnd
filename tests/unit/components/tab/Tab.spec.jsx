import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Tab from '~/components/tab/Tab'
import { vi } from 'vitest'

describe('Tab Component', () => {
  it('should render the label of the tab', () => {
    render(<Tab>Tab Label</Tab>)
    expect(screen.getByText('Tab Label')).toBeInTheDocument()
  })

  it('should apply active tab styles if activeTab is true', () => {
    render(<Tab activeTab>Active Tab</Tab>)
    const tabButton = screen.getByText('Active Tab')
    expect(tabButton).toBeInTheDocument()
  })

  it('should not apply active tab styles if activeTab is false', () => {
    render(<Tab activeTab={false}>Inactive Tab</Tab>)
    const tabButton = screen.getByText('Inactive Tab')
    expect(tabButton).not.toHaveClass('activeTab')
  })

  it('should call onClick function when the tab is clicked', () => {
    const onClickMock = vi.fn()
    render(<Tab onClick={onClickMock}>Clickable Tab</Tab>)
    const tabButton = screen.getByText('Clickable Tab')

    fireEvent.click(tabButton)
    expect(onClickMock).toHaveBeenCalled()
  })
})
