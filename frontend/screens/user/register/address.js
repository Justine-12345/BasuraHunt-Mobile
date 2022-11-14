import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { VStack } from "native-base";
import Form1 from "../../../stylesheets/form1";
import SelectList from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { setRegAddressData } from "../../../Redux/Actions/userActions";

const Address = ({ navigation }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        house_number: '',
        street: '',
        barangay: '',
    })

    const {
        house_number,
        street,
        barangay,
    } = user;


    const [barangaySelect, setBarangaySelect] = useState("")
    const barangayList = [
        { value: "Bagumbayan" },
        { value: "Bambang" },
        { value: "Calzada" },
        { value: "Hagonoy" },
        { value: "Ibayo-Tipas" },
        { value: "Ligid-Tipas" },
        { value: "Lower Bicutan" },
        { value: "New Lower Bicutan" },
        { value: "Napindan" },
        { value: "Palingon" },
        { value: "San Miguel" },
        { value: "Santa Ana" },
        { value: "Tuktukan" },
        { value: "Ususan" },
        { value: "Wawa" },
        { value: "Central Bicutan" },
        { value: "Central Signal Village" },
        { value: "Fort Bonifacio" },
        { value: "Katuparan" },
        { value: "Maharlika Village" },
        { value: "North Daang Hari" },
        { value: "North Signal Village" },
        { value: "Pinagsama" },
        { value: "South Daang Hari" },
        { value: "South Signal Village" },
        { value: "Tanyag" },
        { value: "Upper Bicutan" },
        { value: "Western Bicutan" }
    ];

    const nextHandle = () => {

        // **** ___Add Filter here

        if (!house_number) {
            Toast.show({
                type: 'error',
                text1: 'Invalid House Number',
                text2: 'Please enter a valid value for house Number'
            });
        } else if (!street) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Street',
                text2: 'Please enter a valid value for street'
            });
        } else if (!barangay) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Barangay',
                text2: 'Please enter a valid value for barangay'
            });
        } else {
            dispatch(setRegAddressData(user))
            navigation.navigate('Account')
        }

    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <VStack style={Form1.formContainer}>

                {/* house number */}
                <Text style={Form1.label}>House Number</Text>
                <TextInput onChangeText={(house_number_value) => setUser({ ...user, ["house_number"]: house_number_value })} style={Form1.textInput} />

                {/* street */}
                <Text style={Form1.label}>Street</Text>
                <TextInput onChangeText={(street_value) => setUser({ ...user, ["street"]: street_value })} style={Form1.textInput} />

                {/* barangay */}
                <Text style={Form1.label}>Barangay</Text>
                <SelectList setSelected={setBarangaySelect} data={barangayList} onSelect={() => setUser({ ...user, ["barangay"]: barangaySelect })} />

            </VStack>



            <View style={Form1.bottom}>
                
                <TouchableOpacity style={Form1.formBtn} activeOpacity={0.8}
                    // onPress={()=>{navigation.navigate('Account')}}
                    onPress={nextHandle}
                >
                    <Text style={Form1.btnLabel}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Form1.formBtn} activeOpacity={0.8}
                    onPress={() => { navigation.navigate('Personal') }}>
                    <Text style={Form1.btnLabel}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Address;