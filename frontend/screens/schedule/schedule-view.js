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
    const { loading, error, collectionPoint:collectionPointData } = useSelector(state => state.collectionPointDetails);

    useFocusEffect(
        useCallback(()=>{
            if(collectionPoint_id){
            dispatch(getCollectionPointDetails(collectionPoint_id))
            }
        },[])
    )
    
    useEffect(()=>{
        if(collectionPoint_id){
            setCollectionPoint(collectionPointData)
        }else{
            setCollectionPoint(collectionPointDetail)
        }
    },[collectionPointData])

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
        const startTimeArray = collectionPoint&&collectionPoint.startTime&&collectionPoint.startTime.split(":");
        const endTimeArray = collectionPoint&&collectionPoint.endTime&&collectionPoint.endTime.split(":");
       if(startTimeArray && endTimeArray){
        var ampmStartTime = startTimeArray[0] >= 12 ? 'PM' : 'AM';
        var ampmEndTime = endTimeArray[0] >= 12 ? 'PM' : 'AM';
        const hoursStartTime = (startTimeArray[0] % 12) == 0 ? 12 : startTimeArray[0] % 12;
        const minutesStartTime = startTimeArray[1];
        const hoursEndTime = (endTimeArray[0] % 12) == 0 ? 12 : endTimeArray[0] % 12;
        const minutesEndTime = endTimeArray[1];

        return hoursStartTime + ":" + minutesStartTime + " " + ampmStartTime + " - " + hoursEndTime + ":" + minutesEndTime + " " + ampmEndTime;}
    }

    return (
        <> 
            <View style={RandomStyle.lContainer3}>
                <Text style={RandomStyle.vText1}>Barangay {collectionPoint&&collectionPoint.barangay}</Text>
                <Text style={RandomStyle.vText1}>{dateNow()}</Text>
                <Text style={RandomStyle.vText3}>Time: {collectionPoint&&collectionPoint&&collectionPointTime(collectionPoint)}</Text>
                <Text style={RandomStyle.vText3}>Collection Points: {collectionPoint&&collectionPoint.collectionPoint}</Text>
                <Text style={RandomStyle.vText3}>Type: {collectionPoint&&collectionPoint.type}</Text>
                <Text style={RandomStyle.vText5}>ON-GOING</Text>
            </View>
            
            <MapLiveViewer room={collectionPoint&&collectionPoint.roomCode}/>
         
      
        </>
    )

    
}

export default ScheduleView;