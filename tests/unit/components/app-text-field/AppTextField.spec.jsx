import { screen, render } from '@testing-library/react'
import AppTextField from '~/components/app-text-field/AppTextField'

describe('App Text Field component', () => {
  it('should render with error message', () => {
    const props = {
      errorMsg: 'TEST_ERROR'
    }

    render(<AppTextField {...props} />)

    const input = screen.getByRole('textbox')
    const errorTooltip = screen.getByText('TEST_ERROR')

    expect(input).toBeInTheDocument()
    expect(errorTooltip).toBeInTheDocument()
  })

  it('should render without error message', () => {
    render(<AppTextField />)

    const input = screen.getByRole('textbox')
    const errorText = screen.queryByText(/TEST_ERROR/)

    expect(input).toBeInTheDocument()
    expect(errorText).not.toBeInTheDocument()
  })
})
