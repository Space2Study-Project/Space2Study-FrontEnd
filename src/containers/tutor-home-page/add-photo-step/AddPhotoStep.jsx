import useStepsDataContext from '~/context/steps-data-context'
import { Box, Typography } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

const AddPhotoStep = ({ btnsBox }) => {
  const { t, image, imageURL, handleFileChange, errorPhoto, previewImage } =
    useStepsDataContext()
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
          <Box>
            {image ? image.name : ''}
            <Typography
              color='error'
              data-testid='ErrorPhoto'
              variant='caption'
            >
              {errorPhoto}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
