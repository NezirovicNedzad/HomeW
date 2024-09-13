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
import NewsScreen from '../screens/News';
import CustomDrawerContent from './CustomDrawerContent';
import HomeStack from './StackNavigator';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation( ) {

  

 


  
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
          <Drawer.Screen name="Profile"
          options={{
            drawerLabel:'Profile',
            headerTitle:'My Profile',
            drawerIcon:({size,color})=>(
              <Ionicons name='person-outline' size={size} color={color}/>
            )        }}
          
          component={ProfileScreen} />
          
          <Drawer.Screen name="News"
          options={{
            drawerLabel:'News',
            headerTitle:'Newsfeed',
            drawerIcon:({size,color})=>(
              <Ionicons name='newspaper-outline' size={size} color={color}/>
            )        }}
          
          
          component={NewsScreen} />
      
        </Drawer.Navigator>


  </GestureHandlerRootView>
      </NavigationContainer>
  );
}
