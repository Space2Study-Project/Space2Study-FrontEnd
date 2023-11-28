import { render, screen } from '@testing-library/react'
import Loader from '../../../../src/components/loader/Loader'

describe('Loader', () => {
  it('renders the Loader component', () => {
    render(<Loader />)
    const loaderElement = screen.getByTestId('loader')
    expect(loaderElement).toBeInTheDocument()
  })
})
