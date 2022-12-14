import React, {useState} from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, ImagePickerIOS } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckboxBtn from "../../../stylesheets/checkboxBtn";
import BhButton from "../../../stylesheets/button";
import Form1 from "../../../stylesheets/form1";
import * as ImagePicker from "expo-image-picker";
import { Skeleton } from "@rneui/themed";

const LoadingDonate = () => {

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Donate Items</Text>
                </View>
                
                <HStack justifyContent={"space-between"}>
                <Skeleton style={RandomStyle.vContainer2} height={35} width={"40%"} animation="pulse"/>
                <Skeleton style={RandomStyle.vContainer2} height={35} width={"40%"} animation="pulse"/>

                </HStack>

                <Text style={RandomStyle.vText2}>Barangay Hall</Text>
                <Text style={{fontStyle: "italic"}}>(To ensure the security of both parties, the meetup location for donation should only be in the Barangay Hall of one of the involved parties. )</Text>
                <View style={RandomStyle.vContainer3}>
                    <Select isDisabled/>
                </View>
                <Text style={RandomStyle.vText2}>Type of Donation</Text>
                <View style={RandomStyle.vContainer2}>
                    <Skeleton style={RandomStyle.vContainer2} height={25} width={"40%"} animation="pulse"/>
                    <Skeleton style={RandomStyle.vContainer2} height={25} width={"40%"} animation="pulse"/>
                    <Skeleton style={RandomStyle.vContainer2} height={25} width={"40%"} animation="pulse"/>
                    <Skeleton style={RandomStyle.vContainer2} height={25} width={"40%"} animation="pulse"/>
                    <Skeleton style={RandomStyle.vContainer2} height={25} width={"40%"} animation="pulse"/>
                    <Skeleton style={RandomStyle.vContainer2} height={25} width={"40%"} animation="pulse"/>
                </View>

                <Text style={RandomStyle.vText2}>Item Name:</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                
                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                
                <Text style={RandomStyle.vText2}>Donate Using:</Text>
                <View style={RandomStyle.vContainer3}>
                    <Select isDisabled/>
                </View>
                <Skeleton style={[{alignSelf: "center"}, RandomStyle.vContainer3]} height={35} width={150} animation="pulse"/>

            </View>
        </ScrollView>
    )
}

export default LoadingDonate;