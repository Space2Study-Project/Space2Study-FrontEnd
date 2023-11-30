import { render, screen } from '@testing-library/react'
import AppTextArea from '~/components/app-text-area/AppTextArea'

vi.mock('~/components/app-text-field/AppTextField', () => ({
  __esModule: true,
  default: function () {
    return <button>AppTextField</button>
  }
}))

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
      value: {
        length: 1
      },
      maxLength: 5,
      minRows: 4,
      maxRows: 4
    }
    render(<AppTextArea {...props} />)

    const title = screen.queryByText('Test Title')
    expect(title).not.toBeInTheDocument()
  })
  it('shouldn`t render Typography if maxLength is absent', () => {
    const props = {
      maxLength: 0
    }
    render(<AppTextArea maxLength={props.maxLength} />)

    const typography = screen.queryByTestId('typography')
    expect(typography).not.toBeInTheDocument()
  })
  it('should render Typography if maxLength is equal, but has error color', () => {
    const props = {
      maxLength: 5,
      value: {
        length: 5
      }
    }
    render(<AppTextArea {...props} />)

    const typography = screen.queryByTestId('typography')
    expect(props.value.length).toEqual(props.maxLength)
    expect(typography).toHaveStyle({ color: 'rgb(211, 47, 47)' })
  })
  it('should render Typography if maxLength and have difference, but has error primary.300', () => {
    const props = {
      maxLength: 5,
      value: {
        length: 6
      }
    }
    render(<AppTextArea {...props} />)

    const typography = screen.queryByTestId('typography')
    expect(props.value.length).toBeGreaterThan(props.maxLength)
    expect(typography).toHaveStyle({ color: 'primary.300' })
  })
  it('should render Typography if value.length haven`t given', () => {
    const props = {
      maxLength: 5
    }
    render(<AppTextArea {...props} />)

    const typography = screen.queryByTestId('typography')
    expect(typography).toHaveStyle({ color: 'primary.300' })
  })
})
