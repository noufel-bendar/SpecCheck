
export const normalizeImage = (imagePath) => {
    if (!imagePath) return ''; 
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath.replace(/^https\/\//, 'https://');
    }
    const API_BASE = process.env.REACT_APP_API_BASE || 'https://speccheck-5.onrender.com';
    return `${API_BASE.replace(/\/$/, '')}/${imagePath.replace(/^\/+/, '')}`;
  };
  