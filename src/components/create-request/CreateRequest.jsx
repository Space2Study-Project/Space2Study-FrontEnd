import {
  Box,
  Button,
  Typography,
  Dialog,
  Autocomplete,
  TextField,
  IconButton
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import SubjectPhoto from '~/assets/img/student-home-page/subject_icon.png'
import { useEffect, useState, useCallback } from 'react'
import { userService } from '~/services/user-service'
import useRequest from '~/hooks/use-request'
import { styles } from './CreateRequest.styles'
import sendRequestPhoto from '~/assets/img/find-offer-request/sign-up/sendRequest.svg'
import AppTextField from '../app-text-field/AppTextField'
import { categoryService } from '~/services/category-service'
import CloseIcon from '@mui/icons-material/Close'

const CreateRequest = () => {
  const { t } = useTranslation()
  const [userStatus, setUserStatus] = useState('')
  const {
    reqSubject,
    setReqSubject,
    reqCategory,
    setReqCategory,
    reqDescription,
    setReqDescription,
    reqSelectedCategory,
    setReqSelectedCategory
  } = useRequest()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

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

  const fetchCategories = useCallback(async () => {
    if (reqCategory.length > 0) {
      return
    }
    try {
      const response = await categoryService.getCategoriesNames()
      setReqCategory(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [reqCategory])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const subjectText = (e) => {
    setReqSubject(e.target.value)
  }
  const descriptionText = (e) => {
    setReqDescription(e.target.value)
  }

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
        <Button onClick={handleOpen} variant='contained'>
          {userStatus === 'student'
            ? t('offerPage.createOffer.buttonTitles.student')
            : t('offerPage.createOffer.buttonTitles.tutor')}
        </Button>
      </Box>
      <Box alt='Circles' component='img' src={SubjectPhoto} />
      <Dialog
        maxWidth='100%'
        onClose={handleClose}
        open={open}
        sx={styles.dialog}
      >
        <Box sx={styles.requestBox}>
          <IconButton onClick={handleClose} sx={styles.icon}>
            <CloseIcon />
          </IconButton>
          <Box component='img' src={sendRequestPhoto} />
          <Box sx={styles.formBlock}>
            <Typography sx={styles.title} variant='h4'>
              {t('categoriesPage.newSubject.title')}
            </Typography>
            <Typography sx={styles.descriptionRequest} variant='text'>
              {t('categoriesPage.newSubject.description')}
            </Typography>
            <Typography sx={styles.createSubjectTitle}>
              {t('categoriesPage.newSubject.subject')}
            </Typography>
            <AppTextField
              onChange={subjectText}
              placeholder='New subject'
              sx={styles.newSubjectField}
              value={reqSubject}
            />
            <Typography sx={styles.addSubject}>
              {t('categoriesPage.newSubject.category')}
            </Typography>
            <Autocomplete
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(event, newValue) => {
                setReqSelectedCategory(newValue)
              }}
              options={reqCategory}
              placeholder='New subject'
              renderInput={(params) => (
                <TextField {...params} label='Category' />
              )}
              sx={styles.newSubjectField}
              value={reqSelectedCategory}
            />
            <Typography sx={styles.subjectInfo}>
              {t('categoriesPage.newSubject.info')}
            </Typography>
            <TextField
              inputProps={{ maxLength: 1000 }}
              multiline
              onChange={descriptionText}
              placeholder='Additional information'
              rows='3'
              sx={styles.newSubjectField}
              value={reqDescription}
            />
            <Typography sx={styles.descLength}>
              {reqDescription.length}/1000
            </Typography>
            <Button sx={styles.btnSendRequest} variant='contained'>
              Send Request
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default CreateRequest
