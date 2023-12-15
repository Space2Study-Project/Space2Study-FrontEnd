import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'
import CreateRequest from '~/components/create-request/CreateRequest'
import { userService } from '~/services/user-service'
import { renderHook } from '@testing-library/react-hooks'

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: vi.fn(() => {
      return Promise.resolve({ data: { status: 'student' } })
    })
  }
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  }
}))

describe('Testing CreateRequest component', () => {
  beforeEach(() => {
    render(<CreateRequest />)
  })

  it('should render title', () => {
    const title = screen.getByText(/findOffers.offerRequestBlock.title.tutor/i)
    expect(title).toBeInTheDocument()
  })
  it('should render title', () => {
    userService.getUserById.mockImplementation(
      () => () => Promise.resolve({ data: { status: 'student' } })
    )
    const { result } = renderHook(userService)
    expect(result).toBeTruthy()
    const title = screen.getByText(
      /findOffers.offerRequestBlock.title.student/i
    )
    expect(title).toBeInTheDocument()
  })
  it('should render description', () => {
    const description = screen.getByTestId('description')
    expect(description).toBeInTheDocument()
  })
  it('should render button', () => {
    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
  })
  it('should render image', () => {
    const image = screen.getByAltText('Circles')
    expect(image).toBeInTheDocument()
  })
  it('should open dialog', () => {
    const button = screen.getByTestId('button')

    fireEvent.click(button)
    const dialogWindow = screen.getByTestId('dialog')
    expect(dialogWindow).toBeInTheDocument()
  })
  it('should render close icon', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const closeIcon = screen.getByTestId('closeButton')
    expect(closeIcon).toBeInTheDocument()
  })
  it('should close dialog window after click', async () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const closeIcon = screen.queryByTestId('closeButton')
    fireEvent.click(closeIcon)

    const dialogWindow = screen.getByTestId('dialog')
    await waitFor(() => expect(dialogWindow).not.toBeInTheDocument())
  })
  it('should render image inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const image = screen.getByAltText('Request photo')
    expect(image).toBeInTheDocument()
  })
  it('should render title inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const title = screen.getByTestId('titleDialog')
    expect(title).toBeInTheDocument()
  })
  it('should render description inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const description = screen.getByTestId('descDialog')
    expect(description).toBeInTheDocument()
  })
  it('should render new subject label inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const newSubjectLabel = screen.getByTestId('newSubjectLabel')
    expect(newSubjectLabel).toBeInTheDocument()
  })
  it('should render new subject input inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const newSubjectInput = screen.getByPlaceholderText('New subject')
    expect(newSubjectInput).toBeInTheDocument()
  })
  it('should render add subject label inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const addSubjectLabel = screen.getByTestId('addSubjectLabel')
    expect(addSubjectLabel).toBeInTheDocument()
  })
  it('should render add subject input inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const addSubjectInput = screen.getByLabelText(
      /categoriesPage.newSubject.labels.category/i
    )
    expect(addSubjectInput).toBeInTheDocument()
  })
  it('should render additional input label inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const additionalInfoLabel = screen.getByTestId('additionalInfoLabel')
    expect(additionalInfoLabel).toBeInTheDocument()
  })
  it('should render additional info input inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const additionalInfoInput = screen.getByPlaceholderText(
      'Additional information'
    )
    expect(additionalInfoInput).toBeInTheDocument()
  })
  it('should render send request button inside dialog window', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const sendRequestBtn = screen.getByText('Send Request')
    expect(sendRequestBtn).toBeInTheDocument()
  })
  it('fetches categories on mount', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const categoryAutocompleteField = screen.getByLabelText(
      /categoriesPage.newSubject.labels.category/i
    )

    fireEvent.click(categoryAutocompleteField)

    waitFor(() => {
      const categoryName = screen.getByText('Category1')
      expect(categoryName).toBeInTheDocument()
    })
  })
})
