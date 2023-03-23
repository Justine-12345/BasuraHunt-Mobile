import React, { useState, useEffect } from "react";
import {
    Text, View, TextInput, ScrollView,
    TouchableOpacity, Image, Platform, ActivityIndicator
} from "react-native";
import { HStack, VStack } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import Form1 from "../../../stylesheets/form1";
import RandomStyle from "../../../stylesheets/randomStyle";
import { FontAwesome } from "@expo/vector-icons";
import SelectList from 'react-native-dropdown-select-list';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { manipulateAsync } from 'expo-image-manipulator';
import { findEmail } from
    "../../../Redux/Actions/userActions";
import { setRegAccountData } from
    "../../../Redux/Actions/userActions";
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-modern-datepicker';
import { updateProfile, loadUser } from "../../../Redux/Actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../Redux/Constants/userConstants";


const ProfileUpdate = (props) => {
    const dispatch = useDispatch()
    const { error:updateError, isUpdated, loading: updateLoading, user: updatedUser } = useSelector(state => state.user)
    const userDetail = props.route.params.user
    const { count, loading, error } = useSelector(state =>
        state.findEmail);
    const [image, setImage] = useState(userDetail.avatar.url);
    const [jobDescSelect, setJobDescSelect] = useState("")
    const [ifCollector, setIfCollector] = useState(false);
    const jobDescList = ['Collector', 'Driver', 'Sweeper'];
    const [availableEmail, setAvailableEmail] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordMatchError, setPasswordMatchError]= useState(null)
    const [user, setUser] = useState({
        email: userDetail.email,
        alias:  userDetail.alias,
        password: '',
        confirm_password: '',
        jobDesc: '',
        avatar: null,
        first_name:userDetail.first_name,
        middle_name:userDetail.middle_name,
        last_name:userDetail.last_name,
        suffix:userDetail.suffix,
        phone_number:userDetail.phone_number,
        house_number:userDetail.house_number,
        street:userDetail.street,
        gender:userDetail.gender,
        barangay:userDetail.barangay
    })
    const {
        alias,
        avatar,
        first_name,
        middle_name,
        last_name,
        suffix,
        birthday,
        phone_number,
        gender,
        street,
        house_number,
        barangay
    } = user;
    // Account -------------------------------------------------
    (async () => {
        if (Platform.OS !== "web") {
            const { status } = await
                ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access camera is needed to upload images")
            }
        }
    })();

    const pickImage = async () => {
        let result = await
            ImagePicker.launchImageLibraryAsync({
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
   
    const submitHandle = () => {
        // **** ___Add Filter here
       if (!alias) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Alias',
                text2: 'Please enter a valid value for alias'
            });
        } else if (!first_name) {
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
        }else if (!house_number) {
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
        }
        
        else {
            // console.log('user', user)
            dispatch(updateProfile(user))
            // props.navigation.navigate('Verification')
        }
    }
    // Personal -------------------------------------------------------------

    const [birthdate, setBirthdate] = useState(userDetail.birthday);
    const [datepickerStatus, setDatepickerStatus] =
        useState(false);
    const [genderSelect, setGenderSelect] = useState("");
    const genderList = ['Male', 'Female', 'Prefer not to say'];


    useEffect(() => {
        if(isUpdated){
            Toast.show({
                type: 'success',
                text1: 'Profile Has Been Updated',
            });
            dispatch({type:UPDATE_PROFILE_RESET})
            dispatch(loadUser())
            props.navigation.navigate('User',{screen:'ProfileNav', params:{screen:'Profile'}})
        }
        setUser({ ...user, ["birthday"]: birthdate })
    }, [birthdate, isUpdated])
    // const onChange = async (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value })
    // }

    // Address --------------------------------------------------------------

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
    return (
        <>
        {updateLoading? <ActivityIndicator size="large" color="#4F7942" />:
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={RandomStyle.lContainer3}>
                <Text style={RandomStyle.vText1}>Update
                    User Information</Text>
            </View>
            <VStack style={Form1.formContainer}>

                {/* profile picture */}
                <Text
                    style={RandomStyle.vText6}>Account</Text>
                <View style={Form1.picContainer}>
                    <Image source={{ uri: image }}
                        style={Form1.profilePic} />
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome name="pencil-square"
                            style={Form1.pencil} />
                    </TouchableOpacity>
                </View>
                {/* alias/nickname */}
                <Text
                    style={Form1.label}>Alias/Nickname</Text>
                <TextInput value={user.alias} onChangeText={(alias_value) =>
                    setUser({ ...user, ["alias"]: alias_value })}
                    style={Form1.textInput2} />
                {/* <View style={RandomStyle.lContainer3}> */}
                <Text
                    style={RandomStyle.vText6}>Personal</Text>
                {/* </View> */}
                {/* name */}
                <Text style={Form1.label}>First Name</Text>
                <TextInput value={user.first_name} onChangeText={(first_name_value) => setUser({ ...user, ["first_name"]: first_name_value })}
                    style={Form1.textInput2} />
                <Text style={Form1.label}>Middle Name</Text>
                <TextInput value={user.middle_name}
                    onChangeText={(middle_name_value) => setUser({
                        ...user, ["middle_name"]: middle_name_value
                    })}
                    style={Form1.textInput2} />
                <Text style={Form1.label}>Last Name</Text>
                <TextInput value={user.last_name} onChangeText={(last_name_value) => setUser({ ...user, ["last_name"]: last_name_value })}
                    style={Form1.textInput2} />
                <Text style={Form1.label}>Suffix</Text>
                <TextInput  value={user.suffix} onChangeText={(suffix_value) =>
                    setUser({ ...user, ["suffix"]: suffix_value })}
                    style={Form1.textInput2} />
                {/* birthdate */}
                <Text style={Form1.label}>Birthdate</Text>
                <HStack style={Form1.birthdateContainer}>
                    <TouchableOpacity onPress={() =>
                        setDatepickerStatus(!datepickerStatus)} style={{
                            width:
                                "100%"
                        }}>
                        <FontAwesome name="calendar" size={20}
                            color={"#1E5128"} style={{
                                position: "absolute",
                                marginHorizontal: 10
                            }} />
                        <Text
                            style={Form1.birthdate}>{new Date(birthdate).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                </HStack>
                {datepickerStatus === false ? null : (
                    <DatePicker
                        mode="calendar"
                        onSelectedChange={(date) => {
                            setBirthdate(date)
                        }}
                        options={{
                            backgroundColor: "white",
                            textHeaderColor: "#1E5128",
                            selectedTextColor: "white",
                            mainColor: "#1E5128",
                        }}
                        style={{ borderRadius: 10 }}
                    />
                )}
                {/* gender */}
                <Text style={Form1.label}>Gender</Text>
                <SelectList search={false}
                    setSelected={setGenderSelect} data={genderList}
                    defaultOption={{ key:user.gender, value:user.gender }}
                    onSelect={() => setUser({
                        ...user, ["gender"]: genderSelect
                    })} />
                {/* phone number */}
                <Text style={Form1.label}>Phone
                    Number</Text>
                <TextInput
                maxLength={user.phone_number.includes("+") ? 13 : 11}
                value={user.phone_number !== "undefined"?user.phone_number:null}
                    onChangeText={(phone_number_value) => setUser({
                        ...user, ["phone_number"]: phone_number_value
                    })}
                    keyboardType="phone-pad" style={Form1.textInput2} />

                {/* house number */}
                <Text
                    style={RandomStyle.vText6}>Address</Text>
                <Text style={Form1.label}>House
                    Number</Text>
                <TextInput
                value={user.house_number}
                    onChangeText={(house_number_value) => setUser({
                        ...user, ["house_number"]: house_number_value
                    })}
                    style={Form1.textInput2} />
                {/* street */}
                <Text style={Form1.label}>Street</Text>
                <TextInput value={user.street} onChangeText={(street_value) => setUser({ ...user, ["street"]: street_value })}
                    style={Form1.textInput2} />
                {/* barangay */}
                <Text style={Form1.label}>Barangay</Text>
                <SelectList setSelected={setBarangaySelect}
                  defaultOption={{ key:user.barangay, value:user.barangay }}
                    data={barangayList} onSelect={() => setUser({
                        ...user,
                        ["barangay"]: barangaySelect
                    })} />

                <View style={Form1.bottom}>
                    <TouchableOpacity style={Form1.formBtn}
                        activeOpacity={0.8}
                        // 
                        onPress={submitHandle}
                    >
                        <Text style={Form1.btnLabel}>Save
                            Changes</Text>
                    </TouchableOpacity>
                </View>
            </VStack>


        </ScrollView>
        }
        </>
    )
}
export default ProfileUpdate;
