import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react'
import { useTranslation } from 'react-i18next'
import useName from '~/hooks/use-name'
import useCountryCityInfo from '~/hooks/use-country-city-info'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

export const SteperContext = createContext()

const StepsDataProvider = ({ children }) => {
  const { name, lastName } = useName()
  const {
    countryList,
    city,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  } = useCountryCityInfo()
  const { t } = useTranslation()

  const [text, setText] = useState('')

  const changeText = (e) => {
    setText(e.target.value)
  }

  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue)
  }

  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedSubjectName, setSelectedSubjectName] = useState(true)
  const [selectedSubjects, setSelectedSubjects] = useState([])

  const dataChipList = {
    items: [...selectedSubjects],
    defaultQuantity: 2,
    handleChipDelete: (deletedItem) =>
      setSelectedSubjects(
        selectedSubjects.filter((item) => item !== deletedItem)
      ),
    wrapperStyle: styles.chipList
  }

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue)
    setSelectedSubject(null)
  }

  const addSubjects = () => {
    setSelectedSubject(null)
    setSelectedSubjectName(true)
    if (!selectedSubjects.includes(selectedSubject.name)) {
      setSelectedSubjects([...selectedSubjects, selectedSubject?.name])
    }
  }

  const handleSubjectChange = (event, newValue) => {
    setSelectedSubject(newValue)
    setSelectedSubjectName(false)
  }

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

  const generalInfoStepData = {
    name,
    lastName,
    text,
    changeText,
    countryList,
    city,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  }

  const subjectsStepData = {
    categories,
    subjects,
    selectedCategory,
    selectedSubject,
    selectedSubjectName,
    dataChipList,
    handleCategoryChange,
    addSubjects,
    handleSubjectChange
  }

  const languageStepData = {
    selectedLanguage,
    handleLanguageChange
  }

  return (
    <SteperContext.Provider
      value={{
        ...generalInfoStepData,
        ...subjectsStepData,
        ...languageStepData,
        t
      }}
    >
      {children}
    </SteperContext.Provider>
  )
}
const useStepsDataContext = () => useContext(SteperContext)

export { StepsDataProvider, useStepsDataContext }
