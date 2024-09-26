import * as Notifications from 'expo-notifications';


// Request notification permissions
export async function requestNotificationPermission() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Permission for notifications was denied.');
  }
}

// Schedule notification
export async function scheduleNotification(workoutName, date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Workout Reminder',
      body: `Don't forget your workout: ${workoutName}`,
    },
    trigger: { date },
  });
}
