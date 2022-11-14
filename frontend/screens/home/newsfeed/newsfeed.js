import React, {useEffect} from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { HStack, VStack } from "native-base";
import Empty1 from "../../../stylesheets/empty1";
import RandomStyle from "../../../stylesheets/randomStyle";

const newsfeedData = require('../../../assets/sampleData/newsfeed.json')

const Newsfeed = ({navigation}) => {

    // useEffect(()=>{

    // },[])

    const newsfeedItem = ({item, index}) => {

        let img = item.images.map(img=>img.url)
        const date = new Date(item.createdAt).toLocaleDateString()
        return(
            <>
            {index == 0 ?
            <TouchableOpacity activeOpacity={.8} onPress={()=>navigation.navigate("NewsfeedView", {item})}>
                <View style={RandomStyle.lLatestContainer}>
                    <Image source={{uri: img[0].toString()}} resizeMode="cover" style={RandomStyle.lLatestImg}/>
                    <View style={{flex: 1, justifyContent: "flex-start",}}>
                        <Text style={{alignSelf: "flex-end", color: "white", marginHorizontal: 5}}>{date}</Text>
                    </View>
                    <Text numberOfLines={3} style={RandomStyle.lLatestTitle}>{item.title}</Text>
                    <Text numberOfLines={5} style={RandomStyle.lLatestContent}>{item.content}</Text>
                </View>
            </TouchableOpacity> :
            <TouchableOpacity activeOpacity={.8}  onPress={()=>navigation.navigate("NewsfeedView", {item})}>
                <View style={RandomStyle.lContainer}>
                    <HStack>
                        <Image source={{uri: img[0].toString()}} resizeMode="cover" style={RandomStyle.lImg}/>
                        <VStack>
                            <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.title}</Text>
                            <Text numberOfLines={2} style={RandomStyle.lContent}>{item.content}</Text>
                            <View style={{flex: 1, justifyContent: "flex-end",}}>
                                <Text style={{alignSelf: "flex-end"}}>{date}</Text>
                            </View>
                        </VStack>
                    </HStack>
                </View>
            </TouchableOpacity>
            }
            </>
            
            
        )
    }

    return (
        <>
        {newsfeedData.length > 0 ? 
            <FlatList
                data={newsfeedData}
                renderItem={newsfeedItem}
                keyExtractor={item=>item._id.$oid}
            />
            : 
            <View style={Empty1.container}>
                <Text style={Empty1.text1}>
                    No posts yet!
                </Text>
            </View>
        }
        </>
    )
}

export default Newsfeed;