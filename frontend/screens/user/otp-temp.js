import React, { useState, useCallback } from "react";
import { Text, View, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { HStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native";
import { checkOtp, clearErrors } from "../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';

var { width } = Dimensions.get("window");

const OTP = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading: authLoading, isAuthenticated, error: authError, user: authUser } = useSelector(state => state.auth);
    const [user, setUser] = useState()
    const [otp, setOtp] = useState('')

    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem("user")
                .then((res) => {
                    setUser(JSON.parse(res))
                })
                .catch((error) => console.log(error))


            if ((user && user.otp_status === "Verified") && user && user.role !== "administrator" || user && user.role !== "barangayAdministrator") {
                if (isAuthenticated) {
                    Toast.show({
                        type: 'success',
                        text1: 'Registered Successfully',
                        text2: 'Welcome To BasuraHunt, You can Log in Now'
                    });

                    navigation.navigate('Main')
                }
            }

            if (authError) {
                Toast.show({
                    type: 'error',
                    text1: authError,
                    text2: 'Please enter correct OTP code'
                });
                dispatch(clearErrors())
            }



            return () => {
                setUser();
            }
        }, [authError, isAuthenticated]))


    const submitHandle = () => {

        if (!otp || otp === '') {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
                text2: 'Please enter correct OTP code'
            });
        } else {
            const formData = new FormData();
            formData.append('otp', otp);
            dispatch(checkOtp(formData))
        }
    }


    return (
        <>

            <Text style={[styles.text0, styles.text1]}>Verify OTP</Text>
            <Text style={styles.text0}>Email Was Sent To {user && user.email}</Text>
            <TextInput onChangeText={(otp_value) => setOtp(otp_value)} placeholder="######" style={styles.textInput} />

            <TouchableOpacity onPress={submitHandle} style={styles.loginBtn} activeOpacity={0.8}>
                <Text style={styles.login}>Submit</Text>
            </TouchableOpacity>

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

export default OTP;