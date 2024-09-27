import React, { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const NotificationHandler = () => {
    const navigation = useNavigation();
    const [hasHandledInitialNotification, setHasHandledInitialNotification] = useState(false);
    useEffect(() => {

        const handleNotificationResponse = async (response) => {
       
          const workoutName = response.notification.request.content.data.workoutName;
            if (workoutName) {
              // Navigate to the WorkoutDetail screen
              navigation.navigate('Workout-Schedule', { workoutName });
             
            }
          
          };
      
          const subscription = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
      
          // Check if the app was opened by a notification
          const checkInitialNotification = async () => {
            const response = await Notifications.getLastNotificationResponseAsync();
            if (response) {
              handleNotificationResponse(response);
            }
          };
      
          checkInitialNotification();
      
    

        return () => subscription.remove(); // Clean up the subscription
    }, [navigation]);

    return null; // This component doesn't render anything
};

export default NotificationHandler;
