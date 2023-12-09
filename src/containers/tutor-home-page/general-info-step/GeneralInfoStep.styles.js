import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '430px',
    gap: '20px'
  },
  appearance: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textField: {
    width: '48%'
  },
  selects: {
    width: '48%'
  },
  description: {
    width: '100%'
  },
  warning: {
    fontSize: '14px',
    margin: '15px 0 30px'
  }
}
