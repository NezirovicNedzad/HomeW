// components/WorkoutItem.js
import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutItem = ({ name, date, time,difficulty ,image,navigation,exercises,programId}) => {
  
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    
      const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const containerStyle = [
        styles.container,
        formattedDate === today && { backgroundColor: '#d3f9d8' }, // Light green background
      ];
  return (
    <View style={containerStyle}>
        <View style={{display:'flex',flexDirection:'row'}}>

        <Text style={styles.name}>{name}</Text>
       {formattedDate===today && <Text style={{flex:1,textAlign:'right'}} >Workout is today!</Text>}
        
        </View>
        <Text style={styles.date}>Level: {difficulty}</Text>
    
      <Text style={styles.date}>Date: {formattedDate}</Text>
      <Text style={styles.time}>Time: {formattedTime}</Text>
    
      {formattedDate === today && (
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Workout',
                    {
                      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEM-6gDUO7g1cdrNhBaqk_0nwxy6ILlIqsQ&usqp=CAU",
                      excersises:exercises,
                       id:programId
                    }
                    )}
              >
                <Text style={styles.buttonText}>To Workout</Text>
              </TouchableOpacity>
            )}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  name2: {
    fontSize: 17,
    fontWeight: '400',
    paddingTop:1,
    paddingBottom:1,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  time: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745', // Green color for the button
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WorkoutItem;
