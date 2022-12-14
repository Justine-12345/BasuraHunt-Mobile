import React from "react";
import { Text, View, Dimensions } from "react-native";
import { HStack } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import RandomStyle from "../../../stylesheets/randomStyle";
import { Skeleton } from "@rneui/themed";

const {width} = Dimensions.get("window")

const LoadingNewsfeedView = () => {
        
    return (
        <ScrollView>
            <Skeleton animation="pulse" style={{marginVertical: 10, borderRadius: 5, alignSelf: "center"}} width={width-50} height={250}/>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Skeleton animation="pulse" marginBottom={5} height={20}/>
                    <HStack>
                        {/* tags */}
                        <Text style={RandomStyle.vText2}>Tags: </Text>
                        <Skeleton animation="pulse" style={{alignSelf: "center"}} width={width-150}/>
                    </HStack>
                    <HStack>
                        {/* date published */}
                        <Text style={RandomStyle.vText2}>Date Published: </Text>
                        <Skeleton animation="pulse" style={{alignSelf: "center"}} width={width-150}/>
                    </HStack>
                    <HStack>
                        {/* author */}
                        <Text style={RandomStyle.vText2}>Author: </Text>
                        <Skeleton animation="pulse" style={{alignSelf: "center"}} width={width-150}/>
                    </HStack>
                </View>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>
                <Skeleton animation="pulse" style={[{marginBottom: 10},RandomStyle.vText3]}/>

            </View>

        </ScrollView>
    )
}

export default LoadingNewsfeedView;