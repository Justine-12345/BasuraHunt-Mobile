import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Styles from "../../stylesheets/styles";
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';
import { forgotPassword, clearErrors } from "../../Redux/Actions/userActions";
import { FORGOT_PASSWORD_RESET } from "../../Redux/Constants/userConstants";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const { loading: forgotPasswordLoading, success, error: forgotPasswordError } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (success) {
            dispatch({type:FORGOT_PASSWORD_RESET})
            navigation.navigate("ResetPassword", {email})
        }

        if (forgotPasswordError) {
            Toast.show({
                type: 'error',
                text1: forgotPasswordError,
            });
        }

    }, [success, forgotPasswordError])

    const submitHandler = () => {
        console.log(email)
        if (email === "") {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Your Email',
            });
            dispatch(clearErrors())
        } else {
            let dateNow = new Date();

            const formData = new FormData();
            formData.append('email', email);
            formData.append('ismobile', "true");
            formData.append("dateTimeNow", dateNow.toLocaleString("en-US"))
            dispatch(forgotPassword(formData))

        }
    }

    return (
        <View style={Styles.container2}>
            <Text style={[Styles.text0, Styles.text1]}>Forgot Password</Text>
            <Text style={[Styles.textI, { color: "grey", padding: 20, textAlign: "center" }]}>Enter your email address and a link to reset your password will be sent to you.</Text>

            <TextInput autoCapitalize={"none"} value={email} onChangeText={(email_value) => setEmail(email_value)} placeholder="Email" style={Styles.textInput} />


            {forgotPasswordLoading ?
                <View style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}><ActivityIndicator size="large" color="#00ff00" /></Text>
                </View>
                :
                <TouchableOpacity onPress={submitHandler} style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}>Send</Text>
                </TouchableOpacity>
            }

        </View>
    )
}

export default ForgotPassword;