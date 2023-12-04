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
})
