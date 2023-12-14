import PropTypes from 'prop-types'
import useUpload from '~/hooks/use-upload'
import { Box } from '@mui/material'

const DragAndDrop = ({
  emitter,
  initialState = [],
  validationData,
  children,
  style
}) => {
  const { dragStart, dragLeave, dragDrop, isDrag } = useUpload({
    files: initialState,
    emitter: emitter,
    validationData
  })

  return (
    <Box
      onDragLeave={dragLeave}
      onDragOver={dragStart}
      onDragStart={dragStart}
      onDrop={dragDrop}
      sx={style?.root}
    >
      <Box sx={[style?.uploadBox, isDrag && style?.activeDrag]}>{children}</Box>
    </Box>
  )
}
DragAndDrop.propTypes = {
  emitter: PropTypes.func.isRequired,
  initialState: PropTypes.array,
  validationData: PropTypes.object,
  children: PropTypes.node,
  style: PropTypes.shape({
    root: PropTypes.object,
    uploadBox: PropTypes.object,
    activeDrag: PropTypes.object
  })
}
export default DragAndDrop
