import React,{createContext,useEffect,useState} from "react";
import { saveUserData,getUserData,removeUserData } from "./services/storageService";
const FitnessAppItems=createContext();

const AuthContext=createContext();


const FitnessAppContext=({children})=>{

const [completed,setCompleted]=useState([]);
const[workout,setWorkout]=useState(0);
const[calories,setCalories]=useState(0);
const[minutes,setMinutes]=useState(0);
const[isAuthenticated,setIsAuthenticated]=useState(false);
const [userData, setUserData] = useState(null);
useEffect(() => {
  // Load user data from AsyncStorage when app starts
  const loadUserData = async () => {
    const savedUserData = await getUserData();
    if (savedUserData) {
      setUserData(savedUserData);
      setIsAuthenticated(true); // Assume user is authenticated if user data exists
    }
  };
  loadUserData();
}, []);

const saveLogin = async (userData) => {
  await saveUserData(userData);
  setUserData(userData);
  setIsAuthenticated(true);
};

const handleLogout = async () => {
  await removeUserData();
  setUserData(null);
  setIsAuthenticated(false);
};

return(
  <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated ,userData,saveLogin,handleLogout}}>
    <FitnessAppItems.Provider
    value={{
       completed,
       setCompleted,
       workout,
       setWorkout,
       calories,
       setCalories,
       minutes,
       setMinutes,
       
          }}
    >
      {children}


    </FitnessAppItems.Provider>
    </AuthContext.Provider>
)


}



export {FitnessAppContext,FitnessAppItems,AuthContext}