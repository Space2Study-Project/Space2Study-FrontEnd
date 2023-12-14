import { useState } from 'react'
import { Box, Button, Icon, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './CategoryHeader.styles'
import { ArrowForward } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'

const CategoryHeader = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const offerSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Box>
      <Box sx={styles.titleBox}>
        <Typography variant='h4'>{t('categoriesPage.title')}</Typography>
        <Typography sx={styles.description} variant='text'>
          {t('categoriesPage.description')}
        </Typography>
      </Box>
      <Button sx={styles.showOffersText}>
        {t('categoriesPage.showAllOffers')}
        <Icon component={ArrowForward} sx={styles.showOffers} />
      </Button>
      <TextField
        InputProps={{
          startAdornment: <SearchIcon />,
          endAdornment: (
            <Button sx={styles.buttonSearch} variant='contained'>
              Search
            </Button>
          ),
          style: { padding: '30px 45px' }
        }}
        fullWidth
        onChange={offerSearch}
        placeholder={t('categoriesPage.searchLabel')}
        sx={styles.searchField}
        value={search}
      ></TextField>
    </Box>
  )
}

export default CategoryHeader
