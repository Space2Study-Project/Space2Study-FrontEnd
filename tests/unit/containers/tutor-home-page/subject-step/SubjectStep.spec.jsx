import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
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
      Promise.resolve({ data: [{ _id: '1', name: 'Category 1' }] })
    )
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: vi.fn(() =>
      Promise.resolve({ data: [{ _id: '2', name: 'Subject 1' }] })
    )
  }
}))

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: () => ({ setAlert: vi.fn() })
}))

describe('SubjectsStep component', () => {
  it('renders correctly', () => {
    render(<SubjectsStep btnsBox={<div data-testid='btnsBox' />} />)

    const inputContainer = screen.getByTestId('inputContainer')
    expect(inputContainer).toBeInTheDocument()
  })

  it('fetches categories and subjects on mount', () => {
    render(<SubjectsStep btnsBox={<div data-testid='btnsBox' />} />)

    waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeInTheDocument()
      expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    })
  })

  it('handles category and subject changes', () => {
    render(<SubjectsStep btnsBox={<div data-testid='btnsBox' />} />)

    waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeInTheDocument()
    })
    waitFor(() => {
      const categoryInput = screen.getByLabelText('Category')
      fireEvent.change(categoryInput, { target: { value: 'Category 1' } })
    })

    waitFor(() => {
      expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    })

    waitFor(() => {
      const subjectInput = screen.getByLabelText('Subject')
      fireEvent.change(subjectInput, { target: { value: 'Subject 1' } })
    })
  })
})
