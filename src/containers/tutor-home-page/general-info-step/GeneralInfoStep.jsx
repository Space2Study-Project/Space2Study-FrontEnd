import Box from '@mui/material/Box'
import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { LocationService } from '~/services/location-service'
import { userService } from '~/services/user-service'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useTranslation } from 'react-i18next'

const GeneralInfoStep = ({ btnsBox, setIsFormValid }) => {
  const [countryList, setCountryList] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [text, setText] = useState('')
  const { t } = useTranslation()

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
      }
    }
    fetchCities()
  }, [selectedCountry])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem('s2s')
        if (storedToken) {
          const [, payload] = storedToken.split('.')
          const decodedPayload = JSON.parse(atob(payload))
          const userId = decodedPayload.id
          const userRole = decodedPayload.role
          const response = await userService.getUserById(userId, userRole)
          const firstName = response.data.firstName
          setFirstName(firstName)
          const surName = response.data.lastName
          setLastName(surName)
        }
      } catch (e) {
        console.log(`Error message: ${e.message}`)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    setIsFormValid(
      firstName !== '' &&
        lastName !== '' &&
        selectedCountry !== null &&
        selectedCity !== null
    )
  }, [firstName, lastName, selectedCountry, selectedCity, setIsFormValid])

  const changeText = (e) => {
    const lengthChange = e.target.value
    if (lengthChange.length <= 100) {
      setText(lengthChange)
    } else {
      e.preventDefault()
    }
  }

  return (
    <Box data-testid='generalBox' sx={styles.container}>
      <Box>
        <Box alt='GeneralInfo' component='img' src={generalInfo} />
      </Box>
      <Box component='form' data-testid='nameInputs' sx={styles.form}>
        <Box sx={styles.appearance}>
          <TextField
            error={!firstName}
            helperText={!firstName ? 'This field cannot be empty' : ''}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t('common.labels.firstName')}
            required
            sx={styles.textField}
            value={firstName}
          />
          <TextField
            error={!lastName}
            helperText={!lastName ? 'This field cannot be empty' : ''}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t('common.labels.lastName')}
            required
            sx={styles.textField}
            value={lastName}
          />
        </Box>
        <Box data-testid='selects' sx={styles.appearance}>
          <Autocomplete
            onChange={(event, newValue) => {
              setSelectedCountry(newValue)
              setSelectedCity(null)
            }}
            onFocus={fetchCountries}
            options={countryList}
            renderInput={(params) => (
              <TextField {...params} label={t('common.labels.country')} />
            )}
            sx={styles.selects}
            value={selectedCountry}
          />
          <Autocomplete
            onChange={(event, newValue) => setSelectedCity(newValue)}
            options={city}
            renderInput={(params) => (
              <TextField {...params} label={t('common.labels.city')} />
            )}
            sx={styles.selects}
            value={selectedCity}
          />
        </Box>
        <Box data-testid='descField'>
          <TextField
            maxLength={100}
            multiline
            onChange={changeText}
            placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
            rows={5}
            sx={styles.description}
            value={text}
          />
          <Typography>{text.length}/100</Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
