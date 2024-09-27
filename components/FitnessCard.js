import { Pressable, StyleSheet, Text, View ,Image, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import fitness from '../data/fitness'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getProgramsByDifficulty } from '../services/fitnessProgramService'

const FitnessCard = ({difficulty}) => {

     const FitnessData=fitness;
     const navigation = useNavigation();
     const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
     useEffect(() => {
      const fetchInitialPrograms = async () => {
        setLoading(true);
        try {
          const data = await getProgramsByDifficulty(difficulty);
          
          setResults(data);
          setError('');
        } catch (err) {
          setError('No programs found for the initial selection');
          setResults([]);
        }
        setLoading(false);
      };
  
      fetchInitialPrograms();
   
    }, [difficulty]);
  
  return (
    <View style={{marginTop:0}}>
       {loading ? (
        <ActivityIndicator style={{marginTop:10}} size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (


        results.map((item,key)=>(

          <Pressable  onPress={() => navigation.navigate('Workout',
          {
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEM-6gDUO7g1cdrNhBaqk_0nwxy6ILlIqsQ&usqp=CAU",
            excersises:item.exercises,
             id:item.id
          }
          )} style={{alignItems:"center",justifyContent:"center",margin:10}} key={key}>
  
              <Image style={{width:"100%",height:140,borderRadius:7}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEM-6gDUO7g1cdrNhBaqk_0nwxy6ILlIqsQ&usqp=CAU"}} />
              <Text style={{position:"absolute",color:"white",fontSize:16,fontWeight:"bold",left:20,top:20,textTransform:"uppercase"}}>{item.name} {difficulty}</Text>
              <Text style={{position:"absolute",color:"white",fontSize:16,fontWeight:"500",left:20,top:45,textTransform:"uppercase"}}> {item.exercises.length} EXERCISES</Text>
              
              {difficulty =='beginner' ? 
              <MaterialCommunityIcons style={{position:"absolute",color:"white",bottom:15,left:10}} name="lightning-bolt" size={24} color="black"/>
               : difficulty=='intermediate' ? <>
               <MaterialCommunityIcons style={{position:"absolute",color:"white",bottom:15,left:10}} name="lightning-bolt" size={24} color="black"/>
               <MaterialCommunityIcons style={{position:"absolute",color:"white",bottom:15,left:30}} name="lightning-bolt" size={24} color="black"/>
               
               </> : <>
               <MaterialCommunityIcons style={{position:"absolute",color:"white",bottom:15,left:10}} name="lightning-bolt" size={24} color="black"/>
               <MaterialCommunityIcons style={{position:"absolute",color:"white",bottom:15,left:30}} name="lightning-bolt" size={24} color="black"/>
               <MaterialCommunityIcons style={{position:"absolute",color:"white",bottom:15,left:50}} name="lightning-bolt" size={24} color="black"/>
               </>}
              
          </Pressable>
         
        
        ))

      )}
      {}
      
    </View>
  )
}

export default FitnessCard

const styles = StyleSheet.create({})