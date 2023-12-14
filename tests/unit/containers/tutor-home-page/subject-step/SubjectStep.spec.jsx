import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { useSnackBarContext } from '~/context/snackbar-context'

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: vi.fn(() => ({ setAlert: vi.fn() }))
}))

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

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategoriesNames: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: 1, name: 'Category1' },
          { id: 2, name: 'Category2' }
        ]
      })
    )
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: 1, name: 'Subject1' },
          { id: 2, name: 'Subject2' }
        ]
      })
    )
  }
}))

describe('SubjectsStep component test', () => {
  beforeEach(() => {
    render(<SubjectsStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
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

  // it('fetches categories on mount', () => {
  //   const categoryAutocompleteField = screen.getByLabelText(
  //     /becomeTutor.categories.mainSubjectsLabel/i
  //   )

  //   fireEvent.click(categoryAutocompleteField)

  //   waitFor(() => {
  //     const categoryName = screen.getByText('Category1')
  //     expect(categoryName).toBeInTheDocument()
  //   })
  // })

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
  it('handles category change correctly', () => {
    const categoryAutocompleteField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    waitFor(() => {
      fireEvent.click(categoryAutocompleteField)
    })

    waitFor(() => {
      fireEvent.change(categoryAutocompleteField, {
        target: { value: 'Category1' }
      })
    })

    expect(categoryAutocompleteField).toHaveValue('Category1')
  })
  it('handles subject change correctly', () => {
    const categoryAutocompleteField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )
    const subjectAutocompleteField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(categoryAutocompleteField)
    fireEvent.change(categoryAutocompleteField, {
      target: { value: 'Category1' }
    })

    expect(categoryAutocompleteField).toHaveValue('Category1')

    fireEvent.click(subjectAutocompleteField)
    fireEvent.change(subjectAutocompleteField, {
      target: { value: 'Subject1' }
    })

    expect(subjectAutocompleteField).toHaveValue('Subject1')
  })

  it('handles error when fetching categories on mount', () => {
    vi.mock('~/services/category-service', () => ({
      categoryService: {
        getCategoriesNames: vi.fn(() => Promise.reject('Fake error'))
      }
    }))

    waitFor(() => {
      const errorMessage = screen.getByText('common.errorMessages.fetchingData')
      expect(errorMessage).toBeInTheDocument()
    })
  })
  it('handles error when fetching subjects', () => {
    vi.mock('~/services/subject-service', () => ({
      subjectService: {
        getSubjectsNames: vi.fn(() => Promise.reject('Fake error'))
      }
    }))

    waitFor(() => {
      const categoryAutocompleteField = screen.getByText(
        /becomeTutor.categories.mainSubjectsLabel/i
      )
      fireEvent.click(categoryAutocompleteField)
    })

    waitFor(() => {
      const categoryName = screen.getByText('Category1')
      expect(categoryName).toBeInTheDocument()
      fireEvent.click(categoryName)
    })

    fireEvent.click(
      screen.getByLabelText(/becomeTutor.categories.subjectsLabel/i)
    )
  })

  const errorMessage = screen.getByText('common.errorMessages.fetchingData')
  expect(errorMessage).toBeInTheDocument()
})
it('handles catch category fetch error', () => {
  vi.mock('~/services/category-service', () => ({
    categoryService: {
      getCategoriesNames: vi.fn(() => Promise.reject('Fake error'))
    }
  }))

  console.error = vi.fn()

  const categoryAutocompleteField = screen.getByLabelText(
    /becomeTutor.categories.mainSubjectsLabel/i
  )
  fireEvent.click(categoryAutocompleteField)

  expect(console.error).toHaveBeenCalledWith(
    expect.stringContaining('Error fetching categories')
  )
})
it('handles category change correctly', async () => {
  const categoryAutocompleteField = screen.getByLabelText(
    /becomeTutor.categories.mainSubjectsLabel/i
  )

  fireEvent.click(categoryAutocompleteField)

  await waitFor(() => {
    fireEvent.change(categoryAutocompleteField, {
      target: { value: 'Category1' }
    })
  })

  expect(categoryAutocompleteField).toHaveValue('Category1')
})

describe('SubjectsStep componentuse SnackBarContext test', () => {
  it('fetches categories on mount', () => {
    const { setAlert } = useSnackBarContext()

    waitFor(() => {
      expect(setAlert).not.toHaveBeenCalled()
    })

    waitFor(() => {
      expect(setAlert).toHaveBeenCalledWith({
        severity: 'error',
        message: 'common.errorMessages.fetchingData'
      })
    })
  })

  it('handles error when fetching subjects', () => {
    vi.mock('~/services/category-service', () => ({
      categoryService: {
        getCategoriesNames: vi.fn(() => Promise.reject('Fake error'))
      }
    }))

    const { setAlert } = useSnackBarContext()

    waitFor(() => {
      fireEvent.click(
        screen.getByLabelText(/becomeTutor.categories.mainSubjectsLabel/i)
      )
    })

    waitFor(() => {
      expect(setAlert).toHaveBeenCalledWith({
        severity: 'error',
        message: 'common.errorMessages.fetchingData'
      })
    })
  })
  it('should use setAlert from useSnackBarContext', () => {
    expect(useSnackBarContext).toHaveBeenCalled()

    const { setAlert } = useSnackBarContext()

    expect(typeof setAlert).toBe('function')
  })
})
