// storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'userData';

// Save user data
export const saveUserData = async (userData) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving user data', error);
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving user data', error);
    return null;
  }
};

// Remove user data (for logout)
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error removing user data', error);
  }
};
