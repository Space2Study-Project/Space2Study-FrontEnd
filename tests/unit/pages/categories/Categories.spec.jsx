import { render, screen } from '@testing-library/react'
import Categories from '~/pages/categories/Categories'

describe('Categories page', () => {
  it('should render the page whith the page text in the document', () => {
    render(<Categories />)
    const pageTextElement = screen.getByText('Categories')

    expect(pageTextElement).toBeInTheDocument()
  })
})
