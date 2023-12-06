import { useEffect, useState } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { markFirstLoginComplete } from '~/redux/reducer'

import { StepProvider } from '~/context/step-context'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import { useDispatch } from 'react-redux'
import {
  initialValues,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper
        activeStep={isFormValid ? 1 : 0}
        onStepChange={(stepIndex, prevent) => {
          if (stepIndex === 1 && !isFormValid) {
            alert('Please fill in all required fields before proceeding.')
            prevent()
            return
          }
        }}
        steps={stepLabels}
      >
        <GeneralInfoStep
          isUserFetched={isUserFetched}
          key='1'
          setIsFormValid={setIsFormValid}
          setIsUserFetched={setIsUserFetched}
        />
        <SubjectsStep key='2' />
        <LanguageStep key='3' />
        <AddPhotoStep key='4' />
      </StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
