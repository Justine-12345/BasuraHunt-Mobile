import React from "react";
import { View, ScrollView } from "react-native";
import RandomStyle from "../../../stylesheets/randomStyle";
import { Skeleton } from "@rneui/themed";

const LoadingRanking = () => {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={RandomStyle.rContainer}>
                <View style={RandomStyle.rText1}>
                    <Skeleton animation="pulse" style={{marginVertical: 8, alignSelf: "center"}} width={"80%"} height={20}/>
                    <Skeleton animation="pulse" style={{marginBottom: 8, alignSelf: "center"}} width={"50%"} height={20}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
                <View style={[RandomStyle.rItems, {padding: 0}]}>
                    <Skeleton animation="pulse" height={90}/>
                </View>
            </View>
        </ScrollView>
    )
}

export default LoadingRanking;