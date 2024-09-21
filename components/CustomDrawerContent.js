// CustomDrawerContent.js
import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, View, Text,StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context';
export default function CustomDrawerContent(props) {
  const {top,bottom}=useSafeAreaInsets();  
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // Remove token from AsyncStorage
      setIsAuthenticated(false); // Update the context state
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 9 }}>
     <View >
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../assets/workout-images/W1.jpg')} // Replace with your image URL or local image
          style={{ width:200, height: 100 }} // Styling the image (circular avatar)
        />
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}> Start with us!</Text>
      </View>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} >
      
       

      <Ionicons name="log-out-outline" size={25} color="black" style={styles.icon} />
      <Text style={styles.logoutText}>Logout</Text>
     
      
        </TouchableOpacity>
      <View style={{flex:1}}></View>
      <View style={[styles.footer]} >
        <Text style={styles.footerText}>Powered by NN</Text>
        <Text style={styles.footerText}>© 2024</Text>
      </View>
    </DrawerContentScrollView>
  );
}



const styles = StyleSheet.create({
  
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,

    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
  },
  logoutButton: {
    paddingTop:10,
    paddingLeft:20,
    flexDirection: 'row',
    borderRadius: 5,
  },
  logoutText: {
   paddingLeft:25
  },
});