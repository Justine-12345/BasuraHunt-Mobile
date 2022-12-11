import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

import { getPushDataObject } from 'native-notify'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from 'react-native-toast-message';
import { useFocusEffect, CommonActions } from "@react-navigation/native";


var { width } = Dimensions.get("window");


export default function IntroLoading({ navigation }) {

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
        // console.log(userInfo);
        if (userInfo.isAuthenticated) {
          if (JSON.parse(userInfo.user).otp_status === "Verified") {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'Main' }
                ],
              })
            );

            navigation.navigate('Main')
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
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Loading .....</Text>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>


    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E5128",
    paddingVertical: 30,
    marginBottom: 30
  },
  logo: {
    height: width / 3,
    width: width / 3,
    alignSelf: "center",

  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    alignSelf: "center"
  },
  text0: {
    color: "#1E5128",
    textAlign: "center"
  },
  text1: {
    fontSize: 25,
    fontWeight: "bold"
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#1E5128",
    fontSize: 20,
    margin: 20
  },
  loginBtn: {
    backgroundColor: "#1E5128",
    width: 200,
    padding: 5,
    borderRadius: 10,
    alignSelf: "center",
    margin: 30,
  },
  login: {
    color: "white",
    textAlign: "center",
    fontSize: 20
  }
})