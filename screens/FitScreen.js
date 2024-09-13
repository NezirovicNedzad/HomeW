import { View, Text,SafeAreaView,Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { FitnessItems } from '../Context';

const FitScreen = ({navigation}) => {
      
const route=useRoute();

const [index,setIndex]=useState(0);

const excersise=route.params.excersises;
const current=excersise[index];

const {
  completed,
  setCompleted,
  minutes,
  setMinutes,
  calories,
  setCalories,
  setWorkout,
  workout,
} = useContext(FitnessItems);



  return (
    <SafeAreaView>
        <View style={{marginTop:30}}>
      <Image style={{width:"100%",height:370}} source={{uri:current.image}}/>
      <Text style={{marginLeft:"auto",marginRight:"auto",marginTop:30,fontSize:30,fontWeight:"bold"}}>{current.name}</Text>
      <Text style={{marginLeft:"auto",marginRight:"auto",marginTop:30,fontSize:38,fontWeight:"bold"}}>x{current.sets}</Text>

{index+1 >=excersise.length ? (

    
<Pressable onPress={
    ()=>{navigation.navigate("HomeScreen")
          setTimeout(()=>{
          setIndex(index+1);
       },2000)
    }} 
  
  
  style={{backgroundColor:"blue",marginLeft:"auto",marginRight:"auto",marginTop:20,borderRadius:20,padding:10,width:150}}>
    <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold",color:"white"}}>Done</Text>
  </Pressable>
) : (
    
    <Pressable onPress={
        ()=>{
          navigation.navigate("Rest")
          setCompleted([...completed,current.name])
            setWorkout(workout+1);
            setMinutes(minutes+2.5);
            setCalories(calories+6.2);
              setTimeout(()=>{
              setIndex(index+1);
           },2000)
        }} 
      
      
      style={{backgroundColor:"blue",marginLeft:"auto",marginRight:"auto",marginTop:20,borderRadius:20,padding:10,width:150}}>
        <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold",color:"white"}}>Done</Text>
      </Pressable>
)}


    

      <Pressable style={{flexDirection:"row",alignItems:"center",marginLeft:"auto",marginRight:"auto",marginTop:50}}>

        <Pressable disabled={index===0} onPress={()=>{
            navigation.navigate("Rest");
            setTimeout(()=>{
                setIndex(index-1);
            },2000)
        }} style={{backgroundColor:"green",padding:10,borderRadius:20,marginHorizontal:20,width:100}} >
            <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>PREV</Text>
        </Pressable>
        {index+1 >=excersise.length ?(
            <Pressable 
            onPress={()=>{navigation.navigate("HomeScreen") }}  style={{backgroundColor:"green",padding:10,borderRadius:20,marginHorizontal:20,width:100}}>
            <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>SKIP</Text>
        </Pressable>
        ):(

            <Pressable onPress={
                ()=>{navigation.navigate("Rest")
                      setTimeout(()=>{
                      setIndex(index+1);
                   },2000)
                }}  style={{backgroundColor:"green",padding:10,borderRadius:20,marginHorizontal:20,width:100}}>
            <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>SKIP</Text>
        </Pressable>
        )}
        
      </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default FitScreen