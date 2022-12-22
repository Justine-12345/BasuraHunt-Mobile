import React, { useState, useEffect, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
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
const PublicReportsList = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, dumps, dumpsCount, error, resPerPage, filteredDumpCount } = useSelector(state => state.dumps)

    const [reports, setReports] = useState([]);
    const [reportsFilter, setReportsFilter] = useState();

    const [filter, setFilter] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [district, setDistrict] = useState("");
    const [barangay, setBarangay] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [searching, setSearching] = useState(false)
    const [keyword, setKeyword] = useState('');
    useFocusEffect(
        useCallback(() => {
            if (error) {
                Toast.show({
                    type: 'error',
                    text1: error,
                    text2: 'Something went wrong, please try again later'
                });
            }



            // if (searching == true) {
            // setReports(reports)
            // }

            // if (searching == false) {
            dispatch(getDumps(keyword, currentPage, district, barangay, size, type, true));
            // }


            // if (!searchText) {
            //     return () => {
            //         setSearchText("")
            //         setSearching(false)
            //         setReports([]);
            //     };
            // }


        }, [dispatch, error, keyword, currentPage, district, barangay, size, type]
        ))


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



    const search = (text, dist, brgy, siz, typ) => {

        if (text == "") {
            setSearching(false)
        } else {
            setSearching(true)
        }


        // if (text == "") {
        //     setSearching(false)
        //     // setReports(dumps)
        // } else {
        //     setSearching(true)
        //     setDistrict(dist)
        //     setBarangay(brgy)

        //     let res = [];
        //     // console.log(dumps[30])
        //     if (text != "" && dist == "" && brgy == "" && siz == "" && typ == "") {
        //         setReports([])
        //         dumps.forEach(dump => {
        //             if (dump.complete_address.toLowerCase().includes(text.toLowerCase())) {
        //                 res.push(dump)
        //             }
        //         });
        //     }else{
        //         setReports([])
        //         dumps.forEach(dump => {

        //             if (dump.complete_address.toLowerCase().includes(text.toLowerCase()) &&  (dist&&dump.district == dist) && (brgy&&dump.barangay == brgy) ) {
        //                 res.push(dump)
        //             }

        //         });
        //     }
        //     setReports(res)
        // setReports(
        //     dumps.filter((item) => {
        //         if (text != "" && dist == "" && brgy == "" && siz == "" && typ == "") {
        //             return item.complete_address.toLowerCase().includes(text.toLowerCase())
        //         } else {
        //             return item.complete_address.toLowerCase().includes(text.toLowerCase()) || (dist && item.district == dist) || (brgy&&item.barangay.toLowerCase() == brgy.toLowerCase())
        //         }
        //     })
        // )



        // }
    }



    // const searchFilter = (text) => {
    //     setReports(
    //         sampleReports.filter((item)=>
    //             item.district.includes(text)
    //         )
    //     )
    // }

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
                <TouchableOpacity onPress={() => navigation.navigate("PublicReportsView", { item })} activeOpacity={.8}>
                    <View style={RandomStyle.lContainer2}>
                        <HStack>
                            <Image source={{ uri: img.toString() }} resizeMode="cover" style={RandomStyle.lImg} />
                            <VStack>
                                <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.complete_address}</Text>
                                {/* item.additional_desciption change to item.addition_description */}
                                <Text numberOfLines={2} style={RandomStyle.lContent}>{item.additional_description}</Text>
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
                <HStack style={RandomStyle.searchContainer}>
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => setKeyword(text)} />

                    <TouchableOpacity onPress={() => setFilter(!filter)} style={RandomStyle.searchFilterContainer}>
                        <Text style={RandomStyle.searchFilter}><Ionicons name="options" size={30} color="#1E5128" /></Text>
                    </TouchableOpacity>

                </HStack>
                {filter == false ? null : <FilterOptions />}
            </View>
            {dumps && dumps.length > 0 ?
                <FlatList
                    data={dumps}
                    renderItem={reportsItem}
                    keyExtractor={item => item._id}
                />
                :dumps&& dumps.length != undefined ?
                    <View style={Empty1.container}>
                        <Text style={Empty1.text1}>
                            "No reports yet!"
                        </Text>
                    </View>
                    :
                    <LoadingList />
                    
            }
        </>
    )
}

export default PublicReportsList;