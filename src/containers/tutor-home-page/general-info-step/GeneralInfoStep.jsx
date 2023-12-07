import Box from '@mui/material/Box'
import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { LocationService } from '~/services/location-service'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox, setIsFormValid }) => {
  const [countryList, setCountry] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await LocationService.getCountries()
      setCountry(response.data)
    }
    fetchCountries()
  }, [])

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
    setIsFormValid(
      firstName !== '' &&
        lastName !== '' &&
        selectedCountry !== null &&
        selectedCity !== null &&
        text !== ''
    )
  }, [firstName, lastName, selectedCountry, selectedCity, text, setIsFormValid])

  const changeText = (e) => {
    const lengthChange = e.target.value
    if (lengthChange.length <= 100) {
      setText(lengthChange)
    } else {
      e.preventDefault()
    }
  }

  return (
    <Box sx={styles.container}>
      <Box>
        <Box alt='GeneralInfo' component='img' src={generalInfo} />
      </Box>
      <Box component='form' sx={styles.form}>
        <Box sx={styles.appearance}>
          <TextField
            error={!firstName}
            helperText={!firstName ? 'First Name is required' : ''}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name*'
            required
            sx={styles.textField}
            value={firstName}
          />
          <TextField
            error={!lastName}
            helperText={!lastName ? 'Last Name is required' : ''}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name*'
            required
            sx={styles.textField}
            value={lastName}
          />
        </Box>
        <Box sx={styles.appearance}>
          <Autocomplete
            onChange={(event, newValue) => {
              setSelectedCountry(newValue)
              setSelectedCity(null)
            }}
            options={countryList}
            renderInput={(params) => (
              <TextField {...params} label='Countries' />
            )}
            sx={styles.selects}
            value={selectedCountry}
          />
          <Autocomplete
            onChange={(event, newValue) => setSelectedCity(newValue)}
            options={city}
            renderInput={(params) => <TextField {...params} label='Cities' />}
            sx={styles.selects}
            value={selectedCity}
          />
        </Box>
        <Box>
          <TextField
            maxLength={100}
            multiline
            onChange={changeText}
            placeholder='Describe in short your professional status'
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
