import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";

const ScheduleToday = () => {

    const [schedules, setSchedules] = useState(["a","b","c","b","c","b","c","b","c","b","c","b","c"]);

    const schedulesList = ({item}) => {
        // const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
                <View style={RandomStyle.lContainer4}>
                    <HStack>
                        <Text style={RandomStyle.vBadgeGrey}>FINISHED</Text>
                        {/* <Text style={RandomStyle.vBadge}>ONGOING</Text> */}
                        <VStack style={{width: "100%", paddingHorizontal: 10}}>
                            <Text style={RandomStyle.lHeader}>Novermber 20, 2022</Text>
                            <HStack paddingY={2} justifyContent={"space-evenly"}>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Type:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>Type1asasdsdasdsaddasdas, Type2, Typasdasdasdsade3</Text>
                                </VStack>
                                <VStack>
                                    <Text style={RandomStyle.lHeader1}>Time:</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lItem}>10:00AM - 10:05asdasdasdasdasAM</Text>
                                </VStack>
                            </HStack>
                            <VStack>
                                <Text style={RandomStyle.lHeader1}>Collection Points:</Text>
                                <Text numberOfLines={1} style={RandomStyle.lItem2}>asdasdfsdsd as, asdasd, asdasdasd, asdasdasd, asdasdasd, asdasdasdasda</Text>
                            </VStack>
                            <TouchableOpacity activeOpacity={0.8} style={{width: 250, alignSelf: "center"}}>
                                <Text style={RandomStyle.pButton2}>Watch Now</Text>
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

export default ScheduleToday;