import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";

const Start = () => {

    return (
        <> 
            <View style={RandomStyle.lContainer3}>
                {/* <Text style={RandomStyle.vText1}>Barangay LoremBoomBoom</Text> */}
                <Text style={RandomStyle.vText1}>April 14, 2022</Text>
                <Text style={RandomStyle.vText3}>Time: 8:00 -10:00 AM</Text>
                <Text style={RandomStyle.vText3}>Collection Points: Pampanga Street, Ilocos Street</Text>
                <Text style={RandomStyle.vText3}>Type: Biodegradable</Text>
                <Text style={RandomStyle.vText5}>ON-GOING</Text>
            </View>

            {/* dko malagyan ng box for map baka magalaw ung randomStyle css
            tas nag add ako ng green na vText5 */}
      
        </>
    )

    
}

export default Start;