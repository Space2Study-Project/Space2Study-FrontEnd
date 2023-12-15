import CategoryHeader from '~/components/category-header/CategoryHeader'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Testing CategoryHeader component', () => {
  beforeEach(() => {
    render(<CategoryHeader />)
  })

  it('should render title', () => {
    const title = screen.getByText(/categoriesPage.title/i)
    expect(title).toBeInTheDocument()
  })
  it('should render description', () => {
    const desc = screen.getByText(/categoriesPage.description/i)
    expect(desc).toBeInTheDocument()
  })
  it('should render showOffers button', () => {
    const btn = screen.getByText(/categoriesPage.showAllOffers/i)
    expect(btn).toBeInTheDocument()
  })
  it('should render input', () => {
    const input = screen.getByPlaceholderText(/categoriesPage.searchLabel/i)
    expect(input).toBeInTheDocument()
  })
  it('should render search button', () => {
    const searchBtn = screen.getByText('Search')
    expect(searchBtn).toBeInTheDocument()
  })
  it('should render text under input', () => {
    const underInputDesc = screen.getByTestId('underInputText')
    expect(underInputDesc).toBeInTheDocument()
  })
  it('should render correct change of input value', () => {
    const input = screen.getByPlaceholderText(/categoriesPage.searchLabel/i)

    fireEvent.change(input, { target: { value: 'Language' } })
    expect(input.value).toBe('Language')
  })
})
