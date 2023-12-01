import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import useConfirm from '~/hooks/use-confirm'
import useForm from '~/hooks/use-form'
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/login'

import { signup, snackbarVariants } from '~/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { signupUser } from '~/redux/reducer'

import info from '~/assets/img/guest-home-page/info.svg'
import student from '~/assets/img/signup-dialog/student.svg'
import tutor from '~/assets/img/signup-dialog/tutor.svg'

import { styles } from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { openModal, closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const dispatch = useDispatch()

  const signupImg = { student, tutor }

  const { handleSubmit, handleInputChange, handleBlur, data, isDirty, errors } =
    useForm({
      onSubmit: async () => {
        try {
          await dispatch(signupUser({ ...data, role: type })).unwrap()
          openModal(
            {
              component: (
                <NotificationModal
                  buttonTitle={t('common.confirmButton')}
                  description={description}
                  img={info}
                  onClose={closeModal}
                  title={t('signup.confirmEmailTitle')}
                />
              )
            },
            5000
          )
        } catch (e) {
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${e}`
          })
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: { firstName, lastName, email, password, confirmPassword }
    })

  const description = (
    <Typography component='span'>
      {t('signup.confirmEmailMessage')}
      <Typography component='span' variant='subtitle2'>
        {data.email}
      </Typography>
      {t('signup.confirmEmailDesc')}
    </Typography>
  )
  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const isMediumScreen = useMediaQuery(
    '(min-width:601px) and (max-width:900px)'
  )
  const isLargeScreen = useMediaQuery(
    '(min-width:901px) and (max-width:1200px)'
  )
  const isXLargeScreen = useMediaQuery('(min-width:1201px)')

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={signupImg[type]}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('signup.head', { returnObjects: true })[type]}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            closeModal={closeModal}
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          {isSmallScreen && (
            <GoogleLogin buttonWidth={330} role={type} type={signup} />
          )}
          {isMediumScreen && (
            <GoogleLogin buttonWidth={333} role={type} type={signup} />
          )}
          {isLargeScreen && (
            <GoogleLogin buttonWidth={340} role={type} type={signup} />
          )}
          {isXLargeScreen && (
            <GoogleLogin buttonWidth={394} role={type} type={signup} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
