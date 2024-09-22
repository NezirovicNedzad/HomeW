import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { AuthContext } from '../Context';
import { handleLogin } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const[successMessage,setSuccessMessage]=useState('');
  const { setIsAuthenticated, saveLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const onLoginPress = async () => {
    const result = await handleLogin(email, password);
    if (result.success) {
      const userData = {
        id:result.data.id,
        username: result.data.username,
        email: result.data.email,
        name: result.data.name,
        surname: result.data.surname,
        dateOfBirth: result.data.dateOfBirth,
        role: result.data.role,
      };
      Alert.alert('Success', 'You have successfully logged in!', [{ text: 'OK' }]);
      await saveLogin(userData);
      console.log(result);
      setIsAuthenticated(true);
     
    } else {
     
      Alert.alert('Login Failed', result.error, [{ text: 'OK' }]);
      setErrorMessage(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="gray" style={styles.icon} /> 
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />  // Customize as needed
      ) : (
        <Button title="Login" onPress={onLoginPress} />
      )}
    
        </View>
   
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    alignItems: 'center', // Center contents
  },
  icon: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',  // Ensure inputs take full width
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
  buttonContainer:{
    width:'100%'
  }
  
});

export default LoginScreen;
