const styles = {
  card: {
    width: '326px',
    minHeight: '112px',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  iconContainer: {
    width: '62px',
    height: '62px',
    background: '#79B26033',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '6px'
  },
  about: {
    marginLeft: '20px'
  }
}

export default styles
