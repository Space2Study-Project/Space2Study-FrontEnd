import { render, fireEvent, screen } from '@testing-library/react'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import { vi } from 'vitest'

vi.mock('~/components/accordion/Accordions', () => ({
  __esModule: true,
  default: function (props) {
    if (props.onClick) {
      props.onClick()
    }

    return (
      <div data-testid='mocked-accordions'>
        <div data-testid='item-title'>Item 1</div>
        <div data-testid='item-description'>Description</div>
      </div>
    )
  }
}))

describe('AccordionWithImage Component', () => {
  const items = [
    {
      id: 0,
      title: 'Item 1',
      description: 'Description 1',
      image: 'image1.jpg'
    },
    {
      id: 1,
      title: 'Item 2',
      description: 'Description 2',
      image: 'image2.jpg'
    }
  ]

  it('should render and display the first item by default', () => {
    render(<AccordionWithImage items={items} />)
    const mockedAccordions = screen.getByTestId('mocked-accordions')
    expect(mockedAccordions).toBeInTheDocument()
  })

  it('should open content when user clicks on the title', () => {
    render(<AccordionWithImage items={items} />)
    const titleElement = screen.getByText('Item 1')
    fireEvent.click(titleElement)
    const mockedComponent = screen.getByText('Description')
    expect(mockedComponent).toBeInTheDocument()
  })
})
