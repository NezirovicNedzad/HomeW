import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '../config/config';

const AddProgramScreen = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [tip, setTip] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatus, setImageStatus] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image Picker Result:', result); // Log the result for debugging

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Ensure to use result.assets[0].uri
      setImageStatus('Image selected successfully!'); // Update status
    } else {
      setImageStatus('No image selected.'); // Update status if cancelled
    }
  };

  const handleAddProgram = async () => {
    console.log('Selected Image URI:', selectedImage); // Log the selected image URI

    if (!selectedImage) {
      Alert.alert('Please select an image.'); // Alert if no image selected
      return;
    }

    const formData = new FormData();
    formData.append('naziv', naziv);
    formData.append('opis', opis);
    formData.append('tip', tip);

    // Extract image extension for the file name and MIME type
    const imageUriParts = selectedImage.split('.');
    const imageExtension = imageUriParts[imageUriParts.length - 1];

    formData.append('slika', {
      uri: selectedImage,
      name: `image.${imageExtension}`,
      type: `image/${imageExtension}`,
    });
    console.log("Form Data Parts:");
    console.log(formData)
    try {
      const response = await axios.post(`${API_URL}/FitnessProgram`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Program added successfully!');
      // Reset form fields
      setNaziv('');
      setOpis('');
      setTip('');
      setSelectedImage(null);
      setImageStatus(''); // Reset image status after successful upload
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add program: ' + (error.response?.data?.message || error.message));
      setImageStatus(''); // Reset image status on error
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Program Name"
        value={naziv}
        onChangeText={setNaziv}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Description"
        value={opis}
        onChangeText={setOpis}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Type"
        value={tip}
        onChangeText={setTip}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, marginTop: 20 }}
          resizeMode='cover'
        />
      )}
      <Text style={{ marginTop: 10 }}>
        {imageStatus} {/* Display image status */}
      </Text>
      <Button title="Add Program" onPress={handleAddProgram} />
    </View>
  );
};

export default AddProgramScreen;
