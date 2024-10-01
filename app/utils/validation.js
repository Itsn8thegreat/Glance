// utils/validation.js

// Email validation function
export const isValidEmail = (email) => {
    // Ensure email is a string
    if (typeof email !== 'string') {
      return false; // Invalid if not a string
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  