import axios from 'axios';
import { API_URL } from '../config/config';  // Replace with your actual API URL

export const createWorkout = async (userId, programId, workoutName, date, time) => {
    try {
      const response = await axios.post(`${API_URL}Workout`, {
        userId,
        programId,
        name: workoutName,
        date,
        time
      });
  
      console.log(response.status)
      // Check for a successful response status
      if (response.status === 200) {
        return { success: true, message: 'Workout created successfully!', data: response.data };
      } else {
        return { success: false, message: 'Failed to create workout.' };
      }
    } catch (error) {
      console.log('Error response:', error.response); // Log full error response for debugging
      const errorMessage = error.response?.data?.message || 'An error occurred while creating the workout.';
      return { success: false, message: errorMessage };
    }
  };

export const getWorkoutsByUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}account/${userId}`);  // Pass userId in the URL
      return response.data;  // Success response, return the workout data
    } catch (error) {
      if (error.response && error.response.data) {
        let errorMessage;
  
        // Check if the error message is a string
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } 
        // If the message is an object, try to stringify it
        else if (typeof error.response.data.message === 'object') {
          errorMessage = JSON.stringify(error.response.data.message);
        } 
        // If it's another format (array, etc.), handle it as fallback
        else {
          errorMessage = 'An unexpected error occurred';
        }
  
      
       
      } else {
       
        throw new Error('Network error, please try again later');
      }
    }
  };
  