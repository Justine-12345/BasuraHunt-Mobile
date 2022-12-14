import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Animated, FlatList, Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Easing } from "react-native";
import { HStack } from "native-base";
import ChatBubble from "../../stylesheets/chatBubble";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Chat = () => {

    const sampleData = require("../../assets/sampleData/chat.json");
    const [messages, setMessages] = useState(sampleData.chats);
    const flatlist = useRef();
    const animatedImage = new Animated.Value(0);

    const chatBubbles = ({item, index}) => {
        return(
            <>
            {index == 0 ?
            <>
            {<View>
                <ChatBubble admin style={styles.chatBubbles}>
                    <Text style={[styles.chatText, {color: "grey", textAlign: "left"}]}>REMINDER: DO NOT SHARE ANY PERSONAL OR SENSITIVE INFORMATION TO OTHER PEOPLE</Text>
                </ChatBubble>
            </View> }
            <View>
                <ChatBubble style={styles.chatBubbles} sender={item && item.author.$oid === "6326b7268b17899e85430b03" ? false : true}>
                    <Text style={styles.chatText}>{item.message}</Text>
                </ChatBubble>
                <ChatBubble time timeSender={item && item.author.$oid === "6326b7268b17899e85430b03" ? false : true}><Text style={styles.time}>{item.time}</Text></ChatBubble>
            </View>
            </> : 
            <View>
                <ChatBubble style={styles.chatBubbles} sender={item && item.author.$oid === "6326b7268b17899e85430b03" ? false : true}>
                    <Text style={styles.chatText}>{item.message}</Text>
                </ChatBubble>
                <ChatBubble time timeSender={item && item.author.$oid === "6326b7268b17899e85430b03" ? false : true}><Text style={styles.time}>{item.time}</Text></ChatBubble>
            </View> 
            }
            </>
        )
    }

    const emptyList = ({item}) => {
        return (
            <>
            {!item ? 
                <View>
                    <ChatBubble admin style={styles.chatBubbles}>
                        <Text style={[styles.chatText, {color: "grey", textAlign: "left"}]}>REMINDER: DO NOT SHARE ANY PERSONAL OR SENSITIVE INFORMATION TO OTHER PEOPLE</Text>
                    </ChatBubble>
                </View> :
            null}
            </>
        )
    }

    const scrolledToTop = () => {
        Animated.timing(animatedImage, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start()
    }
    const scrolledNotToTop = () => {
        Animated.timing(animatedImage, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    const scrollHandler = (e) => {
        const y = e.nativeEvent.contentOffset.y
        if(y <= 5){
            scrolledToTop()
        }
        else{
            scrolledNotToTop()
        }
    }

    return (
    <>
        <Animated.View style={[styles.header,
            {backgroundColor: animatedImage.interpolate({
                inputRange: [0,1],
                outputRange: ['#1E5128','transparent']
            })} 
        ]}>
            <Animated.Image
                style={[{
                    transform: [
                        {scaleX: animatedImage.interpolate({
                            inputRange: [0,1],
                            outputRange: [1, 3]
                        })},
                        {scaleY: animatedImage.interpolate({
                            inputRange: [0,1],
                            outputRange: [1, 3]
                        })},
                        {translateX: animatedImage.interpolate({
                            inputRange: [0,1],
                            outputRange: [1, 10]
                        })},
                        {translateY: animatedImage.interpolate({
                            inputRange: [0,1],
                            outputRange: [1, 10]
                        })},
                    ]}, styles.headerImage]}
                source={{uri: "https://images.pexels.com/photos/588776/pexels-photo-588776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}
                // resizeMode="cover"
            />
            <Animated.Text numberOfLines={1}
                style={[styles.headerText,{
                    transform: [
                        {translateX: animatedImage.interpolate({
                            inputRange: [0,1],
                            outputRange: [1, 65]
                        })},
                        {translateY: animatedImage.interpolate({
                            inputRange: [0,1],
                            outputRange: [1, 10]
                        })},
                    ]},{
                        width: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['90%', '73%']
                        })
                    },{
                        color: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['white', '#1E5128']
                        })
                    },{
                        fontSize: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: [15, 18]
                        })
                    },{
                        borderBottomWidth: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }]}>Anna Beatriz Lorraine J. Ramos</Animated.Text>
            
        </Animated.View>
        <FlatList
            ref={flatlist}
            ListEmptyComponent={emptyList}
            onLayout={()=>flatlist.current.scrollToEnd({animated: "true"})}
            onScroll={(e)=>scrollHandler(e)}
            style={styles.chatContainer}
            data={messages}
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
        alignItems: "center",
        flexDirection: "row",
        zIndex: 2
    },
    headerImage: {
        resizeMode: "cover",
        height: 30,
        width: 30,
        borderRadius: 100,
    },
    headerText: {
        color: "white",
        fontWeight: "bold",
        paddingHorizontal: 5,
        width: "90%",
        borderBottomColor: "lightgrey",
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
        maxHeight: 100
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