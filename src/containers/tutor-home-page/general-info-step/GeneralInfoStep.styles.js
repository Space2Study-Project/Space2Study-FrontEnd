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
  rightBox: {
    display: 'flex',
    flexDirection: 'column'
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
    fontSize: '14px'
  },
  btnsBox: {
    display: 'flex',
    marginTop: 'auto',
    paddingBottom: '25px',
    flexDirection: 'column-reverse'
  }
}
