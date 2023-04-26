import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Form1 from "../../stylesheets/form1";
import { VStack, Input } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import { findEmail, updateProfile, refreshOtp } from "../../Redux/Actions/userActions";
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


const ResetEmail = ({ navigation }) => {
    const dispatch = useDispatch()
    const [availableEmail, setAvailableEmail] = useState(null)
    const { user: authUser } = useSelector(state => state.auth);
    const { count } = useSelector(state => state.findEmail);

    const [user, setUser] = useState({
        email: ''
    })
    const {
        email
    } = user;

    useEffect(() => {
        const re = /\S+@\S+\.\S+/;

        if (email !== "") {
            dispatch(findEmail(email))
        }
        if (count > 0) {
            setAvailableEmail(false)
        }
        else if (count === 0) {
            setAvailableEmail(true)
        }

        if (email === "") {
            setAvailableEmail(null)
        }

        if (email !== "" && re.test(email) === false) {
            setAvailableEmail("invalid")
        }

    }, [count, email])

    const navigateOTP = () => {
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

    const submitHandle = () => {
        dispatch(updateProfile(user))
        dispatch(refreshOtp())
        authUser.email = email

        Toast.show({
            type: 'success',
            text1: 'Successfully Sent OTP',
            text2: 'Code successfully sent to your email'
        });

        navigateOTP()
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <VStack style={Form1.formContainer}>
                <Text style={Form1.title}>Enter New Email</Text>
                <Text style={Form1.label}>Email<Text style={{ color: "red" }}>*</Text>
                    {availableEmail === true ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}> This Email is Available <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                    {availableEmail === false ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}> This Email is Already Used <AntDesign name="exclamationcircle" size={12} color="red" /></Text> : ""}
                    {availableEmail === "invalid" ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}> This Email is Invalid Format <AntDesign name="exclamationcircle" size={12} color="red" /></Text> : ""}
                </Text>
                <TextInput autoCapitalize={"none"} onChangeText={(email_value) => { setUser({ ...user, ["email"]: email_value }) }} style={Form1.textInput} />
            </VStack>

            <View style={Form1.bottom}>
                <TouchableOpacity onPress={submitHandle} style={Form1.formBtn} activeOpacity={0.8}>
                    <Text style={Form1.btnLabel}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ResetEmail;