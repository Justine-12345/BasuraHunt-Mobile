import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const useNotifications = () => {

    


    registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('To enable Notification, please make sure Notification (BasuraHunt) is enabled under Settings');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      };

      const handleNotification = notification => {

      };
    
      const handleNotificationResponse = (response) => {
        console.log(response);
      };

      return {registerForPushNotificationsAsync, handleNotification, handleNotificationResponse}
}