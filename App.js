
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigation from './components/DrawerNavigation';
import { FitnessContext } from './Context';


export default function App() {


  return (
    <FitnessContext>
    <SafeAreaProvider>
      
    <DrawerNavigation/>
    </SafeAreaProvider>
    </FitnessContext>
  );
}


