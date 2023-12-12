import { fadeAnimation } from '~/styles/app-theme/custom-animations'
const containerCommon = {
  display: 'flex',
  justifyContent: 'space-between',
  height: { sm: '485px' },
  paddingBottom: { xs: '30px', sm: '0px' },
  flexDirection: { xs: 'column', md: 'row' },
  ...fadeAnimation
}
export const styles = {
  container: {
    ...containerCommon,
    gap: { md: '25px', lg: '80px' }
  },
  imgContainer: {
    ...containerCommon,
    alignItems: 'flex-start',
    width: { sm: '100%', md: '38%', lg: '50%' },
    maxWidth: { md: '370px', lg: '472px' },
    maxHeight: 'inherit'
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    marginBottom: '30px'
  },
  inputContainer: {
    ...containerCommon,
    flexDirection: 'column',
    width: { sm: '100%', md: '100%', lg: '100%' },
    maxWidth: { md: '430px', lg: '455px' }
  },
  btnsBox: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: 'auto',
    height: '65%'
  },
  inputItem: {
    ...containerCommon,
    justifyContent: 'space-between',
    marginBottom: '30px'
  },
  title: {
    marginBottom: '30px'
  }
}
