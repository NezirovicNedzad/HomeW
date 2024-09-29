import { View, Text,Button,StyleSheet,ScrollView, Image, Pressable} from 'react-native'
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FitnessAppItems } from '../Context';
import { API_BASE, API_BASE_GIF } from '../config/config';

function WorkoutScreen  ({navigation})  {

  
const route=useRoute();



const {
  completed,
  setCompleted,
 
} = useContext(FitnessAppItems);




  useEffect(() => {
    // Hide the Drawer header when this screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({ 
        headerShown: false,
        swipeEnabled: false, }); // Hide Drawer header
    });
console.log("Vezbe: ",route.params.excersises)
    // Show the Drawer header again when leaving this screen
    return () => {
      navigation.getParent()?.setOptions({ headerShown: true,swipeEnabled: true,  }); // Show Drawer header
      unsubscribe();
    };
    
  }, [navigation]);



  return (
    <>
 <ScrollView style={{backgroundColor:"white",marginTop:20}}>
    <View style={styles.container}>
      <Image style={{width:'100%',height:170}} source={{uri:route.params.image}}/>
      <Ionicons onPress={()=>navigation.goBack()} style={{position:"absolute",top:15,left:20}} name="arrow-back-outline" size={24} color="white"/>
      {route.params.excersises.map((item,index)=>(

        <Pressable style={{margin:10,flexDirection:"row",alignItems:"center"}} key={index}>
        <Image style={{width:90,height:90}} source={{uri:`${API_BASE_GIF}/${item.image}`}}/>
         <View style={{padding:5}}>
          <Text style={{fontSize:17,fontWeight:"bold",width:170}}>{item.name}</Text>
          <Text style={{marginTop:4,fontSize:18,color:"gray"}}>x{item.sets}</Text>
         </View>

         {completed.includes(item.name) ?  (
          <AntDesign style={{marginLeft:40}} name="checkcircle" size={24} color="green"/>
         ) :
         (

null
         )}
        
        </Pressable>
      ))}
      
      
      
    
    </View>
    </ScrollView>
    <Pressable onPress={()=>{navigation.navigate("Fit",{

      excersises:route.params.excersises
    })
    setCompleted([]);
    }} style={{backgroundColor:"blue",padding:10,marginLeft:"auto",marginRight:"auto",marginVertical:20,width:120,borderRadius:6}}>
      <Text style={{textAlign:"center",color:"white",fontSize:15,fontWeight:"600"}}>START</Text>
    </Pressable>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30, // Add margin around the View
    
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
});

export default WorkoutScreen