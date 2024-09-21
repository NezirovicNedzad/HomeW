
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigation from './components/DrawerNavigation';
import { FitnessAppContext,AuthContext } from './Context';
import { useContext } from 'react';
import AuthStack from './components/AuthStack';


export default function App() {
 

  return (
    <FitnessAppContext>
       
    <SafeAreaProvider>
    <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            isAuthenticated ? <DrawerNavigation /> : <AuthStack />
          )}
        </AuthContext.Consumer>
    </SafeAreaProvider>
    </FitnessAppContext>
  );
}


