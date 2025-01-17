export const reservaStyles = {
  container: {
    maxWidth: '600px',
    width: '100%',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#F5F5DC',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'left',
    color: '#8B4513',
    marginBottom: '20px',
    paddingLeft: '10px',
    fontSize: '24px'
  },
  button: {
    padding: '15px',
    fontSize: '16px',
    backgroundColor: '#8B4513',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#A0522D'
    }
  },
  addressContainer: {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  addressTitle: {
    fontSize: '18px',
    color: '#8B4513',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  addressText: {
    fontSize: '16px',
    color: '#8B4513',
    marginBottom: '10px'
  },
  addressButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  addressButton: {
    padding: '8px 15px',
    fontSize: '14px',
    backgroundColor: '#8B4513',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#A0522D'
    }
  }
};
