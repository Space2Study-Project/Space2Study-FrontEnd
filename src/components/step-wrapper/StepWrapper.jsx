import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'
import { userService } from '~/services/user-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import useSteps from '~/hooks/use-steps'
import useStepsDataContext from '~/context/steps-data-context'
const StepWrapper = ({ children, steps }) => {
  const { setAlert } = useSnackBarContext()
  const {
    validForm,
    userId,
    userRole,
    name,
    lastName,
    selectedCountry,
    selectedCity,
    selectedSubjects,
    selectedLanguage,
    imageURL
  } = useStepsDataContext()
  const { activeStep, isLastStep, loading, stepOperation } = useSteps({
    steps
  })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()
  const handleFinishButtonClick = async () => {
    try {
      if (validForm === false) {
        const updatedMainSubjects = selectedSubjects.map((subj) => subj._id)

        const updatedAddress = {
          country: selectedCountry,
          city: selectedCity
        }

        const updatedNativeLanguage = selectedLanguage
        const updatedPhoto = imageURL
        const updatedFirstName = name
        const updatedLastName = lastName
        await userService.updateUser(userId, userRole, {
          firstName: updatedFirstName,
          lastName: updatedLastName,
          address: updatedAddress,
          mainSubjects: updatedMainSubjects,
          nativeLanguage: updatedNativeLanguage,
          photo: updatedPhoto
        })
        handleSubmit()
      } else {
        setAlert({
          severity: 'error',
          message: 'Please fill in all required fields'
        })
      }
    } catch (error) {
      console.error('Error updating user data:', error)
      setAlert({
        severity: 'error',
        message: 'Error updating user data'
      })
    }
  }
  const stepLabels = steps.map((step, index) => (
    <Box
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <AppButton
      disabled={validForm}
      loading={loading}
      onClick={handleFinishButtonClick}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton onClick={next} size='small' sx={styles.btn} variant='contained'>
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
