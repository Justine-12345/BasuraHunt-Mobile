import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import Empty1 from "../../stylesheets/empty1";
import MapLiveViewer from "../maps/MapLiveViewer";
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import { getCollectionPointDetails } from "../../Redux/Actions/collectionPointActions";
const ScheduleView = (props) => {
    const dispatch = useDispatch()
    const collectionPointDetail = props.route.params.collectionPoint
    const collectionPoint_id = props.route.params.collectionPoint_id
    const [collectionPoint, setCollectionPoint] = useState()
    const { loading, error, collectionPoint: collectionPointData } = useSelector(state => state.collectionPointDetails);
    const [isFinish, setIsFinish] = useState(false)
    useFocusEffect(
        useCallback(() => {
            if (collectionPoint_id) {
                dispatch(getCollectionPointDetails(collectionPoint_id))
            }

            return () => {
                props.navigation.navigate('ScheduleToday')
            }

        }, [])
    )

    useEffect(() => {
        if (collectionPoint_id) {
            setCollectionPoint(collectionPointData)
        } else {
            setCollectionPoint(collectionPointDetail)
        }
    }, [collectionPointData])

    const dateNow = () => {
        let dateToday = new Date(Date.now());

        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const month = months[dateToday.getMonth()];
        const year = dateToday.getFullYear();

        const date = month + " " + dateToday.getDate() + ", " + year;

        return date;
    }

    const collectionPointTime = (collectionPoint) => {
        const startTimeArray = collectionPoint && collectionPoint.startTime && collectionPoint.startTime.split(":");
        const endTimeArray = collectionPoint && collectionPoint.endTime && collectionPoint.endTime.split(":");
        if (startTimeArray && endTimeArray) {
            var ampmStartTime = startTimeArray[0] >= 12 ? 'PM' : 'AM';
            var ampmEndTime = endTimeArray[0] >= 12 ? 'PM' : 'AM';
            const hoursStartTime = (startTimeArray[0] % 12) == 0 ? 12 : startTimeArray[0] % 12;
            const minutesStartTime = startTimeArray[1];
            const hoursEndTime = (endTimeArray[0] % 12) == 0 ? 12 : endTimeArray[0] % 12;
            const minutesEndTime = endTimeArray[1];

            return hoursStartTime + ":" + minutesStartTime + " " + ampmStartTime + " - " + hoursEndTime + ":" + minutesEndTime + " " + ampmEndTime;
        }
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
            return <Text style={RandomStyle.vText5}>ON-GOING</Text>
        }
        else if (timeNow <= startTimeArray[0] + "" + startTimeArray[1]) {
            return <Text style={[RandomStyle.vText5, { color: "grey" }]}>UPCOMING</Text>
        }
        else {
            return <Text style={[RandomStyle.vText5, { color: "grey" }]}>FINISHED</Text>;
        }
    }

    const checkMap = (collectionPoint) => {
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
           return <MapLiveViewer room={collectionPoint && collectionPoint.roomCode} /> 
        }
        else {
            return <Text style={[RandomStyle.vText5, { color: "grey" }, RandomStyle.lContainer3]}>Live is unavailable</Text>;
        }
    }

    return (
        <>
            <View style={RandomStyle.lContainer3}>
                <Text style={RandomStyle.vText1}>Barangay {collectionPoint && collectionPoint.barangay}</Text>
                <Text style={RandomStyle.vText1}>{dateNow()}</Text>
                <Text style={RandomStyle.vText3}>Time: {collectionPoint && collectionPoint && collectionPointTime(collectionPoint)}</Text>
                <Text style={RandomStyle.vText3}>Collection Points: {collectionPoint && collectionPoint.collectionPoint}</Text>
                <Text style={RandomStyle.vText3}>Type: {collectionPoint && collectionPoint.type}</Text>

                {collectionPoint && collectionPoint.startTime && checkTime(collectionPoint)}
            </View>
              {collectionPoint && collectionPoint.startTime && checkMap(collectionPoint)}
            
        </>
    )


}

export default ScheduleView;