import { Box, Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './CategoryCard.style'
import images from './images.js'
import { authRoutes } from '~/router/constants/authRoutes'

const getCategoryImage = (name) => {
  const imageName = name.toLowerCase()
  return images[imageName] || null
}

const CategoryCard = ({ category }) => {
  if (!category || !category.name) {
    console.log('Category or title is undefined:', category)
    return null
  }

  const { name, totalOffers } = category

  const imagePath = getCategoryImage(name)
  const totalOffersCount = totalOffers.student + totalOffers.tutor
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box sx={styles.cardContent}>
          <Box sx={styles.iconContainer}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`${authRoutes.subjects.path}`}
            >
              <img alt={name} src={imagePath} style={styles.icon} />
            </Link>
          </Box>
          <Box data-testid='offers' style={styles.about}>
            <Typography variant='h6'>{name}</Typography>
            <Typography variant='caption'>{` ${totalOffersCount} offers`}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
