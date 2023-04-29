import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity, Image, Platform } from "react-native";
import { HStack, VStack } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import Form1 from "../../../stylesheets/form1";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import SelectList from 'react-native-dropdown-select-list';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { manipulateAsync } from 'expo-image-manipulator';
import { findEmail } from "../../../Redux/Actions/userActions";
import { AntDesign } from '@expo/vector-icons';
import { setRegAccountData } from "../../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';
const Account = ({ navigation }) => {
    const dispatch = useDispatch()
    const { count, loading, error } = useSelector(state => state.findEmail);

    const [image, setImage] = useState("https://res.cloudinary.com/basurahunt/image/upload/v1663916552/BasuraHunt/Static/user-default_mdgd40.png");
    const [jobDescSelect, setJobDescSelect] = useState("")
    const [ifCollector, setIfCollector] = useState(false);
    const jobDescList = ['Collector', 'Driver', 'Sweeper'];
    const [availableEmail, setAvailableEmail] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordMatchError, setPasswordMatchError] = useState(null)

	const [showPass, setShowPass] = useState(false);
	const [showCPass, setShowCPass] = useState(false);

    const [user, setUser] = useState({
        email: '',
        alias: '',
        password: '',
        confirm_password: '',
        jobDesc: '',
        avatar: null,
    })

    const {
        email,
        alias,
        password,
        confirm_password,
        jobDesc,
        avatar
    } = user;



    (async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access camera is needed to upload images")
            }
        }
    })();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            quality: 0.1
        });



        if (!result.canceled) {
            let imageUri = result ?
            `data:image/jpg;base64,${result.assets[0].base64}` : null;
            setImage(imageUri);
            setUser({ ...user, ["avatar"]: imageUri }) 
        }

    }

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

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,30}$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d~`!@#$%^&*()-=_+{}\|;':",./<>?]{8,}$/

        if (password !== "" && passwordRegex.test(password) === false) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }


        if (confirm_password !== password) {
            setPasswordMatchError(true)
        } else {
            setPasswordMatchError(false)
        }

    }, [count, email, password, confirm_password])

    const nextHandle = () => {
      
        // **** ___Add Filter here

        if (!email) {
            Toast.show({
                type: 'error',
                text1: 'Invalid House Number',
                text2: 'Please enter a valid value for house Number'
            });
        } else if (!alias) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Alias',
                text2: 'Please enter a valid value for alias'
            });
        } else if (!password) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Password',
                text2: 'Please enter a valid value for password'
            });
        } else {
            dispatch(setRegAccountData(user))
            navigation.navigate('Verification')
        }

    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <VStack style={Form1.formContainer}>

                {/* profile picture */}
                <View style={Form1.picContainer}>
                    <Image source={{ uri: image }} style={Form1.profilePic} />
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome name="pencil-square" style={Form1.pencil} />
                    </TouchableOpacity>
                </View>

                {/* email */}
                <Text style={Form1.label}>Email<Text style={{color:"red"}}>*</Text>
                    {availableEmail === true ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}> This Email is Available <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                    {availableEmail === false ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}> This Email is Already Used <AntDesign name="exclamationcircle" size={12} color="red" /></Text> : ""}
                    {availableEmail === "invalid" ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}> This Email is Invalid Format <AntDesign name="exclamationcircle" size={12} color="red" /></Text> : ""}
                </Text>
                <TextInput autoCapitalize={"none"} onChangeText={(email_value) => { setUser({ ...user, ["email"]: email_value }) }} style={Form1.textInput} />

                {/* alias/nickname */}
                <Text style={Form1.label}>Alias/Nickname<Text style={{color:"red"}}>*</Text></Text>
                <TextInput onChangeText={(alias_value) => setUser({ ...user, ["alias"]: alias_value })} style={Form1.textInput} />

                {/* password */}
                <Text style={Form1.label}>Password<Text style={{color:"red"}}>*</Text>
                    {passwordError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}> Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                    {passwordError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}> Approved <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                </Text>
                {/* <TextInput onChangeText={(password_value) => setUser({ ...user, ["password"]: password_value })} secureTextEntry={true} style={Form1.textInput} /> */}
                <HStack alignItems={"center"} style={Form1.textInput}>
                    <TextInput autoCapitalize={"none"} style={{display: "flex", flex: 1, fontSize: 20}} onChangeText={(password_value) => setUser({ ...user, ["password"]: password_value })} secureTextEntry={!showPass}/>
                    <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
                        <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                    </TouchableOpacity>
                </HStack>
                {/* confirm password */}
                <Text style={Form1.label}>Confirm Password<Text style={{color:"red"}}>*</Text>
                    {passwordMatchError === true && password ? <Text style={{ color: "red", fontWeight: "700", fontSize: 11 }}> Not Match <AntDesign name="exclamationcircle" size={12} color="red" /> </Text> : ""}
                    {passwordMatchError === false && password ? <Text style={{ color: "green", fontWeight: "700", fontSize: 11 }}> Match <AntDesign name="checkcircle" size={12} color="green" /></Text> : ""}
                </Text>
                {/* <TextInput onChangeText={(confirm_password_value) => setUser({ ...user, ["confirm_password"]: confirm_password_value })} secureTextEntry={true} style={Form1.textInput} /> */}
                <HStack alignItems={"center"} style={Form1.textInput}>
                    <TextInput autoCapitalize={"none"} style={{display: "flex", flex: 1, fontSize: 20}} onChangeText={(confirm_password_value) => setUser({ ...user, ["confirm_password"]: confirm_password_value })} secureTextEntry={!showCPass}/>
                    <TouchableOpacity onPress={()=>setShowCPass(!showCPass)}>
                        <Ionicons name={showCPass ? "eye-outline" : "eye-off-outline"} size={20}/>
                    </TouchableOpacity>
                </HStack>

                {/* collector */}
                {/* <TouchableOpacity style={Form1.formBtn1} activeOpacity={0.8}
                    onPress={()=>setIfCollector(!ifCollector)}
                    >
                    <Text style={Form1.btnLabel}>I am a garbage collector</Text>
                </TouchableOpacity> */}
                <Checkbox.Item
                    label="Check this if you are a Garbage Collector"
                    labelStyle={{
                        textAlign: "center"
                    }}
                    position="leading"
                    status={ifCollector ? 'checked' : 'unchecked'}
                    onPress={() => { setIfCollector(!ifCollector) }}
                    color="#1E5128"
                />

                {ifCollector == true ? <SelectList search={false} setSelected={setJobDescSelect} data={jobDescList} onSelect={() => setUser({ ...user, ["jobDesc"]: jobDescSelect })} /> : null}

            </VStack>

            <View style={Form1.bottom}>
                <TouchableOpacity style={Form1.formBtn} activeOpacity={0.8}
                    // onPress={() => { navigation.navigate('Verification') }}
                    onPress={nextHandle}
                >
                    <Text style={Form1.btnLabel}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Form1.formBtn} activeOpacity={0.8}
                    onPress={() => { navigation.navigate('Address') }}

                >
                    <Text style={Form1.btnLabel}>Back</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default Account;