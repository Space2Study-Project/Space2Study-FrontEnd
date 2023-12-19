import CategoryCard from '~/components/category-cards/CategoryCard'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

const mockCategory = {
  id: 'mockId',
  name: 'Mock Category',
  totalOffers: {
    student: 10,
    tutor: 15
  }
}

describe('CategoryCard Component', () => {
  it('should render the CategoryCard component with correct data', () => {
    render(
      <Router>
        <CategoryCard category={mockCategory} />
      </Router>
    )

    const categoryNameElement = screen.getByText('Mock Category')
    expect(categoryNameElement).toBeInTheDocument()

    const totalOffersElement = screen.getByTestId('offers')
    expect(totalOffersElement).toBeInTheDocument()
  })

  it('should handle undefined or missing category data gracefully', () => {
    render(<CategoryCard category={null} />)

    const cardElement = screen.queryByTestId('category-card')
    expect(cardElement).not.toBeInTheDocument()
  })
})
