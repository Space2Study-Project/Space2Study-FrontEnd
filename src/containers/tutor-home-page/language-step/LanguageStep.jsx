import { Box, Autocomplete, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import languageImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

import { languages } from './constants'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='language img'
          component='img'
          src={languageImg}
          sx={styles.img}
        />
      </Box>
      <Box>
        <Box data-testid='inputContainer' sx={styles.inputContainer}>
          <Typography sx={styles.title}>
            {t('becomeTutor.languages.title')}
          </Typography>
          <Autocomplete
            onChange={handleLanguageChange}
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.languages.autocompleteLabel')}
              />
            )}
            sx={styles.inputItem}
            value={selectedLanguage}
          />
        </Box>

        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
