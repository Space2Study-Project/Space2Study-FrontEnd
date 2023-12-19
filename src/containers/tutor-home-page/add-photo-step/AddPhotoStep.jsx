import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import previewImage from '~/assets/img/guest-home-page/preview.png'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState()
  const fileReader = new FileReader()

  fileReader.onloadend = () => {
    setImageURL(fileReader.result)
  }

  const handleFileChange = (file) => {
    setImage(file)
    fileReader.readAsDataURL(file)
  }

  return (
    <Box data-testid='AddPhoto step' sx={styles.container}>
      <DragAndDrop
        emitter={({ files, error }) => {
          if (!error && files.length > 0) {
            handleFileChange(files[0])
          }
        }}
        validationData={{ maxQuantityFiles: 1 }}
      >
        <Box data-testid='AddPhoto-step' sx={styles.previewContainer}>
          <img
            alt='AddPhoto step'
            className='file-uploader__preview'
            src={imageURL ?? previewImage}
            style={styles.previewImage}
          />
        </Box>
      </DragAndDrop>
      <Box sx={styles.rightBox}>
        <Box sx={styles.uploadContainer}>
          <Typography sx={styles.title}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={({ files, error }) => {
              if (!error && files.length > 0) {
                handleFileChange(files[0])
              }
            }}
            validationData={{ maxQuantityFiles: 1 }}
          />
          <Box>{image ? image.name : ''}</Box>
        </Box>
        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
