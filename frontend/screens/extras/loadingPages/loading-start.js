import React, { useState, useEffect, useCallback, useRef } from "react";
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { HStack } from "native-base";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { useNotifications } from "../../../hooks/useNotifications";
import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { Platform } from 'react-native';


var { width } = Dimensions.get("window");

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });


export default function LoadingStart({ navigation }) {


//   const [notification, setNotification] = useState(false);
//   const [not, setNot] = useState()
//   const notificationListener = useRef();
//   const responseListener = useRef();
//  const lastNotificationResponse = Notifications.useLastNotificationResponse();


  // useEffect(() => {
   
  //   // navigation.navigate("Main",{screen:"Schedule"})
    
  // }, [lastNotificationResponse]);



  // useEffect(() => {

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     console.log("notification", notification);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log("response",response);
  //     // navigation.navigate(`${response.notification.request.content.data}`)

  //     // const screen = response.notification.request.content.data.screen
  //     // let message
  //     // if (response.notification.request.content.data.message) {
  //     //   message = response.notification.request.content.data.message
  //     // }
  //     // if (screen === 'SchedNotifView') {
  //     //   navigation.navigate('Schedule', { screen: 'TodaySchedNav', params: { screen: 'SchedNotifView', params: { title:message } } })
  //     // }
  //   });

  //   // return () => {
  //   //   Notifications.removeNotificationSubscription(notificationListener.current);
  //   //   Notifications.removeNotificationSubscription(responseListener.current);
  //   // };
  // });


  useFocusEffect(
    useCallback(() => {


      let token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          token = res
        })
        .catch((error) => console.log(error))
  



      let userInfo = {
        user: {},
        isAuthenticated: ''
      }
      AsyncStorage.multiGet(['user', 'isAuthenticated', 'jwt'], (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let val = store[i][1];
          userInfo[key] = val
        });

        if (userInfo.isAuthenticated) {


          if (JSON.parse(userInfo.user).otp_status === "Verified") {

            if (JSON.parse(userInfo.user).role === "user") {




              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Main' }
                  ],
                })
              );
              navigation.navigate('Main')



            } else if (JSON.parse(userInfo.user).role === "garbageCollector") {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'HomeCollectorNav' }
                  ],
                })
              );
              navigation.navigate('HomeCollectorNav')
            } else {
              AsyncStorage.clear()
              Toast.show({
                type: 'error',
                text1: 'Denied',
                text2: 'Access has been denied to this account'
              });
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Login' }
                  ],
                })
              );
              navigation.navigate('Login')
            }


          } else if (JSON.parse(userInfo.user).otp_status === "Fresh") {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'OTP' }
                ],
              })
            );
            navigation.navigate('OTP')
          }



        } else {

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Login' }
              ],
            })
          );
          navigation.navigate('Login')

        }

      });



    }))


  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo-green.png")}
        style={styles.logo}
      />
      <HStack>
        <Skeleton style={styles.dot} LinearGradientComponent={LinearGradient} animation="pulse" />
        <Skeleton style={styles.dot} LinearGradientComponent={LinearGradient} animation="pulse" />
        <Skeleton style={styles.dot} LinearGradientComponent={LinearGradient} animation="pulse" />
      </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  logo: {
    height: 80,
    width: 80,
  },
  dot: {
    width: 10,
    height: 10,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#1E5128"
  }
})




