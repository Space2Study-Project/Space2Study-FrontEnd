import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    // justifyContent: 'space-between',
    // gap: { md: '0px', lg: '60px' },
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    flexDirection: { xs: 'column', md: 'row' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    width: '50%',
    maxWidth: { md: '370px', lg: '472px' },
    maxHeight: 'inherit'
  },
  img: {
    objectFit: 'contain',
    width: '80%',
    marginBottom: '30px'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: { md: '350px', lg: '455px' }
  },
  btnsBox: {
    alignItems: 'flex-end',
    marginTop: 'auto'
  },
  appButton: {
    width: '100%'
  },
  inputItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px'
  },
  title: {
    marginBottom: '30px'
  }
}
