import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

vi.mock('~/context/steps-data-context', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    t: (str) => str,
    categories: [
      { id: 1, name: 'Category1' },
      { id: 2, name: 'Category2' }
    ],
    subjects: [
      { id: 1, name: 'Subject1' },
      { id: 2, name: 'Subject2' }
    ],
    selectedCategory: null,
    selectedSubject: null,
    selectedSubjectName: null,
    dataChipList: { items: [], defaultQuantity: 5 },
    handleCategoryChange: vi.fn(),
    addSubjects: vi.fn(),
    handleSubjectChange: vi.fn()
  }))
}))

describe('SubjectsStep component test', () => {
  it('displays the study category image', () => {
    render(<SubjectsStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
    const studyCategoryImage = screen.getByAltText('subject img')

    expect(studyCategoryImage).toBeInTheDocument()
    expect(studyCategoryImage).toHaveAttribute(
      'src',
      expect.stringContaining('study-category.svg')
    )
  })

  it('renders Autocomplete inputs', () => {
    render(<SubjectsStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
    const inputContainer = screen.getByTestId('inputContainer')

    expect(inputContainer).toBeInTheDocument()
    expect(
      screen.getByLabelText(/becomeTutor.categories.mainSubjectsLabel/i)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/becomeTutor.categories.subjectLabel/i)
    ).toBeInTheDocument()
  })

  it('handles category change correctly', () => {
    render(<SubjectsStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
    const categoryAutocompleteField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    fireEvent.click(categoryAutocompleteField)
    fireEvent.change(categoryAutocompleteField, {
      target: { value: 'Category1' }
    })

    expect(categoryAutocompleteField).toHaveValue('Category1')
  })

  it('handles subject change correctly', () => {
    render(<SubjectsStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
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

    fireEvent.click(subjectAutocompleteField)
    fireEvent.change(subjectAutocompleteField, {
      target: { value: 'Subject1' }
    })

    expect(subjectAutocompleteField).toHaveValue('Subject1')
  })
})
