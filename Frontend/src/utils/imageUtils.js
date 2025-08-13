/**
 * Image utility functions for handling Cloudinary and other image URLs
 */

import { API_BASE } from './config';

/**
 * Normalize and validate image URLs
 * @param {string} imagePath - The image path or URL
 * @param {string} placeholder - Fallback image URL
 * @returns {string} - Normalized image URL
 */
export const normalizeImageUrl = (imagePath, placeholder = 'https://placehold.co/400x300?text=No+Image') => {
  if (!imagePath || imagePath.trim() === '') {
    return placeholder;
  }
  
  let normalized = imagePath.trim();
  
  // Fix common URL issues (missing colon in protocol)
  normalized = normalized.replace(/^(https?)(\/\/)/i, '$1:$2');
  
  // If it's already a full URL (Cloudinary or other), return as-is
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return normalized;
  }
  
  // If it's a relative path, construct the full URL
  if (normalized.startsWith('/')) {
    return `${API_BASE}${normalized}`;
  }
  
  // If it's a path without leading slash, add it
  return `${API_BASE}/${normalized}`;
};

/**
 * Check if an image URL is from Cloudinary
 * @param {string} imageUrl - The image URL to check
 * @returns {boolean} - True if it's a Cloudinary URL
 */
export const isCloudinaryUrl = (imageUrl) => {
  return imageUrl && imageUrl.includes('cloudinary.com');
};

/**
 * Get image error handler for React img elements
 * @param {string} placeholder - Fallback image URL
 * @returns {Function} - Error handler function
 */
export const getImageErrorHandler = (placeholder = 'https://placehold.co/400x300?text=No+Image') => {
  return (e) => {
    e.target.src = placeholder;
    e.target.onerror = null; // Prevent infinite loop
  };
};

/**
 * Get responsive image URL for different sizes (Cloudinary transformations)
 * @param {string} imageUrl - Original image URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @returns {string} - Transformed image URL
 */
export const getResponsiveImageUrl = (imageUrl, width = 400, height = 300) => {
  if (!isCloudinaryUrl(imageUrl)) {
    return imageUrl;
  }
  
  // Add Cloudinary transformation parameters
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}w=${width}&h=${height}&c=fill&f=auto`;
};

/**
 * Validate image URL accessibility
 * @param {string} imageUrl - The image URL to validate
 * @returns {Promise<boolean>} - True if image is accessible
 */
export const validateImageUrl = async (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith('http')) {
    return false;
  }
  
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};
