import { Box, Autocomplete, TextField, Typography } from '@mui/material'
import useStepsDataContext from '~/context/steps-data-context'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppButton from '~/components/app-button/AppButton'

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
  } = useStepsDataContext()

  return (
    <Box sx={styles.container}>
      <Box>
        <Box
          alt='subject img'
          component='img'
          src={studyCategory}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.rightBox}>
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
            value={selectedCategory}
          />
          <Autocomplete
            getOptionLabel={(option) =>
              option && selectedCategory ? option.name : ''
            }
            onChange={handleSubjectChange}
            options={subjects}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.categories.subjectLabel')}
              />
            )}
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
