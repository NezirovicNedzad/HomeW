import axios from "axios";
import { API_URL } from "../config/config";

export const getFitnesPrograms = async (u) => {
    try {
      const response = await axios.get(`${API_URL}FitnessProgram`);
  
      return response.data;  // Success response, return the workout data
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;  // Handle the error in your UI
    }
  };