import { render, screen, waitFor } from '@testing-library/react'

import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'
import CategoryItems from '~/components/category-items/CategoryItems'

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategories: vi.fn(() =>
      Promise.resolve({
        data: {
          items: [
            {
              _id: '1',
              name: 'Computer science',
              totalOffers: { student: 5, tutor: 10 }
            },
            {
              _id: '2',
              name: 'Mathematics',
              totalOffers: { student: 8, tutor: 12 }
            }
          ]
        }
      })
    )
  }
}))

describe('CategoryItems Component', () => {
  it('should render the CategoryItems component and load categories', async () => {
    render(
      <Router>
        <CategoryItems />
      </Router>
    )

    await waitFor(() => {
      const category1Element = screen.getByText('Computer science')
      const category2Element = screen.getByText('Mathematics')
      expect(category1Element).toBeInTheDocument()
      expect(category2Element).toBeInTheDocument()
    })
  })
})
