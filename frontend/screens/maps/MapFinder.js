import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-svg';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { SET_COORDINATE } from '../../Redux/Constants/mapConstants';
import { useDispatch, useSelector } from 'react-redux';
const MapFinder = () => {

    (async () => {
        if (Platform.OS !== "web") {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatUser(location.coords.latitude)
        setLngUser(location.coords.longitude)
    })();
    
    const { latitude: mapLatitude, longitude: mapLongtitude } = useSelector(state => state.coordinate)

    useFocusEffect(
        useCallback(()=>{
            // console.log(mapLatitude)
            if(mapLatitude===null){
                setLatMarker(0)
                setLngMarker(0)
            }
        },[mapLatitude, mapLongtitude])
    )
   

    const dispatch = useDispatch()

    const [latUser, setLatUser] = useState(0)
    const [lngUser, setLngUser] = useState(0)

    const [latMarker, setLatMarker] = useState(0)
    const [lngMarker, setLngMarker] = useState(0)
    let lat = 0
    let lng = 0

    
    const getUserLocation = async () => {

        let location = await Location.getCurrentPositionAsync({});
        // console.log("i",location.coords.latitude);
        // console.log(location.coords.longitude);
        setLatUser(location.coords.latitude)
        setLngUser(location.coords.longitude)

        const data = {latitude:location.coords.latitude, longitude:location.coords.longitude}
            
        dispatch({
            type: SET_COORDINATE,
            payload:data
        })
    }

    const onRegionChange = (region) => {

        lat = region.latitude
        lng = region.longitude
        // console.log("lat", lat);
        // console.log("lng", lng);
        setLatMarker(region.latitude)
        setLngMarker(region.longitude)

        const data = {latitude:region.latitude, longitude:region.longitude}
            
        dispatch({
            type: SET_COORDINATE,
            payload:data
        })
    }

    return (
        <>
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={{
                        latitude: latMarker!==0?undefined:latUser,
                        longitude: lngMarker!==0?undefined:lngUser,
                        latitudeDelta: 0.00056,
                        longitudeDelta: 0.00011,
                    }}
                    onMapLoaded={getUserLocation}
                    onRegionChangeComplete={onRegionChange}
                >
                    {/* <MapView.Marker
                        coordinate={{
                            latitude: latMarker,
                            longitude: lngMarker,
                        }}
                    /> */}
                </MapView>

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
        zIndex:1
    },
    map: {
        width: Dimensions.get('window').width / 1.05,
        height: Dimensions.get('window').width / 1.5,
        marginVertical: 5,
        zIndex:1
    }
});

export default MapFinder