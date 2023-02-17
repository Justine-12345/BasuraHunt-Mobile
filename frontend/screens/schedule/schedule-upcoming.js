import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Modal, Text, View, TouchableOpacity, RefreshControl } from "react-native";
import { ScrollView, VStack } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUpcomingCollectionPointList } from "../../Redux/Actions/collectionPointActions"
import Empty1 from "../../stylesheets/empty1";
import { UPCOMING_COLLECTION_POINT_LIST_RESET } from "../../Redux/Constants/collectionPointConstants";
import LoadingUpcomingSchedule from "../extras/loadingPages/loading-upcoming-schedule";
const ScheduleUpcoming = () => {

    const dispatch = useDispatch();
    const { isRefreshed, collectionPointsUpcoming, loading } = useSelector(state => state.collectionPointsUpcoming);
    const [userID, setUserID] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [points, setPoints] = useState("");
    const [refreshing, setRefreshing] = useState(false);

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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch({ type: UPCOMING_COLLECTION_POINT_LIST_RESET })
        dispatch(getUpcomingCollectionPointList())
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const collectionPointTime = (collectionPoint) => {
        const startTimeArray = collectionPoint.startTime.split(":");
        const endTimeArray = collectionPoint.endTime.split(":");
        var ampmStartTime = startTimeArray[0] >= 12 ? 'PM' : 'AM';
        var ampmEndTime = endTimeArray[0] >= 12 ? 'PM' : 'AM';
        let hoursStartTime = (startTimeArray[0] % 12) === 0 ? 12 : startTimeArray[0] % 12;
        const minutesStartTime = startTimeArray[1];
        let hoursEndTime = (endTimeArray[0] % 12) === 0 ? 12 : endTimeArray[0] % 12;
        const minutesEndTime = endTimeArray[1];
        if (hoursStartTime < 10) {
            hoursStartTime = "0" + hoursStartTime;
        }
        if (hoursEndTime < 10) {
            hoursEndTime = "0" + hoursEndTime;
        }

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

    const upcomingDate = (repeat, proper) => {
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

        if (proper === true) {
            return date;
        }
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


    const schedulesList = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday"];
        let dateToday = new Date(Date.now());
        const day = days[dateToday.getDay()];
        const noSched = "No upcoming schedule"
        const schedAll = [];

        const showPoints = (index) => {
            setModalVisible(true);
            setPoints(schedAll[index].points);
            // console.log(Math.random())
        }

        collectionPointsUpcoming.map(collectionPoint => {
            if (collectionPoint) {
                collectionPoint.repeats.map(repeat => {
                    if (repeat.repeat !== "Once" && repeatCheck(repeat)) {
                        // if(repeat.repeat !== "Once" && filterRepeat(repeat.repeat) !== day && repeatCheck(repeat)) {
                        if (filterRepeat(repeat.repeat) === "Monday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        else if (filterRepeat(repeat.repeat) === "Tuesday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        else if (filterRepeat(repeat.repeat) === "Wednesday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        else if (filterRepeat(repeat.repeat) === "Thursday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        else if (filterRepeat(repeat.repeat) === "Friday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        else if (filterRepeat(repeat.repeat) === "Saturday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        else if (filterRepeat(repeat.repeat) === "Sunday") {
                            schedAll.push({ 'id': collectionPoint._id, 'date': upcomingDate(repeat.repeat, true), 'day': (filterRepeat(repeat.repeat)), 'time': collectionPointTime(collectionPoint), 'type': collectionPoint.type, 'points': collectionPoint.collectionPoint });
                        }
                        return null;
                    }
                    else {
                        return null;
                    }
                })
                return null;
            }
            else {
                return null;
            }
        });
        const schedSort = (a, b) => {
            if (Date.parse(a.date) + (a.time.split(' '))[1] + a.time.split(' ')[0] <= Date.parse(b.date) + (b.time.split(' '))[1] + b.time.split(' ')[0]) {
                return -1
            }
            else {
                return 1
            }
        }
        schedAll.sort((a, b) => schedSort(a, b))

        return (
            <>
                <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={RandomStyle.usModal}>
                        <View style={RandomStyle.usPoints}>
                            <VStack>
                                <VStack>
                                    <Text style={{ fontWeight: "bold" }}>Collection Points:</Text>
                                    <Text>{points}</Text>
                                </VStack>
                                <TouchableOpacity style={RandomStyle.usClosec} onPress={() => setModalVisible(false)}>
                                    <Text style={RandomStyle.usClose}>
                                        CLOSE
                                    </Text>
                                </TouchableOpacity>
                            </VStack>
                        </View>
                    </View>
                </Modal>
                <View style={RandomStyle.usContainer}>
                    {schedAll.length > 0 ?
                        schedAll.map((sched, index) => {
                            if (index < 6) {
                                return (
                                    <TouchableOpacity onPress={() => showPoints(index)} key={Math.random()} style={[RandomStyle.usSched, [1, 2, 5].includes(index) ? RandomStyle.usAlt : null]}>
                                        <VStack style={{ justifyContent: "space-between" }}>
                                            <Text style={RandomStyle.usInfo}>{sched.day}</Text>
                                            <Text style={RandomStyle.usInfo}>{sched.date}</Text>
                                            <Text style={[RandomStyle.usInfo, { fontWeight: "normal", color: "lightgrey" }]}>{sched.time}</Text>
                                            <Text numberOfLines={2} style={RandomStyle.usInfo}>{sched.type}</Text>
                                        </VStack>
                                    </TouchableOpacity>
                                )
                            }
                            else {
                                return null;
                            }
                        })
                        :
                        <View style={Empty1.container}>
                            <Text style={Empty1.text1}>
                                No upcoming collection yet!
                            </Text>
                        </View>
                    }




                </View>
            </>
        )
    }

    return (
        <>
            {/* {console.log(collectionPointsUpcoming && collectionPointsUpcoming.length)} */}
            {loading ? <LoadingUpcomingSchedule /> :
                <>
                    <View style={RandomStyle.lContainer3}>
                        <Text style={RandomStyle.vText1}>Barangay {userID && userID.barangay}</Text>
                    </View>


                    {collectionPointsUpcoming && collectionPointsUpcoming.length > 0 ?
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        >
                            {schedulesList()}
                        </ScrollView>
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