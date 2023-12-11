import { useState } from 'react'

const useCountryCityInfo = () => {
  const [countryList, setCountryList] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  return {
    countryList,
    setCountryList,
    city,
    setCity,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  }
}

export default useCountryCityInfo
