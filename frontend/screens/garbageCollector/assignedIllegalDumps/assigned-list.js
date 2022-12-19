import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { Ionicons } from "@expo/vector-icons";

const AssignedList = ({navigation}) => {

    const sampleReports = require("../../../assets/sampleData/dumps.json");

    const [reports, setReports] = useState(sampleReports);
    const [reportsFilter, setReportsFilter] = useState();

    const [filter, setFilter] = useState(false);
    const [district, setDistrict] = useState("");
    const [barangay, setBarangay] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");

    const barangayList = [
        {value:"Bagumbayan"},
        {value:"Bambang"},
        {value:"Calzada"},
        {value:"Hagonoy"},
        {value:"Ibayo-Tipas"},
        {value:"Ligid-Tipas"},
        {value:"Lower Bicutan"},
        {value:"New Lower Bicutan"},
        {value:"Napindan"},
        {value:"Palingon"},
        {value:"San Miguel"},
        {value:"Santa Ana"},
        {value:"Tuktukan"},
        {value:"Ususan"},
        {value:"Wawa"},
        {value:"Central Bicutan"},
        {value:"Central Signal Village"},
        {value:"Fort Bonifacio"},
        {value:"Katuparan"},
        {value:"Maharlika Village"},
        {value:"North Daang Hari"},
        {value:"North Signal Village"},
        {value:"Pinagsama"},
        {value:"South Daang Hari"},
        {value:"South Signal Village"},
        {value:"Tanyag"},
        {value:"Upper Bicutan"},
        {value:"Western Bicutan"}
    ];

    const typeList = [
        {value:"Animal Corpse"},
        {value:"Automotive"},
        {value:"Construction"},
        {value:"Electronics"},
        {value:"Hazardous"},
        {value:"Household"},
        {value:"Liquid Waste"},
        {value:"Metal/Can"},
        {value:"Paper"},
        {value:"Plastic"},
        {value:"Glass Bottle"},
        {value:"Organic/Food"},
        {value:"Other"}
    ]

    const search = (text) => {
        if (text == ""){
            setReports(sampleReports)
        }
        setReports(
            sampleReports.filter((item)=>
                item.complete_address.toLowerCase().includes(text.toLowerCase())
            )
        )
    }
    
    // const searchFilter = (text) => {
    //     setReports(
    //         sampleReports.filter((item)=>
    //             item.district.includes(text)
    //         )
    //     )
    // }

    useEffect(() => {
        if (filter === false){
            setDistrict("");
            setBarangay("");
            setSize("");
            setType("")
        }
    });

    const FilterOptions = () => {
        return(
        <>
            <Select marginTop={1} placeholder="Select District" selectedValue={district} onValueChange={item=>setDistrict(item)}>
                <Select.Item label="1" value="1"/>
                <Select.Item label="2" value="2"/>
            </Select>
            <Select marginTop={1} placeholder="Select Barangay" selectedValue={barangay} onValueChange={item=>setBarangay(item)}>
                {barangayList.length > 0 ? 
                    barangayList.map(item=>{
                        return(  
                            <Select.Item key={item} label={item.value} value={item.value}/>
                        )
                    })
                : null}
            </Select>
            <Select marginTop={1} placeholder="Select Size" selectedValue={size} onValueChange={item=>setSize(item)}>
                <Select.Item label="Dump Truck" value="Dump Truck"/>
                <Select.Item label="Trash Bin" value="Trash Bin"/>
            </Select>
            <Select marginTop={1} placeholder="Select Type" selectedValue={type} onValueChange={item=>setType(item)}>
                {typeList.length > 0 ? 
                    typeList.map(item=>{
                        return(  
                            <Select.Item key={item} label={item.value} value={item.value}/>
                        )
                    })
                : null}
            </Select>
        </>
        )
    }

    const reportsItem = ({item, index}) => {

        let img = item.images.map(img=>img.url)[0]
        const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
            <TouchableOpacity onPress={()=>navigation.navigate("AssignedView", {item})} activeOpacity={.8}>
                <View style={RandomStyle.lContainer2}>
                    <HStack>
                         {item.status !== "Cleaned" ?
                                    <Text style={RandomStyle.vBadge}> Assigned </Text> : ""
                                }
                        <Image source={{uri: img.toString()}} resizeMode="cover" style={RandomStyle.lImg}/>
                        <VStack>
                            <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.complete_address}</Text>
                            {/* item.additional_desciption change to item.addition_description */}
                            <Text numberOfLines={2} style={RandomStyle.lContent}>{item.additional_description}</Text>
                            <View style={{flex: 1, justifyContent: "flex-end",}}>
                                <Text style={{alignSelf: "flex-end"}}>{date}</Text>
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
            <View style={RandomStyle.lContainer3}>
                <HStack style={RandomStyle.searchContainer}>  
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text)=>search(text)}/>
                    <TouchableOpacity onPress={()=>setFilter(!filter)} style={RandomStyle.searchFilterContainer}>
                        <Text style={RandomStyle.searchFilter}><Ionicons name="options" size={30} color="#1E5128"/></Text>
                    </TouchableOpacity>
                </HStack>
                {filter == false ? null : <FilterOptions/>}
            </View>
            {sampleReports.length > 0 ? 
                <FlatList
                    data={reports}
                    renderItem={reportsItem}
                    keyExtractor={item=>item._id.$oid}
                />
                : 
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No reports yet!
                    </Text>
                </View>
            }
        </>
    )
}

export default AssignedList;