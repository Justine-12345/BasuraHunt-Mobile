import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import MapLive from "../../maps/MapLive";
import * as Location from 'expo-location';

const Start = () => {

    return (
        <> 
            <View style={RandomStyle.lContainer3}>
                <Text style={RandomStyle.vText1}>Barangay LoremBoomBoom</Text>
                <Text style={RandomStyle.vText1}>April 14, 2022</Text>
                <Text style={RandomStyle.vText3}>Time: 8:00 -10:00 AM</Text>
                <Text style={RandomStyle.vText3}>Collection Points: Pampanga Street, Ilocos Street</Text>
                <Text style={RandomStyle.vText3}>Type: Biodegradable</Text>
                <Text style={RandomStyle.vText5}>ON-GOING</Text>
            </View>
        
            <MapLive/>
         
      
        </>
    )

    
}

export default Start;