import UserStepsWrapper from '../user-steps-wrapper/UserStepsWrapper'
import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useName from '~/hooks/use-name'
import useCountryCityInfo from '~/hooks/use-country-city-info'

export const SteperContext = createContext()

const UserStepsWrapperWithData = ({ userRole }) => {
  const { name, lastName } = useName()
  const {
    countryList,
    city,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  } = useCountryCityInfo()
  const { t } = useTranslation()

  const [text, setText] = useState('')

  const changeText = (e) => {
    setText(e.target.value)
  }

  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue)
  }

  const generalInfoStepData = {
    name,
    lastName,
    text,
    changeText,
    countryList,
    city,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  }

  const languageStepData = {
    selectedLanguage,
    handleLanguageChange
  }

  return (
    <SteperContext.Provider
      value={{ ...generalInfoStepData, ...languageStepData, t }}
    >
      <UserStepsWrapper userRole={userRole} />
    </SteperContext.Provider>
  )
}
export default UserStepsWrapperWithData
