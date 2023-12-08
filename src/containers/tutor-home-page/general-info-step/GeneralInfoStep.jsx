import Box from '@mui/material/Box'
import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { LocationService } from '~/services/location-service'
import { userService } from '~/services/user-service'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const [countryList, setCountry] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  const [text, setText] = useState('')

  const fetchCountries = useCallback(async () => {
    if (countryList.length > 0) {
      return
    }
    try {
      const response = await LocationService.getCountries()
      setCountry(response.data)
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
      const storedToken = localStorage.getItem('s2s')
      const [, payload] = storedToken.split('.')
      const decodedPayload = JSON.parse(atob(payload))
      const userId = decodedPayload.id
      const userRole = decodedPayload.role
      const response = await userService.getUserById(userId, userRole)
      const firstName = response.data.firstName
      setName(firstName)
      const surName = response.data.lastName
      setLastName(surName)
    }
    fetchUser()
  }, [])

  const changeText = (e) => {
    setText(e.target.value)
  }

  return (
    <Box data-testid='generalBox' sx={styles.container}>
      <Box>
        <Box alt='GeneralInfo' component='img' src={generalInfo} />
      </Box>
      <Box component='form' sx={styles.form}>
        <Typography>
          Amet minim mollit non deserunt ullamco est sit alliqua dolor do amet
          sint.
        </Typography>
        <Box data-testid='nameInputs' sx={styles.appearance}>
          <TextField
            placeholder='First Name*'
            sx={styles.textField}
            value={name}
          />
          <TextField
            placeholder='Last Name*'
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
        <Box data-testid='descField'>
          <TextField
            inputProps={{ maxLength: 70 }}
            multiline
            onChange={changeText}
            placeholder='Describe in short your professional status'
            rows={4}
            sx={styles.description}
            value={text}
          />
          <Typography>{text.length}/70</Typography>
          <Typography sx={styles.warning}>
            Input fields with the * sign are required
          </Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
