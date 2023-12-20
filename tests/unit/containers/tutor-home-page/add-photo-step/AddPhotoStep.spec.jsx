import { render, screen, fireEvent } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import { vi } from 'vitest'

describe('AddPhotoStep Container', () => {
  const mockBtnsBox = <div data-testid='mock-btns-box'>Mock Buttons Box</div>
  vi.mock('~/context/steps-data-context', () => ({
    __esModule: true,
    default: vi.fn(() => ({
      t: vi.fn((str) => str),
      image: null,
      imageURL: null,
      handleFileChange: vi.fn(),
      errorPhoto: null,
      previewImage: null
    }))
  }))

  it('should render the container', () => {
    render(<AddPhotoStep btnsBox={mockBtnsBox} />)
    const containerElement = screen.getByTestId('AddPhoto step')
    expect(containerElement).toBeInTheDocument()
    const btnsBoxElement = screen.getByTestId('mock-btns-box')
    expect(btnsBoxElement).toBeInTheDocument()
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
