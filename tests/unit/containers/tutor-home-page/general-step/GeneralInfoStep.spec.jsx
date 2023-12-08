import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.jsx'

vi.mock('~/services/location-service', () => ({
  LocationService: {
    getCountries: vi.fn(() =>
      Promise.resolve({ data: ['Country1', 'Country2'] })
    )
  }
}))

vi.mock('~/services/location-service', () => ({
  LocationService: {
    getCities: vi.fn(() => Promise.resolve({ data: ['City1', 'City2'] }))
  }
}))

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: vi.fn(() =>
      Promise.resolve({ data: { firstName: 'John', lastName: 'Doe' } })
    )
  }
}))

describe('Tests for GeneralInfoStep component', () => {
  beforeEach(() => {
    render(<GeneralInfoStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('displays the study category image', () => {
    const generalImage = screen.getByAltText('GeneralInfo')

    expect(generalImage).toBeInTheDocument()
    expect(generalImage).toHaveAttribute(
      'src',
      expect.stringContaining('general-info.svg')
    )
  })
  it('should check if the buttons passed in props are in the document', () => {
    const mockBtnsBox = (
      <div>
        <button data-testid='button-1'>Button 1</button>
        <button data-testid='button-2'>Button 2</button>
      </div>
    )
    render(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    const button1Element = screen.getByTestId('button-1')
    expect(button1Element).toBeInTheDocument()
    const button2Element = screen.getByTestId('button-2')
    expect(button2Element).toBeInTheDocument()
  })
  it('should render Autocomplete inputs', () => {
    const inputContainer = screen.getByTestId('selects')
    expect(inputContainer).toBeInTheDocument()

    expect(screen.getByLabelText(/Countries/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Cities/i)).toBeInTheDocument()
  })
  it('should render name and lastname fields', () => {
    const inputNamesContainer = screen.getByTestId('nameInputs')
    expect(inputNamesContainer).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument()
  })
  it('should render description field', () => {
    const inputDescContainer = screen.getByTestId('descField')
    expect(inputDescContainer).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/Describe in short your professional status/i)
    ).toBeInTheDocument()
  })
  it('fetches countries on mount', () => {
    const countryAutocompleteField = screen.getByLabelText(/Countries/i)

    fireEvent.click(countryAutocompleteField)

    waitFor(() => {
      const countryName = screen.getByText('Country1')
      expect(countryName).toBeInTheDocument()
    })
  })
  it('can`t choose city before country is chosen', () => {
    const cityAutocompleteField = screen.getByLabelText(/Cities/i)

    fireEvent.click(cityAutocompleteField)

    waitFor(() => {
      const cityName = screen.getByText('City1')
      expect(cityName).not.toBeInTheDocument()
    })
  })
})
