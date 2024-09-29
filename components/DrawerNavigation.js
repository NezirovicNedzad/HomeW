import * as React from 'react';
import { View,Text,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/ProfilePage';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleScreen from '../screens/Schedule';
import CustomDrawerContent from './CustomDrawerContent';
import HomeStack from './StackNavigator';
import { useNavigation } from '@react-navigation/native';
import NotificationHandler from './NotificationHandler';
import { AuthContext } from '../Context';
import { useContext } from 'react';
import AddProgramScreen from '../screens/AddProgramScreen';
import AddExerciseScreen from '../screens/AddExercise';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation( ) {

  

 


  const {userData}=useContext(AuthContext)
    const {top,bottom}=useSafeAreaInsets();
  return (
    <NavigationContainer>
        <GestureHandlerRootView  style={{flex:1}}>    
        <Drawer.Navigator    drawerContent={(props) => <CustomDrawerContent {...props} />}  screenOptions={{drawerStyle:{


backgroundColor:"#dde3fe",
paddingTop:'60px',


          },
          drawerHideStatusBarOnOpen:true,
          drawerActiveBackgroundColor:'#5363df',
          drawerActiveTintColor:'#fff'

          
          }} initialRouteName="Home">   
          <Drawer.Screen name="Home" options={{
            drawerLabel:'Home',
            headerTitle:'Home',
            drawerIcon:({size,color})=>(
              <Ionicons name='home-outline' size={size} color={color}/>
            )        }} component={HomeStack} 
            listeners={({ navigation }) => ({
              drawerItemPress: () => {
                // Reset the stack when "Home" is pressed in the drawer
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                  })
                );
              },
            })}
            
            
            />
            {userData.role=='User' && <>
            
              <Drawer.Screen name="Profile"
          options={{
            drawerLabel:'Profile',
            headerTitle:'My Profile',
            drawerIcon:({size,color})=>(
              <Ionicons name='person-outline' size={size} color={color}/>
            )        }}
          
          component={ProfileScreen} />
          
          <Drawer.Screen name="Workout-Schedule"
          options={{
            drawerLabel:'Workout Schedule',
            headerTitle:'Workout Schedule',
            drawerIcon:({size,color})=>(
              <Ionicons name='calendar' size={size} color={color}/>
            )        }}
          
          
          component={ScheduleScreen} />
      
            </>}

            {userData.role=='Admin' && <>
            
            <Drawer.Screen name="AddProgram"
        options={{
          drawerLabel:'Add-Program',
          headerTitle:'Add-Program',
          drawerIcon:({size,color})=>(
            <Ionicons name='add-circle' size={size} color={color}/>
          )        }}
        
        component={AddProgramScreen} />
        
        <Drawer.Screen name="AddExcerises"
        options={{
          drawerLabel:'Add-Excerises',
          headerTitle:'Add-Excerises',
          drawerIcon:({size,color})=>(
            <Ionicons name='add-circle' size={size} color={color}/>
          )        }}
        
        
        component={AddExerciseScreen} />
    
          </>}
         
        </Drawer.Navigator>


  </GestureHandlerRootView>
  <NotificationHandler/>
      </NavigationContainer>
  );
}
