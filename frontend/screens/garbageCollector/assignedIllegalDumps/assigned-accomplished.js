import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, ImagePickerIOS, Dimensions, Switch, ActivityIndicator } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckboxBtn from "../../../stylesheets/checkboxBtn";
import BhButton from "../../../stylesheets/button";
import Form1 from "../../../stylesheets/form1";
import * as ImagePicker from "expo-image-picker";
import MapFinder from "../../maps/MapFinder";
import { useDispatch, useSelector } from "react-redux";
import { newDump, clearErrors } from "../../../Redux/Actions/dumpActions";
import Toast from 'react-native-toast-message';
import { RESET_COORDINATE } from "../../../Redux/Constants/mapConstants";
import { NEW_DUMP_RESET } from "../../../Redux/Constants/dumpConstants";
import RandomStringGenerator from "../../extras/randomStringGenerator";
import AsyncStorage from '@react-native-async-storage/async-storage'
import NotificationSender from "../../extras/notificationSender";
import { reportedDumps } from "../../../Redux/Actions/userActions";
import { updateDumpStatus } from "../../../Redux/Actions/dumpActions";
import { USER_DUMP_PAGE_RESET } from "../../../Redux/Constants/userConstants";
import { Skeleton } from "native-base";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getDumpList } from "../../../Redux/Actions/dumpActions";
import { UPDATE_DUMP_STATUS_RESET } from "../../../Redux/Constants/dumpConstants";
import { SOCKET_PORT } from "../../../Redux/Constants/socketConstants";
import io from "socket.io-client"
const socket = io.connect(SOCKET_PORT)
const windowHeight = Dimensions.get('window').height;


const AssignedAccomplished = (props) => {
    const dispatch = useDispatch()
    const status = props.route.params.status
    const id = props.route.params.id
    const room = props.route.params.room
    const role = props.route.params.role
    const user_id = props.route.params.user_id
    const long = props.route.params.long
    const lati = props.route.params.lati
    const purokParams = props.route.params.purok
    const dumpBarangay = props.route.params.barangay
    const { latitude: mapLatitude, longitude: mapLongtitude } = useSelector(state => state.coordinate)
    const { isDeleted, isUpdatedStatus, error: upDelError, loading: dumpLoading } = useSelector(state => state.dump)
    const { loading, success, dump, error } = useSelector(state => state.newDump)
    const { initializing } = useSelector(state => state.mapLoading)
    const [rate, setRate] = useState(0)
    let longitude = 0
    let latitude = 0
    const [notifCode, setNotifCode] = useState(RandomStringGenerator(40))
    const [notifCode1, setNotifCode1] = useState(RandomStringGenerator(40))
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [landmark, setLandmark] = useState('')
    const [barangay, setBarangay] = useState('')
    const [user, setUser] = useState();
    const [purok, setPurok] = useState(`${purokParams}`);





    (async () => {
        if (Platform.OS !== "web") {

            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access camera is needed to upload images")
            }

        }
    })();

    const barangays = [
        "Bagumbayan",
        "Bambang",
        "Calzada",
        "Hagonoy",
        "Ibayo-Tipas",
        "Ligid-Tipas",
        "Lower Bicutan",
        "New Lower Bicutan",
        "Napindan",
        "Palingon",
        "San Miguel",
        "Santa Ana",
        "Tuktukan",
        "Ususan",
        "Wawa",
        "Central Bicutan",
        "Central Signal Village",
        "Fort Bonifacio",
        "Katuparan",
        "Maharlika Village",
        "North Daang Hari",
        "North Signal Village",
        "Pinagsama",
        "South Daang Hari",
        "South Signal Village",
        "Tanyag",
        "Upper Bicutan",
        "Western Bicutan",
    ]

    useEffect(() => {
        // console.log("RandomStringGenerator(40)",String(RandomStringGenerator(40)))
        AsyncStorage.getItem("user")
            .then((res) => {
                setUser(JSON.parse(res))
            })
            .catch((error) => console.log(error))

        console.log("role", role)
        console.log("user_id", user_id)

        if (isUpdatedStatus) {
            // dispatch(getDumpList());

            const messageData = {
                room: room,
                author: user && user._id,
                message: "Cleaned",
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                type: "status"
            }

            socket.emit("send_message", messageData);

            let notifTitle = "Congratulations! Your reported illegal dump has been cleaned"

            NotificationSender(notifTitle, user && user._id, user_id, dumpBarangay, 'illegalDump-update-status', notifCode, { coordinates: { longtitude: long, latitude: lati }, _id: id })

            if (role === "newUser") {
                const notifTitle1 = "Congratulation you are now a verified user."
                NotificationSender(notifTitle, user && user._id, user_id, dumpBarangay, 'illegalDump-update-status', notifCode, { coordinates: { longtitude: long, latitude: lati }, _id: id })

            }

            Toast.show({
                type: 'success',
                text1: 'Successfully Updated'
            });
            dispatch({ type: UPDATE_DUMP_STATUS_RESET })
            props.navigation.navigate('GarbageCollectorNav', { screen: 'Finished', params: { screen: 'AssignedFinished' } })

        }
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
                text2: 'Something went wrong, please try again later'
            });
            console.log(error)
            dispatch(clearErrors())

        }
    }, [success, error, isUpdatedStatus])

    const pickImage = async () => {

        // **** ___3 images
        if (images.length <= 2) {
            let result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 0.1
            });

            if (!result.canceled) {
                // console.log("base64", result.assets[0].base64)
                // console.log("uri", result.assets[0].uri)
                let imageUri = result ? `data:image/jpg;base64,${result.assets[0].base64}` : null;
                setImages(oldArray => [...oldArray, imageUri])
                setImagesPreview(items => [...items, { uri: result.assets[0].uri, base64: imageUri }])
            }
        } else {
            Toast.show({
                type: 'error',
                text1: error,
                text2: "Maximum number(3) of images has been reached"
            });
        }


    }

    const capImage = async () => {

        // **** ___3 images
        if (images.length <= 2) {
            let result = await ImagePicker.launchCameraAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                quality: 0.1
            });

            if (!result.canceled) {
                let imageUri = result ? `data:image/jpg;base64,${result.assets[0].base64}` : null;
                setImages(oldArray => [...oldArray, imageUri])
                setImagesPreview(items => [...items, { uri: result.assets[0].uri, base64: imageUri }])
            }
        } else {
            Toast.show({
                type: 'error',
                text1: error,
                text2: "Maximum number(3) of images has been reached"
            });
        }
    }


    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }


    const onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setMapHeight(height)
        setMapWidth(width)
    }

    const submitHandle = () => {

        if (rate <= 0) {
            Toast.show({
                type: 'error',
                text1: "Rate the item first"
            });
        } else if (images.length <= 0) {
            Toast.show({
                type: 'error',
                text1: "Please capture/upload images",
                text2: "For evidence of cleaned illegal dump"
            });
        } else {
            const formData = new FormData();

            formData.append('old_status', status)
            formData.append('new_status', "Cleaned")
            formData.append('rate', rate)
            formData.append('notifCode', notifCode);
            formData.append('notifCode1', notifCode1);
            formData.append('purok', purok);

            images.forEach(image => {
                formData.append('accomplished_images', image)
            })

            dispatch(updateDumpStatus(id, formData))
        }




    }

    return (
        <>

            {loading ?
                <View style={{ position: "relative", top: windowHeight / 3 }}>
                    <ActivityIndicator size="large" color="#1E5128" />
                    <Text style={[{ color: "grey", textAlign: "center", marginVertical: 24, fontStyle: "italic" }]}>Submitting Report </Text>
                </View> :

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>




                    <View style={RandomStyle.vContainer}>
                        <View style={RandomStyle.vHeader}>
                            <Text style={RandomStyle.vText1}> Accomplishment of Illegal Dump Report</Text>
                        </View>
                        {/* ========== */}
                        <>
                            <HStack justifyContent={"space-between"}>
                                <BhButton medium onPress={pickImage}>
                                    <Text style={{ color: "white" }}>Upload Image</Text>
                                </BhButton>
                                <BhButton medium onPress={capImage}>
                                    <Text style={{ color: "white" }}>Capture Image</Text>
                                </BhButton>
                            </HStack>

                            <View style={RandomStyle.vImages}>
                                {imagesPreview.length > 0 ?
                                    imagesPreview.map((img, index) =>
                                        <View key={index}>
                                            <TouchableOpacity style={{ zIndex: 999 }} onPress={() => { setImagesPreview(imagesPreview.filter(image => image.uri !== img.uri)); setImages(images.filter(image => image !== img.base64)) }}>
                                                <MaterialCommunityIcons size={20} style={RandomStyle.vBadge} name="close" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => showImages(index)}>
                                                <Image style={RandomStyle.vImage} source={{ uri: img.uri }} resizeMode="cover" />
                                            </TouchableOpacity>
                                        </View>
                                    ) : null
                                }
                                <ImageView
                                    images={imagesPreview}
                                    imageIndex={imgIndex}
                                    visible={openImages}
                                    onRequestClose={() => setOpenImages(false)}
                                />

                            </View>
                        </>

                        <Text style={RandomStyle.vText2}>Rate</Text>

                        <Rating
                            showRating
                            startingValue={0}
                            onFinishRating={(rating_value) => setRate(rating_value)}
                            style={{ paddingVertical: 10 }}


                        />

                        <VStack>
                            <Text style={RandomStyle.vText2}>Purok: </Text>
                            <TextInput value={purok} keyboardType="numeric" onChangeText={(purok_value) => { setPurok(purok_value) }} placeholder="" style={Form1.textInput2} />
                        </VStack>

                        <BhButton center medium onPress={submitHandle}>
                            <Text style={{ color: "white" }}>Submit</Text>
                        </BhButton>
                    </View>
                </ScrollView>
            }
        </>
    )
}

export default AssignedAccomplished;