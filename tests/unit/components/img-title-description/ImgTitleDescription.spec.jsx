import { render, screen } from '@testing-library/react'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

describe('Checking for correct ImgTitleDescription component render', () => {
  it('checking for render image', () => {
    render(<ImgTitleDescription />)

    const imageBox = screen.getByAltText('info')
    expect(imageBox).toBeInTheDocument()
  })
  it('checking for render title', () => {
    const props = {
      title: 'Text'
    }
    render(<ImgTitleDescription {...props} />)

    const titleText = screen.getByText(props.title)
    expect(titleText).toBeInTheDocument()
  })
  it('checking for render description', () => {
    const props = {
      description: 'It is a description'
    }
    render(<ImgTitleDescription {...props} />)

    const descText = screen.getByText(props.description)
    expect(descText).toBeInTheDocument()
  })
})
