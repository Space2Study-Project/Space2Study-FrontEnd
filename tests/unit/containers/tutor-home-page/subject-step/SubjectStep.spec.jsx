import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  }
}))
vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: function AppButtonMock({ children }) {
    return <button>{children}</button>
  }
}))

vi.mock('~/components/app-chips-list/AppChipList', () => ({
  __esModule: true,
  default: function AppChipList() {
    return <div>AppChipList</div>
  }
}))

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategoriesNames: vi.fn(() =>
      Promise.resolve({ data: ['Category1', 'Category2'] })
    )
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: vi.fn(() =>
      Promise.resolve({ data: ['Subject1', 'Subject2'] })
    )
  }
}))

describe('SubjectsStep component test', () => {
  beforeEach(() => {
    render(<SubjectsStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('displays the study category image', () => {
    const studyCategoryImage = screen.getByAltText('subject img')

    expect(studyCategoryImage).toBeInTheDocument()
    expect(studyCategoryImage).toHaveAttribute(
      'src',
      expect.stringContaining('study-category.svg')
    )
  })

  it('should check if the buttons passed in props are in the document', () => {
    const mockBtnsBox = (
      <div>
        <button data-testid='button-1'>Button 1</button>
        <button data-testid='button-2'>Button 2</button>
      </div>
    )
    render(<SubjectsStep btnsBox={mockBtnsBox} />)
    const button1Element = screen.getByTestId('button-1')
    expect(button1Element).toBeInTheDocument()
    const button2Element = screen.getByTestId('button-2')
    expect(button2Element).toBeInTheDocument()
  })

  it('should render Autocomplete inputs', () => {
    const inputContainer = screen.getByTestId('inputContainer')
    expect(inputContainer).toBeInTheDocument()

    expect(
      screen.getByLabelText(/becomeTutor.categories.mainSubjectsLabel/i)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/becomeTutor.categories.subjectLabel/i)
    ).toBeInTheDocument()
  })

  it('fetches categories on mount', () => {
    const categoryAutocompleteField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    fireEvent.click(categoryAutocompleteField)

    waitFor(() => {
      const categoryName = screen.getByText('Category1')
      expect(categoryName).toBeInTheDocument()
    })
  })

  it('can not choose Subject before category is chosen', () => {
    const subjectAutocompleteField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(subjectAutocompleteField)

    waitFor(() => {
      const categoryName = screen.getByText('Subject1')
      expect(categoryName).not.toBeInTheDocument()
    })
  })

  it('handles subject change', () => {
    fireEvent.click(
      screen.getByLabelText(/becomeTutor.categories.mainSubjectsLabel/i),
      'Category1'
    )

    waitFor(() => {
      const categoryName = screen.getByText('Category1')
      expect(categoryName).toBeInTheDocument()
    })
  })

  it('renders AppButton', () => {
    const appButton = screen.getByText(/becomeTutor.categories.btnText/i)
    expect(appButton).toBeInTheDocument()
  })

  it('renders AppChipList', () => {
    const appChipList = screen.getByText('AppChipList')
    expect(appChipList).toBeInTheDocument()
  })
})
