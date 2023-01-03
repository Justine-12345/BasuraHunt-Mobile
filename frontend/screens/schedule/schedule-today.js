import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodayCollectionPointList } from "../../Redux/Actions/collectionPointActions"
import Empty1 from "../../stylesheets/empty1";
import { TODAY_COLLECTION_POINT_LIST_RESET } from "../../Redux/Constants/collectionPointConstants";

const ScheduleToday = ({ navigation }) => {

    const [userID, setUserID] = useState("");
    const { isRefreshed, collectionPointsToday } = useSelector(state => state.collectionPointsToday);
    let collectionPointsCount = 0;
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            let user;
            AsyncStorage.getItem("user")
                .then((res) => {
                    user = JSON.parse(res)
                    setUserID(user)
                })
                .catch((error) => console.log(error))


            dispatch({ type: TODAY_COLLECTION_POINT_LIST_RESET })
            dispatch(getTodayCollectionPointList())


            return () => {

            }
        }, [])
    )

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

        console.log(checkTime)

        if (checkTime) {
            return <TouchableOpacity onPress={() => navigation.navigate("ScheduleView", {collectionPoint:collectionPoint})} activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}>
                <Text style={RandomStyle.pButton2}>Watch Now</Text>
            </TouchableOpacity>;
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

    const schedulesList = ({ item }) => {
        // const date = new Date(item.createdAt).toLocaleDateString()
        return (
            <>
                <View style={RandomStyle.lContainer4}>
                    <HStack>
                        {checkTime(item)}
                        {/* <Text style={RandomStyle.vBadgeGrey}>{checkTime(item)}</Text> */}
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
                                <Text numberOfLines={1} style={RandomStyle.lItem2}>{item.collectionPoint}</Text>
                            </VStack>
                            {getWatchBtn(item)}
                            {/* <TouchableOpacity onPress={() => navigation.navigate("ScheduleView")} activeOpacity={0.8} style={{width: 250, alignSelf: "center"}}>
                                <Text style={RandomStyle.pButton2}>Watch Now</Text>
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
                <Text style={RandomStyle.vText1}>Barangay {userID && userID.barangay}</Text>
            </View>
            {collectionPointsToday && collectionPointsToday.length > 0 ?
                <FlatList
                    data={collectionPointsToday}
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
    )
}

export default ScheduleToday;