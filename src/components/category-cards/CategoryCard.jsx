import { Box, Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './CategoryCard.style'
import AstronomyImage from '~/assets/img/categories/astronomy.svg'
import AuditImage from '~/assets/img/categories/audit.svg'
import BiologyImage from '~/assets/img/categories/biology.svg'
import ChemistryImage from '~/assets/img/categories/chemistry.svg'
import ComputerScienceImage from '~/assets/img/categories/computerscience.svg'
import DesignImage from '~/assets/img/categories/design.svg'
import FinancesImage from '~/assets/img/categories/finances.svg'
import HistoryImage from '~/assets/img/categories/history.svg'
import LanguageImage from '~/assets/img/categories/language.svg'
import MathematicsImage from '~/assets/img/categories/mathematics.svg'
import MusicImage from '~/assets/img/categories/music.svg'
import PaintingImage from '~/assets/img/categories/painting.svg'

const getCategoryImage = (name) => {
  const imageName = name.toLowerCase()
  switch (imageName) {
    case 'Psychology':
      return AstronomyImage
    case 'marketing':
      return AuditImage
    case 'biology':
      return BiologyImage
    case 'chemistry':
      return ChemistryImage
    case 'computer science':
      return ComputerScienceImage
    case 'design':
      return DesignImage
    case 'finances':
      return FinancesImage
    case 'history':
      return HistoryImage
    case 'languages':
      return LanguageImage
    case 'mathematics':
      return MathematicsImage
    case 'music':
      return MusicImage
    case 'painting':
      return PaintingImage
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
  const totalOffersCount = totalOffers.student + totalOffers.tutor + 234
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
          <Box style={styles.about}>
            <Typography variant='h6'>{name}</Typography>
            <Typography variant='caption'>{` ${totalOffersCount} offers`}</Typography>{' '}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
