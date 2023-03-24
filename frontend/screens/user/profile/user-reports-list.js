import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, RefreshControl, Dimensions } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { reportedDumps } from "../../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingList from "../../extras/loadingPages/loading-list";
import { getSingleDump } from "../../../Redux/Actions/dumpActions";
import { Skeleton } from "native-base";
import { USER_DUMP_PAGE_SET } from "../../../Redux/Constants/userConstants";
const windowWidth = Dimensions.get('window').width;
const UserReportsList = (props) => {
    const dispatch = useDispatch()
    const sampleReports = require("../../../assets/sampleData/dumps.json");
    const { loading, dumpsCount, resPerPage, filteredDumpCounterror, userDumps } = useSelector(state => state.userReportsAndItems)
    const { page } = useSelector(state => state.userDumpPage);
    const [reports, setReports] = useState([]);
    const [searching, setSearching] = useState(false);
    const [dumpCount, setDumpCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setReports([])
        setCurrentPage(1)
        dispatch(reportedDumps(1))
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useFocusEffect(
        useCallback(() => {


            // if (searching === false || searching === undefined || !reports) {
            //     dispatch(reportedDumps(1))
            // }
            console.log("page", page)
            if (reports && reports.length <= 0 && page <= 0 || page === 1 || page === undefined) {
                setReports([])
                dispatch(reportedDumps(1))
            }

            if (page === 1) {
                setReports([])
                setCurrentPage(1)
            }


            // return () => {
            //     setReports();
            //     setSearching();
            //     setCurrentPage(1)
            // }
        }, [page])

    )

    useEffect(() => {
        // if (currentPage <= 1) {
        //     setReports([])
        // }

        // if (userDumps) {
        //     if(reports&&reports.length>=1){
        //         setReports(oldArray => oldArray.concat(userDumps && userDumps))
        //     }else{
        //         setReports(userDumps && userDumps)
        //     }
        // }

        if (userDumps) {
            if (reports && reports.length >= 1) {
                setReports(oldArray => oldArray.concat(userDumps && userDumps))
            } else {
                setReports(userDumps && userDumps)
            }
        }

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

    const fetchMoreData = () => {
        if (reports.length <= dumpsCount - 1) {
            // console.log("fetchMoreData")
            dispatch({
                type: USER_DUMP_PAGE_SET,
                payload: currentPage + 1
            })
            setCurrentPage(currentPage + 1)
            dispatch(reportedDumps(currentPage + 1))
        }
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
                                <Text style={RandomStyle.vBadge}>{item.dump.status === "newReport" ? "New Report" : item.dump.status === "Unfinish" ? "Unfinished" : item.dump.status}</Text>
                                {item.dump.images[0] ?
                                    <Image source={{ uri: item.dump.images[0].url.toString() }} resizeMode="cover" style={RandomStyle.lImg} /> :
                                    <Image source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659267361/BasuraHunt/Static/288365377_590996822453374_4511488390632883973_n_1_odzuj0.png" }} resizeMode="stretch" style={RandomStyle.lImg} />}
                                <VStack>
                                    <Text numberOfLines={1} style={[RandomStyle.lTitle, {width:windowWidth-230}]}>{item.dump.complete_address}</Text>
                                    {/* item.additional_desciption change to item.addition_description */}
                                    <Text numberOfLines={1} style={RandomStyle.lContent}>

                                        {item.dump.additional_desciption !== "null" ?
                                            item.dump.additional_desciption : item.dump.waste_type.map((wt) => {
                                                return (<Text key={wt.type}>{wt.type}&nbsp;</Text>)
                                            })

                                        }
                                    </Text>
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
                    {/* <HStack style={RandomStyle.searchContainer}>
                        <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => search(text)} />
                    </HStack> */}
                    <Text style={[RandomStyle.vText1, { fontSize: 15 }]}>Total: {dumpsCount && dumpsCount}</Text>
                </View>
                {loading && currentPage === 1 ?
                    <LoadingList /> :
                    <>
                        {reports && reports.length > 0 ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                data={reports}
                                renderItem={reportsItem}
                                keyExtractor={item => item._id}
                                onEndReachedThreshold={0.2}
                                onEndReached={fetchMoreData}
                                ListFooterComponent={() =>
                                    <>
                                        {loading && currentPage >= 2 ?
                                            <>
                                                <View style={RandomStyle.lContainer}>
                                                    <Skeleton animation="pulse" height={100} borderRadius={10} />
                                                </View>
                                                <View style={RandomStyle.lContainer}>
                                                    <Skeleton animation="pulse" height={100} borderRadius={10} />
                                                </View>
                                                <View style={RandomStyle.lContainer}>
                                                    <Skeleton animation="pulse" height={100} borderRadius={10} />
                                                </View>
                                                <View style={RandomStyle.lContainer}>
                                                    <Skeleton animation="pulse" height={100} borderRadius={10} />
                                                </View>
                                                <View style={RandomStyle.lContainer}>
                                                    <Skeleton animation="pulse" height={100} borderRadius={10} />
                                                </View>
                                            </> : null
                                        }
                                    </>
                                }
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