import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import WorkoutScreen from '../screens/WorkoutScreen';
import FitScreen from '../screens/FitScreen';
import RestScreen from '../screens/RestScreen';
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator  >
      <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="Workout" component={WorkoutScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="Fit" component={FitScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="Rest" component={RestScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;