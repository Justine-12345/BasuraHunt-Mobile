import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { HStack, Select, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import MapViewer from "../../maps/MapViewer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { claimItem, cancelItem, confirmItem, receiveItem, deleteItem, clearErrors } from "../../../Redux/Actions/itemActions";
import { CLAIM_ITEM_RESET, CANCEL_ITEM_RESET, CONFIRM_ITEM_RESET, RECEIVE_ITEM_RESET, DELETE_ITEM_RESET } from "../../../Redux/Constants/itemConstants";

const PublicDonationsView = (props) => {
    const dispatch = useDispatch();
    const item = props.route.params.item

    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [identity, setIdentity] = useState("");
    const [userID, setUserID] = useState("");

    const creationDate = new Date(item.createdAt).toLocaleDateString()

    const { loading, error, isClaimed, isCanceled, isConfirmed, isReceived, isDeleted } = useSelector(state => state.item);

    const barangays = {
        Bagumbayan: [121.05924206803411, 14.473774649313196],
        Bambang: [121.07297471217399, 14.52577008620341],
        Calzada: [121.08000894132097, 14.533619787394496],
        Hagonoy: [121.06162966585019, 14.511649221382521],
        "Ibayo-Tipas": [121.08475762358806, 14.541766751550389],
        "Ligid-Tipas": [121.08473120422887, 14.541773687735182],
        "Lower Bicutan": [121.06229965724987, 14.488944645566308],
        "New Lower Bicutan": [121.0652470367573, 14.505379302559184],
        Napindan: [121.0961600538771, 14.540263915184013],
        Palingon: [121.08018865634412, 14.538256882049698],
        "San Miguel": [121.07480765437771, 14.517814348623812],
        "Santa Ana": [121.07686198942896, 14.527932178623535],
        Tuktukan: [121.07181460457123, 14.528203695545075],
        Ususan: [121.06870824841819, 14.535486937998462],
        Wawa: [121.07509642634135, 14.521833881862982],
        "Central Bicutan": [121.05406605687651, 14.49200668084731],
        "Central Signal Village": [121.05654718163518, 14.511360625728697],
        "Fort Bonifacio": [121.02685222392394, 14.5256292940773],
        Katuparan: [121.05838280343642, 14.521473719288505],
        "Maharlika Village": [121.05539748012504, 14.497235903682506],
        "North Daang Hari": [121.04829074488599, 14.485817269464212],
        "North Signal Village": [121.05557948004248, 14.51529618707773],
        Pinagsama: [121.0556073, 14.5230837],
        "South Daang Hari": [121.04876862250126, 14.47146040914458],
        "South Signal Village": [121.05354243593912, 14.505188137766536],
        Tanyag: [121.04944295523825, 14.47817374094515],
        "Upper Bicutan": [121.05034993106864, 14.496916364200366],
        "Western Bicutan": [121.03811937461039, 14.509578360670313],
    }

    let uniqueIt = []
    let images = [];

    item.images.forEach(img => {
        images.push({ uri: img.url })
    });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const donatedUsing = (item) => {
        let donatedUsing = "";
        if (item) {
            if (item.donate_using === "Real name") {
                donatedUsing = item.user_id.first_name + " " + item.user_id.last_name + " | Level " + item.user_id.level;
            }
            if (item.donate_using === "Alias") {
                donatedUsing = item.user_id.alias + " | Level " + item.user_id.level;
            }
            if (item.donate_using === "Anonymous") {
                donatedUsing = "Anonymous" + " | Level " + item.user_id.level;
            }
        }
        return donatedUsing;
    }

    const formatDate = (itemDate) => {
        let dateCreated = new Date(itemDate);

        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const month = months[dateCreated.getMonth()];
        const year = dateCreated.getFullYear();

        const formattedDate = month + " " + dateCreated.getDate() + ", " + year;

        return formattedDate;
    }

    const typeArray = (types) => {
        let typeArray = [];

        if (types) {
            for (let i = 0; i <= types.length - 1; i++) {
                typeArray.push(types[i].type)
            }
        }

        return typeArray
    }

    const claimHandler = (id) => {
        dispatch(claimItem(id))
    }

    const cancelHandler = (id) => {
        dispatch(cancelItem(id))
    }

    const confirmHandler = (id) => {
        dispatch(confirmItem(id))
    }

    const receiveHandler = (id) => {
        dispatch(receiveItem(id))
    }

    const deleteItemHandler = (id) => {
        dispatch(deleteItem(id));
    }

    useEffect(() => {
        let user;
        AsyncStorage.getItem("user")
            .then((res) => {
                user = JSON.parse(res)
                setUserID(user)
            })
            .catch((error) => console.log(error))

        if (isClaimed) {
            Toast.show({
                type: 'success',
                text1: 'Item Claimed Successfully',
                text2: 'The item has been claimed'
            });
            setUserID('')
            dispatch({ type: CLAIM_ITEM_RESET })
            console.log("success")
            props.navigation.navigate('PublicDonationsList', { screen: 'PublicDonationsNav' });
        }

        if (isCanceled) {
            Toast.show({
                type: 'success',
                text1: 'Item Canceled Successfully',
                text2: 'The item has been canceled'
            });
            setUserID('')
            dispatch({ type: CANCEL_ITEM_RESET })
            console.log("success")
            props.navigation.navigate('PublicDonationsList', { screen: 'PublicDonationsNav' });
        }

        if (isConfirmed) {
            Toast.show({
                type: 'success',
                text1: 'Item Confirmed Successfully',
                text2: 'The item has been confirmed'
            });
            setUserID('')
            dispatch({ type: CONFIRM_ITEM_RESET })
            console.log("success")
            props.navigation.navigate('PublicDonationsList', { screen: 'PublicDonationsNav' });
        }

        if (isReceived) {
            Toast.show({
                type: 'success',
                text1: 'Item Received Successfully',
                text2: 'The item has been received'
            });
            setUserID('')
            dispatch({ type: RECEIVE_ITEM_RESET })
            console.log("success")
            props.navigation.navigate('PublicDonationsList', { screen: 'PublicDonationsNav' });
        }

        if (isDeleted) {
            Toast.show({
                type: 'success',
                text1: 'Deleted Successfully',
                text2: 'Your donation has been deleted'
            });
            setUserID('')
            dispatch({ type: DELETE_ITEM_RESET })
            console.log("success")
            props.navigation.navigate('PublicDonationsList', { screen: 'PublicDonationsNav' });
        }

    }, [isClaimed, isCanceled, isConfirmed, isReceived, isDeleted])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {console.log(isReceived)}
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Donation ({item.name})</Text>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Text style={RandomStyle.vText2}>Status: </Text>
                                <Text>{item.status}</Text>
                            </HStack>
                            {item.date_recieved != null ?
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Received: </Text>
                                    <Text>{formatDate(item.date_recieved)}</Text>
                                </HStack>
                                : null
                            }
                        </VStack>
                        <Text>{creationDate}</Text>
                    </HStack>
                    {/* Claim */}
                    <HStack style={RandomStyle.vHeaderBtns}>
                        {
                            <>
                                {
                                    (item.user_id._id) === (userID && userID._id) && (
                                        item.status === "Unclaimed" && (
                                            <TouchableOpacity>
                                                <Text style={RandomStyle.vDonationBtn} onPress={() => { deleteItemHandler(item._id) }}>Delete</Text>
                                            </TouchableOpacity>
                                        )
                                    )
                                }

                                <>
                                    {
                                        ((item.user_id._id) !== (userID && userID._id)) ? (
                                            item.status !== "Received" ? (
                                                <>
                                                    {
                                                        item.status === "Unclaimed" && (
                                                            <TouchableOpacity>
                                                                <Text style={RandomStyle.vDonationBtn} onPress={() => { claimHandler(item._id) }}>Claim</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }

                                                    {
                                                        item.status === "Claimed" ? (
                                                            <>
                                                                <TouchableOpacity>
                                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { cancelHandler(item._id) }}>Cancel</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity>
                                                                    <Text style={RandomStyle.vDonationBtn}>Confirmation in progress...</Text>
                                                                </TouchableOpacity>
                                                            </>
                                                        ) : item.status === "Confirmed" && (
                                                            <>
                                                                <TouchableOpacity>
                                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { receiveHandler(item._id) }}>Receive</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity>
                                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { cancelHandler(item._id) }}>Cancel</Text>
                                                                </TouchableOpacity>
                                                            </>
                                                        )
                                                    }
                                                    </>
                                            ) : (
                                                <TouchableOpacity>
                                                    <Text style={RandomStyle.vDonationBtn}>Received</Text>
                                                </TouchableOpacity>
                                            )
                                        ) : item.status === "Claimed" ? (
                                            <>
                                                <TouchableOpacity>
                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { confirmHandler(item._id) }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { cancelHandler(item._id) }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </>
                                        ) : item.status === "Confirmed" ? (
                                            <TouchableOpacity>
                                                <Text style={RandomStyle.vDonationBtn}>To receive...</Text>
                                            </TouchableOpacity>
                                        ) : item && item.status === "Received" && (
                                            <TouchableOpacity>
                                                <Text style={RandomStyle.vDonationBtn}>Received</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </>
                            </>
                        }

                        <TouchableOpacity>
                            <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat} />
                        </TouchableOpacity>
                    </HStack>
                </View>
                <HStack>
                    <Text style={RandomStyle.vText2}>Drop point: </Text>
                    <Text>{item.barangay_hall}</Text>
                </HStack>
                <View style={RandomStyle.vMapContainer}>
                    <MapViewer long={barangays[item.barangay_hall][0]} lati={barangays[item.barangay_hall][1]} />
                </View>
                <View style={RandomStyle.vImages}>
                    {item.images.map((img, index) =>
                        <TouchableOpacity key={index} onPress={() => showImages(index)}>
                            <Image style={RandomStyle.vImage} source={{ uri: img.url }} resizeMode="cover" />
                        </TouchableOpacity>
                    )}
                    <ImageView
                        images={images}
                        imageIndex={imgIndex}
                        visible={openImages}
                        onRequestClose={() => setOpenImages(false)}
                    />
                </View>

                <Text style={RandomStyle.vText2}>Type</Text>
                <View style={RandomStyle.vContainer2}>
                    {item.item_type.forEach(it => {
                        if (!uniqueIt.includes(it.type)) {
                            uniqueIt.push(it.type)
                        }
                    }
                    )}
                    {uniqueIt.map(it =>
                        <Text key={it} style={RandomStyle.vOption}>{it}</Text>
                    )}
                </View>
                {typeArray(item.item_type).includes('Other') && (
                    <View style={RandomStyle.vContainer2}>
                        <Text style={{ alignSelf: "flex-end" }}>{item.item_desc}</Text>
                    </View>
                )}

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{item.addional_desciption}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Donated by</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>*{donatedUsing(item)}*</Text>
                </View>

            </View>
        </ScrollView>
    )
}

export default PublicDonationsView;