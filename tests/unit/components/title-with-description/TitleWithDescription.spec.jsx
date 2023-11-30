import { screen, render } from '@testing-library/react'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

describe('Title With Description component', () => {
  it('should render with title and description', () => {
    const props = {
      title: 'TEST_TITLE',
      description: 'TEST_DESCRIPTION'
    }
    render(<TitleWithDescription {...props} />)

    const title = screen.getByText('TEST_TITLE')
    const description = screen.getByText('TEST_DESCRIPTION')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render without title and description', () => {
    render(<TitleWithDescription />)

    const title = screen.queryByText(/TEST_TITLE/)
    const description = screen.queryByText(/TEST_DESCRIPTION/)

    expect(title).not.toBeInTheDocument()
    expect(description).not.toBeInTheDocument()
  })
})
