import React, {useState} from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { HStack, Select, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";

const LoadingPublicDonationsView = (props) => {

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <HStack>
                        <Text style={RandomStyle.vText1}>Donation (</Text>
                        <Skeleton style={{alignSelf: "center"}} width={150} height={20} animation="pulse"/>
                        <Text style={RandomStyle.vText1}>)</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Text style={RandomStyle.vText2}>Status: </Text>
                                <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>
                            </HStack>
                        </VStack>
                    <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>
                    </HStack>
                    {/* Claim */}
                </View>
                <View style={RandomStyle.vImages}>
                    <Skeleton style={RandomStyle.vImage} animation="pulse"/>
                    <Skeleton style={RandomStyle.vImage} animation="pulse"/>
                    <Skeleton style={RandomStyle.vImage} animation="pulse"/>
                </View>

                <Text style={RandomStyle.vText2}>Type</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Donated by</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
            </View>
        </ScrollView>
    )
}

export default LoadingPublicDonationsView;