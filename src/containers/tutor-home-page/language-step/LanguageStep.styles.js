import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: { md: '10px', lg: '80px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    height: { sm: '485px' },
    width: '100%',
    flexDirection: { xs: 'column', md: 'row' },
    ...fadeAnimation
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '430px'
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  btnsBox: {
    display: 'flex',
    marginTop: 'auto',
    padding: '25px 0 25px',
    flexDirection: 'column-reverse'
  }
}
