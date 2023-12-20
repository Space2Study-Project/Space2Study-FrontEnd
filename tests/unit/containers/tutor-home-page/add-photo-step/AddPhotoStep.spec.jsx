import { render, screen, fireEvent } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  }
}))

describe('AddPhotoStep Container', () => {
  it('should render the container', () => {
    const mockBtnsBox = <div data-testid='mock-btns-box'>Mock Buttons Box</div>
    render(<AddPhotoStep btnsBox={mockBtnsBox} />)
    const containerElement = screen.getByTestId('AddPhoto step')
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
    render(<AddPhotoStep btnsBox={mockBtnsBox} />)
    const button1Element = screen.getByTestId('button-1')
    expect(button1Element).toBeInTheDocument()
    const button2Element = screen.getByTestId('button-2')
    expect(button2Element).toBeInTheDocument()
  })
  it('should handle file change on drag-and-drop', () => {
    render(<AddPhotoStep btnsBox={<div />} />)
    const dragAndDropElement = screen.getByTestId('AddPhoto-step')
    const file = new File([''], 'test-image.png', { type: 'image/png' })

    fireEvent.drop(dragAndDropElement, { dataTransfer: { files: [file] } })

    const fileNameElement = screen.getByTestId('AddPhoto-step')
    expect(fileNameElement).toBeInTheDocument()
  })
  it('should handle file change on drag-and-drop with invalid file type', () => {
    render(<AddPhotoStep btnsBox={<div />} />)
    const dragAndDropElement = screen.getByTestId('AddPhoto-step')
    const file = new File([''], 'test-image.txt', { type: 'text/plain' })

    fireEvent.drop(dragAndDropElement, { dataTransfer: { files: [file] } })

    const fileNameElement = screen.queryByTestId('ErrorPhoto')
    expect(fileNameElement).toBeInTheDocument()
  })
})
