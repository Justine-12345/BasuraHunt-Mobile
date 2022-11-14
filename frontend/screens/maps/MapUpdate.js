import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-svg';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { SET_COORDINATE } from '../../Redux/Constants/mapConstants';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'native-base';
const MapUpdate = ({ long, lati }) => {

    (async () => {
        if (Platform.OS !== "web") {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
        }
    })();

    const dispatch = useDispatch()
    
    const [initLat, setInitLat] = useState(0)
    const [initLng, setInitLng] = useState(0)

    const [latUser, setLatUser] = useState(0)
    const [lngUser, setLngUser] = useState(0)

    const [latMarker, setLatMarker] = useState(0)
    const [lngMarker, setLngMarker] = useState(0)



    useFocusEffect(
        useCallback(() => {
            setInitLat(lati)
            setInitLng(long)
        })
    )


    const getUserLocation = async () => {
       
        let location = await Location.getCurrentPositionAsync({});
        setLatUser(location.coords.latitude)
        setLngUser(location.coords.longitude)

        const data = {latitude:location.coords.latitude, longitude:location.coords.longitude}
        // console.log("userLocation", data)
        dispatch({
            type: SET_COORDINATE,
            payload:data
        })
    }

    const onRegionChange = (region) => {
       
        setLatMarker(region.latitude)
        setLngMarker(region.longitude)
        setLatUser(0)
        setLngUser(0)
        const data = {latitude:region.latitude, longitude:region.longitude}
        // console.log("onChange", data)
        dispatch({
            type: SET_COORDINATE,
            payload:data
        })
    }

    const onMapLoad = () => {
       
        setLatUser(0)
        setLngUser(0)
        const data = {latitude:lati, longitude:long}
        // console.log("onLoad", data)
        dispatch({
            type: SET_COORDINATE,
            payload:data
        })
    }

    return (
        <>
         <MaterialCommunityIcons
            onPress={getUserLocation}
            style={{position:"absolute", zIndex:2, backgroundColor:"#AEDBC5",borderRadius:10, color:"green", margin:5}}
                            name="map-marker-account"
                            size={50}
                        />
            <View style={styles.container}>
           
                <MapView style={styles.map}
                    region={{
                        latitude: !latUser ? (latMarker!==0?undefined:initLat):latUser,
                        longitude: !lngUser ? (lngMarker!==0?undefined:initLng): lngUser,
                        latitudeDelta: 0.00056,
                        longitudeDelta: 0.00011,
                    }}
                    onRegionChangeComplete={onRegionChange}
                    onMapLoaded={onMapLoad}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: initLat,
                            longitude: initLng,
                        }}
                    >
                        <View style={{borderColor:"black", borderWidth:0, justifyContent:"center", alignItems:"center", position:"relative", top:2}}>
                        <Text style={{borderColor:"black", borderWidth:0, fontWeight:"bold", color:"#025B2E"}}>Old Location</Text>
                        <Image
                            source={{ uri: "https://img.icons8.com/glyph-neue/100/7EA692/marker.png" }}
                            style={{ width: 48, height: 50, borderColor:"black", borderWidth:0 }}
                            resizeMode="stretch"
                        
                        />
                        </View>
                       
                    </MapView.Marker>
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
        zIndex: 1
    },
    map: {
        width: Dimensions.get('window').width / 1.05,
        height: Dimensions.get('window').width / 1.5,
        marginVertical: 5,
        zIndex: 1
    }
});

export default MapUpdate