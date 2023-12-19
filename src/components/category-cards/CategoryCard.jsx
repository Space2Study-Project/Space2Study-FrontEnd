import { Box, Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './CategoryCard.style'
import LanguageImage from '~/assets/img/categories/language.svg'

const getCategoryImage = (name) => {
  const imageName = name.toLowerCase()
  switch (imageName) {
    case 'astronomy':
      return LanguageImage
    case 'marketing':
      return LanguageImage
    case 'biology':
      return LanguageImage
    case 'chemistry':
      return LanguageImage
    case 'computer science':
      return LanguageImage
    case 'design':
      return LanguageImage
    case 'finances':
      return LanguageImage
    case 'history':
      return LanguageImage
    case 'languages':
      return LanguageImage
    case 'mathematics':
      return LanguageImage
    case 'music':
      return LanguageImage
    case 'painting':
      return LanguageImage
    default:
      return null
  }
}

const CategoryCard = ({ category }) => {
  if (!category || !category.name) {
    console.log('Category or title is undefined:', category)
    return null
  }

  const { id, name, totalOffers } = category

  const imagePath = getCategoryImage(name)
  const totalOffersCount = totalOffers.student + totalOffers.tutor
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '7px'
          }}
        >
          <Box sx={styles.iconContainer}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/subjects/${id || 'placeholder'}`}
            >
              <img alt={name} src={imagePath} style={styles.icon} />
            </Link>
          </Box>
          <Box data-testid='offers' style={styles.about}>
            <Typography variant='h6'>{name}</Typography>
            <Typography variant='caption'>{` ${totalOffersCount} Offers`}</Typography>{' '}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
