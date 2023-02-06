import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { HStack, VStack } from "native-base";
import Empty1 from "../../../stylesheets/empty1";
import RandomStyle from "../../../stylesheets/randomStyle";
import { useSelector, useDispatch } from "react-redux";
import { getSingleDump } from "../../../Redux/Actions/dumpActions";
import { getNewsfeeds, getNewsfeedList, clearErrors } from "../../../Redux/Actions/newsfeedActions";
import { getItemDetails } from "../../../Redux/Actions/itemActions";
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingNewsfeed from "../../extras/loadingPages/loading-nf";
import { ALL_NEWSFEEDS_RESET } from "../../../Redux/Constants/newsfeedConstants";
import { RESET_PUSH_NOTIFICATION } from "../../../Redux/Constants/pushNotificationConstants";
import { readNoficationMobile, loadUser } from "../../../Redux/Actions/userActions";
import { getNewsfeedDetails } from "../../../Redux/Actions/newsfeedActions";
import { NEWSFEED_PAGE_SET } from "../../../Redux/Constants/newsfeedConstants";
import { Skeleton } from "@rneui/themed";
const newsfeedData = require('../../../assets/sampleData/newsfeed.json')

const Newsfeed = ({ navigation }) => {
    const dispatch = useDispatch()
    const { screen, object, message, code } = useSelector(state => state.pushNotification);
    const { error, newsfeeds: allNewsFeeds, loading, newsfeedsCount, resPerPage } = useSelector(state => state.newsfeeds);
    const { page } = useSelector(state => state.newsfeedPage);

    const [currentPage, setCurrentPage] = useState(1)
    const [newsfeeds, setNewsfeeds] = useState([])

    useFocusEffect(
        useCallback(() => {

            // AsyncStorage.getItem("isAuthenticated")
            //     .then((res) => {
            //         console.log("res",res)
            //     })
            //     .catch((error) => console.log(error))
            // setNewsfeeds([])
            if (newsfeeds && newsfeeds.length <= 0) {
                dispatch(getNewsfeedList(1))
            }


            // return () => {
            //     // setNewsfeeds([])

            //     dispatch({ type: ALL_NEWSFEEDS_RESET })
            // }
        }, [page])
    )

    useEffect(() => {
        // if (allNewsFeeds.length <= 0) {

        if (allNewsFeeds) {
            setNewsfeeds(oldArray => oldArray.concat(allNewsFeeds && allNewsFeeds))
        }
        // }
    }, [allNewsFeeds])

    useEffect(() => {
        if (code) {
            const formData = new FormData();
            formData.append('notifCode', code);
            dispatch(readNoficationMobile(formData))
        }

        if (screen === 'SchedNotifView') {
            navigation.navigate('Schedule', { screen: 'TodaySchedNav', params: { screen: screen, params: { title: message } } })
        }
        else if (screen === 'MyPublicReportsView') {
            dispatch(getSingleDump(object))
            navigation.navigate("User", { screen: 'MyReports', params: { screen: screen, params: { item_id: object } } })
            // console.log("object",object)
        }
        else if (screen === 'PublicReportsChat') {
            navigation.navigate("PublicReportsChat", { chatDetail: object.chatDetail, chatId: object.chatId._id, chatLength: object.chatLength.length, dumpId: object.dumpId._id, dumpLocation: object.dumpLocation.location, dumpObj: object.dumpObj.dumpObj })
            // console.log("object",object)
        }
        else if (screen === 'PublicDonationsChat') {
            navigation.navigate("PublicDonationsChat", { chatDetail: object.chatDetail, chatId: object.chatId._id, chatLength: object.chatLength.length, itemId: object.itemId._id, itemName: object.itemName.name, barangay_hall: object.itemObj.barangay_hall, user_id: object.itemObj.user_id, receiver_id: object.itemObj.receiver_id, receiver_name: object.itemObj.receiver_name, user_name: object.itemObj.user_name })
            // console.log("object",object)
        }
        else if (screen === 'ScheduleView') {
            navigation.navigate("ScheduleView", { collectionPoint_id: object })
            // console.log("object",object)
        }
        else if (screen === 'MyPublicDonationsView') {
            dispatch(getItemDetails(object))
            navigation.navigate("User", { screen: 'MyDonations', params: { screen: screen, params: { item_id: object } } })
        }
        else if (screen === 'MyPublicClaimedDonationsView') {
            dispatch(getItemDetails(object))
            navigation.navigate("User", { screen: 'MyClaimed', params: { screen: screen, params: { item_id: object } } })

        }
        else if (screen === 'MyPublicReceivedDonationsView') {
            dispatch(getItemDetails(object))
            navigation.navigate("User", { screen: 'MyReceived', params: { screen: screen, params: { item_id: object } } })
        }

        else if (screen === 'PublicDonationsView') {
            dispatch(getItemDetails(object))
            navigation.navigate("Donation", { screen: 'PublicDonationsView', params: { item_id: object } })
        }

        else if (screen === 'NewsfeedNav') {
            dispatch(getNewsfeedDetails(object))
            navigation.navigate("Home", { screen: 'NewsfeedNav', params:{screen:'NewsfeedView'} })
            // console.log("object",object)
        }


    }, [screen, object, message, code])

    const fetchMoreData = () => {
        if (newsfeeds.length <= newsfeedsCount - 1) {
            // console.log("fetchMoreData")
            dispatch({
                type: NEWSFEED_PAGE_SET,
                payload: currentPage + 1
            })
            setCurrentPage(currentPage + 1)
            dispatch(getNewsfeedList(currentPage + 1))
        }

    }

    const newsfeedItem = ({ item, index }) => {

        // let img = item.images.map(img => img.url)
        let img = item.images[0] ? item.images[0].url : "https://res.cloudinary.com/basurahunt/image/upload/v1659267361/BasuraHunt/Static/288365377_590996822453374_4511488390632883973_n_1_odzuj0.png"
        const date = new Date(item.createdAt).toLocaleDateString()
        return (
            <>
                {/* <TouchableOpacity onPress={() => {

                    navigation.navigate("Home", { screen: 'NewsfeedNav', params:{screen:'NewsfeedView'} })
                }}><Text>Go</Text></TouchableOpacity> */}
                {index == 0 ?
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        navigation.navigate("NewsfeedView", { item })
                        dispatch(getNewsfeedDetails(item._id))
                    }}>
                        <View style={RandomStyle.lLatestContainer}>
                            <Image source={{ uri: img }} resizeMode="cover" style={RandomStyle.lLatestImg} />
                            <View style={{ flex: 1, justifyContent: "flex-start", marginVertical: 8 }}>
                                <Text style={{ position: "absolute", color: "white", marginHorizontal: 5, backgroundColor: "#1E5128", color: "white", borderRadius: 10, padding: 5, fontWeight: "700" }}>Most Latest</Text>
                                <Text style={{ alignSelf: "flex-end", color: "white", marginHorizontal: 5 }}>{date}</Text>
                            </View>
                            <Text numberOfLines={3} style={RandomStyle.lLatestTitle}>{item.title} </Text>
                            <Text numberOfLines={5} style={RandomStyle.lLatestContent}>{item.content}</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        navigation.navigate("NewsfeedView", { item })
                        dispatch(getNewsfeedDetails(item._id))
                    }}>
                        <View style={RandomStyle.lContainer}>
                            <HStack>
                                <Image source={{ uri: img }} resizeMode="cover" style={RandomStyle.lImg} />
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.title}</Text>
                                    <Text numberOfLines={2} style={RandomStyle.lContent}>{item.content}</Text>
                                    <View style={{ flex: 1, justifyContent: "flex-end", }}>
                                        <Text style={{ alignSelf: "flex-end" }}>{date}</Text>
                                    </View>
                                </VStack>
                            </HStack>
                        </View>
                    </TouchableOpacity>
                }
            </>


        )
    }

    return (

        <>
            {newsfeeds&& newsfeeds.length <= 0? <LoadingNewsfeed /> : null}
            {/* {console.log("newsfeeds", newsfeeds.length)} */}
            {newsfeeds && newsfeeds.length > 0 ?
                <>
                    <FlatList
                        data={newsfeeds}
                        renderItem={newsfeedItem}
                        keyExtractor={item => Math.random()}
                        onEndReachedThreshold={0.2}
                        onEndReached={fetchMoreData}
                        ListFooterComponent={() =>
                            <>
                                {loading && currentPage >= 2 ?
                                    <>
                                        <View style={RandomStyle.lContainer}>
                                            <Skeleton animation="pulse" height={100} borderRadius={10} />
                                        </View>
                                        <View style={RandomStyle.lContainer}>
                                            <Skeleton animation="pulse" height={100} borderRadius={10} />
                                        </View>
                                        <View style={RandomStyle.lContainer}>
                                            <Skeleton animation="pulse" height={100} borderRadius={10} />
                                        </View>
                                        <View style={RandomStyle.lContainer}>
                                            <Skeleton animation="pulse" height={100} borderRadius={10} />
                                        </View>
                                    </>
                                    : null}
                            </>
                        }
                    />
                    {/* {loading && currentPage >= 2 ?
                        <View>
                            <ActivityIndicator size="large" color="#1E5128" />
                        </View>
                        : null
                    } */}
                </>
                :
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No posts yet!
                    </Text>
                </View>
            }
        </>

    )
}

export default Newsfeed;