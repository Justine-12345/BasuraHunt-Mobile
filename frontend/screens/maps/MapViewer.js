import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-svg';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
const MapViewer = ({ long, lati }) => {


    const [initLat, setInitLat] = useState(0)
    const [initLng, setInitLng] = useState(0)

    const [latMarker, setLatMarker] = useState(0)
    const [lngMarker, setLngMarker] = useState(0)

    useFocusEffect(
        useCallback(() => {
            // console.log("map", long + " " + lati)
            setInitLat(lati)
            setInitLng(long)
            setLatMarker(lati)
            setLngMarker(long)
        })
    )



    return (
        <>
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={{
                        latitude: initLat,
                        longitude: initLng,
                        latitudeDelta: 0.00056,
                        longitudeDelta: 0.00011,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: latMarker,
                            longitude: lngMarker,
                        }}
                    >
                        <Image
                            source={{ uri: "https://img.icons8.com/glyph-neue/100/26ff00/marker.png" }}
                            style={{ width: 38, height: 40 }}
                            resizeMode="stretch"
                        />
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

export default MapViewer