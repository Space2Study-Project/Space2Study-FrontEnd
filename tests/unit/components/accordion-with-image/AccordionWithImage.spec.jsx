import { render, fireEvent, screen } from '@testing-library/react'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'

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
    const firstImage = screen.getByRole('img', { src: 'image1.jpg' })
    const firstTitle = screen.getByText('Item 1')
    const firstDescription = screen.getByText('Description 1')

    expect(accordion).toBeInTheDocument()
    expect(firstImage).toBeInTheDocument()
    expect(firstTitle).toBeInTheDocument()
    expect(firstDescription).toBeInTheDocument()
  })

  it('should open content when user clicks on the title', () => {
    render(<AccordionWithImage items={items} />)
    const secondTitle = screen.getByText('Item 2')
    fireEvent.click(secondTitle)
    const secondImage = screen.getByRole('img', { src: 'image2.jpg' })
    const secondDescription = screen.getByText('Description 2')
    expect(secondImage).toBeInTheDocument()
    expect(secondDescription).toBeInTheDocument()
  })
})
