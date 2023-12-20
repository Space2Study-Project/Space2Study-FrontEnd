import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './CategoryHeader.styles'
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
        <Typography sx={styles.titleCategories} variant='h4'>{t('categoriesPage.title')}</Typography>
        <Typography variant='text'>
          {t('categoriesPage.description')}
        </Typography>
      </Box>
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
      <Typography
        data-testid='underInputText'
        sx={styles.descRequest}
        variant='text'
      >
        Can`t find what you are looking for? Request a new category or subject!
      </Typography>
    </Box>
  )
}

export default CategoryHeader
