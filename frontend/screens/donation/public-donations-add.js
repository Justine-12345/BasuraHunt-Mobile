import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, Platform, ImagePickerIOS, ActivityIndicator, Dimensions } from "react-native";
import { HStack, VStack, Select, Checkbox } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckboxBtn from "../../stylesheets/checkboxBtn";
import BhButton from "../../stylesheets/button";
import Form1 from "../../stylesheets/form1";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';

import { addItem, clearErrors } from "../../Redux/Actions/itemActions";
import { ADD_ITEM_RESET } from "../../Redux/Constants/itemConstants";
import NotificationSender from "../extras/notificationSender";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RandomStringGenerator from "../extras/randomStringGenerator";
const swearjarEng = require('swearjar-extended2');
const swearjarFil = require('swearjar-extended2');
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const PublicReportsAdd = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, error, success, item } = useSelector(state => state.newItem);
    const additionalDescriptionMessage = "(Important detail such as claiming date, the quantity, an explanation of your mission, and other relevant details of your donation.)"
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState();

    const [name, setName] = useState('');
    const [additionalDescription, setAdditionalDescription] = useState('');
    const [itemTypes, setItemTypes] = useState([]);
    const [itemDesc, setItemDesc] = useState('');
    const [modalVisibleDontsAndDos, setModalVisibleDontsAndDos] = useState(false);
    const [donateUsing, setDonateUsing] = useState('Real Name');
    const [status, setStatus] = useState('');

    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [identity, setIdentity] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [type, setType] = useState("");

    const [typeFO, setTypeFO] = useState(false);
    const [typeCL, setTypeCL] = useState(false);
    const [typeME, setTypeME] = useState(false);
    const [typeAP, setTypeAP] = useState(false);
    const [typeFU, setTypeFU] = useState(false);
    const [typeOther, setTypeOther] = useState(false);

    const [btnAdd, setBtnAdd] = useState(false);
    const [user, setUser] = useState();
    const [notifCode, setNotifCode] = useState();
    // const [notifCode, setNotifCode] = useState("")
    (async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access camera is needed to upload images")
            }
        }
    })();

    const pickImage = async () => {

        // **** ___5 images

        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.1
        });

        if (!result.canceled) {
            let imageUri = result ? `data:image/jpg;base64,${result.assets[0].base64}` : null;
            setImages(oldArray => [...oldArray, imageUri])
            setImagesPreview(items => [...items, { uri: result.assets[0].uri, base64: imageUri }])
        }
    }

    const capImage = async () => {

        // **** ___5 images

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
    }

    // console.log(images)

    // item.images.forEach(img => {
    //     images.push({uri: img.url})
    // });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const dontShowHandler = (value) => {
        if (value) {
            AsyncStorage.setItem("iUnderstandDonation", "true");
        } else {
            AsyncStorage.setItem("iUnderstandDonation", "false");
        }
    }


    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem("iUnderstandDonation")
                .then((res) => {
                    console.log("res", res)
                    if (res === "false" || !res) {
                        setModalVisibleDontsAndDos(true)
                    }
                })
                .catch((error) => console.log(error))

            return () => {
                setModalVisibleDontsAndDos(false)
            }
        }, [])
    )


    useEffect(() => {

        AsyncStorage.getItem("user")
            .then((res) => {
                setUser(JSON.parse(res))
            })
            .catch((error) => console.log(error))
        setNotifCode(RandomStringGenerator(40))
        if (success) {
            Toast.show({
                type: 'success',
                text1: 'Submitted Successfully',
                text2: 'Your donation has been submited'
            });
            setImages([]);
            setImagesPreview([]);

            setName('')
            setAdditionalDescription('')
        
            setItemTypes([])
            setItemDesc('')
            setDonateUsing('')
            dispatch({ type: ADD_ITEM_RESET })

            NotificationSender(`New donated item has been added`, user._id, null, null, 'donation-new', notifCode, item && item)
            navigation.navigate("User", { screen: 'MyDonations', params: { screen: 'UserDonationsList' } })

        }

        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
                text2: 'Something went wrong! Please try again later'
            });
            console.log(error)
            dispatch(clearErrors())
        }
    }, [success, error])

    const submitHandle = () => {


        // **** ___Add Filters here
        // console.log(imagesPreview.length)
        // console.log(images.length) 
        // console.log(name)
        // console.log(additionalDescription)
        // console.log(itemDesc)
        // console.log(additionalDescription)
        // console.log(donateUsing)
        // console.log(itemTypes)

        const formData = new FormData();

        formData.append("name", name);

        swearjarEng.setLang("en");
        const cleanAddDescEng = swearjarEng.censor(additionalDescription);
        swearjarFil.setLang("ph");
        const cleanAddDescFil = swearjarEng.censor(cleanAddDescEng);

        formData.append("addional_desciption", cleanAddDescFil);
        if (itemTypes.includes("Other")) {
            formData.append("item_desc", itemDesc);
        } else {
            formData.append("item_desc", "");
        }

        images.forEach(image => {
            formData.append('images', image)
        })

        itemTypes.forEach(it => {
            formData.append('item_types', it)
        })

        formData.append("donate_using", "Real name")
        formData.append('notifCode', notifCode);
        // console.log(formData)
        dispatch(addItem(formData))
    }

    const message = () => {
        let message = "";
        for (let index = 0; index < additionalDescriptionMessage.length; index++) {
            if(index < 30) {
                message += additionalDescriptionMessage[index];
            }
        }

        return("(" + message + "...)");
    }

    const additionalDetailsModal = (additionalDescriptionMessage) => {
        setModalVisible(true);
        setModalContent(additionalDescriptionMessage);
    }

    return (
        <>{loading ?
            <View style={{ position: "relative", top: windowHeight / 3 }}>
                <ActivityIndicator size="large" color="#1E5128" />
                <Text style={[{ color: "grey", textAlign: "center", marginVertical: 24, fontStyle: "italic" }]}>Submitting Item </Text>
            </View> :
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={RandomStyle.vContainer}>
                    <View style={RandomStyle.vHeader}>
                        <Text style={RandomStyle.vText1}>Donate items</Text>
                    </View>


                    <Modal animationType="slide" transparent={true} visible={modalVisibleDontsAndDos} onRequestClose={() => setModalVisibleDontsAndDos(!modalVisibleDontsAndDos)}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <ScrollView contentContainerStyle={RandomStyle.nfAddInfoModal}>
                                <View style={RandomStyle.nfAddInfoModalView}>
                                    <Image source={require('../../assets/donate_dos_donts_mobile_jw4h2b.png')} style={RandomStyle.nfAddInfoImg} />

                                    <View style={{ position: "absolute", bottom: 8, width: windowWidth, alignItems: "center" }}>
                                        <Checkbox size="sm" onChange={dontShowHandler} colorScheme="green" value="test">
                                            <Text style={{ fontSize: 12 }}> Don't show it again</Text>
                                        </Checkbox>

                                        <BhButton medium onPress={() => setModalVisibleDontsAndDos(false)}>
                                            <Text style={{ color: "white", fontSize: 10 }}>I Understand</Text>
                                        </BhButton>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>




                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                            <View style={[RandomStyle.usModal, {  flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                                <View style={[RandomStyle.usPoints,{backgroundColor:"#1e5128"}]}>
                                    <VStack>
                                        <VStack>
                                            <Text style={{ fontWeight: "bold",color:"white" }}>{modalContent}</Text>
                                        </VStack>
                                        <TouchableOpacity style={[RandomStyle.usClosec,{backgroundColor:"darkgreen"}]} onPress={() => setModalVisible(false)}>
                                            <Text style={RandomStyle.usClose}>
                                                CLOSE
                                            </Text>
                                        </TouchableOpacity>
                                    </VStack>
                                </View>
                            </View>
                        </Modal>

                    <VStack justifyContent={"center"} alignItems={'center'}>
                        <BhButton large onPress={capImage}>
                            <VStack alignItems={"center"}>
                                <MaterialCommunityIcons color={"white"} size={30} name="camera"/>
                                <Text style={{ color: "white" }}>Capture Image</Text>
                            </VStack>
                        </BhButton>
                        <BhButton large onPress={pickImage}>
                            <Text style={{ color: "white" }}><MaterialCommunityIcons size={15} name="upload"/> Upload Image</Text>
                        </BhButton>
                    </VStack>

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

                    <Text style={RandomStyle.vText2}>Type of Donation<Text style={{color:"red"}}>*</Text></Text>
                    <View style={RandomStyle.vContainer2}>
                        <CheckboxBtn isChecked={itemTypes.includes("Food")} onPress={(e) => { !itemTypes.includes("Food") ? setItemTypes(oldArray => [...oldArray, "Food"]) : setItemTypes(itemTypes.filter(type => type !== "Food")) }} >
                            <Text style={{ color: "white" }}>Food</Text>
                        </CheckboxBtn>
                        <CheckboxBtn isChecked={itemTypes.includes("Medical")} onPress={(e) => { !itemTypes.includes("Medical") ? setItemTypes(oldArray => [...oldArray, "Medical"]) : setItemTypes(itemTypes.filter(type => type !== "Medical")) }} >
                            <Text style={{ color: "white" }}>Medical</Text>
                        </CheckboxBtn>
                        <CheckboxBtn isChecked={itemTypes.includes("Cleaning Materials")} onPress={(e) => { !itemTypes.includes("Cleaning Materials") ? setItemTypes(oldArray => [...oldArray, "Cleaning Materials"]) : setItemTypes(itemTypes.filter(type => type !== "Cleaning Materials")) }} >
                            <Text style={{ color: "white" }}>Cleaning Materials</Text>
                        </CheckboxBtn>
                        <CheckboxBtn isChecked={itemTypes.includes("Other")} onPress={(e) => { !itemTypes.includes("Other") ? setItemTypes(oldArray => [...oldArray, "Other"]) : setItemTypes(itemTypes.filter(type => type !== "Other")); setTypeOther(!typeOther) }} >
                            <Text style={{ color: "white" }}>Other</Text>
                        </CheckboxBtn>
                        
                        {typeOther === true ?
                            <TextInput style={Form1.textInput2} placeholder="If other, please specify here" value={itemDesc} onChangeText={(value) => { setItemDesc(value) }} />
                            : null
                        }
                    </View>

                    <Text style={RandomStyle.vText2}>Item Name<Text style={{color:"red"}}>*</Text> </Text>
                    <View style={RandomStyle.vContainer2}>
                        <TextInput placeholder="..." style={Form1.textInput2} value={name} onChangeText={(value) => { setName(value) }} />
                    </View>

                    <Text style={RandomStyle.vText2}>
                        Additional Details
                    </Text>
                    <Text style={{fontStyle:"italic", color:"gray", fontSize:10}}>{additionalDescriptionMessage}</Text>
                    <View style={RandomStyle.vContainer2}>
                        <TextInput textAlignVertical="top" numberOfLines={3} style={Form1.textInput2} value={additionalDescription} onChangeText={(value) => { setAdditionalDescription(value) }} />
                    </View>

                    {/* <Text style={RandomStyle.vText2}>Donated by: </Text>
                    <View style={RandomStyle.vContainer3}>
                        <Select marginTop={1} placeholder="Name to be shown" selectedValue={donateUsing} onValueChange={item => setDonateUsing(item)}>
                            <Select.Item label="Real Name" value="Real name" />
                            <Select.Item label="Alias" value="Alias" />
                            <Select.Item label="Anonymous" value="Anonymous" />
                        </Select>
                    </View> */}


                    {loading ?
                        <BhButton center medium disabled>
                            <ActivityIndicator size="small" color="#00ff00" />
                        </BhButton> :
                        <BhButton center medium onPress={submitHandle}>
                            <Text style={{ color: "white" }}>Submit</Text>
                        </BhButton>
                    }
                </View>
            </ScrollView>
        }
        </>
    )
}

export default PublicReportsAdd;