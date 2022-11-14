import React from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { HStack, VStack } from 'native-base';
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import LinearGradient from "react-native-linear-gradient";

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

const Ranking2 = () => {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {/* most cleaned */}
            <View style={RandomStyle.rContainer}>
                <Text style={RandomStyle.rText1}>Barangays with Most Cleaned Illegal Dumps</Text>
            {dataSample.length > 0 ? 
                dataSample.map((item, index) => {
                    return(
                        <HStack key={item._id.$oid} style={RandomStyle.rItems}>
                            <Text style={RandomStyle.rItem4}>{index+1}</Text>
                            <VStack>
                                <Text numberOfLines={1} style={RandomStyle.rItem1}>asdasdasdasdasdasdbarangay {item.this} asdasdasdasdasdas</Text>
                                <Text numberOfLines={1} style={RandomStyle.rItem3}>brgy caasdasdasdasdasdasdasdasdasdasdasdasdasdasdp</Text>
                            </VStack>
                            <Text style={RandomStyle.rItem2}>{index}000000</Text>
                        </HStack>
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

export default Ranking2;