import { render, screen } from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

describe('LanguageStep Container', () => {
  it('should render the container', () => {
    const mockBtnsBox = <div data-testid='mock-btns-box'>Mock Buttons Box</div>
    render(<LanguageStep btnsBox={mockBtnsBox} />)
    const containerElement = screen.getByText('Language step')
    expect(containerElement).toBeInTheDocument()
    const btnsBoxElement = screen.getByTestId('mock-btns-box')
    expect(btnsBoxElement).toBeInTheDocument()
  })

  it('should check if the buttons passed in props are in the document', () => {
    const mockBtnsBox = (
      <div>
        <button data-testid='button-1'>Button 1</button>
        <button data-testid='button-2'>Button 2</button>
      </div>
    )
    render(<LanguageStep btnsBox={mockBtnsBox} />)
    const button1Element = screen.getByTestId('button-1')
    expect(button1Element).toBeInTheDocument()
    const button2Element = screen.getByTestId('button-2')
    expect(button2Element).toBeInTheDocument()
  })
})
