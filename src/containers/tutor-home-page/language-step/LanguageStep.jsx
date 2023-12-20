import { Box, Autocomplete, TextField, Typography } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import languageImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { languages } from './constants'
import useStepsDataContext from '~/context/steps-data-context'

const LanguageStep = ({ btnsBox }) => {
  const { t, selectedLanguage, handleLanguageChange } = useStepsDataContext()
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
