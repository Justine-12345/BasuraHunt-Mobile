import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from ",./../../stylesheets/randomStyle";
import { Skeleton } from "@rneui/themed";

const LoadingUpcomingSchedule = () => {

    return (
        <ScrollView>
            <View style={RandomStyle.lContainer3}>
                <Skeleton height={30} animation="pulse" />
            </View>


            <View paddingHorizontal={10}>
                <HStack>
                    
                    <Skeleton style={RandomStyle.usSchedLoading}  animation="pulse" />
                    <Skeleton style={RandomStyle.usSchedLoading}  animation="pulse" />
                </HStack>
                <HStack>
                    <Skeleton style={RandomStyle.usSchedLoading}  animation="pulse" />
                    <Skeleton style={RandomStyle.usSchedLoading}  animation="pulse" />
                </HStack>
                  <HStack>
                    <Skeleton style={RandomStyle.usSchedLoading}  animation="pulse" />
                    <Skeleton style={RandomStyle.usSchedLoading}  animation="pulse" />
                </HStack>

                
            </View>
        </ScrollView>
    )
}

export default LoadingUpcomingSchedule;