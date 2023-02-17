import React, { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, StyleSheet, Image, View, Dimensions, Modal, Pressable, BackHandler, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUser } from "../Redux/Actions/userActions";
import { useRoute } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { ScrollView, HStack, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { readNoficationMobile } from "../Redux/Actions/userActions";
import { getSingleDump } from "../Redux/Actions/dumpActions";
import { getItemDetails } from "../Redux/Actions/itemActions";
import { ALL_NEWSFEEDS_RESET } from "../Redux/Constants/newsfeedConstants";
import { getNewsfeeds } from "../Redux/Actions/newsfeedActions";
import RandomStyle from "../stylesheets/randomStyle";
import moment from 'moment';
import { Skeleton } from "native-base";
import { getNewsfeedDetails } from "../Redux/Actions/newsfeedActions";
var { width } = Dimensions.get("window");

const Header = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { loading, user, isAuthenticated, error } = useSelector(state => state.auth)
    const { screen, object, message } = useSelector(state => state.pushNotification);
    const { isRead } = useSelector(state => state.notification)
    const [modalVisible, setModalVisible] = useState(false);
    const [notificationList, setNotificationList] = useState([])
    const [prevCount, setPrevCount] = useState()
    const [prevNotification, setPrevNotification] = useState()
    const [isLogin, setIsLogin] = useState(false)
    let unReadNotificationCounter = 0
    const lastNotificationResponse = Notifications.useLastNotificationResponse();


    const backAction = () => {
        console.log("back")
        setModalVisible(false)
    };

    useEffect(() => {
        AsyncStorage.getItem("user")
            .then((res) => {
                if (!res) {
                    setIsLogin(false)
                } else {
                    setIsLogin(true)
                }
            })
            .catch((error) => console.log(error))

    }, [isAuthenticated])

    useEffect(() => {
        if (isLogin) {
            dispatch(loadUser())
        }
    }, [isLogin])



    useEffect(() => {

        setPrevCount(unReadNotificationCounter)
        setPrevNotification(notificationList)
        setNotificationList([])

        if (user && user.notifications) {
            setNotificationList(user.notifications.reverse());
        }

    }, [user, screen, object, message, loading])

    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    function abbreviateNumber(number) {

        // what tier? (determines SI symbol)
        const tier = Math.log10(Math.abs(number)) / 3 | 0;

        // if zero, we don't need a suffix
        if (tier == 0) return number;

        // get suffix and determine scale
        const suffix = SI_SYMBOL[tier];
        const scale = Math.pow(10, tier * 3);

        // scale the number
        const scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

    const viewNotification = (notification) => {

        // console.log("category", notification)
        if (notification.category === "schedule") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            navigation.navigate('Schedule', { screen: 'TodaySchedNav', params: { screen: 'SchedNotifView', params: { title: notification.title } } })
        }
        if (notification.category === "live") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const collectionPoint = notification.link.split("/")[3];
            navigation.navigate("ScheduleView", { collectionPoint_id: collectionPoint })
        }
        if (notification.category === "illegalDump-update" || notification.category === "illegalDump-update-status" || notification.category === "illegalDump-new-comment") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const obj_id = notification.link.split("/")[2];
            dispatch(getSingleDump(obj_id))
            navigation.navigate("User", { screen: 'MyReports', params: { screen: 'MyPublicReportsView', params: { item_id: obj_id } } })
        }
        if (notification.category === "illegalDump-new-message") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const notificationModelObj = notification.modelObj;
            navigation.navigate("PublicReportsChat", { chatDetail: notificationModelObj.chatDetail, chatId: notificationModelObj.chatId._id, chatLength: notificationModelObj.chatLength.length, dumpId: notificationModelObj.dumpId._id, dumpLocation: notificationModelObj.dumpLocation.location, dumpObj: notificationModelObj.dumpObj.dumpObj })

        }
        if (notification.category === "donation-new") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const obj_id = notification.link.split("/")[2];
            dispatch(getItemDetails(obj_id))
            navigation.navigate("Donation", { screen: 'PublicDonationsView', params: { item_id: obj_id } })
        }
        if (notification.category === "donation-update-cancel" || notification.category === "donation-update-confirm") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const obj_id = notification.link.split("/")[2];
            dispatch(getItemDetails(obj_id))
            navigation.navigate("User", { screen: 'MyClaimed', params: { screen: 'MyPublicClaimedDonationsView', params: { item_id: obj_id } } })

        }
        if (notification.category === "donation-update-receive") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const obj_id = notification.link.split("/")[2];
            dispatch(getItemDetails(obj_id))
            navigation.navigate("User", { screen: 'MyDonations', params: { screen: 'MyPublicDonationsView', params: { item_id: object } } })
        }
        if (notification.category === "donation-new-message") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const notificationModelObj = notification.modelObj;
            navigation.navigate("PublicDonationsChat", { chatDetail: notificationModelObj.chatDetail, chatId: notificationModelObj.chatId._id, chatLength: notificationModelObj.chatLength.length, itemId: notificationModelObj.itemId._id, itemName: notificationModelObj.itemName.name, barangay_hall: notificationModelObj.itemObj.barangay_hall, user_id: notificationModelObj.itemObj.user_id, receiver_id: notificationModelObj.itemObj.receiver_id, receiver_name: notificationModelObj.itemObj.receiver_name, user_name: notificationModelObj.itemObj.user_name })

        }
        if (notification.category === "newsfeeds-add") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            
            const obj_id = notification.link.split("/")[2];

            
            dispatch(getNewsfeedDetails(obj_id))
            navigation.navigate("Home", { screen: 'NewsfeedNav', params:{screen:'NewsfeedView'} })

        }
        if (notification.category === "user-verified") {
            setModalVisible(false)
            const formData = new FormData();
            formData.append('notifCode', notification.notifCode);
            dispatch(readNoficationMobile(formData))
            const obj_id = notification.modelObj._id;
            dispatch(getSingleDump(obj_id))
            navigation.navigate("User", { screen: 'MyReports', params: { screen: 'MyPublicReportsView', params: { item_id: obj_id } } })

        }
    }


    const notificationItem = ({ item, index }) => {

        return (
            <>
                {item.status === "unread" ?
                    <TouchableOpacity key={item._id} onPress={() => viewNotification(item)} activeOpacity={.8}>
                        <View style={[{ backgroundColor: "#1E5128", marginVertical: 8, padding: 8, marginHorizontal: 8, borderRadius: 5 }]} >
                            <HStack>

                                <VStack>
                                    <Text style={[{ color: "white", fontWeight: "700" }]}>{item.title}</Text>
                                    {/* item.additional_desciption change to item.addition_description */}
                                    {/* <View style={{ flex: 1, justifyContent: "flex-end", }}> */}
                                    <Text style={{ color: "white", fontStyle: "italic" }}>{moment(new Date(item.time)).fromNow()}</Text>
                                    {/* </View> */}
                                </VStack>
                            </HStack>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity key={item._id} onPress={() => viewNotification(item)} activeOpacity={.8}>
                        <View style={[{ backgroundColor: "#d3d3d3", marginVertical: 8, padding: 8, marginHorizontal: 8, borderRadius: 5 }]} >
                            <HStack>

                                <VStack>
                                    <Text style={[{ color: "black", fontWeight: "700" }]}>{item.title}</Text>
                                    {/* item.additional_desciption change to item.addition_description */}
                                    {/* <View style={{ flex: 1, justifyContent: "flex-end", }}> */}
                                    <Text style={{ color: "black", fontStyle: "italic" }}>{moment(new Date(item.time)).fromNow()}</Text>
                                    {/* </View> */}
                                </VStack>
                            </HStack>
                        </View>
                    </TouchableOpacity>

                }
            </>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <View style={styles.headerTitle}>
                    <Image
                        source={require("../assets/icon_header.png")}
                        resizeMode="cover"
                        style={styles.img}
                    />
                    <Text style={styles.title}>BasuraHunt</Text>
                </View>

                <Modal
                    useNativeDriver={true}
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: "700", fontSize: 17 }}>Notifications List</Text>

                        {notificationList.map((notification) => {
                            if (notification.status === "unread") {
                                unReadNotificationCounter += 1
                            }
                        })}

                        {notificationList && notificationList.length >= 1 || prevNotification && prevNotification.length >= 1 ?
                            < FlatList
                                data={loading ? prevNotification.reverse() : notificationList}
                                renderItem={notificationItem}
                                keyExtractor={item => item._id}
                            /> :

                            <>
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />
                                <Skeleton style={{ marginVertical: 5, elevation: 0, marginVertical: 8, padding: 8, marginHorizontal: 8 }} height={140} animation="pulse" borderRadius={10} />

                            </>
                        }

                    </View>
                </Modal>


                {isLogin ?
                    <>
                        <View style={styles.bellContainer}>

                            <FontAwesome name="bell" onPress={() => setModalVisible(true)} size={25} style={[styles.notifBtn]} />
                            {/* {console.log("notificationList", notificationList)} */}





                            {unReadNotificationCounter >= 1 || prevCount >= 1 ?
                                <Text onPress={() => setModalVisible(true)} style={{ position: "absolute", backgroundColor: "red", color: "white", fontSize: 8, borderRadius: 4, fontWeight: "700", padding: 2, bottom: 12, left: 12, elevation: 2 }}>{abbreviateNumber(unReadNotificationCounter <= 0 ? prevCount : unReadNotificationCounter)}</Text> : null
                            }

                        </View>
                    </>

                    :
                    null}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: width,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
    },
    headerTitle: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },

    bellContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        marginHorizontal: 10
    },

    img: {
        height: 50,
        width: 50,
    },
    title: {
        fontWeight: "bold",
        color: "#1E5128",
        fontSize: 20
    },
    notifBtn: {
        alignSelf: "center",
        color: "#1E5128"
    },

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
        // shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        // shadowOpacity: 0.25,
        shadowRadius: 4,
        // elevation: 5
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

})

export default Header;