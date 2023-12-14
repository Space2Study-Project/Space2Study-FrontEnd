import { Box, Autocomplete, TextField, Typography } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppButton from '~/components/app-button/AppButton'
import { useContext } from 'react'
import { SteperContext } from '~/components/user-steps-wrapper-with-data/UserStepsWrapperWithData'

const SubjectsStep = ({ btnsBox }) => {
  const {
    t,
    categories,
    subjects,
    selectedCategory,
    selectedSubject,
    selectedSubjectName,
    dataChipList,
    handleCategoryChange,
    addSubjects,
    handleSubjectChange
  } = useContext(SteperContext)

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='subject img'
          component='img'
          src={studyCategory}
          sx={styles.img}
        />
      </Box>
      <Box>
        <Box data-testid='inputContainer' sx={styles.inputContainer}>
          <Typography sx={styles.title}>
            {t('becomeTutor.categories.title')}
          </Typography>
          <Autocomplete
            getOptionLabel={(option) => (option ? option.name : '')}
            onChange={handleCategoryChange}
            options={categories}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.categories.mainSubjectsLabel')}
              />
            )}
            sx={styles.inputItem}
            value={selectedCategory}
          />
          <Autocomplete
            getOptionLabel={(option) => (option ? option.name : '')}
            onChange={handleSubjectChange}
            options={subjects}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.categories.subjectLabel')}
              />
            )}
            sx={styles.inputItem}
            value={selectedSubject}
          />
        </Box>
        <AppButton
          disabled={selectedSubjectName}
          onClick={addSubjects}
          sx={styles.appButton}
        >
          {t('becomeTutor.categories.btnText')}
        </AppButton>
        <Box sx={styles.appChipList}>
          <AppChipList {...dataChipList} />
        </Box>
        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
