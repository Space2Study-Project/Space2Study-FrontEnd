import { useState, useEffect, useCallback } from 'react'
import { LocationService } from '~/services/location-service'

const useCountryCityInfo = () => {
  const [countryList, setCountryList] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  const fetchCountries = useCallback(async () => {
    if (countryList.length > 0) {
      return
    }
    try {
      const response = await LocationService.getCountries()
      setCountryList(response.data)
    } catch (e) {
      console.log(`Error type: ${e.message}`)
    }
  }, [countryList])

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry) {
        const response = await LocationService.getCities(selectedCountry)
        setCity(response.data)
      } else {
        setCity([])
      }
    }
    fetchCities()
  }, [selectedCountry])

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
