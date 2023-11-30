import { render, screen } from '@testing-library/react'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'

describe('Title rendering in AppTextArea component', () => {
  it('should render title if was passed via props', () => {
    const props = {
      title: 'Test Title',
      maxLength: 5
    }

    render(<AppTextArea maxLength={props.maxLength} title={props.title} />)

    const textTitle = screen.getByText(props.title)
    expect(textTitle).toBeInTheDocument()
  })
  it('shouldn`t render title if wasn`t passed via props', () => {
    const props = {
      value: 1,
      maxLength: 5,
      minRows: 4,
      maxRows: 4
    }
    render(<AppTextArea {...props} />)

    const title = screen.queryByText('Test Title')
    expect(title).not.toBeInTheDocument()
  })
  it('shouldn`t render error', () => {
    const props = {
      errorMsg: 'Error message'
    }

    render(<AppTextField errorMsg={props.errorMsg} />)

    const errorMessage = screen.queryByText('Error message')
    expect(errorMessage).toBeInTheDocument()
  })
})
