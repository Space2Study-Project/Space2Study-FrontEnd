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
import { StepsDataProvider } from '~/context/steps-data-context'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels
  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsFormValid={setIsFormValid}
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepsDataProvider>
        <StepWrapper isFormValid={isFormValid} steps={stepLabels}>
          {childrenArr}
        </StepWrapper>
      </StepsDataProvider>
    </StepProvider>
  )
}

export default UserStepsWrapper
