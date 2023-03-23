import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Styles from "../../../stylesheets/styles";
import Form1 from "../../../stylesheets/form1";
import { updatePassword } from "../../../Redux/Actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { UPDATE_PASSWORD_RESET, CLEAR_ERRORS } from "../../../Redux/Constants/userConstants";
import { HStack } from "native-base";

const ProfileUpdatePasswordCollector = ({ navigation }) => {
    const dispatch = useDispatch();

    
    const { loading, isUpdated, error } = useSelector(state => state.user);
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [code, setCode] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [passwordMatchError, setPasswordMatchError] = useState(null)

	const [showOPass, setShowOPass] = useState(false);
	const [showNPass, setShowNPass] = useState(false);
	const [showCPass, setShowCPass] = useState(false);

    useEffect(() => {

        if (isUpdated) {
            dispatch({ type: UPDATE_PASSWORD_RESET })
            Toast.show({
                type: 'success',
                text1: 'Password Has Been Updated',
            });
            navigation.navigate('CollectorProfile',{screen:'Profile'})
        }
        if (error) {
            dispatch({ type: CLEAR_ERRORS })
            Toast.show({
                type: 'error',
                text1: error,
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

    }, [password, confirmPassword, isUpdated, error])

    const submitHandler = () => {
        if (oldPassword === "") {
            Toast.show({
                type: 'error',
                text1: "Please Enter Your Current Password",
            });
        }
        else if (password === "") {
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
                text1: "Passwords Don't Match, Please Confirm Again",
            });
        }
        else if (passwordError === true || passwordError === null) {
            Toast.show({
                type: 'error',
                text1: "Password is too weak",
            });
        }
        else {

            const formData = new FormData();
            formData.append('password', password);
            formData.append('oldPassword', oldPassword);
            dispatch(updatePassword(formData))
        }
    }




    return (
        <>{loading? <ActivityIndicator size="large" color="#4F7942" />:
        <View style={Styles.container2}>
            <Text style={[Styles.text0, Styles.text1]}>Update Password</Text>
            <HStack alignItems={"center"} style={Styles.textInput}>
                <TextInput autoCapitalize={"none"} style={{display: "flex", flex: 1, fontSize: 20}} value={oldPassword} onChangeText={(password_value) => setOldPassword(password_value)} placeholder="Current Password" secureTextEntry={!showOPass}/>
                <TouchableOpacity onPress={()=>setShowOPass(!showOPass)}>
                    <Ionicons name={showOPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                </TouchableOpacity>
            </HStack>
            
            <View style={{paddingHorizontal:20}}>
                {passwordError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11}}>Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                {passwordError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11}}>Approved <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
            </View>
            <HStack alignItems={"center"} style={Styles.textInput}>
                <TextInput autoCapitalize={"none"} style={{display: "flex", flex: 1, fontSize: 20}} value={password} onChangeText={(password_value) => setPassword(password_value)} placeholder="New Password" secureTextEntry={!showNPass}/>
                <TouchableOpacity onPress={()=>setShowNPass(!showNPass)}>
                    <Ionicons name={showNPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                </TouchableOpacity>
            </HStack>
            
            {confirmPassword ?
                <View style={{paddingHorizontal:20}}>
                    {passwordMatchError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}>Not Match <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                    {passwordMatchError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}>Match <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                </View> : null
            }
            <HStack alignItems={"center"} style={Styles.textInput}>
                <TextInput autoCapitalize={"none"} style={{display: "flex", flex: 1, fontSize: 20}} value={confirmPassword} onChangeText={(password_value) => setConfirmPassword(password_value)} placeholder="Confirm New Password" secureTextEntry={!showCPass}/>
                <TouchableOpacity onPress={()=>setShowCPass(!showCPass)}>
                    <Ionicons name={showCPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                </TouchableOpacity>
            </HStack>
            
                <TouchableOpacity onPress={submitHandler} style={Styles.loginBtn} activeOpacity={0.8}>
                    <Text style={Styles.login}>Save</Text>
                </TouchableOpacity>
            
        </View>
        }
        </>
    )
}

export default ProfileUpdatePasswordCollector;