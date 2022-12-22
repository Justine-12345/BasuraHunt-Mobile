import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { HStack } from 'native-base';

import AsyncStorage from "@react-native-async-storage/async-storage"
import { findEmail } from "../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';
import { login, clearErrors } from "../../Redux/Actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Styles from "../../stylesheets/styles";

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading: authLoading, isAuthenticated, error: authError, user: authUser } = useSelector(state => state.auth);

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
            dispatch(login(email, password))
        }
    }



    return (
        <>
            <View style={Styles.container}>
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
                <View onPress={loginHandle} style={Styles.loginBtn} activeOpacity={0.8}>
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