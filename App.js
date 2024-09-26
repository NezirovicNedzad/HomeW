
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigation from './components/DrawerNavigation';
import { FitnessAppContext,AuthContext } from './Context';

import AuthStack from './components/AuthStack';
import NotificationHandler from './components/NotificationHandler';



export default function App() {


  return (
    <FitnessAppContext>
       
    <SafeAreaProvider>
    <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            isAuthenticated ? <DrawerNavigation >

            </DrawerNavigation> : <AuthStack/>
          )}
           
        </AuthContext.Consumer>
       
    </SafeAreaProvider>
    </FitnessAppContext>
  );
}


