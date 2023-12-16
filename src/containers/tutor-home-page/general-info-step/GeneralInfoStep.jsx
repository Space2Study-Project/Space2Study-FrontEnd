import Box from '@mui/material/Box'
import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useName from '~/hooks/use-name'
import useCountryCityInfo from '~/hooks/use-country-city-info'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const maxLength = 100
const GeneralInfoStep = ({ btnsBox, setIsFormValid }) => {
  const { name, setName, lastName, setLastName } = useName()
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
  useEffect(() => {
    setIsFormValid(
      name !== '' &&
        lastName !== '' &&
        selectedCountry !== null &&
        selectedCity !== null
    )
  }, [name, lastName, selectedCountry, selectedCity, setIsFormValid])

  const memoizedMaxLength = useMemo(() => maxLength, [])

  return (
    <Box data-testid='generalBox' sx={styles.container}>
      <Box>
        <Box alt='GeneralInfo' component='img' src={generalInfo} />
      </Box>
      <Box component='form' sx={styles.form}>
        <Typography>{t('becomeTutor.generalInfo.title')}</Typography>
        <Box data-testid='nameInputs' sx={styles.appearance}>
          <TextField
            error={!name}
            helperText={!name ? 'This field cannot be empty' : ''}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('common.labels.firstName')}
            required
            sx={styles.textField}
            value={name}
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
            inputProps={{ maxLength: memoizedMaxLength }}
            multiline
            onChange={changeText}
            placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
            rows={5}
            sx={styles.description}
            value={text}
          />
          <Typography>
            {text.length}/{memoizedMaxLength}
          </Typography>
          <Typography sx={styles.warning}>
            {t('becomeTutor.generalInfo.helperText')}
          </Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
