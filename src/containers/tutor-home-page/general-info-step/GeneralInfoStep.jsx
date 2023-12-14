import Box from '@mui/material/Box'
import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useContext } from 'react'
import { SteperContext } from '~/components/user-steps-wrapper-with-data/UserStepsWrapperWithData'

const GeneralInfoStep = ({ btnsBox }) => {
  const {
    t,
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
  } = useContext(SteperContext)
  return (
    <Box data-testid='generalBox' sx={styles.container}>
      <Box>
        <Box alt='GeneralInfo' component='img' src={generalInfo} />
      </Box>
      <Box component='form' sx={styles.form}>
        <Typography>{t('becomeTutor.generalInfo.title')}</Typography>
        <Box data-testid='nameInputs' sx={styles.appearance}>
          <TextField
            placeholder={t('common.labels.firstName')}
            sx={styles.textField}
            value={name}
          />
          <TextField
            placeholder={t('common.labels.lastName')}
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
            inputProps={{ maxLength: 70 }}
            multiline
            onChange={changeText}
            placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
            rows={4}
            sx={styles.description}
            value={text}
          />
          <Typography>{text.length}/70</Typography>
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
