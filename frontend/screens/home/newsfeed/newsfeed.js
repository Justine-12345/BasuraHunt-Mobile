import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { HStack, VStack } from "native-base";
import Empty1 from "../../../stylesheets/empty1";
import RandomStyle from "../../../stylesheets/randomStyle";
import { useSelector, useDispatch } from "react-redux";
import { getSingleDump } from "../../../Redux/Actions/dumpActions";
import { getNewsfeeds, clearErrors } from "../../../Redux/Actions/newsfeedActions";
import { getItemDetails } from "../../../Redux/Actions/itemActions";
const newsfeedData = require('../../../assets/sampleData/newsfeed.json')

const Newsfeed = ({ navigation }) => {
    const dispatch = useDispatch()
    const { screen, object, message } = useSelector(state => state.pushNotification);
    const { error, newsfeeds, loading } = useSelector(state => state.newsfeeds);

    useFocusEffect(
        useCallback(()=>{

            dispatch(getNewsfeeds())
        },[])
    )


    useEffect(() => {

        if (screen === 'SchedNotifView') {
            navigation.navigate('Schedule', { screen: 'TodaySchedNav', params: { screen: screen, params: { title: message } } })
        }
        else if(screen === 'MyPublicReportsView'){
            dispatch(getSingleDump(object))
            navigation.navigate("User", {screen:'MyReports', params:{screen:screen, params:{item_id:object}}} )
            // console.log("object",object)
        }
        else if(screen === 'PublicReportsChat'){
            navigation.navigate("PublicReportsChat", {chatDetail:object.chatDetail, chatId:object.chatId._id, chatLength: object.chatLength.length, dumpId: object._id, dumpLocation:object.dumpLocation.location} )
            // console.log("object",object)
        }
        else if(screen === 'ScheduleView'){
            navigation.navigate("ScheduleView", {collectionPoint_id: object})
            // console.log("object",object)
        }
        else if(screen === 'MyPublicDonationsView'){
            dispatch(getItemDetails(object))
            navigation.navigate("User", {screen:'MyDonations', params:{screen:screen, params:{item_id:object}}} )
        
        }
        else if(screen === 'MyPublicClaimedDonationsView'){
            dispatch(getItemDetails(object))
            navigation.navigate("User", {screen:'MyClaimed', params:{screen:screen, params:{item_id:object}}} )
        
        }
        else if(screen === 'MyPublicReceivedDonationsView'){
            dispatch(getItemDetails(object))
            navigation.navigate("User", {screen:'MyReceived', params:{screen:screen, params:{item_id:object}}} )
        }

    }, [screen,object, message])

    const newsfeedItem = ({ item, index }) => {

        // let img = item.images.map(img => img.url)
        let img = item.images[0]?item.images[0].url:"https://res.cloudinary.com/basurahunt/image/upload/v1659267361/BasuraHunt/Static/288365377_590996822453374_4511488390632883973_n_1_odzuj0.png"
        const date = new Date(item.createdAt).toLocaleDateString()
        return (
            <>
                {/* <TouchableOpacity onPress={()=>{navigation.navigate('PublicReportsView')}}><Text>Go</Text></TouchableOpacity> */}
                {index == 0 ?
                    <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate("NewsfeedView", { item })}>
                        <View style={RandomStyle.lLatestContainer}>
                            <Image source={{ uri: img }} resizeMode="cover" style={RandomStyle.lLatestImg} />
                            <View style={{ flex: 1, justifyContent: "flex-start", }}>
                                <Text style={{ alignSelf: "flex-end", color: "white", marginHorizontal: 5 }}>{date}</Text>
                            </View>
                            <Text numberOfLines={3} style={RandomStyle.lLatestTitle}>{item.title}</Text>
                            <Text numberOfLines={5} style={RandomStyle.lLatestContent}>{item.content}</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate("NewsfeedView", { item })}>
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
            {/* <Text onPress={()=>navigation.navigate("User", {screen:'MyReports', params:{screen:'MyPublicReportsView'}} )}>meron</Text> */}
            {newsfeedData.length > 0 ?
                <FlatList
                    data={newsfeeds}
                    renderItem={newsfeedItem}
                    keyExtractor={item => item._id}
                />
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