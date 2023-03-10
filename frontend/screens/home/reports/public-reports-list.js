import React, { useState, useEffect, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator, RefreshControl } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import { getDumps } from "../../../Redux/Actions/dumpActions";
import Toast from 'react-native-toast-message';
import dist from "react-native-image-viewing";
import Styles from "../../../stylesheets/styles";
import LoadingList from "../../extras/loadingPages/loading-list";
import { getSingleDump } from "../../../Redux/Actions/dumpActions";
import { Skeleton } from "@rneui/themed";
import { DUMP_PAGE_SET } from "../../../Redux/Constants/dumpConstants";
const PublicReportsList = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, dumps, dumpsCount, error, resPerPage, filteredDumpCount } = useSelector(state => state.dumps)
    const { page } = useSelector(state => state.dumpPage);
    const [reports, setReports] = useState([]);
    const [reportsFilter, setReportsFilter] = useState();

    const [filter, setFilter] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageFilter, setCurrentPageFilter] = useState(1)
    const [district, setDistrict] = useState("");
    const [barangay, setBarangay] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [searching, setSearching] = useState(false)
    const [keyword, setKeyword] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setReports([])
        setCurrentPage(1)
        dispatch(getDumps(keyword, 1, district, barangay, size, type, "true"));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (error) {
                Toast.show({
                    type: 'error',
                    text1: error,
                    text2: 'Something went wrong, please try again later'
                });
            }

            if (keyword === '') {
                if (reports && reports.length <= 0) {
                    dispatch(getDumps(keyword, 1, district, barangay, size, type, "true"));
                }
            } 
            // else {
            //     dispatch(getDumps(keyword, 1, district, barangay, size, type, "true"));
            // }


        }, [error, keyword]
        ))


    useEffect(() => {
        if (keyword === '') {
            if (currentPage <= 1) {
                setReports([])
            }
            if (dumps) {
                setReports(oldArray => oldArray.concat(dumps && dumps))
            }
        }
    }, [dumps])

    useEffect(() => {
        if (!loading) {
            if (keyword !== '') {
                if (dumps) {
                    setReports(dumps && dumps)
                }
            }
        }
    }, [dumps])



    const barangayList = [
        { value: "", label: "All" },
        { value: "Bagumbayan" },
        { value: "Bambang" },
        { value: "Calzada" },
        { value: "Hagonoy" },
        { value: "Ibayo-Tipas" },
        { value: "Ligid-Tipas" },
        { value: "Lower Bicutan" },
        { value: "New Lower Bicutan" },
        { value: "Napindan" },
        { value: "Palingon" },
        { value: "San Miguel" },
        { value: "Santa Ana" },
        { value: "Tuktukan" },
        { value: "Ususan" },
        { value: "Wawa" },
        { value: "Central Bicutan" },
        { value: "Central Signal Village" },
        { value: "Fort Bonifacio" },
        { value: "Katuparan" },
        { value: "Maharlika Village" },
        { value: "North Daang Hari" },
        { value: "North Signal Village" },
        { value: "Pinagsama" },
        { value: "South Daang Hari" },
        { value: "South Signal Village" },
        { value: "Tanyag" },
        { value: "Upper Bicutan" },
        { value: "Western Bicutan" }
    ];

    const typeList = [
        { value: "", label: "All" },
        { value: "Animal Corpse" },
        { value: "Automotive" },
        { value: "Construction" },
        { value: "Electronics" },
        { value: "Hazardous" },
        { value: "Household" },
        { value: "Liquid Waste" },
        { value: "Metal/Can" },
        { value: "Paper" },
        { value: "Plastic" },
        { value: "Glass Bottle" },
        { value: "Organic/Food" },
        { value: "Other" }
    ]



    const search = () => {
        if (keyword !== "") {
            setCurrentPage(1)
            setReports([])
            dispatch(getDumps(keyword, 1, district, barangay, size, type, "true"));
        }
    }



    useEffect(() => {
        if (filter === false) {
            setDistrict("");
            setBarangay("");
            setSize("");
            setType("")
        }
    });

    const fetchMoreData = () => {
        if (keyword === '') {
            if (reports.length <= dumpsCount - 1) {
                // console.log("fetchMoreData")
                dispatch({
                    type: DUMP_PAGE_SET,
                    payload: currentPage + 1
                })
                setCurrentPage(currentPage + 1)
                dispatch(getDumps(keyword, currentPage + 1, district, barangay, size, type, "true"))
            }
        }
    }

    // const fetchMoreDataFiltered = () => {
    //     if (keyword !== '') {

    //         // if (!loading) {
    //         if (filteredDumpCount >= 1 && filteredDumpCount <= 5) {
    //             console.log("curPF", currentPageFilter + 1)
    //             console.log("filteredDumpCount", filteredDumpCount)
    //             setCurrentPageFilter(currentPageFilter + 1)
    //             dispatch(getDumps(keyword, currentPageFilter + 1, district, barangay, size, type, "true"))
    //         }
    //         // }
    //     }
    // }



    const FilterOptions = () => {
        return (
            <>

                <Select marginTop={1} placeholder="Select District" selectedValue={district} onValueChange={dist => setDistrict(dist)}>
                    <Select.Item label="All" value="" />
                    <Select.Item label="1" value="1" />
                    <Select.Item label="2" value="2" />
                </Select>

                <Select marginTop={1} placeholder="Select Barangay" selectedValue={barangay} onValueChange={brgy => setBarangay(brgy)}>
                    {barangayList.length > 0 ?
                        barangayList.map(item => {
                            return (
                                <Select.Item key={item} label={item.label ? item.label : item.value} value={item.value} />
                            )
                        })
                        : null}
                </Select>
                <Select marginTop={1} placeholder="Select Size" selectedValue={size} onValueChange={item => setSize(item)}>
                    <Select.Item label="All" value="" />
                    <Select.Item label="Dump Truck" value="Dump Truck" />
                    <Select.Item label="Trash Bin" value="Trash Bin" />
                </Select>
                <Select marginTop={1} placeholder="Select Type" selectedValue={type} onValueChange={item => setType(item)}>
                    {typeList.length > 0 ?
                        typeList.map(item => {
                            return (
                                <Select.Item key={item} label={item.label ? item.label : item.value} value={item.value} />
                            )
                        })
                        : null}
                </Select>
            </>
        )
    }



    const reportsItem = ({ item, index }) => {

        let img = item.images.map(img => img.url)[0]
        const date = new Date(item.createdAt).toLocaleDateString()
        return (
            <>
                {/* {console.log(item)} */}
                <TouchableOpacity onPress={() => {
                    dispatch(getSingleDump(item._id))
                    navigation.navigate("PublicReportsView", { item_id: item._id })
                }} activeOpacity={.8}>
                    <View style={RandomStyle.lContainer2}>
                        <HStack>
                        <Text style={RandomStyle.vBadge}>{item.status === "newReport" ? "New Report" : item.status}</Text>
                            <Image source={{ uri: img.toString() }} resizeMode="cover" style={RandomStyle.lImg} />
                            <VStack>
                                <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.complete_address}</Text>
                                {/* item.additional_desciption change to item.addition_description */}
                                <Text numberOfLines={2} style={RandomStyle.lContent}>{item.additional_desciption}</Text>
                                <View style={{ flex: 1, justifyContent: "flex-end", }}>
                                    <Text style={{ alignSelf: "flex-end" }}>{date}</Text>
                                </View>
                            </VStack>
                        </HStack>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    return (
        <>
            {/* <Text>{console.log(dumps&&dumps.length)}</Text> */}
            <View style={RandomStyle.lContainer3}>
                {/* <Text onPress={()=>
            { navigation.navigate("NewsfeedNav", {screen:'Newsfeed'})}
            }>Go</Text> */}
                <HStack style={RandomStyle.searchContainer}>
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => {
                        if (text) {

                            setKeyword(text)
                            setCurrentPageFilter(1)
                            // dispatch(getDumps(text, 1, district, barangay, size, type, "true"));
                        } else {
                            setFilter(false)
                            setKeyword(text)
                            setCurrentPage(1)
                            dispatch(getDumps(text, 1, "", "", "", "", "true"));
                        }
                        // }

                    }} />


                    {keyword ?
                        <>
                            <TouchableOpacity onPress={() => setFilter(!filter)} style={RandomStyle.searchFilterContainer}>
                                <Text style={RandomStyle.searchFilter}><Ionicons name="options" size={30} color="#1E5128" /></Text>
                            </TouchableOpacity>

                        </>
                        : null

                    }
                    <TouchableOpacity onPress={search} style={[RandomStyle.searchFilterContainer, { backgroundColor: "#1E5128" }]}>
                        <Text style={RandomStyle.searchFilter}><Ionicons name="search" size={20} color="#ffffff" /></Text>
                    </TouchableOpacity>


                </HStack>
                {filter == false ? null : <FilterOptions />}
            </View>
            {loading && currentPage === 1  ? <LoadingList /> : null}
            {reports && reports.length > 0 ?

                <>

                    {!keyword?
                        <FlatList
                            data={reports}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            renderItem={reportsItem}
                            keyExtractor={item => Math.random()}
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

                                        </>
                                        : null}
                                </>
                            }
                        /> :
                        <FlatList
                            data={reports}
                            renderItem={reportsItem}
                            keyExtractor={item => Math.random()}
                        />
                    }
                </>







                :
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        "No reports yet!"
                    </Text>
                </View>

            }
        </>
    )
}

export default PublicReportsList;