import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet,Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '../config/config';
  // Still using expo-image for displaying GIFs

const AddExerciseScreen = ({navigate}) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${API_URL}fitnessprogram`);  // Replace with your actual endpoint
        setPrograms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  const pickGif = async () => {
  
      let result = await DocumentPicker.getDocumentAsync({
        type: 'image/gif',
      });
    
      if (!result.canceled && result.assets.length > 0) { // Check if not canceled and has assets
        const gifUri = result.assets[0].uri;
        setSelectedImage({ uri: gifUri });
        console.log("Selected GIF:", result.assets[0]);
      } else {
        console.log("Failed to select GIF");
      }
    
  };

  const handleSubmit = async () => {
    if (!name || !sets || !duration || !description || !selectedImage || !selectedProgram) {
      alert('Please fill out all fields and select a program and GIF!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name); // Ensure correct casing
  formData.append('sets', sets);
  formData.append('durationInMinutes', duration);
  formData.append('description', description);
  formData.append('programId', selectedProgram);
  
  if (selectedImage) {
    formData.append('image', {
      uri: selectedImage.uri,
      name: selectedImage.name || 'exercise.gif', // You can use the original name or 'exercise.gif'
      type: selectedImage.mimeType || 'image/gif', // Ensure the correct MIME type
    });
  }

    setUploading(true);
   

    try {
      const response = await axios.post(
        `${API_URL}excersise`,  // Replace with your API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        alert('Exercise added successfully!');
        setName('');
        setSelectedImage(null);
        setDescription('')
        setSets('')
        setDuration('')
       
      }
    } catch (error) {
   
  // Check if the error has a response
  if (error.response) {
    console.error('Error Response:', error.response.data);
    if (error.response.status === 400) {
      // Handle the BadRequest response
      console.log('Bad Request Message:', error.response.data.message);
    }
  } else if (error.request) {
    console.error('Error Request:', error.request);
  } else {
    console.error('Error Message:', error.message);
  }



    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Exercise Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sets"
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Text>Select a Program</Text>
      <Picker
        selectedValue={selectedProgram}
        onValueChange={(itemValue) => setSelectedProgram(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a program" value="" />
        {programs.map((program) => (
          <Picker.Item key={program.id} label={program.naziv+' '+program.tip} value={program.id} />
        ))}
      </Picker>

      <Button title="Pick a GIF" onPress={pickGif} />

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.imagePreview}
          contentFit="contain"
          transition={1000}
        />
      )}

      <Button title={uploading ? 'Uploading...' : 'Add Exercise'} onPress={handleSubmit} disabled={uploading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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

export default AddExerciseScreen;
