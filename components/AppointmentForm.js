import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export const AppointmentForm = ({ onAddAppointment }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const handleAddAppointment = () => {
    onAddAppointment({ title, time });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Appointment Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (e.g., 10:00 AM)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <Button title="Add Appointment" onPress={handleAddAppointment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
