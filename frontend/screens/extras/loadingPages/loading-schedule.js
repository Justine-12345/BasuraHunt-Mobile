import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from ",./../../stylesheets/randomStyle";
import { Skeleton } from "@rneui/themed";

const LoadingSchedule = () => {

    return (
        <ScrollView> 
            <View style={RandomStyle.lContainer3}>
                <Skeleton height={30} animation="pulse"/>
            </View>
            <View paddingHorizontal={10}>
                <Skeleton style={{borderRadius: 10, marginVertical: 5, elevation: 3,}} height={140} animation="pulse"/>
                <Skeleton style={{borderRadius: 10, marginVertical: 5, elevation: 3,}} height={140} animation="pulse"/>
                <Skeleton style={{borderRadius: 10, marginVertical: 5, elevation: 3,}} height={140} animation="pulse"/>
                <Skeleton style={{borderRadius: 10, marginVertical: 5, elevation: 3,}} height={140} animation="pulse"/>
            </View>
        </ScrollView>
    )
}

export default LoadingSchedule;