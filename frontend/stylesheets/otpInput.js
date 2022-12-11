import React, { useRef, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { HStack, View } from "native-base";

export default function OtpInput(props){

    const inputBox = [];
    let inputBoxRef = [];

    const [otp, setOtp] = useState([]);
    const [otpFocus, setOtpFocus] = useState();

    let noi = props.numberOfInput;

    const otpKeyPressed = (e, i) => {
        let otpCodes = [...otp];
        if(e.nativeEvent.key === "Backspace"){
            if(i!=0){
                // inputBoxRef[i].current.blur();
                if((otpCodes[i] == null) && (otpCodes[i] == undefined)){
                    inputBoxRef[i-1].current.focus();
                    otpCodes[i-1] = null;
                }
            }
            otpCodes[i] = null;
        }
        else{
            if(i!=inputBoxRef.length-1){
                inputBoxRef[i+1].current.focus();
                // inputBoxRef[i].current.blur();
            }
            otpCodes[i] = e.nativeEvent.key;
        }
        setOtp(otpCodes);

        props.setOtpCode(otpCodes.join(''));
    }

    for(let i=0; i<noi ; i++) {

        inputBoxRef[i] = useRef();

        inputBox.push(
            <View key={i}>
            <TextInput
                caretHidden
                style={otpFocus == i ? [styles.inputBox, styles.focus] : styles.inputBox}
                key={i}
                keyboardType="numeric"
                maxLength={1}
                onKeyPress={(e)=>otpKeyPressed(e, i)}
                value={otp[i]}
                ref={inputBoxRef[i]}
                onFocus={()=>setOtpFocus(i)}
            />
            </View>
        )
    }

    return(
        <HStack style={styles.otpContainer}>
            {inputBox}
        </HStack>
    )
}

const styles = StyleSheet.create({
    otpContainer:{
        justifyContent: "center",
        flexWrap: "wrap"
        
    },
    inputBox: {
        width: 40,
        color: "#1E5128",
        borderBottomColor: "#1E5128",
        borderBottomWidth: 1,
        fontSize: 40,
        textAlign: "center",
        margin: 5,
        
    },
    focus: {
        borderColor: "#1E5128",
        borderWidth: 1,
        borderBottomColor: "#1E5128",
        borderRadius: 5
    }
})