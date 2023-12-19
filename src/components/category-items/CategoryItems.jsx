import { Box, Button } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { categoryService } from '~/services/category-service'
import CategoryCard from '~/components/category-cards/CategoryCard'
import * as styles from './CategoryItems.style'
const CategoryItems = () => {
  const [categories, setCategories] = useState([])
  const [visibleCategories, setVisibleCategories] = useState(6)

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryService.getCategories()
      const data = response.data
      if (Array.isArray(data.items)) {
        setCategories(data.items)
      } else {
        console.error('Data.items is not an array:', data.items)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [])
  const handleViewMore = () => {
    setVisibleCategories((prevCount) => prevCount + 6)
  }
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <>
      <Box sx={styles.container}>
        {categories.slice(0, visibleCategories).map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </Box>
      {categories.length > visibleCategories && (
        <Box sx={styles.buttonContainer}>
          <Button onClick={handleViewMore} sx={styles.button}>
            View more
          </Button>
        </Box>
      )}
    </>
  )
}

export default CategoryItems
