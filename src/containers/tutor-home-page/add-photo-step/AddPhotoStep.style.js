import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { sm: '210px', md: '0px' },
    ...fadeAnimation
  },
  bottomBox: {
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  previewContainer: {
    ...fadeAnimation
  },
  previewImage: {
    width: '400px',
    height: '400px',
    border: '1px dashed gray',
    borderRadius: '12px'
  }
}
