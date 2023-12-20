import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import useName from '~/hooks/use-name'
import useCountryCityInfo from '~/hooks/use-country-city-info'
import { useSnackBarContext } from '~/context/snackbar-context'
import common from '~/constants/translations/en/common.json'
import previewImage from '~/assets/img/guest-home-page/preview.png'
export const SteperContext = createContext()

const StepsDataProvider = ({ children }) => {
  const [validForm, setvalidForm] = useState(true)
  const { t } = useTranslation()
  const maxLength = 100
  const { name, setName, lastName, setLastName, userId, userRole } = useName()
  const {
    countryList,
    city,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity
  } = useCountryCityInfo()

  const [text, setText] = useState('')

  const changeText = (e) => {
    setText(e.target.value)
  }
  useEffect(() => {
    name !== '' &&
      lastName !== '' &&
      selectedCountry !== null &&
      selectedCity !== null
  }, [name, lastName, selectedCountry, selectedCity])

  const memoizedMaxLength = useMemo(() => maxLength, [])

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

  const { setAlert } = useSnackBarContext()

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) {
      return
    }
    try {
      const response = await categoryService.getCategoriesNames()
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setAlert({
        severity: 'error',
        message: 'common.errorMessages.fetchingData'
      })
    }
  }, [categories, setAlert])

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
        setAlert({
          severity: 'error',
          message: 'common.errorMessages.fetchingData'
        })
      }
    }
    fetchSubjects()
  }, [selectedCategory, setAlert])

  const dataChipList = {
    items: selectedSubjects.map((subj) => subj.name),
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
      setSelectedSubjects([...selectedSubjects, selectedSubject])
    }
  }
  const handleSubjectChange = (event, newValue) => {
    setSelectedSubject(newValue)
    setSelectedSubjectName(false)
  }

  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null)
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
      setErrorPhoto(common.errorMessages.errorPhotoValid)
      setImage(null)
      setImageURL(previewImage)
    } else {
      setImage(file)
      fileReader.readAsDataURL(file)
    }
  }

  const generalInfoStepData = {
    name,
    lastName,
    selectedCountry,
    selectedCity,
    text
  }
  const generalInfoStepDataHandl = {
    setName,
    setLastName,
    countryList,
    city,
    setSelectedCountry,
    setSelectedCity,
    changeText,
    memoizedMaxLength
  }

  const subjectsStepData = {
    selectedSubjects
  }
  const subjectsStepDataHandl = {
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
    selectedLanguage
  }
  const languageStepDataHandl = {
    handleLanguageChange
  }

  const addPhotoStepData = {
    image
  }
  const addPhotoStepDataHandl = {
    imageURL,
    handleFileChange,
    errorPhoto,
    previewImage
  }

  const allSteperInfoData = {
    ...generalInfoStepData,
    ...subjectsStepData,
    ...languageStepData,
    ...addPhotoStepData,
    userId,
    userRole
  }

  const allSteperHandl = {
    ...generalInfoStepDataHandl,
    ...subjectsStepDataHandl,
    ...languageStepDataHandl,
    ...addPhotoStepDataHandl
  }
  useMemo(() => {
    const isFormValid =
      name !== '' &&
      lastName !== '' &&
      selectedCountry !== null &&
      selectedCity !== null &&
      text !== null &&
      selectedSubjects.length > 0 &&
      selectedLanguage !== null &&
      image !== null &&
      imageURL !== null
    setvalidForm(!isFormValid)
  }, [
    name,
    lastName,
    selectedCountry,
    selectedCity,
    text,
    selectedSubjects,
    selectedLanguage,
    image,
    imageURL
  ])
  console.log(image)
  console.log(imageURL)
  return (
    <SteperContext.Provider
      value={{
        ...allSteperInfoData,
        ...allSteperHandl,
        validForm,
        t
      }}
    >
      {children}
    </SteperContext.Provider>
  )
}
const useStepsDataContext = () => useContext(SteperContext)

export { StepsDataProvider }
export default useStepsDataContext
