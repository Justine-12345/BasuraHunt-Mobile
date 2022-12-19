import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";

const LoadingList = () => {

    return (
        <>
            <View style={RandomStyle.lContainer3}>
                <HStack style={RandomStyle.searchContainer}>  
                    <Text style={RandomStyle.searchInput}/>
                    <TouchableOpacity disabled style={RandomStyle.searchFilterContainer}>
                        <Text style={RandomStyle.searchFilter}><Ionicons name="options" size={30} color="#1E5128"/></Text>
                    </TouchableOpacity>
                </HStack>
            </View>
        <ScrollView> 
            <View style={RandomStyle.lContainer2}>
                <HStack>
                    <Skeleton animation="pulse" style={RandomStyle.lImg}/>
                    <VStack>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lTitle]} height={12}/>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lContent]} height={12}/>
                        <View style={{flex: 1, justifyContent: "flex-end",}}>
                        <Skeleton animation="pulse" style={{alignSelf: "flex-end"}} width={80} height={12}/>
                        </View>
                    </VStack>
                </HStack>
            </View>
            <View style={RandomStyle.lContainer2}>
                <HStack>
                    <Skeleton animation="pulse" style={RandomStyle.lImg}/>
                    <VStack>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lTitle]} height={12}/>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lContent]} height={12}/>
                        <View style={{flex: 1, justifyContent: "flex-end",}}>
                        <Skeleton animation="pulse" style={{alignSelf: "flex-end"}} width={80} height={12}/>
                        </View>
                    </VStack>
                </HStack>
            </View>
            <View style={RandomStyle.lContainer2}>
                <HStack>
                    <Skeleton animation="pulse" style={RandomStyle.lImg}/>
                    <VStack>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lTitle]} height={12}/>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lContent]} height={12}/>
                        <View style={{flex: 1, justifyContent: "flex-end",}}>
                        <Skeleton animation="pulse" style={{alignSelf: "flex-end"}} width={80} height={12}/>
                        </View>
                    </VStack>
                </HStack>
            </View>
            <View style={RandomStyle.lContainer2}>
                <HStack>
                    <Skeleton animation="pulse" style={RandomStyle.lImg}/>
                    <VStack>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lTitle]} height={12}/>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lContent]} height={12}/>
                        <View style={{flex: 1, justifyContent: "flex-end",}}>
                        <Skeleton animation="pulse" style={{alignSelf: "flex-end"}} width={80} height={12}/>
                        </View>
                    </VStack>
                </HStack>
            </View>
            <View style={RandomStyle.lContainer2}>
                <HStack>
                    <Skeleton animation="pulse" style={RandomStyle.lImg}/>
                    <VStack>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lTitle]} height={12}/>
                        <Skeleton animation="pulse" style={[{marginTop: 10}, RandomStyle.lContent]} height={12}/>
                        <View style={{flex: 1, justifyContent: "flex-end",}}>
                        <Skeleton animation="pulse" style={{alignSelf: "flex-end"}} width={80} height={12}/>
                        </View>
                    </VStack>
                </HStack>
            </View>
        </ScrollView>
        </>
    )
}

export default LoadingList;