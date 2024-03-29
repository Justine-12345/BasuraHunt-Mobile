import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-svg';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { SET_COORDINATE } from '../../Redux/Constants/mapConstants';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MAP_INITIALIZING, RESET_MAP_INITIALIZING } from '../../Redux/Constants/mapConstants';
import axios from 'axios'
import { SET_ADDRESS } from '../../Redux/Constants/mapConstants';
const MapFinder = () => {

    // (async () => {
    //     if (Platform.OS !== "web") {

    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             alert('Permission to access location was denied');
    //         }
    //     }
    //     // let location = await Location.getCurrentPositionAsync({});
    //     // setLatUser(location.coords.latitude)
    //     // setLngUser(location.coords.longitude)
    // })();
    const { initializing } = useSelector(state => state.mapLoading)
    const { latitude: mapLatitude, longitude: mapLongtitude } = useSelector(state => state.coordinate)

    let lat = 0;
    let lng = 0

    useFocusEffect(
        useCallback(() => {
            if (mapLatitude === null) {
                setLatMarker(0)
                setLngMarker(0)
            }
            if (latInit === 0 && lngInit === 0) {
                getUserLocation()
            }
        }, [mapLatitude, mapLongtitude])
    )

    useEffect(() => {
        dispatch({
            type: SET_MAP_INITIALIZING,
            payload: { initializing: true }
        })
        if (latInit === 0 && lngInit === 0) {
            getUserLocation()
        }
    }, [latUser])
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

        console.log("!!!")
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        // // console.log("i",location.coords.latitude);
        // // console.log(location.coords.longitude);
        setLatUser(location.coords.latitude)
        setLngUser(location.coords.longitude)
        setLatInit(location.coords.latitude)
        setLngInit(location.coords.longitude)
        console.log("222")

        const data = { latitude: location.coords.latitude, longitude: location.coords.longitude }
        // console.log("init", data);
        dispatch({
            type: SET_COORDINATE,
            payload: data
        })

        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.coords.longitude},${location.coords.latitude}.json?types=poi&access_token=pk.eyJ1IjoianVzdGluZS0iLCJhIjoiY2wzZnl6NHJsMDRudjNmbHZvOGgwNGx4bSJ9.mwFsZ1bz00QuUmMr_MMOxg`)
            .then(function (response) {
                const address = response.data.features[0].properties.address
                console.log("address",address)
                dispatch({
                    type: SET_ADDRESS,
                    payload: address
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    const onRegionChange = (region) => {

        lat = region.latitude
        lng = region.longitude
        setLatMarker(region.latitude)
        setLngMarker(region.longitude)

        const data = { latitude: region.latitude, longitude: region.longitude }
        // console.log("change", data);
        dispatch({
            type: SET_COORDINATE,
            payload: data
        })


        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${region.longitude},${region.latitude}.json?types=poi&access_token=pk.eyJ1IjoianVzdGluZS0iLCJhIjoiY2wzZnl6NHJsMDRudjNmbHZvOGgwNGx4bSJ9.mwFsZ1bz00QuUmMr_MMOxg`)
            .then(function (response) {
                const address = response.data.features[0].properties.address
                console.log("address", address)
                dispatch({
                    type: SET_ADDRESS,
                    payload: address
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }



    return (
        <>
            {/* {console.log("latInit",latInit)}
        {console.log("lngInit",lngInit)} */}
            <View style={styles.container}>
                {/* <Text>latInit {latInit}</Text>
            <Text>lngInit {lngInit}</Text> */}
                {latInit !== 0 && lngInit !== 0 ?
                    <MapView style={[styles.map]}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: latInit,
                            longitude: lngInit,
                            latitudeDelta: 0.00056,
                            longitudeDelta: 0.00011,
                        }}
                        // loadingEnabled={true}
                        onMapReady={getUserLocation}
                        onMapLoaded={() => {
                            dispatch({
                                type: RESET_MAP_INITIALIZING
                            })
                        }}
                        onRegionChangeComplete={onRegionChange}
                    >
                        {/* <MapView.Marker
                        coordinate={{
                            latitude: latMarker,
                            longitude: lngMarker,
                        }}
                    /> */}
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

export default MapFinder