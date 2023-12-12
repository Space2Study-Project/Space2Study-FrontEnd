import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SubjectPhoto from '~/assets/img/student-home-page/subject_icon.png'
import { useEffect, useState } from 'react'
import { userService } from '~/services/user-service'

import { styles } from './CreateRequest.styles'

const CreateRequest = () => {
  const { t } = useTranslation()
  const [userStatus, setUserStatus] = useState('')

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const storedToken = localStorage.getItem('s2s')
        if (storedToken) {
          const [, payload] = storedToken.split('.')
          const decodedPayload = JSON.parse(atob(payload))
          const userId = decodedPayload.id
          const userRole = decodedPayload.role
          const response = await userService.getUserById(userId, userRole)
          const status = response.data.role[0]
          setUserStatus(status)
        }
      } catch (e) {
        console.log(`Error message: ${e.message}`)
      }
    }
    fetchUserStatus()
  }, [])

  return (
    <Box sx={styles.container}>
      <Box sx={styles.offerBlock}>
        <Typography variant='h4'>
          {userStatus === 'student'
            ? t('findOffers.offerRequestBlock.title.student')
            : t('findOffers.offerRequestBlock.title.tutor')}
        </Typography>
        <Typography sx={styles.description}>
          {t('findOffers.offerRequestBlock.description')}
        </Typography>
        <Button variant='contained'>
          {userStatus === 'student'
            ? t('offerPage.createOffer.buttonTitles.student')
            : t('offerPage.createOffer.buttonTitles.tutor')}
        </Button>
      </Box>
      <Box alt='Circles' component='img' src={SubjectPhoto} />
    </Box>
  )
}

export default CreateRequest
