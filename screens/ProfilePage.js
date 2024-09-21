import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { View, Text,StyleSheet,Button } from 'react-native';
import { AuthContext } from '../Context';

export default function ProfileScreen() {
  const { setIsAuthenticated,userData } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Clear authentication-related data from AsyncStorage
      await AsyncStorage.removeItem('userData'); // Assuming token is stored under 'token'
      
      // Update the context to reflect logout
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>


      <Text>Email:{userData.email}</Text>
      
      <Text>Username:{userData.username}</Text>
      <Text>Role:{userData.role}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});