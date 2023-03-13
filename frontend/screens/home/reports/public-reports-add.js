import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, ImagePickerIOS, StyleSheet, Dimensions, Switch, ActivityIndicator, Modal } from "react-native";
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
import { USER_DUMP_PAGE_RESET } from "../../../Redux/Constants/userConstants";
import { Skeleton } from "native-base";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Ionicons } from "@expo/vector-icons";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const swearjarEng = require('swearjar-extended2');
const swearjarFil = require('swearjar-extended2');

const PublicReportsAdd = ({ navigation }) => {
    const dispatch = useDispatch()
    const { latitude: mapLatitude, longitude: mapLongtitude } = useSelector(state => state.coordinate)
    const { loading, success, dump, error } = useSelector(state => state.newDump)
    const { initializing } = useSelector(state => state.mapLoading)
    let longitude = 0
    let latitude = 0
    const [notifCode, setNotifCode] = useState('')
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [type, setType] = useState("");
    const [complete_address, setComplete_address] = useState('')
    const [landmark, setLandmark] = useState('')
    const [barangay, setBarangay] = useState('')
    const [purok, setPurok] = useState('')
    const [waste_type, setWaste_type] = useState([])
    const [waste_desc, setWaste_desc] = useState('')
    const [waste_size, setWaste_size] = useState('')
    const [accessible_by, setAccessible_by] = useState('')
    const [category_violation, setCategory_violation] = useState('')
    const [additional_desciption, setAdditional_desciption] = useState('')
    const [reportUsing, setReportUsing] = useState('')
    const [reportAnonymously, setReportAnonymously] = useState(false)
    const [mapHeight, setMapHeight] = useState(0);
    const [mapWidth, setMapWidth] = useState(0);
    const [btnAdd, setBtnAdd] = useState(false);
    const [user, setUser] = useState();
    const [selectedItemForAdditionalDesc, setSelectedItemForAdditionalDesc] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContentIndex, setModalContentIndex] = useState(0);
   
    // const setLongitude = (longitudeValue) =>{
    //     longitude =
    // }



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
        setNotifCode(RandomStringGenerator(40))
        AsyncStorage.getItem("user")
            .then((res) => {
                setUser(JSON.parse(res))
            })
            .catch((error) => console.log(error))


        if (success) {

          
            console.log("notifCode", notifCode)
            NotificationSender(`New illegal dump report in ${dump && dump.complete_address} Brgy.${dump && dump.barangay}`, user._id, null, barangay, 'illegalDump-new', notifCode, dump && dump)

            Toast.show({
                type: 'success',
                text1: 'Submitted Successfully',
                text2: 'Your illegal dump report has been submited'
            });
            setImages([]);
            setImagesPreview([]);
            setComplete_address('')
            setLandmark('')
            setBarangay('')
            setPurok('')
            setWaste_type([])
            setWaste_desc('')
            setWaste_size('')
            setAccessible_by('')
            setCategory_violation('')
            setAdditional_desciption('')
            setReportUsing('')
            setReportAnonymously(false)
            dispatch({ type: RESET_COORDINATE })
            dispatch({ type: NEW_DUMP_RESET })
            dispatch({ type: USER_DUMP_PAGE_RESET })
            // dispatch(reportedDumps(1))
            navigation.navigate('User', { screen: 'MyReports', params: { screen: 'UserReportsList' } });
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
    }, [success, error])

    const pickImage = async () => {

        // **** ___5 images
        if (images.length <= 4) {
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
        }
    }

    const capImage = async () => {

        // **** ___5 images
        if (images.length <= 4) {
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


        // **** ___Add Filters here
        // console.log(imagesPreview.length)
        // console.log(images.length) 
        // console.log(landmark)
        // console.log(barangay)
        // console.log(waste_type)
        // console.log(waste_desc)
        // console.log(waste_size)
        // console.log(accessible_by)
        // console.log(category_violation)
        // console.log(additional_desciption)
        // console.log(reportUsing)
        // console.log(reportAnonymously)
        // console.log(mapLatitude)

        const formData = new FormData();

        formData.append("latitude", mapLatitude && mapLatitude);
        formData.append("longtitude", mapLongtitude && mapLongtitude);
        formData.append("complete_address", complete_address);
        formData.append("landmark", landmark);
        formData.append("barangay", barangay);
        formData.append("purok", purok);
        if (waste_type.includes("Other")) {
            formData.append("waste_desc", waste_desc);
        } else {
            formData.append("waste_desc", "");
        }

        if (btnAdd) {
            formData.append("waste_size", waste_size);
            formData.append("accessible_by", accessible_by);
            formData.append("category_violation", category_violation);
        }
        // console.log("selectedItemForAdditionalDesc", selectedItemForAdditionalDesc)
        formData.append("additional_desciption", selectedItemForAdditionalDesc);


        images.forEach(images => {
            formData.append('images', images)
        })

        waste_type.forEach(wt => {
            formData.append('waste_type', wt)
        })

        if (reportAnonymously === true) {
            formData.append("reportUsing", "Anonymous")
        } else {
            formData.append("reportUsing", "Alias")
        }
        formData.append('notifCode', notifCode);
        dispatch(newDump(formData))
    }


    const additional_detail_handler = (addDescVal) => {
        swearjarEng.setLang("en");
        const cleanAddDescEng = swearjarEng.censor(addDescVal);
        swearjarFil.setLang("ph");
        const cleanAddDescFil = swearjarEng.censor(cleanAddDescEng);
        // console.log("cleanAddDescFil",cleanAddDescFil)
        setSelectedItemForAdditionalDesc(cleanAddDescFil)

    }


    const ModalContent = () => {
        if (modalContentIndex === 0) {
            return (
                <ScrollView>
                    <View>

                        <Text style={{ color: "white", marginBottom: 10 }}>Illegal dumping is one of the major problems in our country and worldwide since they can produce plenty of
                            negative impacts on people's health and our environment. An example of the negative effect of illegal dumps are floods, diseases to the community,
                            and climate change. The application's main objective is to reduce and prevent illegal dumps in Taguig City with the help of the Taguig residents.
                            With the help of our application and reporting of the dumping in unauthorized garbage collection points in Taguig City, we can save not only our
                            community but also our mother nature. With the following steps, we can protect and keep our surroundings:</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>1. Click the Report Illegal Dumps tab.</Text>

                        <Image style={{
                            width: windowWidth - 88,
                            height: 650, resizeMode: "center"
                        }}
                            source={require("../../../assets/report1.jpg")}
                        />


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>2. Upload or capture an image of the scene or location where the illegal dump is and provide at least 1 picture and not more than five.</Text>
                        <Image style={{
                            width: windowWidth - 88,
                            height: 650, resizeMode: "center"
                        }}
                            source={require("../../../assets/report2.jpg")}
                        />
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>3. Enter the complete address/location and the barangay of the illegal dumps inlcuding the nearest landmark.</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>4. Pin the exact location or place on the map where the illegal dump is.</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>5. Select all the possible types of garbage that can be seen in the illegal dump.</Text>
                        <Image style={{
                            width: windowWidth - 88,
                            height: 650, resizeMode: "center"
                        }}
                            source={require("../../../assets/report3.jpg")}
                        />
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>6. Choose whether to stay anonymous or use real name when reporting to protect/hide your identity</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>7. Include as much information about the scene and location of the illegal dump as possible.(Optional)</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>8. Select the possible size of garbage that will be collected by the trash collector.(Optional)</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>9. Choose from the options which can access the illegal dump based on its location.(Optional)</Text>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>10. Submit the report and wait for the action of the authorities.</Text>
                    </View>
                </ScrollView>

            )
        } else if (modalContentIndex === 1) {
            return (
                <ScrollView>
                    <View>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>1. Animal Corpse</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any dead or slaughtered animal, usually seen on the road because of an accident. <Text style={{ fontStyle: 'italic' }}>Examples: animal bones, dead rat</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>2. Automotive</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any automobile or vehicle waste that was part of an automobile, usually damaged or not functioning component of vehicles. <Text style={{ fontStyle: 'italic' }}>Examples: wheels, automotive battery</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>3. Construction</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that was generated or produced by any construction activities and materials that are damaged. <Text style={{ fontStyle: 'italic' }}>Examples: hollow blocks, broken ply woods, steel rod
                        </Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>4. Electronics</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any electronic waste or part of electronic devices that are not functioning or not working properly. <Text style={{ fontStyle: 'italic' }}>Examples: light bulb, wires, broken televisions</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>5. Hazardous</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is potentially dangerous or harmful to the environment and any human once inhaled or touched when disposed improperly. <Text style={{ fontStyle: 'italic' }}>Examples: pesticides, ammonia, paint/solvent</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>6. Household</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that may be solid or liquid materials that any family produced in a household. <Text style={{ fontStyle: 'italic' }}>Examples: broken table, broken cabinet, broken appliances</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>7. Liquid Waste</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is formed in any liquid substances and may be produced by any household or industrial activity. <Text style={{ fontStyle: 'italic' }}>Examples: chemicals, used oils, acids
                        </Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>8. Metal/Can</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is formed in any metal materials that may be in form of any ferrous and non-ferrous metals. <Text style={{ fontStyle: 'italic' }}>Examples: tin can, canned goods, steel</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>9. Paper</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is formed in any paper and can be recycled, usually produced by work or industries. <Text style={{ fontStyle: 'italic' }}>Examples: magazine, newspaper, cardboard</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>10. Plastic</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that forms in any plastic and is usually hard to decompose. <Text style={{ fontStyle: 'italic' }}>Examples: plastic bottles, plastic bags</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>11. Glass Bottle</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that forms in any glass bottle usually contains a liquid. <Text style={{ fontStyle: 'italic' }}>Examples: wine bottle, broken glass</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>12. Organic/Food</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is from plants or animals and food that is discarded and usually biodegradable and may use as a fertilizer. <Text style={{ fontStyle: 'italic' }}>Examples: leftover food, expired food, rotten plant
                        </Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>13. Burned</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is currently burning or burned that is usually emits harmful and toxic gases or chemicals that can harm or pollute the environment. <Text style={{ fontStyle: 'italic' }}>Examples: Burned plastics, Treated Woods, Burned Paper</Text></Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>14. Other</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Any waste that is not specified in the categories.</Text>


                    </View>
                </ScrollView>
            )
        } else if (modalContentIndex === 2) {
            return (
                <ScrollView>
                    <View>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>1. Trash Bin</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Trash that is small and can only be collected in a trash bin.</Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>2. Dump Truck</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>A large amount of waste that cannot be disposed of in a trash can and must be collected using a dump truck.</Text>
                    </View>
                </ScrollView>
            )
        } else if (modalContentIndex === 3) {
            return (
                <ScrollView>
                    <View>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>1. People</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Trash collectors will accumulate the illegal dumps in the specific area when the reported location in Taguig City are not yet fully developed, and any vehicles cannot access or make an entry into the area.</Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>2. Tricycle</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Tricycle or any three wheels vehicle will collect the reported illegal dumps when the reported location or place is only accessible by any petite or three wheels vehicle.</Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>3. Motorcycle/Bike</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Motorcycle, Bike, or any two wheels vehicle will collect the reported illegal dumps when the reported location or place is only accessible by any petite or two wheels vehicle.</Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>4. Truck/Car</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Small or Big Dump Trucks or any vehicle will collect the reported illegal dumps when the reported location is accessible by any vehicles or automobile.</Text>


                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>5. Boat</Text>
                        <Text style={{ color: "white", fontSize: 14, marginLeft: 24 }}>Only accessible by a boat to collect and clean the illegal waste when the reported area is not yet fully developed and is near to the shorelines, rivers, or any body of water such as ‘Estero’.</Text>


                    </View>
                </ScrollView>
            )
        }

    }

    return (
        <>

            {loading ?
                <View style={{ position: "relative", top: windowHeight / 3 }}>
                    <ActivityIndicator size="large" color="#1E5128" />
                    <Text style={[{ color: "grey", textAlign: "center", marginVertical: 24, fontStyle: "italic" }]}>Submitting Report </Text>
                </View> :

                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ paddingBottom: 200 }}
                >




                    <View style={RandomStyle.vContainer}>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>


                                <View style={styles.modalView}>
                                    <View>

                                        {modalContentIndex === 0 ? <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>How to Report Illegal Dumps?</Text> :
                                            modalContentIndex === 1 ? <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Types of Waste</Text> :
                                                modalContentIndex === 2 ? <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Size of Waste</Text> :
                                                    modalContentIndex === 3 ? <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Accessible By</Text> : ""

                                        }

                                        <TouchableOpacity
                                            style={{ position: "absolute", right: -5, top: -5 }}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}><Ionicons style={{ color: "white", fontWeight: 'bold', fontSize: 18 }} name="close-circle-outline"></Ionicons></Text>
                                        </TouchableOpacity>
                                    </View>

                                    <ModalContent />

                                </View>

                            </View>
                        </Modal>


                        <View style={RandomStyle.vHeader}>
                            <HStack justifyContent={"space-between"}>
                                <Text style={RandomStyle.vText1}>Report an Illegal Dump</Text>
                                <TouchableOpacity style={{ position: "relative", top: 3 }} onPress={() => {
                                    setModalContentIndex(0);
                                    setModalVisible(true)
                                }}>
                                    <Ionicons style={{ color: "#1e5128", fontWeight: 'bold', fontSize: 24 }} name="help-circle-outline"></Ionicons>
                                </TouchableOpacity>
                            </HStack>
                        </View>
                        {/* ========== */}
                        {initializing === true ? <>

                            <HStack justifyContent={"space-between"}>
                                <Skeleton style={[[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }], { paddingBottom: 0 }]} height={35} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0 }]} height={35} width={"40%"} animation="pulse" />

                            </HStack>

                            <VStack>
                                <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                                <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />
                            </VStack>
                            <VStack>
                                <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                                <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />
                            </VStack>
                            <Text style={RandomStyle.vText2}>Barangay</Text>
                            <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />
                            <Text style={RandomStyle.vText2}>Purok</Text>
                            <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />

                        </> :
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

                                <VStack>
                                    <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                                    <TextInput value={complete_address} onChangeText={(complete_address_value) => { setComplete_address(complete_address_value) }} placeholder="..." style={Form1.textInput2} />
                                </VStack>
                                <VStack>
                                    <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                                    <TextInput value={landmark} onChangeText={(landmark_value) => { setLandmark(landmark_value) }} placeholder="..." style={Form1.textInput2} />
                                </VStack>

                                <Text style={RandomStyle.vText2}>Barangay</Text>
                                <Select
                                    selectedValue={barangay}
                                    onValueChange={(barangay_value) => setBarangay(barangay_value)}>
                                    {barangays.map((barangay) =>
                                        <Select.Item key={barangay} value={barangay} label={barangay} />
                                    )

                                    }

                                </Select>

                                <VStack>
                                    <Text style={RandomStyle.vText2}>Purok (optional): </Text>
                                    <TextInput keyboardType="numeric" value={purok} onChangeText={(purok_value) => { purok_value>=0?setPurok(purok_value):null }} placeholder="..." style={Form1.textInput2} />
                                </VStack>


                                <View style={{ width: 50, justifyContent: 'center', borderWidth: 0, alignItems: 'center', position: "relative", left: (mapWidth / 2) - 25, top: (mapHeight / 2) + 2, zIndex: 5 }}>
                                    <Image style={{ height: 50, width: 50, zIndex: 1 }} source={{ uri: "https://img.icons8.com/glyph-neue/100/26ff00/marker.png" }} resizeMode="stretch" />
                                </View>
                            </>
                        }
                        {/* ========= */}

                        <View onLayout={onLayout} style={RandomStyle.vMapContainer}>
                            <MapFinder />
                        </View>

                        {/* === */}
                        {initializing === true ? <>
                            <HStack style={{ marginVertical: 8 }}>
                                <Text style={RandomStyle.vText2}>Type of Waste</Text>
                            </HStack>
                            <View style={RandomStyle.vContainer2}>
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                            </View>

                            <Text style={RandomStyle.vText2}>Additional Details</Text>
                            <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0 }]} height={20} animation="pulse" />

                            <Skeleton style={[RandomStyle.vContainer3, { alignSelf: "center", paddingBottom: 0 }]} height={35} width={150} animation="pulse" />

                        </> :
                            <>
                                <HStack style={{ marginVertical: 8 }} >
                                    <Text style={RandomStyle.vText2}>Type of Waste</Text>
                                    <TouchableOpacity style={{ position: "relative", top: 0 }} onPress={() => {
                                        setModalContentIndex(1);
                                        setModalVisible(true)
                                    }}>
                                        <Ionicons style={{ color: "#1e5128", fontWeight: 'bold', fontSize: 24 }} name="help-circle-outline"></Ionicons>
                                    </TouchableOpacity>
                                </HStack>
                                <View style={RandomStyle.vContainer2}>
                                    <CheckboxBtn isChecked={waste_type.includes("Animal Corpse")} /*onPress={()=>setTypeAC(!typeAC)}*/ onPress={(e) => { !waste_type.includes("Animal Corpse") ? setWaste_type(oldArray => [...oldArray, "Animal Corpse"]) : setWaste_type(waste_type.filter(type => type !== "Animal Corpse")) }} >
                                        <Text style={{ color: "white" }}>Animal Corpse</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Automotive")} /*onPress={()=>setTypeAU(!typeAU)}*/ onPress={(e) => { !waste_type.includes("Automotive") ? setWaste_type(oldArray => [...oldArray, "Automotive"]) : setWaste_type(waste_type.filter(type => type !== "Automotive")) }}>
                                        <Text style={{ color: "white" }}>Automotive</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Burned")} /*onPress={()=>setTypeBU(!typeBU)}*/ onPress={(e) => { !waste_type.includes("Burned") ? setWaste_type(oldArray => [...oldArray, "Burned"]) : setWaste_type(waste_type.filter(type => type !== "Burned")) }}>
                                        <Text style={{ color: "white" }}>Burned</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Construction")} /*onPress={()=>setTypeCO(!typeCO)}*/ onPress={(e) => { !waste_type.includes("Construction") ? setWaste_type(oldArray => [...oldArray, "Construction"]) : setWaste_type(waste_type.filter(type => type !== "Construction")) }}>
                                        <Text style={{ color: "white" }}>Construction</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Electronics")} /*onPress={()=>setTypeEL(!typeEL)}*/ onPress={(e) => { !waste_type.includes("Electronics") ? setWaste_type(oldArray => [...oldArray, "Electronics"]) : setWaste_type(waste_type.filter(type => type !== "Electronics")) }}>
                                        <Text style={{ color: "white" }}>Electronics</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Hazardous")} /*onPress={()=>setTypeHH(!typeHH)}*/ onPress={(e) => { !waste_type.includes("Hazardous") ? setWaste_type(oldArray => [...oldArray, "Hazardous"]) : setWaste_type(waste_type.filter(type => type !== "Hazardous")) }}>
                                        <Text style={{ color: "white" }}>Hazardous</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Household")} /*onPress={()=>setTypeHH(!typeHH)}*/ onPress={(e) => { !waste_type.includes("Household") ? setWaste_type(oldArray => [...oldArray, "Household"]) : setWaste_type(waste_type.filter(type => type !== "Household")) }}>
                                        <Text style={{ color: "white" }}>Household</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Liquid Waste")} /*onPress={()=>setTypeLW(!typeLW)}*/ onPress={(e) => { !waste_type.includes("Liquid Waste") ? setWaste_type(oldArray => [...oldArray, "Liquid Waste"]) : setWaste_type(waste_type.filter(type => type !== "Liquid Waste")) }}>
                                        <Text style={{ color: "white" }}>Liquid Waste</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Metal/Can")} /*onPress={()=>setTypeMC(!typeMC)}*/ onPress={(e) => { !waste_type.includes("Metal/Can") ? setWaste_type(oldArray => [...oldArray, "Metal/Can"]) : setWaste_type(waste_type.filter(type => type !== "Metal/Can")) }}>
                                        <Text style={{ color: "white" }}>Metal/Can</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Paper")} /*onPress={()=>setTypePP(!typePP)}*/ onPress={(e) => { !waste_type.includes("Paper") ? setWaste_type(oldArray => [...oldArray, "Paper"]) : setWaste_type(waste_type.filter(type => type !== "Paper")) }}>
                                        <Text style={{ color: "white" }}>Paper</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Plastic")} /*onPress={()=>setTypePL(!typePL)}*/ onPress={(e) => { !waste_type.includes("Plastic") ? setWaste_type(oldArray => [...oldArray, "Plastic"]) : setWaste_type(waste_type.filter(type => type !== "Plastic")) }}>
                                        <Text style={{ color: "white" }}>Plastic</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Glass Bottle")} /*onPress={()=>setTypeGB(!typeGB)}*/ onPress={(e) => { !waste_type.includes("Glass Bottle") ? setWaste_type(oldArray => [...oldArray, "Glass Bottle"]) : setWaste_type(waste_type.filter(type => type !== "Glass Bottle")) }}>
                                        <Text style={{ color: "white" }}>Glass Bottle</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Organic/Food")} /*onPress={()=>setTypeOF(!typeOF)}*/ onPress={(e) => { !waste_type.includes("Organic/Food") ? setWaste_type(oldArray => [...oldArray, "Organic/Food"]) : setWaste_type(waste_type.filter(type => type !== "Organic/Food")) }}>
                                        <Text style={{ color: "white" }}>Organic/Food</Text>
                                    </CheckboxBtn>
                                    <CheckboxBtn isChecked={waste_type.includes("Other")} /*onPress={()=>setTypeOther(!typeOther)}*/ onPress={(e) => { !waste_type.includes("Other") ? setWaste_type(oldArray => [...oldArray, "Other"]) : setWaste_type(waste_type.filter(type => type !== "Other")) }}>
                                        <Text style={{ color: "white" }}>Other</Text>
                                    </CheckboxBtn>


                                    {waste_type.includes("Other") ?
                                        <TextInput onChangeText={(waste_desc_value) => { setWaste_desc(waste_desc_value) }} style={Form1.textInput2} placeholder="If other, please specify here" />
                                        : null
                                    }
                                </View>

                                <HStack alignItems="center" space={1}>
                                    <Text style={RandomStyle.vText2} fontSize="lg">Report Anonymously</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#2B822E" }}
                                        thumbColor={reportAnonymously ? "#09DE10" : "#f4f3f4"}
                                        ios_backgroundColor="white"
                                        onValueChange={(report_anonymously_value) => setReportAnonymously(report_anonymously_value)}
                                        value={reportAnonymously}
                                    />
                                </HStack>

                                <Text style={RandomStyle.vText2}>Additional Details</Text>

                                {/* <TextInput value={additional_desciption} onChangeText={(additional_desciption_value) => { setAdditional_desciption(additional_desciption_value) }} textAlignVertical="top" numberOfLines={3} style={Form1.textInput2} /> */}
                                <View>
                                    <AutocompleteDropdown
                                        onChangeText={(addDescVal) => additional_detail_handler(addDescVal && addDescVal)}
                                        direction="up"
                                        clearOnFocus={false}
                                        closeOnBlur={true}
                                        closeOnSubmit={false}
                                        // initialValue={{ id: '2' }} // or just '2'
                                        onSelectItem={e => setSelectedItemForAdditionalDesc(e && e.title)}
                                        dataSet={[
                                            { id: '1', title: 'Harmful to the health.' },
                                            { id: '2', title: 'Can Be Fire Hazards' },
                                            { id: '3', title: 'Has bad effects on birds, animals, and plants.' },
                                            { id: '4', title: 'Bad smell.' },
                                            { id: '5', title: 'Blocking the street or road.' },
                                            { id: '6', title: 'Blocking the waterways.' },
                                            { id: selectedItemForAdditionalDesc, title: selectedItemForAdditionalDesc },
                                        ]}
                                        textInputProps={{
                                            // placeholder: 'Type 3+ letters (dolo...)',
                                            autoCorrect: false,
                                            autoCapitalize: 'none',
                                            style: {
                                                backgroundColor: "'#ffffff'",
                                                color: '#000',
                                                paddingLeft: 18,
                                                border: "1px solid gray"
                                            },
                                        }}
                                        rightButtonsContainerStyle={{
                                            right: 8,
                                            height: 30,
                                            backgroundColor: '#ffffff',
                                            alignSelf: 'center',
                                        }}
                                        inputContainerStyle={{
                                            backgroundColor: '#ffffff',
                                            border: "1px solid gray"
                                        }}
                                        containerStyle={Form1.textInput2AdditionalDetails}
                                    />
                                </View>

                                <View style={RandomStyle.vContainer3}>
                                    <BhButton gray={!btnAdd} center large onPress={() => setBtnAdd(!btnAdd)}>
                                        <Text style={{ color: "white" }}>Add more info (Optional)</Text>
                                    </BhButton>

                                    {btnAdd === true ?
                                        <VStack>
                                            <HStack style={{ marginVertical: 8 }}>
                                                <Text style={RandomStyle.vText2}>Size of Waste</Text>
                                                <TouchableOpacity style={{ position: "relative", top: 0 }} onPress={() => {
                                                    setModalContentIndex(2);
                                                    setModalVisible(true)
                                                }}>
                                                    <Ionicons style={{ color: "#1e5128", fontWeight: 'bold', fontSize: 24 }} name="help-circle-outline"></Ionicons>
                                                </TouchableOpacity>
                                            </HStack>
                                            <Select
                                                selectedValue={waste_size} onValueChange={(waste_size_value) => setWaste_size(waste_size_value)}
                                            >
                                                <Select.Item value="Trash Bin" label="Trash Bin" />
                                                <Select.Item value="Dump Truck" label="Dump Truck" />
                                            </Select>

                                            <HStack style={{ marginVertical: 8 }}>
                                                <Text style={RandomStyle.vText2}>Accessible by</Text>
                                                <TouchableOpacity style={{ position: "relative", top: 0 }} onPress={() => {
                                                    setModalContentIndex(3);
                                                    setModalVisible(true)
                                                }}>
                                                    <Ionicons style={{ color: "#1e5128", fontWeight: 'bold', fontSize: 24 }} name="help-circle-outline"></Ionicons>
                                                </TouchableOpacity>
                                            </HStack>
                                            <Select
                                                selectedValue={accessible_by} onValueChange={(accessible_by_value) => setAccessible_by(accessible_by_value)}>
                                                <Select.Item value="People Only" label="People Only" />
                                                <Select.Item value="Tricycle" label="Tricycle" />
                                                <Select.Item value="Motorcycle" label="Motorcycle" />
                                                <Select.Item value="Truck/Car" label="Truck/Car" />
                                                <Select.Item value="Boat" label="Boat" />
                                            </Select>
                                        </VStack> : null
                                    }
                                </View>
                                <View style={{ zIndex: -10 }}>
                                    {loading ?
                                        <BhButton center medium disabled>
                                            <ActivityIndicator size="small" color="#00ff00" />
                                        </BhButton> :
                                        <BhButton center medium onPress={submitHandle}>
                                            <Text style={{ color: "white" }}>Submit</Text>
                                        </BhButton>
                                    }
                                </View>

                            </>
                        }
                        {/* ===== */}

                    </View>
                </ScrollView>
            }
        </>
    )
}



const styles = StyleSheet.create({

    modalView: {
        margin: 20,
        backgroundColor: "#1e5128",
        borderRadius: 20,
        padding: 24,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        borderColor: "white",
        borderWidth: 1,
        backgroundColor: "#1e5128",
        margin: 5,
        width: 200
    },
    buttonOpen: {
        backgroundColor: "#1e5128",
    },
    buttonClose: {
        backgroundColor: "#1e5128",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "700",
        lineHeight: 25,
        color: "white"
    }
});

export default PublicReportsAdd;