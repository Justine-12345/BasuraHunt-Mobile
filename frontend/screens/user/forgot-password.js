import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../../stylesheets/styles";

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('')

    return(
        <View style={Styles.container2}>
            <Text style={[Styles.text0, Styles.text1]}>Forgot Password</Text>
            <Text style={[Styles.textI, {color: "grey", padding: 20, textAlign: "center"}]}>Enter your email address and a link to reset your password will be sent to you.</Text>

            <TextInput onChangeText={(email_value) => setEmail(email_value)} placeholder="Email" style={Styles.textInput} />

            <TouchableOpacity onPress={()=>navigation.navigate("ResetPassword")} style={Styles.loginBtn} activeOpacity={0.8}>
                <Text style={Styles.login}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword;