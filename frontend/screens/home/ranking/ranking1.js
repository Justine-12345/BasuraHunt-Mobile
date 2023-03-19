import React, { useCallback, useState } from "react";
import { Text, View, FlatList, ScrollView, ActivityIndicator, RefreshControl, Modal, TouchableOpacity } from "react-native";
import { HStack, VStack } from 'native-base';
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import LinearGradient from "react-native-linear-gradient";
import { rankings } from "../../../Redux/Actions/dumpActions";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import Kapitan from '../../../assets/kapitan'
import Styles from "../../../stylesheets/styles";
import { DUMP_RANKING_RESET } from "../../../Redux/Constants/dumpConstants";

const Ranking1 = () => {

    const dispatch = useDispatch();

    const { loading, error, mostReportedBrgyDone, mostReportedBrgyUndone, topBrgyUser, topCityUser } = useSelector(state => state.ranking)
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [modalContentTotal, setModalContentTotal] = useState();
    useFocusEffect(
        useCallback(() => {
            dispatch(rankings())
        }, [])
    )


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch({ type: DUMP_RANKING_RESET })
        dispatch(rankings())
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const purok = (purokList) => {
        let count = 1
        let list1 = ""
        let list2 = ""
        // console.log(purokList)

        purokList.forEach(purok => {
            if (count <= 3) {

                if (purok.purok) {
                    list1 = list1 + "Purok " + purok.purok + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)");

                    if (count < purokList.length) {
                        list1 = list1 + ", ";
                    }
                    count++

                } else {
                    list1 = list1 + "Purok " + "unknown" + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)");

                    if (count < purokList.length) {
                        list1 = list1 + ", ";
                    }
                    count++
                }
            }
            else if (count > 3 && count < purokList.length) {

                if (purok.purok) {
                    list2 = list2 + "Purok " + purok.purok + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)") + "\n";
                    count++
                } else {
                    list2 = list2 + "Purok " + "unknown" + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)") + "\n";
                }

            }
            else if (count === purokList.length) {
                if (purok.purok) {
                    list2 = list2 + "Purok " + purok.purok + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)");
                } else {
                    list2 = list2 + "Purok " + "unkown" + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)");
                }
            }

        });

        return (
            list1 + " " + list2
        );
    }



    const purokModal = (purokList) => {
        let count = 1
        let list1 = ""
        let list2 = ""
        // console.log(purokList)
      

        purokList.forEach(purok => {


            if (purok.purok) {
                list1 = list1 + "- Purok " + purok.purok + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)") + "\n";

                // if (count < purokList.length) {
                //     list1 = list1 + ", ";
                // }
                count++

            } else {
                list1 = list1 + "- Purok " + "unknown" + " (" + purok.purokCount + " " + (purok.purokCount >= 2 ? "reports)" : "report)")+ "\n";

                // if (count < purokList.length) {
                //     list1 = list1 + ", ";
                // }
                count++
            }


        });

        return (
            list1 + " " + list2
        );
    }



    const showRankDeatils = (item) => {
        setModalVisible(true);
        setModalContent(item)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

        >

            {/* most reported */}
            <View style={RandomStyle.rContainer}>
                <Text style={RandomStyle.rText1}>Barangays with Most Reported Illegal Dumps</Text>


                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={[RandomStyle.usModal, {  flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                        <View style={[RandomStyle.usPoints,{backgroundColor:"#1e5128"}]}>
                            <VStack>
                                <VStack>
                                    <Text style={{ fontWeight: "bold",color:"white" }}>{modalContent && modalContent.barangay} ({modalContentTotal})</Text>
                                    <Text style={{color:"white"}}>{modalContent && modalContent.puroks && purokModal(modalContent.puroks)}</Text>
                                </VStack>
                                <TouchableOpacity style={[RandomStyle.usClosec,{backgroundColor:"darkgreen"}]} onPress={() => setModalVisible(false)}>
                                    <Text style={RandomStyle.usClose}>
                                        CLOSE
                                    </Text>
                                </TouchableOpacity>
                            </VStack>
                        </View>
                    </View>
                </Modal>

                {mostReportedBrgyUndone && mostReportedBrgyUndone.length > 0 ?
                    mostReportedBrgyUndone.map((item, index) => {
                        {/* {console.log("item._id.barangay", item._id.barangay)} */ }
                        return (
                            <TouchableOpacity onPress={() => {
                                showRankDeatils(item._id,item.count )
                                setModalContentTotal(item.count)
                            }} key={item._id.barangay}>
                                <HStack style={RandomStyle.rItems}>
                                    <Text style={RandomStyle.rItem4}>{index + 1}</Text>
                                    <VStack>
                                        <Text numberOfLines={1} style={RandomStyle.rItem1}>{item._id && item._id.barangay}</Text>
                                        <Text numberOfLines={1} style={RandomStyle.rItem3}>{purok(item._id.puroks)}</Text>
                                    </VStack>
                                    <Text style={RandomStyle.rItem2}>{item.count}</Text>
                                </HStack>
                            </TouchableOpacity>
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