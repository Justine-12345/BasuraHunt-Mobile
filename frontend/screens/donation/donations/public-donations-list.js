import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack, Select, Toast } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from 'react-redux'
import { getItemList } from "../../../Redux/Actions/itemActions";
import LoadingList from "../../extras/loadingPages/loading-list";
import { ITEM_PAGE_SET } from "../../../Redux/Constants/itemConstants";
import { Skeleton } from "@rneui/themed";
import { getItemDetails } from "../../../Redux/Actions/itemActions";
const PublicDonationsList = ({ navigation }) => {

    const dispatch = useDispatch();
    const { error, items, loading, itemsCount, filteredItemCount, resPerPage } = useSelector(state => state.items);
    const { page } = useSelector(state => state.itemPage);
    const [donations, setDonations] = useState([]);
    const [filter, setFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [district, setDistrict] = useState("");
    const [barangay, setBarangay] = useState("");
    const [type, setType] = useState("");
    const [keyword, setKeyword] = useState('');

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
        { value: "Food" },
        { value: "Clothes" },
        { value: "Medical" },
        { value: "Appliances" },
        { value: "Furnitures" },
        { value: "Other" }
    ]

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
                if (donations && donations.length <= 0) {
                    dispatch(getItemList(keyword, 1, district, barangay, type, "true"));
                }
            } else {
                dispatch(getItemList(keyword, 1, district, barangay, type, "true"));
            }

            // return () => {

            // }
        }, [error, keyword, page, district, barangay, type])
    )


    useEffect(() => {
        if (keyword === '') {
            if (currentPage <= 1) {
                setDonations([])
            }
            if (items) {
                setDonations(oldArray => oldArray.concat(items && items))
            }
        }
    }, [items])

    useEffect(() => {
        if (!loading) {
            if (keyword !== '') {
                if (items) {
                    setDonations(items && items)
                }
            }
        }
    }, [items])



    useEffect(() => {
        if (filter === false) {
            setDistrict("");
            setBarangay("");
            setType("")
        }
    });

    const fetchMoreData = () => {
        if (keyword === '') {
            if (donations.length <= itemsCount - 1) {
                dispatch({
                    type: ITEM_PAGE_SET,
                    payload: currentPage + 1
                })
                setCurrentPage(currentPage + 1)
                dispatch(getItemList(keyword, currentPage + 1, district, barangay, type, "true"));
            }
        }
    }

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


    const donationsItem = ({ item, index }) => {

        let img = item.images.map(img => img.url)[0]
        const date = new Date(item.createdAt).toLocaleDateString()
        return (
            <>
                {item.status === "Unclaimed" && (
                    <TouchableOpacity onPress={() => {
                         dispatch(getItemDetails(item._id))
                        navigation.navigate("PublicDonationsView", { item_id:item._id })
                    }} activeOpacity={.8}>
                        <View style={RandomStyle.lContainer2}>
                            <HStack>
                                <Image source={{ uri: img.toString() }} resizeMode="cover" style={RandomStyle.lImg} />
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.name} <Text style={{ fontWeight: "400", fontSize: 10, fontStyle: "italic", color: "gray" }}>({date})</Text></Text>
                                    <Text numberOfLines={2} style={RandomStyle.lContent}>{item.addional_desciption}</Text>
                                    <Text numberOfLines={3} style={RandomStyle.lType}>
                                        {item.item_type.map((i, index) =>
                                            item.item_type.length - index == 1 ?
                                                i.type :
                                                i.type + ", "
                                        )
                                        }
                                    </Text>
                                    {/* <View style={{ flex: 1, justifyContent: "flex-end", }}>
                                        <Text style={{ alignSelf: "flex-end" }}>{date}</Text>
                                    </View> */}
                                </VStack>
                            </HStack>
                        </View>
                    </TouchableOpacity>
                )}
            </>
        )
    }
    return (

        <>
            <View style={RandomStyle.lContainer3}>
                <HStack style={RandomStyle.searchContainer}>
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => {
                        if (text) {
                            setKeyword(text)
                        } else {
                            setFilter(false)
                            setKeyword(text)
                            setCurrentPage(1)
                            dispatch(getItemList(text, 1, "", "", "", "true"));
                        }


                    }} />

                    {keyword ?
                        <TouchableOpacity onPress={() => setFilter(!filter)} style={RandomStyle.searchFilterContainer}>
                            <Text style={RandomStyle.searchFilter}><Ionicons name="options" size={30} color="#1E5128" /></Text>
                        </TouchableOpacity>
                        : null
                    }
                </HStack>
                {filter == false ? null : <FilterOptions />}
            </View>
            {loading && currentPage === 1 ? <LoadingList /> : null}
            {donations && donations.length > 0 ?

                <>
                    {!keyword ?
                        <FlatList
                            data={donations}
                            renderItem={donationsItem}
                            keyExtractor={item =>Math.random()}
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
                            data={donations}
                            renderItem={donationsItem}
                            keyExtractor={item => Math.random()}
                        />
                    }
                </>

                :
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No donations yet!
                    </Text>
                </View>
            }

        </>
    )
}

export default PublicDonationsList;