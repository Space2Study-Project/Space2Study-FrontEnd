import { useRef } from 'react'
import Box from '@mui/material/Box'

import { styles } from '~/containers/app-content/AppContent.styles'
import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'

const AppContent = () => {
  const mainWithFooter = useRef(null)
  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppHeader mainWithFooter={mainWithFooter} />
      <AppMain mainWithFooter={mainWithFooter} />
    </Box>
  )
}

export default AppContent
