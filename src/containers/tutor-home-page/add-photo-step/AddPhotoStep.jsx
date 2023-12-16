import { useState } from 'react'
import { Box } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import previewImage from '~/assets/img/guest-home-page/preview.png'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'
import Typography from '@mui/material/Typography'

const AddPhotoStep = ({ btnsBox }) => {
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState()
  const [errorPhoto, setErrorPhoto] = useState('')

  const fileReader = new FileReader()

  fileReader.onloadend = () => {
    setImageURL(fileReader.result)
  }
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']
  const isFileTypeValid = (file) => {
    return allowedFileTypes.includes(file.type)
  }
  const handleFileChange = (file) => {
    setErrorPhoto('')

    if (!file || !isFileTypeValid(file)) {
      setErrorPhoto(
        'Invalid file type. Please choose a PNG, JPEG, or JPG file.'
      )
      setImage(null)
      setImageURL(previewImage)
    } else {
      setImage(file)
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Box data-testid='AddPhoto step' sx={style.root}>
      <DragAndDrop
        emitter={({ files, error }) => {
          if (!error && files.length > 0) {
            handleFileChange(files[0])
          }
        }}
        validationData={{ maxQuantityFiles: 1 }}
      >
        <Box data-testid='AddPhoto-step' sx={style.previewContainer}>
          <img
            alt='AddPhoto step'
            src={imageURL ?? previewImage}
            style={style.previewImage}
          />
        </Box>
      </DragAndDrop>
      <Box sx={style.bottomBox}>
        <Box>
          <FileUploader
            buttonText='Upload your profile photo'
            emitter={({ files, error }) => {
              if (!error && files.length > 0) {
                handleFileChange(files[0])
              }
            }}
            validationData={{ maxQuantityFiles: 1 }}
          />
          <Box>
            {image ? image.name : ''}
            <Typography color='error' variant='caption'>
              {errorPhoto}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: 'auto' }}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
