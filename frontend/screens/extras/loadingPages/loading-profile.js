import React from "react";
import { Text, View, ScrollView } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "@rneui/themed";

const LoadingProfile = () => {

    return (
        <ScrollView style={RandomStyle.vContainer}>
            <LinearGradient colors={['green','#1E5128']} style={RandomStyle.pContainer}>
                <Skeleton height={20} width={100} animation="pulse"/>
                <Skeleton style={{alignSelf: "center", marginVertical: 10, borderRadius: 10}} height={15} animation="pulse"/>
                <HStack justifyContent={"space-between"}>
                    <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>
                    <Skeleton style={{alignSelf: "center"}} width={100} animation="pulse"/>
                </HStack>
            </LinearGradient>
            <View marginVertical={5} style={RandomStyle.pContainer}>
                <HStack borderBottomColor={"lightgrey"} borderBottomWidth={0.5} paddingBottom={2.5}>
                    <VStack width={"40%"} alignItems={"center"}>
                        <Skeleton style={RandomStyle.pImage} animation="pulse"/>
                    </VStack>
                    <VStack width={"60%"} flex={1} justifyContent={"flex-end"}>
                        <Skeleton style={{alignSelf: "center"}} height={20} width={100} animation="pulse"/>
                    </VStack>
                </HStack>
                <VStack marginX={5}>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Alias: </Text>
                        <Skeleton style={{alignSelf: "center", flex: 1}} animation="pulse"/>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Email: </Text>
                        <Skeleton style={{alignSelf: "center", flex: 1}} animation="pulse"/>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Phone No.: </Text>
                        <Skeleton style={{alignSelf: "center", flex: 1}} animation="pulse"/>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Age: </Text>
                        <Skeleton style={{alignSelf: "center", flex: 1}} animation="pulse"/>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Gender: </Text>
                        <Skeleton style={{alignSelf: "center", flex: 1}} animation="pulse"/>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Address: </Text>
                        <Skeleton style={{alignSelf: "center", flex: 1}} animation="pulse"/>
                    </HStack>
                </VStack>
            </View>
            <View style={[RandomStyle.pContainer, {marginBottom: 20}]}>
                <Text style={RandomStyle.pText4}>Rank</Text>
                <View style={RandomStyle.pContainer2}>
                    <Skeleton style={{alignSelf: "center"}} height={100} animation="pulse"/>
                </View>
                <Text style={RandomStyle.pText4}>Statistics</Text>
                <View style={[RandomStyle.pContainer2, {borderBottomColor: "lightgrey", borderBottomWidth: 0.5, paddingBottom: 10}]}>
                    <Skeleton style={{alignSelf: "center"}} height={100} animation="pulse"/>
                </View>
                <Skeleton style={{alignSelf: "center", marginVertical: 10}} height={25} width={250} animation="pulse"/>
            </View>
        </ScrollView>
    )
}

export default LoadingProfile;