// src/utils/helpers.js

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatVerificationData = (userId, faceCaptured, faceValid = null) => {
  return {
    userId,
    faceCaptured,
    faceValid,
    timestamp: new Date().toISOString()
  };
};

export const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/too-many-requests': 'Too many failed attempts. Try again later',
    'auth/network-request-failed': 'Network error. Check your connection'
  };
  return errorMessages[errorCode] || 'An error occurred. Please try again';
};

export const checkWebcamAvailability = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some(device => device.kind === 'videoinput');
  } catch (error) {
    console.error('Error checking webcam:', error);
    return false;
  }
};