import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { SET_COORDINATE } from '../../Redux/Constants/mapConstants';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET_PORT } from "../../Redux/Constants/socketConstants";
import * as io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage'
const socket = io.connect(SOCKET_PORT);

const MapLiveViewer = ({ room }) => {

    let lat = 0;
    let lng = 0
    const [user, setUser] = useState()

    const [latUser, setLatUser] = useState(0)
    const [lngUser, setLngUser] = useState(0)

    const [latInit, setLatInit] = useState(0)
    const [lngInit, setLngInit] = useState(0)

    const [latMarker, setLatMarker] = useState(0)
    const [lngMarker, setLngMarker] = useState(0)
    const [isOnline, setIsOnline] = useState(false)



    // let subscription
    // const getUserLocation = async () => {

    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         alert('Permission to access location was denied');
    //     }

    //     subscription = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 300, distanceInterval: 0 }, loc => {
    //         setLatUser(loc.coords.latitude)
    //         setLngUser(loc.coords.longitude)
    //         setLatInit(loc.coords.latitude)
    //         setLngInit(loc.coords.longitude)

    //         const coordsData = {
    //             room: room && room,
    //             author: user && user.first_name,
    //             message: [loc.coords.longitude, loc.coords.latitude],
    //             time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    //             online: true
    //         }

    //         socket.emit("send_message", coordsData);

    //     });



    // }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data) {
                setIsOnline(data.online)
                setLatInit(data.message&&data.message[1])
                setLngInit(data.message&&data.message[0])
            }
        })
        return () => {
            socket.disconnect()
        }
    }, [socket])

    useFocusEffect(
        useCallback(() => {
            socket.disconnect()
            socket.connect()
            socket.emit("join_room", [room, 'basurahunt-notification-3DEA5E28CE9B6E926F52AF75AC5F7-94687284AF4DF8664C573E773CF31'])
            return async () => {
                socket.disconnect()
                setLatInit(0)
                setLngInit(0)
            }
        }, [room])
    )




    return (
        <>
            <View style={styles.container}>
                {latInit !== 0 && lngInit !== 0 && isOnline ?
                    <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: !latMarker ? latInit : latMarker,
                            longitude: !lngMarker ? lngInit : lngMarker,
                            latitudeDelta: 0.00056,
                            longitudeDelta: 0.00011,
                        }}

                    >
                        <Marker
                            coordinate={{
                                latitude: !latMarker ? latInit : latMarker,
                                longitude: !lngMarker ? lngInit : lngMarker,
                            }}
                        />
                    </MapView>
                    :
                    <ActivityIndicator size="large" color="#4F7942" />
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    map: {
        width: Dimensions.get('window').width / 1.05,
        height: Dimensions.get('window').width / 1.5,
        marginVertical: 5,
        zIndex: 1
    }
});

export default MapLiveViewer