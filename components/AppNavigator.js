import { View, Text } from 'react-native'
import React from 'react'
import HomeStack from './StackNavigator';
import { useNavigationState } from '@react-navigation/native';
import Navigation from './DrawerNavigation';
const AppNavigator = () => {
    const routeName = useNavigationState((state) => state.routes[state.index]?.name);

    // Render the StackNavigator if the current route is ScreenTwo
    if (routeName === 'Workout') {
      return <Stack />;
    }
  
    return <Navigation />;
}

export default AppNavigator