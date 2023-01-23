import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { useDispatch, useSelector } from "react-redux";
import { claimedItems } from "../../../Redux/Actions/userActions";
const UserClaimedDonations = ({navigation}) => {
    const dispatch = useDispatch()
    const sampleDonations = require("../../../assets/sampleData/items.json");
    const { loading, error, userClaimedItems } = useSelector(state => state.userReportsAndItems)

    const [items, setItems] = useState();
    const [searching, setSearching] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    useFocusEffect(
        useCallback(() => {


            if (searching === false || searching === undefined || !items) {
                dispatch(claimedItems())
                setItems(userClaimedItems)
            }
            // setDumpCount(reports && reports.length)
            return () => {
                claimedItems();
                setSearching();
            }
        }, [userClaimedItems])

    )


    
    const search = (text) => {

        if (text.length >= 1) {
            setSearching(true)
        } else {
            setSearching(false)
        }

        // console.log(text.length >= 1)

        if (text == "") {
            setItems(userClaimedItems)
        }
        setItems(
            userClaimedItems.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }
    const donationsItem = ({item, index}) => {

        let img = item.images.map(img=>img.url)[0]
        const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
            <TouchableOpacity onPress={()=>
            navigation.navigate("User", {screen:'MyClaimed', params:{screen:'MyPublicClaimedDonationsView', params:{item:item, category:"claimed"}}} )
            } activeOpacity={.8}>
                <View style={RandomStyle.lContainer2}>
                    <HStack>
                        {/* hide if not received */}
                        <Text style={RandomStyle.vBadge}>{item.status}</Text>
                        <Image source={{uri: img.toString()}} resizeMode="cover" style={RandomStyle.lImg}/>
                        <VStack>
                            <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.name}</Text>
                            <Text numberOfLines={1} style={RandomStyle.lContent}>{item.additional_description}</Text>
                            <Text numberOfLines={1} style={RandomStyle.lType}>
                                {item.item_type.map((i, index)=>
                                    item.item_type.length-index == 1 ?
                                        i.type :
                                        i.type + ", "
                                    )
                                }
                            </Text>
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
            <Text style={[RandomStyle.vText1, {marginVertical:8}]}>My Claimed Items</Text>
                <HStack style={RandomStyle.searchContainer}>  
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text)=>search(text)}/>
                </HStack>
                <Text style={[RandomStyle.vText1,{fontSize:15}]}>Total: {items&&items.length}</Text>

            </View>
            {items&&items.length > 0 ? 
                <FlatList
                    data={items}
                    renderItem={donationsItem}
                    keyExtractor={item=>item._id}
                />
                : 
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No claimed donations yet!
                    </Text>
                </View>
            }
        </>
    )
}

export default UserClaimedDonations;