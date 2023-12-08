import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { userService } from '~/services/user-service'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
vi.mock('~/services/location-service', () => ({
  LocationService: {
    getCountries: vi.fn(() =>
      Promise.resolve({ data: ['Country1', 'Country2'] })
    ),
    getCities: vi.fn(() => Promise.resolve({ data: ['City1', 'City2'] }))
  }
}))

describe('Tests for GeneralInfoStep component', () => {
  beforeEach(() => {
    render(
      <GeneralInfoStep
        btnsBox={<div data-testid='mockedBtnsBox' />}
        setIsFormValid={vi.fn()}
      />
    )
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
    expect(screen.getByLabelText(/Countries/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Cities/i)).toBeInTheDocument()
  })

  it('should render name and lastname fields', () => {
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument()
  })

  it('should render description field', () => {
    expect(
      screen.getByPlaceholderText(/Describe in short your professional status/i)
    ).toBeInTheDocument()
  })

  it('fetches countries on mount', async () => {
    await waitFor(() => {
      const countryName = screen.getByText('Country1')
      expect(countryName).toBeInTheDocument()
    })
  })

  it("can't choose city before country is chosen", async () => {
    await waitFor(() => {
      const cityName = screen.queryByText('City1')
      expect(cityName).not.toBeInTheDocument()
    })
  })

  it('fetches user data and sets state', async () => {
    userService.getUserById.mockResolvedValueOnce({
      data: {
        firstName: 'John',
        lastName: 'Doe'
      }
    })

    await waitFor(() => {})

    expect(screen.getByTestId('name-element').textContent).toBe('John')
    expect(screen.getByTestId('lastname-element').textContent).toBe('Doe')
    expect(userService.getUserById).toHaveBeenCalledWith(1)
    expect(userService.getUserById).toHaveBeenCalledTimes(1)
  })

  it('renders GeneralInfoStep component with setIsFormValid', () => {
    const setIsFormValidMock = vi.fn()

    render(
      <GeneralInfoStep btnsBox={<div />} setIsFormValid={setIsFormValidMock} />
    )
  })
})
