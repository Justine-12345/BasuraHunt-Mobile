import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import OtpInput from "../../stylesheets/otpInput";
import Form1 from "../../stylesheets/form1";
import { VStack } from "native-base";

const OTP = () => {
    const [otp, setOtp] = useState('')

    return ( 
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
            <VStack style={Form1.formContainer}>
                <Text style={Form1.title}>Enter 6-digit code</Text>
                <Text style={[Form1.sub, {marginVertical: 20}]}>Your code was sent to lorem@gmail.com</Text>
                <View style={Form1.otpContainer}>   
                    <OtpInput
                        numberOfInput={6}
                        setOtpCode={setOtp}
                    />
                    <Text>{otp}</Text>
                </View>
                    <TouchableOpacity style={{alignSelf: "flex-end"}}>
                        <Text>Resend Code</Text>
                    </TouchableOpacity>
            </VStack>

            <View style={Form1.bottom}>
                <TouchableOpacity style={Form1.formBtn} activeOpacity={0.8}
                >
                    <Text style={Form1.btnLabel}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OTP;