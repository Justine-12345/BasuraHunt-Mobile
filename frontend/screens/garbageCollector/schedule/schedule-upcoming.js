import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";

const GScheduleUpcoming = () => {

    const [schedules, setSchedules] = useState(["a","b","c"]);

    const schedulesList = ({item}) => {
        // const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
                <View style={RandomStyle.lContainer4Grey}>
                    <HStack>
                        <VStack style={{width: "100%", paddingHorizontal: 10}}>
                            <Text style={RandomStyle.lItem2}>FRIDAY</Text>
                            <Text style={RandomStyle.lHeader}>April 15, 2022</Text>
                            <HStack paddingY={2} justifyContent={"space-evenly"}>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Type:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>Biodegradable</Text>
                                </VStack>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Time:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>8:00AM - 10:00 AM</Text>
                                </VStack>
                            </HStack>
                            <VStack paddingBottom={2}>
                                <Text style={RandomStyle.lHeader1}>Collection Points:</Text>
                                <Text numberOfLines={1} style={RandomStyle.lItem2}>Pampanga Street, Ilocos Street...</Text>
                            </VStack>
                        </VStack>
                    </HStack>
                </View>
            </>
        )
    }

    return (
        <> 
            <View style={RandomStyle.lContainer3}>
                <Text style={RandomStyle.vText1}>Barangay LoremBoomBoom</Text>
            </View>
            {/* {schedule.length > 0 ?  */}
                <FlatList
                    data={schedules}
                    renderItem={schedulesList}
                    // keyExtractor={item=>item._id}
                />
                {/* : 
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No upcoming collection yet!
                    </Text>
                </View>
            } */}
        </>
    )
}

export default GScheduleUpcoming;