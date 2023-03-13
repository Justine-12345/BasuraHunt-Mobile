import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, StyleSheet, Pressable, ActivityIndicator } from "react-native";
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
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getItemDetails } from "../../../Redux/Actions/itemActions";
import { SOCKET_PORT } from "../../../Redux/Constants/socketConstants";
import io from "socket.io-client"
import NotificationSender from "../../extras/notificationSender";
import RandomStringGenerator from "../../extras/randomStringGenerator";
import { ITEM_DETAILS_RESET } from "../../../Redux/Constants/itemConstants";
import LoadingPublicDonationsView from "../../extras/loadingPages/loading-donations-view";
const socket = io.connect(SOCKET_PORT);
const PublicDonationsView = (props) => {
    const dispatch = useDispatch();
    const item_data = props.route.params.item
    const item_id = props.route.params.item_id
    const category = props.route.params.category
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [identity, setIdentity] = useState("");
    const [userID, setUserID] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState()
    const [rate, setRate] = useState(0)
    const [rateError, setRateError] = useState(false)
    const [imgIndexCleaned, setImgIndexCleaned] = useState(0);
    const [openImagesCleaned, setOpenImagesCleaned] = useState(false);
    // const creationDate = new Date(item.createdAt).toLocaleDateString()

    const { error: itemError, item: itemDetail, loading: itemLoading } = useSelector(state => state.itemDetails);
    const { loading, error, isClaimed, isCanceled, isConfirmed, isReceived, isDeleted } = useSelector(state => state.item);

    
    let uniqueIt = []
    let images = [];
    let imagesPreview = [];

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    
    const showImagesCleaned = (index) => {
        setOpenImagesCleaned(true);
        setImgIndexCleaned(index);
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
        if (rate === 0) {
            setRateError(false)
            setRateError(true)
        } else {
            setRateError(false)
            const formData = new FormData();
            formData.append('rate', rate)
            dispatch(receiveItem(id, formData))
        }
    }

    const deleteItemHandler = (id) => {
        dispatch(deleteItem(id));
    }
    useFocusEffect(
        useCallback(() => {
            return () => {
                // console.log("reset")
                setItem(null)
                dispatch({ type: ITEM_DETAILS_RESET })
            }
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            let user;
            socket.disconnect()
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
                const notifCode = RandomStringGenerator(40)
                NotificationSender(`Your donated item has been claimed by ${userID.first_name}`, userID._id, item && item.user_id && item.user_id._id, item && item.barangay_hall, 'donation-update-claim', notifCode, item && item)
                props.navigation.navigate("User", { screen: 'MyClaimed', params: { screen: 'UserClaimedDonations' } })
            }

            if (isCanceled) {
                Toast.show({
                    type: 'success',
                    text1: 'Item Canceled Successfully',
                    text2: 'The item has been canceled'
                });
                setUserID('')
                dispatch({ type: CANCEL_ITEM_RESET })
                if ((item && item.user_id && item.user_id._id) === (userID && userID._id)) {
                    const notifCode = RandomStringGenerator(40)
                    NotificationSender(`The donation has been cancelled by ${userID.first_name}`, userID._id, item && item.receiver_id && item.receiver_id._id, item && item.barangay_hall, 'donation-update-cancel', notifCode, item && item)
                    props.navigation.navigate('User', { screen: 'MyDonations', params: { screen: 'UserDonationsList' } });
                } else {
                    const notifCode = RandomStringGenerator(40)
                    NotificationSender(`Claiming of your donated item has been cancelled by ${userID.first_name}`, userID._id, item && item.user_id && item.user_id._id, item && item.barangay_hall, 'donation-update-cancel', notifCode, item && item)
                    props.navigation.navigate("User", { screen: 'MyClaimed', params: { screen: 'UserClaimedDonations' } })
                }
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
                const notifCode = RandomStringGenerator(40)
                NotificationSender(`The donation has been confirmed by ${userID.first_name}`, userID._id, item && item.receiver_id && item.receiver_id._id, item && item.barangay_hall, 'donation-update-confirm', notifCode, item && item)
                props.navigation.navigate('User', { screen: 'MyDonations', params: { screen: 'UserDonationsList' } });
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
                const notifCode = RandomStringGenerator(40)
                NotificationSender(`Your donated item has been received by ${userID.first_name}`, userID._id, item && item.user_id && item.user_id._id, item && item.barangay_hall, 'donation-update-receive', notifCode, item && item)
                setModalVisible(!modalVisible)
                props.navigation.navigate('User', { screen: 'MyReceived', params: { screen: 'UserReceivedDonations' } });

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
                props.navigation.navigate('User', { screen: 'MyDonations', params: { screen: 'UserDonationsList' } });
            }

            socket.connect()
            socket.emit("join_room", [item && item.chat_id && item.chat_id.room, 'basurahunt-notification-3DEA5E28CE9B6E926F52AF75AC5F7-94687284AF4DF8664C573E773CF31'])

            // console.log("category",category)

        }, [isClaimed, isCanceled, isConfirmed, isReceived, isDeleted, item, item_data])
    )

    item && item.images && item.images.forEach(img => {
        images.push({ uri: img.url })
    });

    item && item.received_images && item.received_images.forEach(img => {
        imagesPreview.push({ uri: img.url })
    });


    useEffect(() => {
        // console.log("item_id",item_id)
        if (item_id) {
            setItem(itemDetail)
        } else {
            setItem(item_data)
        }

        // item && item.images && item.images.forEach(img => {
        //     images.push({ uri: img.url })
        // });
    }, [itemDetail, images, item, item_id])

    return (
        <>{itemLoading ?
            <LoadingPublicDonationsView /> :

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={RandomStyle.vContainer}>
                    <View style={RandomStyle.vHeader}>
                        <Text style={RandomStyle.vText1}>Donation ({item && item.name})</Text>
                        <HStack justifyContent={"space-between"}>
                            <VStack>
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Status: </Text>


                                    <Text>{item && item.status}</Text>
                                </HStack>
                                {item && item.date_recieved != null ?
                                    <HStack>
                                        <Text style={RandomStyle.vText2}>Date Received: </Text>
                                        <Text>{item && (formatDate(item.date_recieved))}</Text>
                                    </HStack>
                                    : null
                                }
                                {item && item.receiver_name != null ?
                                    <HStack>
                                        <Text style={RandomStyle.vText2}>Received By: </Text>
                                        <Text>{item && item.receiver_name}</Text>
                                    </HStack>
                                    : null
                                }
                            </VStack>
                            <Text>{new Date(item && item.createdAt).toLocaleDateString()}</Text>
                        </HStack>
                        {/* Claim */}
                        <HStack style={RandomStyle.vHeaderBtns}>
                            {
                                <>
                                    {
                                        (item && item.user_id && item.user_id._id) === (userID && userID._id) && (
                                            item && item.status === "Unclaimed" && (
                                                <TouchableOpacity>
                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { deleteItemHandler(item._id) }}>Delete</Text>
                                                </TouchableOpacity>
                                            )
                                        )
                                    }

                                    <>
                                        {/* {console.log("item", item && item.user_id)} */}
                                        {
                                            ((item && item.user_id && item.user_id._id) !== (userID && userID._id)) ? (
                                                item && item.status !== "Received" ? (
                                                    <>
                                                        {
                                                            item && item.status === "Unclaimed" && (
                                                                <TouchableOpacity>
                                                                    <Text style={RandomStyle.vDonationBtn} onPress={() => { claimHandler(item._id) }}>Claim</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }

                                                        {
                                                            item && item.status === "Claimed" ? (
                                                                <>
                                                                    <TouchableOpacity>
                                                                        <Text style={RandomStyle.vDonationBtn} onPress={() => { cancelHandler(item._id) }}>Cancel</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity>
                                                                        <Text style={{ fontSize: 10 }}>Confirmation in progress...</Text>
                                                                    </TouchableOpacity>
                                                                </>
                                                            ) : item && item.status === "Confirmed" && (
                                                                <>


                                                                    <Modal
                                                                        animationType="slide"
                                                                        transparent={true}
                                                                        visible={modalVisible}
                                                                        onRequestClose={() => {
                                                                            // Alert.alert("Modal has been closed.");
                                                                            setModalVisible(!modalVisible);
                                                                        }}
                                                                    >
                                                                        {loading ? <ActivityIndicator size="large" color="#00ff00" /> :
                                                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                                                                                <View style={styles.modalView}>
                                                                                    <Text style={styles.modalText}>Are you sure, Already received the item?</Text>

                                                                                    {/* {dumpLoading ? */}
                                                                                    {/* <ActivityIndicator size="small" color="#00ff00" />
                                                                                : */}
                                                                                    <>

                                                                                        <Rating
                                                                                            showRating
                                                                                            startingValue={0}
                                                                                            onFinishRating={(rating_value) => setRate(rating_value)}
                                                                                            style={{ paddingVertical: 10 }}


                                                                                        />

                                                                                        <Pressable
                                                                                            style={[styles.button, styles.buttonClose]}
                                                                                            onPress={() => setModalVisible(!modalVisible)}
                                                                                        >
                                                                                            <Text style={styles.textStyle}>No</Text>
                                                                                        </Pressable>
                                                                                        {rateError ?
                                                                                            <Text style={[styles.textStyle, { color: "red", fontWeight: "normal", fontStyle: "italic" }]}>*Rate the item first</Text> : null
                                                                                        }
                                                                                        <Pressable
                                                                                            style={[styles.button, styles.buttonClose]}
                                                                                            onPress={() => { receiveHandler(item._id) }}
                                                                                        >
                                                                                            <Text style={styles.textStyle}>Yes, I Received it!</Text>
                                                                                        </Pressable>


                                                                                    </>
                                                                                    {/* } */}


                                                                                </View>

                                                                            </View>

                                                                        }

                                                                    </Modal>


                                                                    <TouchableOpacity>
                                                                        <Text style={RandomStyle.vDonationBtn} onPress={() => setModalVisible(true)}>Receive</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity>
                                                                        <Text style={RandomStyle.vDonationBtn} onPress={() => { cancelHandler(item._id) }}>Cancel</Text>
                                                                    </TouchableOpacity>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <Text style={[RandomStyle.vDonationBtn, { fontWeight: "bold", backgroundColor: "gray" }]}>Received</Text>
                                                )
                                            ) : item && item.status === "Claimed" ? (
                                                <>
                                                    <TouchableOpacity>
                                                        <Text style={RandomStyle.vDonationBtn} onPress={() => { confirmHandler(item._id) }}>Confirm</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={RandomStyle.vDonationBtn} onPress={() => { cancelHandler(item._id) }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </>
                                            ) : item && item.status === "Confirmed" ? (
                                                <Text style={[RandomStyle.vDonationBtn, { fontWeight: "bold", backgroundColor: "gray" }]}>To receive...</Text>
                                            ) : item && item.status === "Received" && (
                                                <TouchableOpacity>
                                                    <Text style={[RandomStyle.vDonationBtn, { fontWeight: "bold", backgroundColor: "gray" }]}>Received</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </>
                                </>
                            }
                            {/* {console.log(item&&item)} */}
                            {/* {item && item.status !== 'Unclaimed' ? */}
                                <TouchableOpacity onPress={() => { props.navigation.navigate('PublicDonationsChat', { chat: item && item.chat_id && item.chat_id.chats, chatDetail: item && item.chat_id, chatId: item && item.chat_id && item.chat_id._id, itemId: item && item._id, itemName: item && item.name, chatLength: item && item.chat_id && item.chat_id.chats && item.chat_id.chats.length, category: category, barangay_hall: item && item.barangay_hall, user_id: item && item.user_id && item.user_id._id, receiver_id: item && item.receiver_id && item.receiver_id._id, receiver_name: item && item.receiver_id && item.receiver_id.first_name, user_name: item && item.user_id && item.user_id.first_name }) }} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                    <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat} />
                                </TouchableOpacity> 
                              
                            {/* } */}


                        </HStack>
                    </View>
                    <View style={RandomStyle.vImages}>
                        {item && item.images && item.images.map((img, index) =>
                            <TouchableOpacity key={Math.random()} onPress={() => showImages(Math.random())}>
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

                  
                   
                    {item && item.status === "Received" ?
                            <>
                            <Text style={RandomStyle.vText2}>Proof of Receive</Text>
                                <View style={RandomStyle.vImages}>
                                    {item && item.received_images && item.received_images.map((img, index) =>
                                        <TouchableOpacity key={index} onPress={() => showImagesCleaned(index)}>
                                            <Image style={RandomStyle.vImage} source={{ uri: img.url }} resizeMode="cover" />
                                        </TouchableOpacity>
                                    )}
                                    <ImageView
                                        images={imagesPreview}
                                        imageIndex={imgIndexCleaned}
                                        visible={openImagesCleaned}
                                        onRequestClose={() => setOpenImagesCleaned(false)}
                                    />
                                </View>
                            </> : null
                        }


                    <Text style={RandomStyle.vText2}>Type</Text>
                    <View style={RandomStyle.vContainer2}>
                        {item && item.item_type && item.item_type.forEach(it => {
                            if (!uniqueIt.includes(it.type)) {
                                uniqueIt.push(it.type)
                            }
                        }
                        )}
                        {uniqueIt.map(it =>
                            <Text key={it} style={RandomStyle.vOption}>{it}</Text>
                        )}
                    </View>
                    {typeArray(item && item.item_type).includes('Other') && (
                        <View style={RandomStyle.vContainer2}>
                            <Text style={{ alignSelf: "flex-end" }}>{item && item.item_desc}</Text>
                        </View>
                    )}

                    <Text style={RandomStyle.vText2}>Additional Details</Text>
                    <View style={RandomStyle.vContainer2}>
                        <Text>{item && item.addional_desciption}</Text>
                    </View>

                    {/* <Text style={RandomStyle.vText2}>Donated by</Text>
                    <View style={RandomStyle.vContainer2}>
                        <Text>*{donatedUsing(item && item)}*</Text>
                    </View> */}

                </View>
            </ScrollView>
        }
        </>
    )
}



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        color: "#1e5128"
    }
});


export default PublicDonationsView;