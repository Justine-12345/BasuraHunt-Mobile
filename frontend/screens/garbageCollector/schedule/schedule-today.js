import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, Text, View, TouchableOpacity, RefreshControl } from "react-native";
import { Button, HStack, VStack } from "native-base";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import RandomStyle from "../../../stylesheets/randomStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodayCollectionPointList } from "../../../Redux/Actions/collectionPointActions"
import Empty1 from "../../../stylesheets/empty1";
import { TODAY_COLLECTION_POINT_LIST_RESET } from "../../../Redux/Constants/collectionPointConstants";
import { liveMapNotification } from "../../../Redux/Actions/collectionPointActions";
import RandomStringGenerator from "../../extras/randomStringGenerator";
import NotificationSender from "../../extras/notificationSender";
import { getSingleDump } from "../../../Redux/Actions/dumpActions";
import { DUMP_DETAILS_RESET } from "../../../Redux/Constants/dumpConstants";
import LoadingSchedule from "../../extras/loadingPages/loading-schedule";
const CScheduleToday = ({ navigation }) => {
    const [userID, setUserID] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { isRefreshed, collectionPointsToday, loading } = useSelector(state => state.collectionPointsToday);
    let collectionPointsCount = 0;
    const dispatch = useDispatch();
    const { screen, object, message } = useSelector(state => state.pushNotification);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getTodayCollectionPointList())
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useFocusEffect(
        useCallback(() => {
            let user;
            AsyncStorage.getItem("user")
                .then((res) => {
                    user = JSON.parse(res)
                    setUserID(user)
                })
                .catch((error) => console.log(error))

            console.log("collectionPointsToday", collectionPointsToday.length <= 0)
            // dispatch({ type: TODAY_COLLECTION_POINT_LIST_RESET })
            if (collectionPointsToday.length <= 0) {
                dispatch(getTodayCollectionPointList())
            }
            return () => {

            }
        }, [collectionPointsToday])
    )


    useEffect(() => {

        if (screen === 'SchedNotifView') {
            navigation.navigate('GarbageCollectorSchedNav', { screen: 'TodayNav', params: { screen: 'SchedNotifView', params: { title: message } } })
        }
        else if (screen === 'Assigned Illegal Dumps') {
            dispatch(getSingleDump(object))
            navigation.navigate('GarbageCollectorNav', { screen: 'Assigned Illegal Dumps', params: { screen: 'AssignedView', params: { item_id: object } } })
        }
        else if (screen === 'Finished') {
            dispatch(getSingleDump(object))
            navigation.navigate('GarbageCollectorNav', { screen: 'Finished', params: { screen: 'AssignedView', params: { item_id: object } } })
        }

    }, [screen, object, message])

    const getSched = (collection) => {
        let sched = [];
        collection.forEach((item) => {
            item.collectors.forEach((cp) => {
                if (String(cp && cp.collector && cp.collector).trim() === String(userID && userID._id).trim()) {
                    sched.push(item);
                }
            })
        })

        return sched;
    }

    const collectionPointTime = (collectionPoint) => {
        const startTimeArray = collectionPoint.startTime.split(":");
        const endTimeArray = collectionPoint.endTime.split(":");
        var ampmStartTime = startTimeArray[0] >= 12 ? 'PM' : 'AM';
        var ampmEndTime = endTimeArray[0] >= 12 ? 'PM' : 'AM';
        const hoursStartTime = (startTimeArray[0] % 12) == 0 ? 12 : startTimeArray[0] % 12;
        const minutesStartTime = startTimeArray[1];
        const hoursEndTime = (endTimeArray[0] % 12) == 0 ? 12 : endTimeArray[0] % 12;
        const minutesEndTime = endTimeArray[1];

        return hoursStartTime + ":" + minutesStartTime + " " + ampmStartTime + " - " + hoursEndTime + ":" + minutesEndTime + " " + ampmEndTime;
    }

    const checkTime = (collectionPoint) => {
        const today = new Date();
        const hoursNow = today.getHours();
        const minutesNow = today.getMinutes();
        const startTimeArray = collectionPoint.startTime.split(":");
        const endTimeArray = collectionPoint.endTime.split(":");

        let hourNow = hoursNow;
        let minuteNow = minutesNow;
        let timeNow = ""
        if (hoursNow < 10) {
            hourNow = "0" + hoursNow;
        }
        if (minutesNow < 10) {
            minuteNow = "0" + minutesNow;
        }
        timeNow = hourNow + "" + minuteNow;
        let checkTime = timeNow >= startTimeArray[0] + "" + startTimeArray[1] && timeNow <= endTimeArray[0] + "" + endTimeArray[1];

        if (checkTime) {
            return <Text style={RandomStyle.vBadge}>ONGOING</Text>;
        }
        else if (timeNow <= startTimeArray[0] + "" + startTimeArray[1]) {
            return <Text style={RandomStyle.vBadge}>UPCOMING</Text>;
        }
        else {
            return <Text style={RandomStyle.vBadgeGrey}>FINISHED</Text>;
        }
    }

    const sendNotificationStart = (collpoint) => {
        const notifCode = RandomStringGenerator(40)

        const formData = new FormData();
        formData.append('liveStatus', 'start');
        formData.append('notifCode', notifCode);
        dispatch(liveMapNotification(collpoint._id, formData))

        NotificationSender(`Garbage Collector ${userID && userID.first_name} started a live map`, userID && userID._id, null, collpoint.barangay, 'live', notifCode, collpoint)


    }

    const getWatchBtn = (collectionPoint) => {
        const today = new Date();
        const hoursNow = today.getHours();
        const minutesNow = today.getMinutes();
        const startTimeArray = collectionPoint.startTime.split(":");
        const endTimeArray = collectionPoint.endTime.split(":");

        let hourNow = hoursNow;
        let minuteNow = minutesNow;
        let timeNow = ""
        if (hoursNow < 10) {
            hourNow = "0" + hoursNow;
        }
        if (minutesNow < 10) {
            minuteNow = "0" + minutesNow;
        }
        timeNow = hourNow + "" + minuteNow;
        let checkTime = timeNow >= startTimeArray[0] + "" + startTimeArray[1] && timeNow <= endTimeArray[0] + "" + endTimeArray[1];

        if (checkTime) {
            return (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}
                    onPress={() => navigation.navigate("Start", { collectionPoint: collectionPoint, collectionPoint_roomCode: collectionPoint.roomCode }, sendNotificationStart(collectionPoint))}
                >
                    <Text style={RandomStyle.pButton2}>START NOW!!!</Text>
                </TouchableOpacity>);
        }
        else if (timeNow <= startTimeArray[0] + "" + startTimeArray[1]) {
            return "";
        }
        else {
            return "";
        }
    }

    const dateNow = () => {
        let dateToday = new Date(Date.now());

        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const month = months[dateToday.getMonth()];
        const year = dateToday.getFullYear();

        const date = month + " " + dateToday.getDate() + ", " + year;

        return date;
    }

    const collectionPointsList = (collectionPoints) => {
        let collectionPointsList = "";

        for (let i = 0; i < collectionPoints.length; i++) {

            if (i !== collectionPoints.length - 1) {
                collectionPointsList = collectionPointsList + collectionPoints[i].collectionPoint + ", "
            }
            else {
                collectionPointsList = collectionPointsList + collectionPoints[i].collectionPoint
            }
        }

        return collectionPointsList;
    }
    const schedulesList = ({ item }) => {
        // const date = new Date(item.createdAt).toLocaleDateString()
        return (
            <>
                <View key={item._id} style={RandomStyle.lContainer4}>

                    <HStack>
                        {/* <Text style={RandomStyle.vBadgeGrey}>FINISHED</Text> */}
                        {/* <Text style={RandomStyle.vBadge}>ONGOING</Text> */}
                        <VStack style={{ width: "100%", paddingHorizontal: 10 }}>
                            <Text style={RandomStyle.lHeader}>{dateNow()}</Text>
                            <HStack paddingY={2} justifyContent={"space-evenly"}>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Type:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>{item.type}</Text>
                                </VStack>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Time:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>{collectionPointTime(item)}</Text>
                                </VStack>
                            </HStack>
                            <VStack>
                                <Text style={RandomStyle.lHeader1}>Collection Points:</Text>
                                <Text numberOfLines={1} style={[RandomStyle.lItem2, { fontWeight: "700" }]}>{item.barangay}</Text>
                                <Text numberOfLines={1} style={RandomStyle.lItem2}>{collectionPointsList(item.collectionPoints)}</Text>
                            </VStack>
                            {getWatchBtn(item)}
                            {/* <TouchableOpacity activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}
                                onPress={() => navigation.navigate("Start", { collectionPoint: item })}
                            >
                                <Text style={RandomStyle.pButton2}>START NOW!!!</Text>
                            </TouchableOpacity> */}
                        </VStack>
                    </HStack>
                </View>
            </>
        )
    }

    return (
        <>
            <View style={RandomStyle.lContainer3}>
                {/* <Text onPress={()=>{ navigation.navigate('GarbageCollectorSchedNav', { screen: 'TodayNav', params: { screen: 'SchedNotifView', params: { title: "zxczxcxz|ZXczxC|XZCXZ|CZXczx|ZXCzxczx|ZXc" } } })}}>Go</Text> */}
                {/* <Text style={RandomStyle.vText1}>Barangay {userID && userID.barangay}</Text> */}
            </View>
            {loading ? <LoadingSchedule /> :
                <>
                    {getSched(collectionPointsToday) && getSched(collectionPointsToday).length > 0 ?
                        <FlatList
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            data={getSched(collectionPointsToday)}
                            renderItem={schedulesList}
                            keyExtractor={item => item._id}
                        />
                        :
                        <View style={Empty1.container}>
                            <Text style={Empty1.text1}>
                                No collection for today!
                            </Text>
                        </View>
                    }
                </>
            }
        </>

    )


}

export default CScheduleToday;