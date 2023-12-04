import { render } from '@testing-library/react'
import { vi } from 'vitest'
import Categories from '~/pages/categories/Categories'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: function () {
    return <div data-testid='categories'>Categories</div>
  }
}))

describe('Categories Page', () => {
  it('should render the page', () => {
    const { getByTestId } = render(<Categories />)
    const pageWrapperCategory = getByTestId('categories')

    expect(pageWrapperCategory).toBeInTheDocument()
  })

  it('should have text in the document', () => {
    const { getByText } = render(<Categories />)
    const categoriesText = getByText('Categories')

    expect(categoriesText).toBeInTheDocument()
  })
})
