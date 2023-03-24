import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import { HStack, VStack, Select, Toast } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux'
import { getDumps, getDumpList } from '../../../Redux/Actions/dumpActions'
import LoadingList from "../../extras/loadingPages/loading-list";
const windowWidth = Dimensions.get('window').width;
const AssignedList = ({ navigation }) => {

    const [userID, setUserID] = useState("");

    const dispatch = useDispatch();
    const { dumps, error, loading } = useSelector(state => state.allDumps)
    const [reports, setReports] = useState(false);
    const [filter, setFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [district, setDistrict] = useState("");
    const [barangay, setBarangay] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [keyword, setKeyword] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const barangayList = [
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getDumpList());
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

            let user;
            AsyncStorage.getItem("user")
                .then((res) => {
                    user = JSON.parse(res)
                    setUserID(user)
                })
                .catch((error) => console.log(error))

            // dispatch(getDumps(keyword, currentPage, district, barangay, size, type, true));
            dispatch(getDumpList());
            return () => {

            }
        }, [error, keyword, currentPage, district, barangay, size, type])
    )



    useEffect(() => {
        if (filter === false) {
            setDistrict("");
            setBarangay("");
            setSize("");
            setType("")
        }
    });

    const FilterOptions = () => {
        return (
            <>
                <Select marginTop={1} placeholder="Select District" selectedValue={district} onValueChange={item => setDistrict(item)}>
                    <Select.Item label="1" value="1" />
                    <Select.Item label="2" value="2" />
                </Select>
                <Select marginTop={1} placeholder="Select Barangay" selectedValue={barangay} onValueChange={item => setBarangay(item)}>
                    {barangayList.length > 0 ?
                        barangayList.map(item => {
                            return (
                                <Select.Item key={item} label={item.value} value={item.value} />
                            )
                        })
                        : null}
                </Select>
                <Select marginTop={1} placeholder="Select Size" selectedValue={size} onValueChange={item => setSize(item)}>
                    <Select.Item label="Dump Truck" value="Dump Truck" />
                    <Select.Item label="Trash Bin" value="Trash Bin" />
                </Select>
                <Select marginTop={1} placeholder="Select Type" selectedValue={type} onValueChange={item => setType(item)}>
                    {typeList.length > 0 ?
                        typeList.map(item => {
                            return (
                                <Select.Item key={item} label={item.value} value={item.value} />
                            )
                        })
                        : null}
                </Select>
            </>
        )
    }

    const collector = (dump) => {
        let isTrue = false;

        if (userID) {
            dump && dump.collectors && dump.collectors.forEach((collector) => {
                if (collector.collector === userID._id) {
                    isTrue = true;
                }
            });
        }

        return isTrue;
    }



    const reportsItem = ({ item, index }) => {

        if (item.user_id !== null) {
            let img = item.images.map(img => img.url)[0]
            const date = new Date(item.createdAt).toLocaleDateString()

            return (
                <>
                    {item.status === "Confirmed" || item.status === "Unfinish" ?


                        <>
                            <TouchableOpacity onPress={() => navigation.navigate("AssignedView", { item })} activeOpacity={.8}>
                                <View style={RandomStyle.lContainer2}>
                                    <HStack>
                                        <Text style={RandomStyle.vBadge}> {item.status === "newReport" ? "New Report" :
                                            item.status === "Unfinish" ? "Unfinished" :
                                                item.status} </Text>

                                        <Image source={{ uri: img.toString() }} resizeMode="cover" style={RandomStyle.lImg} />
                                        <VStack>
                                            <Text numberOfLines={1} style={[RandomStyle.lTitle, { width: windowWidth - 230 }]}>{item.complete_address}</Text>
                                            {/* item.additional_desciption change to item.addition_description */}
                                            <Text numberOfLines={1} style={RandomStyle.lContent}>
                                                {item.additional_desciption !== "null" || !item.additional_desciption ?
                                                    item.additional_desciption : item.waste_type.map((wt) => {
                                                        return (<Text key={wt.type}>{wt.type}&nbsp;</Text>)
                                                    })

                                                }

                                            </Text>
                                            <View style={{ flex: 1, justifyContent: "flex-end", }}>
                                                <Text style={{ alignSelf: "flex-end" }}>{date}</Text>
                                            </View>
                                        </VStack>
                                    </HStack>
                                </View>
                            </TouchableOpacity>

                        </>




                        : null}
                </>
            )
        }
    }
    return (
        <>

            <View style={RandomStyle.lContainer3}>
                {/* <HStack style={RandomStyle.searchContainer}>
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => setKeyword(text)} />

                    <TouchableOpacity onPress={() => setFilter(!filter)} style={RandomStyle.searchFilterContainer}>
                        <Text style={RandomStyle.searchFilter}><Ionicons name="options" size={30} color="#1E5128" /></Text>
                    </TouchableOpacity>
                </HStack> */}
                {filter == false ? null : <FilterOptions />}
            </View>
            <>
                {dumps && dumps.length > 0 ?
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        data={dumps}
                        renderItem={reportsItem}
                        keyExtractor={item => item._id}
                    />
                    :
                    <View style={Empty1.container}>
                        {loading ? <ActivityIndicator size="large" color="#00ff00" /> :
                            <Text style={Empty1.text1}>
                                No assigned reports yet!
                            </Text>
                        }
                    </View>
                }
            </>


        </>
    )
}

export default AssignedList;