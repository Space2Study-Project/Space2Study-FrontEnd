import { render, screen } from '@testing-library/react'
import FindOffers from '~/pages/find-offers/FindOffers'

describe('FindOffers', () => {
  it('renders the FindOffers component', () => {
    render(<FindOffers />)
    const findOffersElement = screen.getByText('Find offers')
    expect(findOffersElement).toBeInTheDocument()
  })
})
