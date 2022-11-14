import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { HStack } from 'native-base';

import AsyncStorage from "@react-native-async-storage/async-storage"
import { findEmail } from "../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';
import { login, clearErrors } from "../../Redux/Actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, CommonActions } from "@react-navigation/native";

var { width } = Dimensions.get("window");

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
            isAuthenticated:''
        }
        AsyncStorage.multiGet(['user', 'isAuthenticated'], (err, stores) => {
            stores.map((result, i, store) => {
              let key = store[i][0];
              let val = store[i][1];
            userInfo[key] = val
            });

            if(userInfo.isAuthenticated){
                if(JSON.parse(userInfo.user).otp_status === "Verified"){
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'Main' }
                          ],
                        })
                      );

                    navigation.navigate('Main')
                }else if(JSON.parse(userInfo.user).otp_status === "Fresh"){
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
            <View style={styles.container}>
                <Image

                    source={require("../../assets/BasuraHunt-logo.png")}
                    // resizeMode="center"
                    style={styles.logo}
                />
                <Text style={styles.title}>BasuraHunt</Text>
            </View>
            <Text style={[styles.text0, styles.text1]}>Login</Text>

            <TextInput editable={!authLoading} onChangeText={(email_value) => setEmail(email_value)} placeholder="Email" style={styles.textInput} />
            <TextInput editable={!authLoading} onChangeText={(password_value) => setPassword(password_value)} placeholder="Password" secureTextEntry={true} style={styles.textInput} />

            <Text style={styles.text0}>Forgot Password?</Text>

            {authLoading ?
                <View onPress={loginHandle} style={styles.loginBtn} activeOpacity={0.8}>
                    <Text style={styles.login}><ActivityIndicator size="large" color="#00ff00" /></Text>
                </View> :
                <TouchableOpacity onPress={loginHandle} style={styles.loginBtn} activeOpacity={0.8}>
                    <Text style={styles.login}>Login</Text>
                </TouchableOpacity>
            }

            {/* <Text onPress={() => navigation.navigate('OTP')}>OTP</Text> */}
            <HStack style={{ alignSelf: "center" }}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Register')} style={[styles.text0, { marginStart: 5 }]}>Sign up</Text>
                </TouchableOpacity>
            </HStack>
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

export default Login;