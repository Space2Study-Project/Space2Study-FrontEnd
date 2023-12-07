import { render, fireEvent, screen } from '@testing-library/react'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import { vi } from 'vitest'

vi.mock('~/components/accordion/Accordions', () => ({
  __esModule: true,
  default: function () {
    return <div data-testid='mocked-accordions'>Mocked Accordions</div>
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

    const accordion = screen.getByTestId('accordion')
    const mockedAccordions = screen.getByTestId('mocked-accordions')

    expect(accordion).toBeInTheDocument()
    expect(mockedAccordions).toBeInTheDocument()
  })

  it('should open content when user clicks on the title', () => {
    render(<AccordionWithImage items={items} />)
    const mockedAccordions = screen.getByTestId('mocked-accordions')
    fireEvent.click(mockedAccordions)
  })
})
