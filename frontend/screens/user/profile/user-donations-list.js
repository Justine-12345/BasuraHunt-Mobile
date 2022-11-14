import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";

const UserDonationsList = () => {

    const sampleDonations = require("../../../assets/sampleData/items.json");

    const [donations, setDonations] = useState(sampleDonations);

    const search = (text) => {
        if (text == ""){
            setDonations(sampleDonations)
        }
        setDonations(
            sampleDonations.filter((item)=>
                item.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const donationsItem = ({item, index}) => {

        let img = item.images.map(img=>img.url)[0]
        const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
            <TouchableOpacity activeOpacity={.8}>
                <View style={RandomStyle.lContainer2}>
                    <HStack>
                        {/* hide if not received */}
                        <Text style={RandomStyle.vBadge}>RECEIVED</Text>
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
                <HStack style={RandomStyle.searchContainer}>  
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text)=>search(text)}/>
                </HStack>
                <Text style={RandomStyle.vText1}>Total: {donations.length}</Text>

            </View>
            {sampleDonations.length > 0 ? 
                <FlatList
                    data={donations}
                    renderItem={donationsItem}
                    keyExtractor={item=>item._id.$oid}
                />
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

export default UserDonationsList;