import axios from "axios";
import { API_URL } from "../config/config";

export const getFitnesPrograms = async () => {
    try {
      const response = await axios.get(`${API_URL}FitnessProgram`);
  
      return response.data;  // Success response, return the workout data
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;  // Handle the error in your UI
    }
  };

  export const getProgramsByDifficulty = async (param) => {
    try {
      const response = await axios.get(`${API_URL}FitnessProgram/search/${param}`)
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching fitness programs by difficulty:', error);
      throw error; // Re-throw the error for further handling in your component
    }
  };