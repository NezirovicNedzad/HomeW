// ScheduleScreen.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Modal, TextInput, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const ScheduleScreen = () => {
  const availableWorkouts = ['Yoga', 'Running', 'Weightlifting', 'Cycling', 'Swimming'];
  const [selectedDate, setSelectedDate] = useState('');
  const [workouts, setWorkouts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', date: new Date(), time: new Date() });
  const [markedDates, setMarkedDates] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const today = new Date();
  const addWorkout = () => {
    const workoutDate = newWorkout.date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'

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
  };

  const handleDayPress = (day) => {
    const workoutDate = day.dateString;
    if (workouts[workoutDate]) {
      setSelectedDate(workoutDate);
      setWorkoutModalVisible(true); // Open modal with workouts for the selected date
    }
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
    workouts[date].map((workout) => ({
      date,
      ...workout,
    }))
  );

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
            onValueChange={(itemValue) => setNewWorkout({ ...newWorkout, name: itemValue })}
            style={styles.picker}
          >
            {availableWorkouts.map((workout) => (
              <Picker.Item key={workout} label={workout} value={workout} />
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
