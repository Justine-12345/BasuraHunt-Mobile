
import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { HStack, VStack } from "native-base";
import SelectList from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import Form1 from "../../../stylesheets/form1";
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import { setRegPersonalData } from "../../../Redux/Actions/userActions";
import { useDispatch } from "react-redux";

const Personal = ({ navigation }) => {
    const dispatch = useDispatch();

    const [birthdate, setBirthdate] = useState('');
    const [datepickerStatus, setDatepickerStatus] = useState(false);
    const [genderSelect, setGenderSelect] = useState("");
    const genderList = ['Male', 'Female'];

    const [user, setUser] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birthday: '',
        phone_number: 0,
        gender: '',
    })

    const {
        first_name,
        middle_name,
        last_name,
        suffix,
        birthday,
        phone_number,
        gender,
    } = user;

    useEffect(() => {
        setUser({ ...user, ["birthday"]: birthdate })
    }, [birthdate])

    const onChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const nextHandle = () => {

        // **** ___Add Filters here

        if (!first_name) {
            Toast.show({
                type: 'error',
                text1: 'Invalid First Name',
                text2: 'Please enter a valid value for first name'
            });
        } else if (!middle_name) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Middle Name',
                text2: 'Please enter a valid value for middle name'
            });
        }else if (!last_name) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Last Name',
                text2: 'Please enter a valid value for last name'
            });
        }
        else if (!birthday) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Birthday',
                text2: 'Please enter a valid value for birthday'
            });
        }
        // else if (!phone_number) {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Invalid Phone number',
        //         text2: 'Please enter a valid value for phone number'
        //     });
        // }
        // else if (!gender) {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Invalid Gender',
        //         text2: 'Please enter a valid value for gender'
        //     });
        // }
        else{
            dispatch(setRegPersonalData(user))
            navigation.navigate('Address')
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <VStack style={Form1.formContainer}>
                {/* name */}
                <Text style={Form1.label}>First Name</Text>
                <TextInput onChangeText={(first_name_value) => setUser({ ...user, ["first_name"]: first_name_value })} style={Form1.textInput} />

                <Text style={Form1.label}>Middle Name</Text>
                <TextInput onChangeText={(middle_name_value) => setUser({ ...user, ["middle_name"]: middle_name_value })} style={Form1.textInput} />

                <Text style={Form1.label}>Last Name</Text>
                <TextInput onChangeText={(last_name_value) => setUser({ ...user, ["last_name"]: last_name_value })} style={Form1.textInput} />

                <Text style={Form1.label}>Suffix</Text>
                <TextInput onChangeText={(suffix_value) => setUser({ ...user, ["suffix"]: suffix_value })} style={Form1.textInput} />

                {/* birthdate */}
                <Text style={Form1.label}>Birthdate</Text>
                <HStack style={Form1.birthdateContainer}>
                    <TouchableOpacity onPress={() => setDatepickerStatus(!datepickerStatus)} style={{ width: "100%" }}>
                        <FontAwesome name="calendar" size={20} color={"#1E5128"} style={{ position: "absolute", marginHorizontal: 10 }} />
                        <Text style={Form1.birthdate}>{birthdate}</Text>
                    </TouchableOpacity>
                </HStack>
                {datepickerStatus === false ? null : (
                    <DatePicker
                        mode="calendar"
                        onSelectedChange={(date) => { setBirthdate(date) }}
                        options={{
                            backgroundColor: "white",
                            textHeaderColor: "#1E5128",
                            selectedTextColor: "white",
                            mainColor: "#1E5128",
                        }}
                        style={{ borderRadius: 10 }}
                    />
                )}

                {/* phone number */}
                {/* <Text style={Form1.label}>Phone Number</Text>
                <TextInput onChangeText={(phone_number_value) => setUser({ ...user, ["phone_number"]: phone_number_value })} keyboardType="numeric" style={Form1.textInput} /> */}

                {/* gender */}
                {/* <Text style={Form1.label}>Gender</Text>
                <SelectList search={false} setSelected={setGenderSelect} data={genderList} onSelect={() => setUser({ ...user, ["gender"]: genderSelect })} /> */}

            </VStack>

            <View style={Form1.bottom}>
                <TouchableOpacity style={Form1.formBtn} activeOpacity={0.8}
                    // onPress={()=>{navigation.navigate('Address')}}
                    onPress={nextHandle}
                >
                    <Text style={Form1.btnLabel}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text onPress={()=>navigation.navigate('Login')} style={[styles.text0, {marginStart: 5}]}>Back To Login{'\n'}</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    text0: {
        color: "#1E5128",
        textAlign: "center"
    },
   
})

export default Personal;