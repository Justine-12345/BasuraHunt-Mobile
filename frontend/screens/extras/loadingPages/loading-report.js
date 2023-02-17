import React, { useState } from "react";
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

const LoadingReport = () => {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <HStack justifyContent={"space-between"}>
                    <Skeleton style={[[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }], { paddingBottom: 0 }]} height={35} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0 }]} height={35} width={"40%"} animation="pulse" />

                </HStack>

                <VStack>
                    <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                    <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />
                </VStack>
                <VStack>
                    <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                    <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />
                </VStack>
                <Text style={RandomStyle.vText2}>Barangay</Text>
                <Skeleton style={{ alignSelf: "center" }} height={25} animation="pulse" />

                <View style={{marginVertical:40}}>
                    <Skeleton style={RandomStyle.vMapContainer} animation="pulse" />
                </View>

                <Text style={RandomStyle.vText2}>Type of Waste</Text>
                <View style={RandomStyle.vContainer2}>
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                    <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0, marginHorizontal: 5 }]} height={25} width={"40%"} animation="pulse" />
                </View>

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <Skeleton style={[RandomStyle.vContainer2, { paddingBottom: 0 }]} height={20} animation="pulse" />

                <Skeleton style={[RandomStyle.vContainer3, { alignSelf: "center", paddingBottom: 0 }]} height={35} width={150} animation="pulse" />

          
        </ScrollView>
    )
}

export default LoadingReport;