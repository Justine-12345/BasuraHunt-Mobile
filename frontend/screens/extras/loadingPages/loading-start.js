import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { HStack } from "native-base";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { getPushDataObject } from 'native-notify'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

var { width } = Dimensions.get("window");

export default function LoadingStart({ navigation }) {

  let pushDataObject = getPushDataObject();
  let i = 1
  useFocusEffect(
    useCallback(() => {

      // if(pushDataObject.screenName){

      //   Toast.show({
      //     type: 'success',
      //     text1: pushDataObject.screenName,
      //     text2: 'Welcome To BasuraHunt, You can Log in Now'
      // });

      //  navigation.navigate(`${pushDataObject.screenName}`)

      // }


      let token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          token = res
        })
        .catch((error) => console.log(error))
      console.log(token)



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

          // For Notification
          if (i === 0) {

            Toast.show({
              type: 'success',
              text1: 'Register',
              text2: 'Welcome To BasuraHunt, You can Log in Now'
            });

            navigation.navigate('Register')
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