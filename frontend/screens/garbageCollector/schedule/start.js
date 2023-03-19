import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import MapLive from "../../maps/MapLive";
import * as Location from 'expo-location';
import Styles from "../../../stylesheets/styles";
import Form1 from "../../../stylesheets/form1";
import Toast from 'react-native-toast-message';
import { addCollectionnumOfTruck } from "../../../Redux/Actions/collectionPointActions";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COLLECTION_NUMBER_OF_TRUCK_RESET } from "../../../Redux/Constants/collectionPointConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationSender from "../../extras/notificationSender";
import RandomStringGenerator from "../../extras/randomStringGenerator";
const windowWidth = Dimensions.get('window').width;

const Start = (props) => {
    const dispatch = useDispatch()
    const collectionPointDetail = props.route.params.collectionPoint
    const collectionPoint_roomCode = props.route.params.collectionPoint_roomCode
    const { loading, isAdded } = useSelector(state => state.collectionPoint);
    const [collectionPoint, setCollectionPoint] = useState()
    const [numOfTruck, setNumOfTruck] = useState(0)
    const [numOfTruckHistory, setNumOfTruckHistory] = useState([])
    const [user, setUser] = useState()
    const [notifCode, setNotifCode] = useState("")
    useFocusEffect(
        useCallback(() => {
            setNotifCode(RandomStringGenerator(40))
            AsyncStorage.getItem("user")
                .then((res) => {
                    // user = res
                    setUser(JSON.parse(res))
                })
                .catch((error) => console.log(error))

            if (isAdded) {
                NotificationSender(`New record has been added in Collection Point`, user._id, null, user.barangay, 'collection-mass-add', notifCode, collectionPoint && collectionPoint)

                Toast.show({
                    type: 'success',
                    text1: "Added Successfully",
                });
                dispatch({ type: ADD_COLLECTION_NUMBER_OF_TRUCK_RESET })

            }
        }, [isAdded])
    )

    useEffect(() => {
        setCollectionPoint(collectionPointDetail)
    }, [collectionPointDetail])

    useEffect(() => {
        setNumOfTruckHistory(collectionPoint && collectionPoint.collectionPerTruck)
    }, [collectionPoint])

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

    const addMass = () => {

        if (numOfTruck === 0) {
            Toast.show({
                type: 'error',
                text1: "Invalid Input",
            });

        } else {
            const formData = new FormData();
            formData.append("numOfTruck", numOfTruck);
            formData.append('notifCode', notifCode);
            dispatch(addCollectionnumOfTruck(collectionPoint && collectionPoint._id, formData))
            setNumOfTruckHistory(oldArray => [...oldArray, { _id: Math.random(), date: new Date(), numOfTruck, type: collectionPoint && collectionPoint.type }])
            setNumOfTruck(0)
        }
    }


    const collectionPointsList = (collectionPoints) => {
        console.log("collectionPoints",collectionPoints)
        let collectionPointsList = "";

        for (let i = 0; i < collectionPoints.length; i++) {
            console.log("collectionPoints[i]", collectionPoints[i])
            if (i !== collectionPoints.length - 1) {
                collectionPointsList = collectionPointsList + collectionPoints[i].collectionPoint + ", "
            }
            else {
                collectionPointsList = collectionPointsList + collectionPoints[i].collectionPoint
            }
        }

        return collectionPointsList;
    }

    let TotalTons = 0

    return (
        <ScrollView>

            <View style={RandomStyle.lContainer3}>
                <Text style={RandomStyle.vText1}>Barangay {collectionPoint && collectionPoint.barangay}</Text>
                <Text style={RandomStyle.vText1}>{dateNow()}</Text>
                <Text style={RandomStyle.vText3}><Text style={{fontWeight:"900"}}>Time:</Text> {collectionPoint && collectionPointTime(collectionPoint)}</Text>
                <Text style={RandomStyle.vText3}><Text style={{fontWeight:"900"}}>Collection Points:</Text> {collectionPoint && collectionPointsList(collectionPoint.collectionPoints)}</Text>
                <Text style={RandomStyle.vText3}><Text style={{fontWeight:"900"}}>Type:</Text> {collectionPoint && collectionPoint.type}</Text>
                <Text style={RandomStyle.vText5}>ON-GOING</Text>
            </View>

            <MapLive room={collectionPoint_roomCode} />

            <View style={{ marginHorizontal: 12 }}>
                <Text style={RandomStyle.vText3}>Enter Total Collected Waste <Text style={{ fontWeight: "700", fontStyle: "italic" }}>(Number of dump truck/s):</Text></Text>
                <VStack>
                    <View style={{ marginVertical: 20 }}>
                        <HStack>
                            <View>
                                <TextInput keyboardType="numeric" value={numOfTruck} onChangeText={(numOfTruck_value) => setNumOfTruck(numOfTruck_value)} placeholder="0" style={[Form1.textInput2, { width: 100 }]} />
                            </View>
                            <View>
                                <TouchableOpacity onPress={addMass} style={[Styles.loginBtn, { marginHorizontal: 8, margin: 0, height: 40, borderRadius: 5, padding: 0 }]} activeOpacity={0.8}>
                                    <Text style={Styles.login}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </HStack>
                    </View>
                    <View>
                        <HStack>
                            <View style={{ marginVertical: 12 }}>
                                <Text style={RandomStyle.vText3}>Collection History ({numOfTruckHistory && numOfTruckHistory.length}) ({
                                    numOfTruckHistory && numOfTruckHistory.map(TruckHistory => {
                                        TotalTons += parseInt(TruckHistory.numOfTruck)
                                    })
                                } {TotalTons}trucks)</Text>
                            </View>
                        </HStack>
                    </View>

                </VStack>

            </View>


            <View style={{ marginTop: 8 }}>
                {numOfTruckHistory && numOfTruckHistory.map(TruckHistory => {
                    console.log("TruckHistory", TruckHistory)
                    const date = new Date(TruckHistory.date).toLocaleDateString()
                    return (
                        <View style={RandomStyle.lContainerForTruckHistory} key={TruckHistory._id} >
                            <HStack>
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.lTitle}>Total Number of Truck:</Text>
                                    <Text numberOfLines={2} style={[RandomStyle.lContent, { color: "#ff1400", fontWeight: "bold" }]}>{TruckHistory.numOfTruck}</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lContent}>{TruckHistory.type}</Text>
                                    <View style={{ width: windowWidth / 1.1, marginBottom: 12 }}>
                                        <Text style={{ alignSelf: "flex-end" }}>{date}</Text>
                                    </View>

                                </VStack>
                            </HStack>
                        </View>
                    )
                }).reverse()}
            </View>


        </ScrollView>
    )


}

export default Start;