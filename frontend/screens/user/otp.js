import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import OtpInput from "../../stylesheets/otpInput";
import Form1 from "../../stylesheets/form1";
import { VStack } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native";
import { checkOtp, clearErrors } from "../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';

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
                        text2: 'Welcome To BasuraHunt, you can log in now'
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
            <VStack style={Form1.formContainer}>
                <Text style={Form1.title}>Enter 6-digit code</Text>
                <Text style={[Form1.sub, {marginVertical: 20}]}>Your code was sent to {user && user.email}</Text>
                <View style={Form1.otpContainer}>   
                    <OtpInput
                        numberOfInput={6}
                        setOtpCode={setOtp}
                    />
                </View>
                    {/* refresh OTP */}
                    <TouchableOpacity style={{alignSelf: "flex-end"}}>
                        <Text>Resend Code</Text>
                    </TouchableOpacity>
            </VStack>

            <View style={Form1.bottom}>
                <TouchableOpacity onPress={submitHandle}  style={Form1.formBtn} activeOpacity={0.8}
                >
                    <Text style={Form1.btnLabel}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OTP;