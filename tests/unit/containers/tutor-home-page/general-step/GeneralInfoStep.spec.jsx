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

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
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

    expect(screen.getByLabelText(/common.labels.country/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/common.labels.city/i)).toBeInTheDocument()
  })
  it('should render name and lastname fields', () => {
    const inputNamesContainer = screen.getByTestId('nameInputs')
    expect(inputNamesContainer).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/common.labels.firstName/i)
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/common.labels.lastName/i)
    ).toBeInTheDocument()
  })
  it('should render description field', () => {
    const inputDescContainer = screen.getByTestId('descField')
    expect(inputDescContainer).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/becomeTutor.generalInfo.textFieldLabel/i)
    ).toBeInTheDocument()
  })
  it('fetches countries on mount', () => {
    const countryAutocompleteField = screen.getByLabelText(
      /common.labels.country/i
    )

    fireEvent.click(countryAutocompleteField)

    waitFor(() => {
      const countryName = screen.getByText('Country1')
      expect(countryName).toBeInTheDocument()
    })
  })
  it('can`t choose city before country is chosen', () => {
    const cityAutocompleteField = screen.getByLabelText(/common.labels.city/i)

    fireEvent.click(cityAutocompleteField)

    waitFor(() => {
      const cityName = screen.getByText('City1')
      expect(cityName).not.toBeInTheDocument()
    })
  })
})
