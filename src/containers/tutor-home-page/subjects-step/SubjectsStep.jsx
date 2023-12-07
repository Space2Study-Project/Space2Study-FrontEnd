import { Box, Autocomplete, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useCallback } from 'react'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

import AppButton from '~/components/app-button/AppButton'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) {
      return
    }
    try {
      const response = await categoryService.getCategoriesNames()
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [categories])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (selectedCategory) {
          const response = await subjectService.getSubjectsNames(
            selectedCategory._id
          )
          setSubjects(response.data)
        }
      } catch (error) {
        console.error('Error fetching subjects:', error)
      }
    }

    fetchSubjects()
  }, [selectedCategory])

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue)
    setSelectedSubject(null)
  }
  const handleSubjectChange = (event, newValue) => {
    setSelectedSubject(newValue)
  }

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
        <Box sx={styles.inputContainer}>
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
            renderOption={(props, option) => (
              <li {...props}>
                <Typography variant='body2'>
                  <span>{option.name}</span>&nbsp;
                  <span style={{ fontSize: 'small', color: 'gray' }}>
                    Category: {option.name}
                  </span>
                </Typography>
              </li>
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
            renderOption={(props, option) => (
              <li {...props}>
                <Typography variant='body2'>
                  <span>{option.name}</span>&nbsp;
                  <span style={{ fontSize: 'small', color: 'gray' }}>
                    {option.category
                      ? option.category.name
                      : selectedCategory
                      ? selectedCategory.name
                      : ''}
                  </span>
                </Typography>
              </li>
            )}
            sx={styles.inputItem}
            value={selectedSubject}
          />
        </Box>
        <AppButton sx={styles.appButton}>
          {t('becomeTutor.categories.btnText')}
        </AppButton>
        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
