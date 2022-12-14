import React, { useRef, useState } from "react";
import { Animated, FlatList, Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Easing } from "react-native";
import { HStack } from "native-base";
import ChatBubble from "../../stylesheets/chatBubble";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const animatedValue = new Animated.Value(0);
const Chat = () => {

    const sampleData = require("../../assets/sampleData/chat.json")
    const flatlist = useRef();

    const chatBubbles = ({item}) => {
        return(
            <View>
                <ChatBubble style={styles.chatBubbles} sender={item && item.author.$oid === "6326b7268b17899e85430b03" ? false : true}>
                    <Text style={styles.chatText}>{item.message}</Text>
                </ChatBubble>
                <ChatBubble time timeSender={item && item.author.$oid === "6326b7268b17899e85430b03" ? false : true}><Text style={styles.time}>{item.time}</Text></ChatBubble>
            </View>
        )
    }

    const imageScale = () => {
        Animated.timing(animatedValue,{
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }
    const imageScaleReverse = () => {
        Animated.timing(animatedValue,{
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }

    const scrollHandler = (e) => {
        console.log(e.nativeEvent.contentOffset.y)
        const y = e.nativeEvent.contentOffset.y
        if(y === 0){
            imageScale()
        }
        else{
            imageScaleReverse()
        }
    }

    return (
    <>
        <HStack style={styles.header}>
            <Animated.Image
                style={styles.headerImage}
                source={{uri: "https://images.pexels.com/photos/588776/pexels-photo-588776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}
                // resizeMode="cover"
            />
            <Animated.Text numberOfLines={1} style={styles.headerText}>LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem Ipsum</Animated.Text>
            {/* <Image style={styles.headerImage} source={{uri: "https://images.pexels.com/photos/588776/pexels-photo-588776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}/> */}
            {/* <Text numberOfLines={1} style={styles.headerText}>LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem Ipsum</Text> */}
        </HStack>
        <FlatList
            ref={flatlist}
            onLayout={()=>flatlist.current.scrollToEnd({animated: "true"})}
            onScroll={(e)=>scrollHandler(e)}
            style={styles.chatContainer}
            data={sampleData.chats}
            renderItem={chatBubbles}
            keyExtractor={item=>item._id.$oid}
        />
        <View style={styles.chatInputContainer}>
            <TextInput cursorColor={"grey"} style={styles.chatInput} multiline={true} placeholder="Type your message here..."/>
            <TouchableOpacity style={styles.sendBtn}><MaterialCommunityIcons name="send" style={styles.sendBtn2}/></TouchableOpacity>
        </View>
    </>
 )
};

const styles = StyleSheet.create({
    chatContainer: {
        paddingHorizontal: 5,
    },
    chatBubbles:{
        elevation: 5
    },
    chatText: {
        textAlign: "justify",
        color: "white"
    },
    time: {
        color: "grey",
        fontSize: 12
    },
    header: {
        backgroundColor: "#1E5128",
        padding: 10,
        alignItems: "center"
    },
    headerImage: {
        resizeMode: "cover",
        height: 30,
        width: 30,
        borderRadius: 100,
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 15]
                })
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 15]
                })
            },
            {
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2]
                })
            },
            {
                scaleY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2]
                })
            }
        ]
    },
    headerText: {
        color: "white",
        fontWeight: "bold",
        paddingHorizontal: 5
    },
    chatInputContainer: {
        padding: 5,
        flexDirection: "row"
    },
    chatInput: {
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: .5,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
    },
    sendBtn: {
        padding: 10,
        alignSelf: "flex-end",
    },
    sendBtn2: {
        fontSize: 30,
        color: "#1E5128",
    }
})

export default Chat;