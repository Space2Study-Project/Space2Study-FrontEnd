import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

describe('LanguageStep Container', () => {
  vi.mock('~/context/steps-data-context', () => ({
    __esModule: true,
    default: vi.fn(() => ({
      t: (str) => str,
      selectedLanguage: null,
      handleLanguageChange: vi.fn()
    }))
  }))

  beforeEach(() => {
    render(<LanguageStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('displays the language category image', () => {
    const languageImage = screen.getByAltText('language img')

    expect(languageImage).toBeInTheDocument()
    expect(languageImage).toHaveAttribute(
      'src',
      expect.stringContaining('languages.svg')
    )
  })

  it('should render the container', () => {
    const containerElement = screen.getByText(/becomeTutor.languages.title/i)
    expect(containerElement).toBeInTheDocument()
  })

  it('should render input box', () => {
    const inputContainer = screen.getByTestId('inputContainer')
    expect(inputContainer).toBeInTheDocument()
  })

  it('should render Autocomplete input', () => {
    expect(
      screen.getByLabelText(/becomeTutor.languages.autocompleteLabel/i)
    ).toBeInTheDocument()
  })

  it('handles language change', () => {
    fireEvent.click(
      screen.getByLabelText(/becomeTutor.languages.autocompleteLabel/i)
    )

    waitFor(() => {
      const languageName = screen.getByText('English')
      expect(languageName).toBeInTheDocument()
    })
  })
})
