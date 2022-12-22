import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { SET_COORDINATE } from '../../Redux/Constants/mapConstants';
import { useDispatch, useSelector } from 'react-redux';

const MapLive = () => {



    const { latitude: mapLatitude, longitude: mapLongtitude } = useSelector(state => state.coordinate)

    let lat = 0;
    let lng = 0

    useFocusEffect(
        useCallback(() => {
            if (mapLatitude === null) {
                setLatMarker(0)
                setLngMarker(0)
            }

        }, [mapLatitude, mapLongtitude])
    )

    useEffect(() => {
        getUserLocation()
    }, [])
    const dispatch = useDispatch()

    const [latUser, setLatUser] = useState(0)
    const [lngUser, setLngUser] = useState(0)

    const [latInit, setLatInit] = useState(0)
    const [lngInit, setLngInit] = useState(0)

    const [latMarker, setLatMarker] = useState(0)
    const [lngMarker, setLngMarker] = useState(0)




    const getUserLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
        }




        Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 300, distanceInterval: 0 }, loc => {
            setLatUser(loc.coords.latitude)
            setLngUser(loc.coords.longitude)
            setLatInit(loc.coords.latitude)
            setLngInit(loc.coords.longitude)
        });


        // // console.log(location.coords.longitude);
        // setLatUser(location.coords.latitude)
        // setLngUser(location.coords.longitude)
        // setLatInit(location.coords.latitude)
        // setLngInit(location.coords.longitude)


        // const data = { latitude: location.coords.latitude, longitude: location.coords.longitude }
        // // console.log("init",data);
        // dispatch({
        //     type: SET_COORDINATE,
        //     payload: data
        // })
    }



    // const onRegionChange = (region) => {

    //     lat = region.latitude
    //     lng = region.longitude
    //     setLatMarker(region.latitude)
    //     setLngMarker(region.longitude)

    //     const data = { latitude: region.latitude, longitude: region.longitude }
    //     // console.log("change",data);
    //     dispatch({
    //         type: SET_COORDINATE,
    //         payload: data
    //     })
    // }



    return (
        <>
            <TouchableOpacity activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}
                onPress={() => { setLatMarker(oldLat => oldLat + .00003) }}
            >
                <Text>START NOW!!!</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                {latInit !== 0 && lngInit !== 0 ?
                    <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: !latMarker ? latInit : latMarker,
                            longitude: !lngMarker ? lngInit : lngMarker,
                            latitudeDelta: 0.00056,
                            longitudeDelta: 0.00011,
                        }}



                        onMapReady={getUserLocation}
                    // onRegionChangeComplete={onRegionChange}
                    >
                        <Marker
                            coordinate={{
                                latitude: !latMarker ? latInit : latMarker,
                                longitude: !lngMarker ? lngInit : lngMarker,
                            }}
                        />
                    </MapView>
                    :
                    ""
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

export default MapLive