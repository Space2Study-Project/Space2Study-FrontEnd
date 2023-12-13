import { useState, useEffect, useCallback } from 'react'
import { LocationService } from '~/services/location-service'

import { useSnackBarContext } from '~/context/snackbar-context'

const useCountryCityInfo = () => {
  const [countryList, setCountryList] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const { setAlert } = useSnackBarContext()

  const fetchCountries = useCallback(async () => {
    if (countryList.length > 0) {
      return
    }
    try {
      const response = await LocationService.getCountries()
      setCountryList(response.data)
    } catch (e) {
      console.log(`Error type: ${e.message}`)
      setAlert({
        severity: 'error',
        message: 'common.errorMessages.fetchingData'
      })
    }
  }, [countryList, setAlert])

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedCountry) {
          const response = await LocationService.getCities(selectedCountry)
          setCity(response.data)
        } else {
          setCity([])
        }
      } catch (error) {
        console.error('Error fetching cities:', error)
        setAlert({
          severity: 'error',
          message: 'common.errorMessages.fetchingData'
        })
      }
    }

    fetchCities()
  }, [selectedCountry, setAlert])

  return {
    countryList,
    city,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  }
}

export default useCountryCityInfo
