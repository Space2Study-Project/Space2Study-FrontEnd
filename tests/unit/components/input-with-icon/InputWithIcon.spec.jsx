import { screen, render } from '@testing-library/react'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

describe('Input With Icon component', () => {
  const props = {
    value: 'TEST',
    startIcon: <CloudUploadIcon /> // random test icon
  }

  beforeEach(() => {
    render(<InputWithIcon {...props} />)
  })

  it('should contain startIcon', () => {
    const startIcon = screen.getByTestId('CloudUploadIcon')
    expect(startIcon).toBeInTheDocument()
  })

  it('should contain clear icon', () => {
    const startIcon = screen.getByTestId('clearIcon')
    expect(startIcon).toBeInTheDocument()
  })
})
