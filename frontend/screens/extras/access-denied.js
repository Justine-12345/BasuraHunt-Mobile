import React from "react";
import { Text, View } from "react-native";
import Empty1 from "../../stylesheets/empty1";

const AccessDenied = () => {
    return (
        <View style={Empty1.container}>
            <Text style={Empty1.text1}>
                You cannot access this yet!
            </Text>
            <Text style={Empty1.text2}>
                Please wait until your account has been verified. Thank you!
            </Text>
        </View>
    )
}

export default AccessDenied;