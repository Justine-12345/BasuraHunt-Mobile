import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { HStack } from 'native-base';
import { SimpleLineIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage"
import { findEmail } from "../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';
import { login, clearErrors } from "../../Redux/Actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Styles from "../../stylesheets/styles";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';



const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [expoPushToken, setExpoPushToken] = useState('');
    const { loading: authLoading, isAuthenticated, error: authError, user: authUser } = useSelector(state => state.auth);


    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("TokenLogin", token);
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

        return token;
    }

    useFocusEffect(
        useCallback(() => {
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            if (authError) {
                Toast.show({
                    type: 'error',
                    text1: authError,
                    text2: 'Something went wrong, please try again later'
                });
                dispatch(clearErrors())
            }
            let userInfo = {
                user: {},
                isAuthenticated: ''
            }
            AsyncStorage.multiGet(['user', 'isAuthenticated'], (err, stores) => {
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let val = store[i][1];
                    userInfo[key] = val
                });

                if (userInfo.isAuthenticated) {
                    if (JSON.parse(userInfo.user).otp_status === "Verified") {
                        if (JSON.parse(userInfo.user).role === "user" || JSON.parse(userInfo.user).role === "newUser") {
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
                        navigation.navigate('OTP')
                    }
                }

            });

        }, [authError, isAuthenticated]))

    const loginHandle = () => {
        if (!email || email === '') {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please enter correct email'
            });
        } else if (!password || password === '') {
            Toast.show({
                type: 'error',
                text1: 'Invalid Password',
                text2: 'Please enter correct password'
            });
        } else {
            // console.log(email, password)
            dispatch(login(email, password, expoPushToken))
        }
    }



    return (
        <>
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('About')} style={{ position: "relative", top: -15 }}>
                    <SimpleLineIcons name="info" size={24} color="#757575" style={{ marginHorizontal: 8, alignSelf: "flex-end" }} />
                </TouchableOpacity>
                <Image

                    source={require("../../assets/BasuraHunt-logo.png")}
                    // resizeMode="center"
                    style={Styles.logo}
                />
                <Text style={Styles.title}>BasuraHunt</Text>
            </View>
            <Text style={[Styles.text0, Styles.text1]}>Login</Text>

            <TextInput editable={!authLoading} onChangeText={(email_value) => setEmail(email_value)} placeholder="Email" style={Styles.textInput} />
            <TextInput editable={!authLoading} onChangeText={(password_value) => setPassword(password_value)} placeholder="Password" secureTextEntry={true} style={Styles.textInput} />

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={Styles.touchable}>
                <Text style={Styles.text0}>Forgot Password?</Text>
            </TouchableOpacity>

            {authLoading ?
                <View style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}><ActivityIndicator size="large" color="#00ff00" /></Text>
                </View> :
                <TouchableOpacity onPress={loginHandle} style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}>Login</Text>
                </TouchableOpacity>
            }

            {/* <Text onPress={() => navigation.navigate('OTP')}>OTP</Text> */}
            <HStack style={{ alignSelf: "center" }}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Register')} style={[Styles.text0, { marginStart: 5 }]}>Sign up</Text>
                </TouchableOpacity>
            </HStack>
        </>
    )
}

export default Login;