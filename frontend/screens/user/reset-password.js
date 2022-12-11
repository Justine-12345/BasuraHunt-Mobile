import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../../stylesheets/styles";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return(
        <View style={Styles.container2}>
            <Text style={[Styles.text0, Styles.text1]}>Reset Password</Text>
            <Text style={[Styles.textI, {color: "grey", padding: 20, textAlign: "center"}]}>lorem@gmail.com</Text>

            <TextInput onChangeText={(password_value) => setNewPassword(password_value)} placeholder="New Password" secureTextEntry={true} style={Styles.textInput} />
            <TextInput onChangeText={(password_value) => setConfirmPassword(password_value)} placeholder="Confirm New Password" secureTextEntry={true} style={Styles.textInput} />

            <TouchableOpacity style={Styles.loginBtn} activeOpacity={0.8}>
                <Text style={Styles.login}>Confirm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResetPassword;