import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUpcomingCollectionPointList } from "../../Redux/Actions/collectionPointActions"
import Empty1 from "../../stylesheets/empty1";
import { UPCOMING_COLLECTION_POINT_LIST_RESET } from "../../Redux/Constants/collectionPointConstants";
import LoadingSchedule from "../extras/loadingPages/loading-schedule";
const ScheduleUpcoming = () => {

    const dispatch = useDispatch();
    const { isRefreshed, collectionPointsUpcoming, loading } = useSelector(state => state.collectionPointsUpcoming);
    const [userID, setUserID] = useState("");

    useFocusEffect(
        useCallback(() => {
            let user;
            AsyncStorage.getItem("user")
                .then((res) => {
                    user = JSON.parse(res)
                    setUserID(user)
                })
                .catch((error) => console.log(error))


            dispatch({ type: UPCOMING_COLLECTION_POINT_LIST_RESET })

            dispatch(getUpcomingCollectionPointList())


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

    const filterRepeat = (repeat) => {
        let repeatArray = repeat.split(" ");

        if (repeatArray.includes("Every")) {
            return repeatArray[1];
        }
        else {
            return repeat;
        }
    }

    const upcomingDate = (repeat) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const filteredRepeat = filterRepeat(repeat);

        let dateToday = new Date(Date.now());
        let upcomingDay = new Date();

        const indexToday = dateToday.getDay();
        const indexUpcoming = days.indexOf(filteredRepeat);

        if (indexToday < indexUpcoming) {
            upcomingDay.setDate(dateToday.getDate() + (indexUpcoming - indexToday))
        }
        else {
            upcomingDay.setDate(dateToday.getDate() + 7 + (indexUpcoming - indexToday))
        }

        const month = months[upcomingDay.getMonth()];
        const year = upcomingDay.getFullYear();

        const date = month + " " + upcomingDay.getDate() + ", " + year;

        return date;
    }

    const repeatCheck = (repeat) => {
        let dateToday = new Date(Date.now());
        const repeatDate = new Date(repeat.date);

        const monthToday = dateToday.getMonth();
        const yearToday = dateToday.getFullYear();
        const dayToday = dateToday.getDay();

        const repeatMonth = repeatDate.getMonth();
        const repeatDay = repeatDate.getFullYear();
        const repeatYear = repeatDate.getFullYear();

        // console.log(repeatDate.toLocaleDateString() >= dateToday.toLocaleDateString())
        let repeatCheck = "";
        if (repeat.date === undefined) {
            repeatCheck = true;
        }
        else if (repeatDate.setHours(0, 0, 0, 0) >= dateToday.setHours(0, 0, 0, 0)) {
            repeatCheck = true;
        }
        else {
            repeatCheck = false;
        }
        // console.log(repeatCheck + " " + repeat.repeat + " - " + repeatDate.toLocaleDateString() + "  " + dateToday.toLocaleDateString())

        return repeatCheck;
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

    const schedulesList = ({ index, item }) => {
        // const date = new Date(item.createdAt).toLocaleDateString()
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday"];
        let dateToday = new Date(Date.now());
        const day = days[dateToday.getDay()];

        return (
            <>

                {
                    item.repeats.map((repeat) => {
                        if (repeat.repeat !== "Once" && filterRepeat(repeat.repeat) !== day && repeatCheck(repeat)) {
                            return (
                                <View key={repeat.repeat + item._id} style={RandomStyle.lContainer4Grey}>
                                    <HStack>
                                        <VStack style={{ width: "100%", paddingHorizontal: 10 }}>
                                            <Text style={RandomStyle.lItem2}>{filterRepeat(repeat.repeat)}</Text>
                                            <Text style={RandomStyle.lHeader}>{upcomingDate(repeat.repeat)}</Text>
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
                                            <VStack paddingBottom={2}>
                                                <Text style={RandomStyle.lHeader1}>Collection Points:</Text>
                                                <Text numberOfLines={1} style={RandomStyle.lItem2}>{collectionPointsList(item.collectionPoints)}</Text>
                                            </VStack>
                                        </VStack>
                                    </HStack>
                                </View>
                            )
                        }
                    })
                }
            </>
        )
    }

    return (
        <>
            {loading ?
                <LoadingSchedule /> :
                <>
                    {/* {console.log(collectionPointsUpcoming && collectionPointsUpcoming.length)} */}
                    <View style={RandomStyle.lContainer3}>
                        <Text style={RandomStyle.vText1}>Barangay {userID && userID.barangay}</Text>
                    </View>
                    {collectionPointsUpcoming && collectionPointsUpcoming.length > 0 ?
                        <FlatList
                            data={collectionPointsUpcoming}
                            renderItem={schedulesList}
                        // keyExtractor={item => {console.log(item)}}
                        />
                        :
                        <View style={Empty1.container}>
                            <Text style={Empty1.text1}>
                                No upcoming collection yet!
                            </Text>
                        </View>
                    }
                </>
            }
        </>
    )
}

export default ScheduleUpcoming;