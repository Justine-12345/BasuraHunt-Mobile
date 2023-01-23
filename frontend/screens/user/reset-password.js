import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Styles from "../../stylesheets/styles";
import OtpInput from "../../stylesheets/otpInput";
import Form1 from "../../stylesheets/form1";
import { resetPassword } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CommonActions } from "@react-navigation/native";
import { FORGOT_PASSWORD_RESET } from "../../Redux/Constants/userConstants";
const ResetPassword = ({ navigation }) => {
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error, user } = useSelector(state => state.auth);
    const { loading: forgotPasswordLoading, message, success, error: forgotPasswordError } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [code, setCode] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [passwordMatchError, setPasswordMatchError] = useState(null)

    useEffect(() => {

        if (success) {
            dispatch({ type: FORGOT_PASSWORD_RESET })
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
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,30}$/

        if (password !== "" && passwordRegex.test(password) === false) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }

        if (confirmPassword !== password) {
            setPasswordMatchError(true)
        } else {
            setPasswordMatchError(false)
        }

    }, [password, confirmPassword, success])

    const submitHandler = () => {

        if (password === "") {
            Toast.show({
                type: 'error',
                text1: "Please Enter Your New Password",
            });
        }
        else if (confirmPassword === "") {
            Toast.show({
                type: 'error',
                text1: "Please Confirm Your Password",
            });
        }
        else if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: "Password Dont Match, Please Confirm Again",
            });
        }
        else if (passwordError === true || passwordError === null) {
            Toast.show({
                type: 'error',
                text1: "Password is to weak",
            });
        }
        else if (code === "" || code.length <= 5) {
            Toast.show({
                type: 'error',
                text1: "Enter the 6-digit code sent to your email",
            });
        }
        else {

            const formData = new FormData();
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            formData.append('ismobile', "true");
            dispatch(resetPassword(code, formData))
        }
    }




    return (
        <View style={Styles.container2}>
            <Text style={[Styles.text0, Styles.text1]}>Reset Password</Text>
            <Text style={[Styles.textI, { color: "grey", padding: 20, textAlign: "center" }]}>Enter the 6-digit code sent to your email lorem@gmail.com</Text>

            <View style={Form1.otpContainer}>
                <OtpInput
                    numberOfInput={6}
                    setOtpCode={setCode}
                />
            </View>

            <Text style={Form1.formContainer}>
                {passwordError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}>Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                {passwordError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}>Approved <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
            </Text>
            <TextInput value={password} onChangeText={(password_value) => setPassword(password_value)} placeholder="New Password" secureTextEntry={true} style={Styles.textInput} />
            {confirmPassword ?
                <Text style={Form1.formContainer}>
                    {passwordMatchError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}>Not Match <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                    {passwordMatchError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}>Match <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                </Text> : null
            }
            <TextInput value={confirmPassword} onChangeText={(password_value) => setConfirmPassword(password_value)} placeholder="Confirm New Password" secureTextEntry={true} style={Styles.textInput} />


            {forgotPasswordLoading ?
                <View style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}><ActivityIndicator size="large" color="#00ff00" /></Text>
                </View>
                :
                <TouchableOpacity onPress={submitHandler} style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}>Confirm</Text>
                </TouchableOpacity>
            }




        </View>
    )
}

export default ResetPassword;