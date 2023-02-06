import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import Empty1 from "../../../stylesheets/empty1";
import { useDispatch, useSelector } from "react-redux";
import { donatedItems } from "../../../Redux/Actions/userActions";
import LoadingList from "../../extras/loadingPages/loading-list";
import { getItemDetails } from "../../../Redux/Actions/itemActions";
const UserDonationsList = ({ navigation }) => {
    const dispatch = useDispatch()
    const sampleDonations = require("../../../assets/sampleData/items.json");
    const { loading, error, userDonatedItems } = useSelector(state => state.userReportsAndItems)

    const [items, setItems] = useState();
    const [searching, setSearching] = useState(false);
    const [itemCount, setItemCount] = useState(0);



    useFocusEffect(
        useCallback(() => {


            if (searching === false || searching === undefined || !items) {
                dispatch(donatedItems())

            }
            // setDumpCount(reports && reports.length)
            return () => {
                setItems();
                setSearching();
            }
        }, [])

    )

    useEffect(() => {
        setItems(userDonatedItems && userDonatedItems)
    }, [userDonatedItems])



    const search = (text) => {

        if (text.length >= 1) {
            setSearching(true)
        } else {
            setSearching(false)
        }

        // console.log(text.length >= 1)

        if (text == "") {
            setItems(userDonatedItems)
        }
        setItems(
            userDonatedItems.filter((item) =>
                item.item && item.item.name.toLowerCase().includes(text.toLowerCase())

            )
        )
    }

    const donationsItem = ({ item, index }) => {
        if (item.item !== null) {
            let img = item.item.images[0].url
            const date = new Date(item.item.createdAt).toLocaleDateString()
            // let itemForProps = item.item
            // itemForProps.user_id = { _id: item.item.user_id._id }
            // console.log("itemForProps",itemForProps)

            return (
                <>
                    {/* {console.log("item", item.item)} */}
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(getItemDetails(item.item._id))
                            navigation.navigate("User", { screen: 'MyDonations', params: { screen: 'MyPublicDonationsView', params: { item_id: item.item._id, category: "donated" } } })
                        }}
                        activeOpacity={.8}>
                        <View style={RandomStyle.lContainer2}>
                            <HStack>
                                {/* hide if not received */}
                                <Text style={RandomStyle.vBadge}>{item.item.status}</Text>
                                <Image source={{ uri: img.toString() }} resizeMode="cover" style={RandomStyle.lImg} />
                                <VStack>
                                    <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.item.name}</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lContent}>{item.item.additional_description}</Text>
                                    <Text numberOfLines={1} style={RandomStyle.lType}>
                                        {item.item.item_type.map((i, index) =>
                                            item.item.item_type.length - index == 1 ?
                                                i.type :
                                                i.type + ", "
                                        )
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
            )
        }
    }
    return (
        <>
            <View style={RandomStyle.lContainer3}>
                <Text style={[RandomStyle.vText1, { marginVertical: 8 }]}>My Donated Items</Text>
                <HStack style={RandomStyle.searchContainer}>
                    <TextInput style={RandomStyle.searchInput} placeholder="Search" onChangeText={(text) => search(text)} />
                </HStack>
                <Text style={[RandomStyle.vText1, { fontSize: 15 }]}>Total: {items && items.length}</Text>

            </View>
            {loading ?
                <LoadingList /> :

                <>
                    {items && items.length > 0 ?
                        <FlatList

                            data={items}
                            renderItem={donationsItem}
                            keyExtractor={item => item._id}

                        />
                        :
                        <View style={Empty1.container}>
                            <Text style={Empty1.text1}>
                                No donations yet!
                            </Text>
                        </View>
                    }
                </>
            }
        </>
    )
}

export default UserDonationsList;