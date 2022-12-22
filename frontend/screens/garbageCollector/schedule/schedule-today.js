import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Button, HStack, VStack } from "native-base";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import RandomStyle from "../../../stylesheets/randomStyle";

const CScheduleToday = () => {

    const [schedules, setSchedules] = useState(["a","b","c","b","c","b","c","b","c","b","c","b","c"]);
    // const {navigate} = this.props.navigation;

    const schedulesList = ({item}) => {
        // const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
                <View style={RandomStyle.lContainer4}>
                    <HStack>
                        {/* <Text style={RandomStyle.vBadgeGrey}>FINISHED</Text> */}
                        {/* <Text style={RandomStyle.vBadge}>ONGOING</Text> */}
                        <VStack style={{width: "100%", paddingHorizontal: 10}}>
                            <Text style={RandomStyle.lHeader}>April 14, 2022</Text>
                            <HStack paddingY={2} justifyContent={"space-evenly"}>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Type:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>BIODEGRADABLE</Text>
                                </VStack>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Time:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>8:00AM - 10:00 AM</Text>
                                </VStack>
                            </HStack>
                            <VStack>
                                <Text style={RandomStyle.lHeader1}>Collection Points:</Text>
                                <Text numberOfLines={1} style={RandomStyle.lItem2}>Pampanga Street, Ilocos Street...</Text>
                            </VStack>
                            <TouchableOpacity activeOpacity={0.8} style={{width: 250, alignSelf: "center"}} 
                            // onPress={() => navigation.navigate("Start")}
                            >
                                <Text style={RandomStyle.pButton2}>START NOW!!!</Text>
                            </TouchableOpacity>
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
                        No collection for today!
                    </Text>
                </View>
            } */}
        </>
    )


}

export default CScheduleToday;