import React, { useCallback } from "react";
import { Text, View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { HStack, VStack } from 'native-base';
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import LinearGradient from "react-native-linear-gradient";
import { rankings } from "../../../Redux/Actions/dumpActions";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import Kapitan from '../../../assets/kapitan'
import Styles from "../../../stylesheets/styles";

const Ranking1 = () => {

    const dispatch = useDispatch();

    const { loading, error, mostReportedBrgyDone, mostReportedBrgyUndone, topBrgyUser, topCityUser } = useSelector(state => state.ranking)

    useFocusEffect(
        useCallback(() => {
            dispatch(rankings())
        }, [])
    )


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* most reported */}
            <View style={RandomStyle.rContainer}>
                <Text style={RandomStyle.rText1}>Barangays with Most Reported Illegal Dumps</Text>
                {mostReportedBrgyUndone && mostReportedBrgyUndone.length > 0 ?
                    mostReportedBrgyUndone.map((item, index) => {
                        return (
                            <HStack key={item._id} style={RandomStyle.rItems}>
                                <Text style={RandomStyle.rItem4}>{index + 1}</Text>
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.rItem1}>{item._id}</Text>
                                    <Text numberOfLines={1} style={RandomStyle.rItem3}>Kap. <Kapitan barangay={item._id} /></Text>
                                </VStack>
                                <Text style={RandomStyle.rItem2}>{item.count}</Text>
                            </HStack>
                        )
                    }
                    ) :
                    <View style={Empty1.container}>
                        <Text style={Empty1.text1}>
                            {mostReportedBrgyUndone && mostReportedBrgyUndone.length != undefined ?
                                "No reports yet!" :
                                <Text style={Styles.login}><ActivityIndicator size="large" color="#0F5733" /></Text>
                            }
                        </Text>
                    </View>}
            </View>
        </ScrollView>

    )
}

export default Ranking1;