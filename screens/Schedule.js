// ScheduleScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Modal, TextInput, Platform, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { createWorkout } from '../services/workoutService';
import { getFitnesPrograms } from '../services/fitnessProgramService';
import { getWorkoutsByUser } from '../services/workoutService';
import { AuthContext } from '../Context';
import moment from 'moment-timezone';
const ScheduleScreen = () => {
  
  const [selectedDate, setSelectedDate] = useState('');
  const [workouts, setWorkouts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', date: new Date(), time: new Date(),programId:'' });
  const [markedDates, setMarkedDates] = useState({});
   const [workoutsAvailable, setWorkoutsAvailable] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const{userData}=useContext(AuthContext);
  const today = new Date();
  const formatTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and format to 2 digits
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Get minutes and format to 2 digits
    return `${hours}:${minutes}:${seconds}`; // Return formatted time
  };
  const  addWorkout = async () => {
   // const result =  createWorkout(userData.id)
   const selectedDate = moment(newWorkout.date).tz('Europe/Belgrade').startOf('day').format('YYYY-MM-DD'); // Set to start of the day
  const formattedTime = formatTimeFromTimestamp(newWorkout.time);

   
  console.log(userData.id,newWorkout.programId,newWorkout.name,selectedDate,formattedTime)
    const result=await createWorkout(userData.id,newWorkout.programId,newWorkout.name,selectedDate,formatTimeFromTimestamp(newWorkout.time));
    

  
      if (result.success) 
        {
           Alert.alert('Success', result.message, [{ text: 'OK' }]); // Show success message
            // Convert to 'YYYY-MM-DD'
             const workoutDate = moment(newWorkout.date).tz('Europe/Belgrade').startOf('day').format('YYYY-MM-DD');
        if (!workouts[workoutDate]) {
          workouts[workoutDate] = [];
        }
    
        // Add new workout with name and time for the selected date
        workouts[workoutDate].push({
          name: newWorkout.name,
          time: newWorkout.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
    
        // Mark the date in the calendar
        setMarkedDates({
          ...markedDates,
          [workoutDate]: {
            marked: true,
            dotColor: 'blue',
            customStyles: {
              container: { backgroundColor: '#e6ffe6' },
              text: { color: 'blue', fontWeight: 'bold' }
            }
          },
        });
    
        // Reset inputs and close modal
        setWorkouts({ ...workouts });
        setNewWorkout({ name: '', date: new Date(), time: new Date() });
        setModalVisible(false);
      } else {
        Alert.alert('Scheduling Failed', result.message, [{ text: 'OK' }]); // Show error message
      }
  
   
  }

  const handleDayPress = (day) => {
    const workoutDate = day.dateString;
    console.log(workoutDate)
  
        if (workouts[workoutDate]) {
      setSelectedDate(workoutDate);
      setWorkoutModalVisible(true); // Open modal with workouts for the selected date
    }
  };
  const groupWorkoutsByDate = (workoutsArray) => {
    const workoutsByDate = {};
  
    workoutsArray.forEach((workout) => {
      const workoutDate = new Date(workout.date).toISOString().split('T')[0]; // Ensure date is formatted as 'YYYY-MM-DD'
  
      if (!workoutsByDate[workoutDate]) {
        // If the date key doesn't exist, create a new array
        workoutsByDate[workoutDate] = [];
      }
  
      // Push the workout to the array for that date
      workoutsByDate[workoutDate].push(workout);
    });
  
    return workoutsByDate;  // This will return an object grouped by date
  };

  const renderWorkout = ({ item }) => (
    <View style={styles.workout}>
      <Text>{item.name}</Text>
      <Text>{item.time}</Text>
    </View>
  );

  const renderWorkoutListItem = ({ item }) => (
    <View style={styles.workoutListItem}>
      <Text>{`${item.date}: ${item.name} at ${item.time}`}</Text>
    </View>
  );

  const allWorkouts = Object.keys(workouts).flatMap((date) =>
    Array.isArray(workouts[date]) ? 
      workouts[date].map((workout) => ({
        date,
        ...workout,
      })) 
      : [] // If it's not an array, return an empty array to avoid errors
  );
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await getFitnesPrograms();

        
        setWorkoutsAvailable(response);  // Store the fetched workouts in statee
        console.log(response)
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch workouts');
      }
    };
    const fetchWorkoutsByUser = async () => {
      try {
        const response = await getWorkoutsByUser(userData.id);
        response.forEach((workout) => {
          const formattedDate = moment(workout.date).format('YYYY-MM-DD'); // Make sure it's in 'YYYY-MM-DD' format
          workout.date=formattedDate
        }
      );
    
      
        setWorkouts(groupWorkoutsByDate(response))
        const datesToMark = {};
      
        response.forEach((workout) => {
          const formattedDate = moment(workout.date).format('YYYY-MM-DD'); // Make sure it's in 'YYYY-MM-DD' format
          datesToMark[formattedDate] = {
            marked: true,
            dotColor: 'blue',
            customStyles: {
              container: { backgroundColor: '#e6ffe6' },
              text: { color: 'blue', fontWeight: 'bold' }
            }
          };
        }
      );


console.log("Dates",datesToMark)
        setMarkedDates(datesToMark);
     // Store the fetched workouts in state
        console.log("Workouts for this user ",response);
      } catch (error) {
     
      }
    };

    fetchWorkoutsByUser();

    fetchWorkouts();

  
  }, [userData.id]); 
  return (
    <View style={styles.container}>
      {/* Calendar occupying half the screen */}
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          markingType={'custom'}
          style={styles.calendar}
        />
      </View>

      {/* Button to Add Workout */}
      <Button title="Add New Workout" onPress={() => setModalVisible(true)} />

      {/* List of All Workouts */}


      <Text style={styles.allWorkoutsTitle}>All Workouts:</Text>
      {allWorkouts.length==0 ? <Text>You do not have scheduled workouts!</Text> : <></>}
      <FlatList
        data={allWorkouts}
        renderItem={renderWorkoutListItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal to Add New Workout */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
        <Text style={styles.label}>Select a Workout:</Text>
        <Picker
            selectedValue={newWorkout.name}
            onValueChange={(itemValue) => {
              const selectedWorkout = workoutsAvailable.find((workout) => workout.id === itemValue);  // Find workout by id
              setNewWorkout({ ...newWorkout, name:selectedWorkout.naziv,programId:itemValue });  // Update name with label
            }}
            
            style={styles.picker}
          >
            {workoutsAvailable.map((workout) => (
              <Picker.Item key={workout.id} label={workout.naziv} value={workout.id} />
            ))}
          </Picker>
          {/* Button to show Date Picker */}
          <Text style={styles.label}>Select date of workout:</Text>
          <View style={{margin:10}}>
         
          <Button
            title={`Pick Date: ${newWorkout.date.toDateString()}`}
            onPress={() => setShowDatePicker(true)}
          />
          </View>

          {/* Button to show Time Picker */}
          <Text style={styles.label}>Select time of a Workout:</Text>
          <View style={{margin:10}}>

          <Button 
            title={`Pick Time: ${newWorkout.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            onPress={() => setShowTimePicker(true)}
          />
          </View>
         

          {/* Show Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={newWorkout.date}
              minimumDate={today}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setNewWorkout({ ...newWorkout, date: selectedDate });
                }
              }}
            />
          )}

          {/* Show Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={newWorkout.time}
              mode="time"
            
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setNewWorkout({ ...newWorkout, time: selectedTime });
                }
              }}
            />
          )}
 <View style={{margin:10}}>

          <Button title="Add Workout" onPress={addWorkout} />
          </View>
          <View style={{margin:10}}>

          <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
        </View>
      </Modal>

      {/* Modal to show specific workouts for a date */}
      <Modal visible={workoutModalVisible} animationType="slide" onRequestClose={() => setWorkoutModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Workouts for {selectedDate}</Text>
          <FlatList
            data={workouts[selectedDate]}
            renderItem={renderWorkout}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Close" onPress={() => setWorkoutModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    height: '50%', // Half the screen height
    justifyContent: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  workout: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  modalContent: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  allWorkoutsTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  workoutListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;
