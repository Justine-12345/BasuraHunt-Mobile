import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Styles from "../../stylesheets/styles";
import OtpInput from "../../stylesheets/otpInput";
import Form1 from "../../stylesheets/form1";
import { resetPassword } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CommonActions } from "@react-navigation/native";
import { FORGOT_PASSWORD_RESET } from "../../Redux/Constants/userConstants";
import { HStack, Input } from "native-base";
const ResetPassword = (props) => {
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error, user } = useSelector(state => state.auth);
    const { loading: forgotPasswordLoading, message, success, error: forgotPasswordError } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [code, setCode] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [passwordMatchError, setPasswordMatchError] = useState(null)
    const email = props.route.params.email
    
	const [showNPass, setShowNPass] = useState(false);
	const [showCPass, setShowCPass] = useState(false);

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
                            props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        { name: 'Main' }
                                    ],
                                })
                            );
                            props.navigation.navigate('Main')
                        } else if (JSON.parse(userInfo.user).role === "garbageCollector") {
                            props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        { name: 'HomeCollectorNav' }
                                    ],
                                })
                            );
                            props.navigation.navigate('HomeCollectorNav')
                        } else {
                            AsyncStorage.clear()
                            Toast.show({
                                type: 'error',
                                text1: 'Denied',
                                text2: 'Access has been denied to this account'
                            });
                            props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        { name: 'Login' }
                                    ],
                                })
                            );
                            props.navigation.navigate('Login')
                        }
                    } else if (JSON.parse(userInfo.user).otp_status === "Fresh") {
                        props.navigation.navigate('OTP')
                    }
                }

            });
        }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,30}$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d~`!@#$%^&*()-=_+{}\|;':",./<>?]{8,}$/

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
            <Text style={[Styles.textI, { color: "grey", padding: 20, textAlign: "center" }]}>Enter the 6-digit code sent to your email {email}</Text>
            
            <View style={Form1.formContainer}>
                <View style={Form1.otpContainer}>
                    <Input style={{fontSize: 50, textAlign: "center"}} keyboardType="number-pad" maxLength={6} onChangeText={(value)=>setCode(value)}/>
                </View>
            </View>

            <View style={{paddingHorizontal: 20}}>
                {passwordError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}>Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                {passwordError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}>Approved <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
            </View>

            {/* <TextInput value={password} onChangeText={(password_value) => setPassword(password_value)} placeholder="New Password" secureTextEntry={true} style={Styles.textInput} /> */}
            <HStack alignItems={"center"} style={Styles.textInput}>
                <TextInput style={{display: "flex", flex: 1, fontSize: 20}} value={password} onChangeText={(password_value) => setPassword(password_value)} placeholder="New Password" secureTextEntry={!showNPass}/>
                <TouchableOpacity onPress={()=>setShowNPass(!showNPass)}>
                    <Ionicons name={showNPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                </TouchableOpacity>
            </HStack>

            {confirmPassword ?
                <View style={{paddingHorizontal: 20}}>
                    {passwordMatchError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}>Not Match <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                    {passwordMatchError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}>Match <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                </View> : null
            }
            {/* <TextInput value={confirmPassword} onChangeText={(password_value) => setConfirmPassword(password_value)} placeholder="Confirm New Password" secureTextEntry={true} style={Styles.textInput} /> */}
            <HStack alignItems={"center"} style={Styles.textInput}>
                <TextInput style={{display: "flex", flex: 1, fontSize: 20}} value={confirmPassword} onChangeText={(password_value) => setConfirmPassword(password_value)} placeholder="Confirm New Password" secureTextEntry={!showCPass}/>
                <TouchableOpacity onPress={()=>setShowCPass(!showCPass)}>
                    <Ionicons name={showCPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                </TouchableOpacity>
            </HStack>

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