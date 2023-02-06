import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { reportedDumps } from "../../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingList from "../../extras/loadingPages/loading-list";
import { getSingleDump } from "../../../Redux/Actions/dumpActions";
const UserReportsList = (props) => {
    const dispatch = useDispatch()
    const sampleReports = require("../../../assets/sampleData/dumps.json");
    const { loading, error, userDumps } = useSelector(state => state.userReportsAndItems)

    const [reports, setReports] = useState();
    const [searching, setSearching] = useState(false);
    const [dumpCount, setDumpCount] = useState(0);

    useFocusEffect(
        useCallback(() => {


            if (searching === false || searching === undefined || !reports) {
                dispatch(reportedDumps())

            }
            // setDumpCount(reports && reports.length)

            return () => {
                setReports();
                setSearching();
            }
        }, [])

    )

    useEffect(() => {
        setReports(userDumps && userDumps)
    }, [userDumps])


    const search = (text) => {

        if (text.length >= 1) {
            setSearching(true)
        } else {
            setSearching(false)
        }

        // console.log(text.length >= 1)

        if (text == "") {
            setReports(userDumps)
        }
        setReports(
            userDumps.filter((item) =>
                item.dump.complete_address.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const reportsItem = ({ item }) => {

        if (item.dump !== null) {
            return (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(getSingleDump(item.dump._id))
                            props.navigation.navigate("MyPublicReportsView", { item_id: item.dump._id })
                        }}
                        activeOpacity={.8}>
                        <View style={RandomStyle.lContainer2}>
                            <HStack>
                                {/* hide if not cleaned??? */}
                                {item.dump.status === "Cleaned" ?
                                    <Text style={RandomStyle.vBadge}>{item.dump.status}</Text> : ""
                                }
                                {item.dump.images[0] ?
                                    <Image source={{ uri: item.dump.images[0].url.toString() }} resizeMode="cover" style={RandomStyle.lImg} /> :
                                    <Image source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659267361/BasuraHunt/Static/288365377_590996822453374_4511488390632883973_n_1_odzuj0.png" }} resizeMode="stretch" style={RandomStyle.lImg} />}
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.dump.complete_address}</Text>
                                    {/* item.additional_desciption change to item.addition_description */}
                                    <Text numberOfLines={2} style={RandomStyle.lContent}>{item.dump.additional_desciption}</Text>
                                    <View style={{ flex: 1, justifyContent: "flex-end", }}>
                                        <Text style={{ alignSelf: "flex-end" }}>{new Date(item.dump.createdAt).toLocaleDateString()}</Text>
                                    </View>
                                </VStack>
                            </HStack>
                        </View>
                    </TouchableOpacity>
                </>
            )
        }
    }
    return (
        <>

            <>

                <View style={RandomStyle.lContainer3}>
                    <Text style={[RandomStyle.vText1, { marginVertical: 8 }]}>My Reported Illegal Dumps</Text>
                    <HStack style={RandomStyle.searchContainer}>
                        <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => search(text)} />
                    </HStack>
                    <Text style={[RandomStyle.vText1, { fontSize: 15 }]}>Total: {reports && reports.length}</Text>
                </View>
                {loading ?
                    <LoadingList /> :
                    <>
                        {reports && reports.length > 0 ?
                            <FlatList
                                data={reports}
                                renderItem={reportsItem}
                                keyExtractor={item => item._id}
                            />
                            :
                            <View style={Empty1.container}>
                                <Text style={Empty1.text1}>
                                    No reports yet!
                                </Text>
                            </View>
                        }
                    </>
                }



            </>
        </>
    )
}

export default UserReportsList;