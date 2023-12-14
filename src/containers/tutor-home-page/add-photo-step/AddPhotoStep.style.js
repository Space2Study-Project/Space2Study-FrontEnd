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
  fileUploaderPreview: {
    width: '300px',
    height: '300px',
    border: '1px dashed gray',
    borderRadius: '12px'
  }
}
