import React, { useCallback } from "react";
import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import { HStack, VStack } from 'native-base';
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { LinearGradient } from "expo-linear-gradient";
import { rankings } from "../../../Redux/Actions/dumpActions";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import Styles from "../../../stylesheets/styles";

const Ranking3 = () => {
    const dispatch = useDispatch();

    const { loading, error, mostReportedBrgyDone, mostReportedBrgyUndone, topBrgyUser, topCityUser, userBarangay } = useSelector(state => state.ranking)

    useFocusEffect(
        useCallback(() => {
            dispatch(rankings())
        }, [])
    )

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* barangay top 10 */}
            <View style={RandomStyle.rContainer}>
                <View style={RandomStyle.rText2Cont}>
                    <Text style={RandomStyle.rText2}>Brgy.{userBarangay && userBarangay}</Text>
                    <Text style={RandomStyle.rText2}>Top 10 Users</Text>
                </View>
                {topBrgyUser && topBrgyUser.length > 0 ?
                    topBrgyUser.map((item, index) => {
                        return (
                            <View key={item._id.id}>

                                <LinearGradient colors={['#91de0d', '#1E5128']} style={RandomStyle.rItems}>
                                    <Text style={RandomStyle.rItem4}>{index + 1}</Text>
                                    <VStack>
                                        <Text numberOfLines={1} style={RandomStyle.rItem6}>{item._id.alias}</Text>
                                        <Text numberOfLines={1} style={RandomStyle.rItem3}>Level {item._id.level}</Text>
                                    </VStack>
                                    {item._id.level <= 5 ?
                                        <Image source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge1-sm_ufs5x3.png" }} style={RandomStyle.rItem5} /> :

                                        item._id.level >= 6 && item._id.level <= 10 ?
                                            <Image source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge2-sm_dqizcs.png" }} style={RandomStyle.rItem5} /> :

                                            item._id.level >= 11 && item._id.level <= 15 ?
                                                <Image source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge3-sm_uqgaye.png" }} style={RandomStyle.rItem5} /> :

                                                item._id.level >= 16 ?
                                                    <Image source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge4-sm_mwrk05.png" }} style={RandomStyle.rItem5} /> : ""
                                    }
                                </LinearGradient>

                            </View>
                        )
                    }
                    ) :
                    <View style={Empty1.container}>
                        <Text style={Empty1.text1}>
                            {topBrgyUser && topBrgyUser.length != undefined ?
                                "No reports yet!" :
                                <Text style={Styles.login}><ActivityIndicator size="large" color="#0F5733" /></Text>
                            }
                        </Text>
                    </View>}
            </View>
        </ScrollView>

    )
}

export default Ranking3;