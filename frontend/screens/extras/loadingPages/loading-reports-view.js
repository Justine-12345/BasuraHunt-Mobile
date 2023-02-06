import React from "react";
import { Text, View, ScrollView } from "react-native";
import { HStack, Select, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import { Skeleton } from "@rneui/themed";

const LoadingPublicReportsView = () => {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Illegal Dump No.</Text>
                    <Skeleton style={{alignSelf: "center"}} height={20} animation="pulse"/>                    
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Text style={RandomStyle.vText2}>Status: </Text>
                                <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>                    
                            </HStack>
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Cleaned: </Text>
                                    <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>                    
                                </HStack>
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Reported: </Text>
                                    <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>                    
                                </HStack>
                        </VStack>                  
                        
                    </HStack>
                </View>
                <HStack>
                    <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                    <Skeleton style={{alignSelf: "center"}} width={"27%"} animation="pulse"/>                    
                </HStack>
                <HStack>
                    <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                    <Skeleton style={{alignSelf: "center"}} width={"50%"} animation="pulse"/>                    
                </HStack>
                <Skeleton style={RandomStyle.vMapContainer} animation="pulse"/>
                <View style={RandomStyle.vImages}>
                    <Skeleton style={RandomStyle.vImage} animation="pulse"/>                    
                    <Skeleton style={RandomStyle.vImage} animation="pulse"/>                    
                    <Skeleton style={RandomStyle.vImage} animation="pulse"/>                    
                </View>

                <Text style={RandomStyle.vText2}>Type of Waste</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Size of Waste</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Accessible by</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Category of Violation</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>
                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <Skeleton style={RandomStyle.vContainer2} height={20} animation="pulse"/>


                <Text style={RandomStyle.vText2}>Reported by</Text>
                <View style={RandomStyle.vContainer2}>
                    <Skeleton style={{alignSelf: "center"}} height={20} animation="pulse"/>                    
                </View>

                <Text style={RandomStyle.vText2}>Comment Section</Text>

                <Select isDisabled backgroundColor={"white"} marginY={1} placeholder="Select Identity">
                </Select>
                <Text
                    style={RandomStyle.vMultiline}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>
        </ScrollView>
    )
}

export default LoadingPublicReportsView;