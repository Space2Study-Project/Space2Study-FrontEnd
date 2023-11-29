import { render, screen } from '@testing-library/react'
import AppTextArea from '~/components/app-text-area/AppTextArea'

describe('Title rendering in AppTextArea component', () => {
  it('should render title if was passed via props', () => {
    const title = 'Test Title'

    render(<AppTextArea title={title} />)

    const textTitle = screen.getByText(title)
    expect(textTitle).toBeInTheDocument()
  })
  it('shouldn`t render title if wasn`t passed via props', () => {
    render(<AppTextArea />)

    const title = screen.queryByText('Test Title')
    expect(title).not.toBeInTheDocument()
  })
})
