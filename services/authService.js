import axios from "axios";
import { API_URL } from "../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
 // Assuming you have a config file for the API URL

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}account/login`, {
      email,
      password,
    });

    // Check if the status is in the 2xx range
    if (response.status >= 200 && response.status < 300) {
      // Login successful, save token to AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      
      // Return the user data and token
      return { success: true, token: response.data.token, data: response.data };
    } else {
      // Login failed, handle the error message
      return { success: false, error: response.data.message || "Login failed" };
    }
  } catch (error) {
    // Handle network or unexpected errors and return an error message
    return { 
      success: false, 
      error: error.response?.data?.message || "An error occurred. Please try again." 
    };
  }
};


// Assuming you have a config file for the API URL

export const registerUser = async ({ name, surname, gender, dateOfBirth, password, username,email }) => {
  try {
    const response = await axios.post(`${API_URL}account/register`, {
      name,
      surname,
      gender,
      dateOfBirth, // Assuming this is in 'YYYY-MM-DD' format
      password,
      username,
      email,
      role:"User",
    });

    // Check if the response is successful
    if (response.status >= 200 && response.status < 300) {
      // Registration successful, return success response
      return { success: true, data: response.data };
    } else {
      // Registration failed, return error message
      return { success: false, error: response.data.message || "Registration failed" };
    }
  } catch (error) {
    // Handle network or unexpected errors
    return {
      success: false,
      error: error.response?.data?.message || error.message || "An error occurred. Please try again.",
    };
  }
};
