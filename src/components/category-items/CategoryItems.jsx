import { Box } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { categoryService } from '~/services/category-service'
import CategoryCard from '~/components/category-cards/CategoryCard'

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px'
  }
}
const CategoryItems = () => {
  const [categories, setCategories] = useState([])

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

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <Box sx={styles.container}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))
      ) : (
        <Box>No categories available</Box>
      )}
    </Box>
  )
}

export default CategoryItems
