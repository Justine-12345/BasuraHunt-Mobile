import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { HStack, VStack } from 'native-base';
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { LinearGradient } from "expo-linear-gradient";

// sample dataSample
const dataSample = [
    {"_id":{"$oid":"6326bd088b17899e85431c01"}, "this":"these1"},
    {"_id":{"$oid":"6326bd088b17899e85431c02"}, "this":"that2"},
    {"_id":{"$oid":"6326bd088b17899e85431c03"}, "this":"those3"},
    {"_id":{"$oid":"6326bd088b17899e85431c04"}, "this":"that4"},
    {"_id":{"$oid":"6326bd088b17899e85431c05"}, "this":"those5"},
    {"_id":{"$oid":"6326bd088b17899e85431c06"}, "this":"that6"},
    {"_id":{"$oid":"6326bd088b17899e85431c07"}, "this":"those7"},
    {"_id":{"$oid":"6326bd088b17899e85431c08"}, "this":"that8"},
    {"_id":{"$oid":"6326bd088b17899e85431c09"}, "this":"those9"}
];

const Ranking4 = () => {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {/* taguig top 10 */}
            <View style={RandomStyle.rContainer}>
                <View style={RandomStyle.rText2Cont}>
                    <Text style={RandomStyle.rText2}>Taguig</Text>
                    <Text style={RandomStyle.rText2}>Top 10 Users</Text>
                </View>
            {dataSample.length > 0 ? 
                dataSample.map((item, index) => {
                    return(
                        <View key={item._id.$oid}>
                        {index == 0 ?
                            <LinearGradient colors={['#91de0d','#1E5128']} style={RandomStyle.rItems}>
                                <Text style={RandomStyle.rItem4}>{index+1}</Text>
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.rItem6}>Jane asdasdasd asdasdasdasdasd {item.this}asdasdasdasdasdas</Text>
                                    <Text numberOfLines={1} style={RandomStyle.rItem3}>Level 2</Text>
                                </VStack>
                                <Image source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge4-sm_mwrk05.png"}} style={RandomStyle.rItem5}/>
                            </LinearGradient>
                            :
                            index == 1 ?
                                <LinearGradient colors={['#5fad1a','#1E5128']} style={RandomStyle.rItems}>
                                    <Text style={RandomStyle.rItem4}>{index+1}</Text>
                                    <VStack>
                                        <Text numberOfLines={1} style={RandomStyle.rItem6}>Jane asdasdasd asdasdasdasdasd {item.this}asdasdasdasdasdas</Text>
                                        <Text numberOfLines={1} style={RandomStyle.rItem3}>Level 2</Text>
                                    </VStack>
                                    <Image source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge4-sm_mwrk05.png"}} style={RandomStyle.rItem5}/>
                                </LinearGradient>
                                :
                                index == 2 ?
                                    <LinearGradient colors={['#368f1b','#1E5128']} style={RandomStyle.rItems}>
                                        <Text style={RandomStyle.rItem4}>{index+1}</Text>
                                        <VStack>
                                            <Text numberOfLines={1} style={RandomStyle.rItem6}>Jane asdasdasd asdasdasdasdasd {item.this}asdasdasdasdasdas</Text>
                                            <Text numberOfLines={1} style={RandomStyle.rItem3}>Level 2</Text>
                                        </VStack>
                                        <Image source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge4-sm_mwrk05.png"}} style={RandomStyle.rItem5}/>
                                    </LinearGradient>
                                    :
                                    <View style={RandomStyle.rItems}>
                                        <Text style={RandomStyle.rItem4}>{index+1}</Text>
                                        <VStack>
                                            <Text numberOfLines={1} style={RandomStyle.rItem6}>Jane asdasdasd asdasdasdasdasd {item.this}asdasdasdasdasdas</Text>
                                            <Text numberOfLines={1} style={RandomStyle.rItem3}>Level 1</Text>
                                        </VStack>
                                        <Image source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659106961/BasuraHunt/Badges/badge4-sm_mwrk05.png"}} style={RandomStyle.rItem5}/>
                                    </View>
                        }
                        </View>
                    )
                }
                ): 
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No ranking yet!
                    </Text>
                </View>}
            </View>
        </ScrollView>

    )
}

export default Ranking4;