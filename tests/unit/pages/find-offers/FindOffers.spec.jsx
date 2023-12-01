import { render, screen } from '@testing-library/react'
import FindOffers from '~/pages/find-offers/FindOffers'

describe('FindOffers', () => {
  beforeEach(() => {
    render(<FindOffers />)
  })
  it('renders the FindOffers component', () => {
    const findOffersElement = screen.getByTestId('find-offers')
    expect(findOffersElement).toBeInTheDocument()
  })

  it('renders the FindOffers component', () => {
    const findOffersText = screen.getByText('Find offers')
    expect(findOffersText).toBeInTheDocument()
  })
})
