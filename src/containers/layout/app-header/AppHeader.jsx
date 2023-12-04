import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import NavBar from '~/containers/layout/navbar/NavBar'
import { styles } from '~/containers/layout/app-header/AppHeader.styles'

const AppHeader = ({ mainWithFooter }) => {
  return (
    <>
      <AppBar sx={styles.appBar}>
        <NavBar mainWithFooter={mainWithFooter} />
      </AppBar>
      <Toolbar data-testid='toolbar' sx={styles.toolBar} />
    </>
  )
}

export default AppHeader
