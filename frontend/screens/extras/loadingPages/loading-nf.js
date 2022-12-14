import React from "react";
import { ScrollView, View } from "react-native";
import RandomStyle from "../../../stylesheets/randomStyle";
import { Skeleton } from "@rneui/themed";


const LoadingNewsfeed = () => {

    return (
        <ScrollView>
            <View style={RandomStyle.lLatestContainer}>
                <Skeleton animation="pulse" height={300}/>
            </View>
            <View style={RandomStyle.lContainer}>
                <Skeleton animation="pulse" height={100}/>
            </View>
            <View style={RandomStyle.lContainer}>
                <Skeleton animation="pulse" height={100}/>
            </View>
            <View style={RandomStyle.lContainer}>
                <Skeleton animation="pulse" height={100}/>
            </View>
            <View style={RandomStyle.lContainer}>
                <Skeleton animation="pulse" height={100}/>
            </View>
            <View style={RandomStyle.lContainer}>
                <Skeleton animation="pulse" height={100}/>
            </View>
            </ScrollView>
    )
}

export default LoadingNewsfeed;