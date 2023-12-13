import { vi } from 'vitest'
import { act, renderHook } from '@testing-library/react-hooks'
import useCountryCityInfo from '~/hooks/use-country-city-info'

vi.mock('~/services/location-service', () => ({
  LocationService: {
    getCountries: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: 1, name: 'Country 1' },
          { id: 2, name: 'Country 2' }
        ]
      })
    ),
    getCities: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: 11, name: 'City 1' },
          { id: 12, name: 'City 2' }
        ]
      })
    )
  }
}))

describe('useCountryCityInfo hook', () => {
  it('should fetch countries on initial render', async () => {
    let result
    await act(async () => {
      ;({ result } = renderHook(() => useCountryCityInfo()))
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(result.current.countryList).toEqual([
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' }
    ])
    expect(result.current.city).toEqual([])
    expect(result.current.selectedCountry).toBeNull()
    expect(result.current.selectedCity).toBeNull()
  })
})
