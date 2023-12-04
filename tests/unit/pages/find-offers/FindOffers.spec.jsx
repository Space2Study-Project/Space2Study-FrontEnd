import { render, screen } from '@testing-library/react'
import FindOffers from '~/pages/find-offers/FindOffers'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: function () {
    return <div data-testid='find-offers'>Find offers</div>
  }
}))

describe('FindOffers', () => {
  beforeEach(() => {
    render(<FindOffers />)
  })
  it('renders the FindOffers component', () => {
    const findOffersElement = screen.getByTestId('find-offers')
    expect(findOffersElement).toBeInTheDocument()
  })

  it('renders the text content of component', () => {
    const findOffersText = screen.getByText(/find offers/i)
    expect(findOffersText).toBeInTheDocument()
  })
})
