import React, { useCallback, useEffect, useRef, useState, Fragment } from "react";
import { Keyboard, Animated, Text, FlatList, StyleSheet, View, Image, TextInput, TouchableOpacity, Easing, Dimensions } from "react-native";
import { HStack } from "native-base";
import ReversedFlatList from 'react-native-reversed-flat-list';
import ChatBubble from "../../stylesheets/chatBubble";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import { getChat, updateChat } from "../../Redux/Actions/chatActions";
import { APPEND_CHAT, GET_CHAT_RESET } from "../../Redux/Constants/chatConstants";
import { SOCKET_PORT } from "../../Redux/Constants/socketConstants";
import * as io from 'socket.io-client';
const socket = io.connect(SOCKET_PORT);
let deviceWidth = Dimensions.get('window').width
const Chat = (props) => {
    const dispatch = useDispatch();

    const { chat: chatCompleteDetail, loading: chatLoading, chats } = useSelector(state => state.chatDetails)


    const chatDetail = props.route.params.chatDetail 
    const chatId = props.route.params.chatId
    const chatLength = props.route.params.chatLength
    const dumpId = props.route.params.dumpId
    const dumpLocation = props.route.params.dumpLocation
    const sampleData = require("../../assets/sampleData/chat.json");
    const [message, setMessage] = useState("");
    const flatlist = useRef();
    const animatedImage = new Animated.Value(0);
    const [user, setUser] = useState("")
    const [chat, setChat] = useState([])
    const [messageList, setMessageList] = useState([])

    useFocusEffect(
        useCallback(() => {
            // console.log(chatDetail.room)
            socket.disconnect()

            dispatch({ type: GET_CHAT_RESET })

            dispatch(getChat(chatId))
            AsyncStorage.getItem("user")
                .then((res) => {
                    // user = res
                    setUser(JSON.parse(res)._id)
                })
                .catch((error) => console.log(error))


            socket.connect()
            socket.emit("join_room", [chatDetail.room])
            return ()=>{
                setMessageList([])
            }
        }, [chatId])
    )
    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.type) {
                if (data.type === "status") {
                    setStatus(data.message)
                }
                if (data.type === "comment") {
                    setAllComments((oldComment) => [...oldComment, data])
                }
                if (data.type === "admin-updated-dump") {
                    setDump(data.dump)
                }
            }
            else {
                if (data.message) {
                    if (data.message) {
                        setMessageList((list) => [data, ...list])
                    }
                }
            }

        }
        )
    }, [socket])

    useEffect(() => {
        // if (messageList === undefined || messageList.length <= 0) {
            setMessageList(chats && chats)
        // }
    }, [chats])

    const sendHandler = () => {
        // console.log("meron")
        // console.log(data)
        if (message !== "") {
            const chatTime = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            const messageData = {
                room: chatDetail.room,
                author: user,
                message: message,
                time: chatTime
            }

            const formData = new FormData();
            formData.append('message', message);
            // formData.append('notifCode', notifCodeForChat);
            // formData.append('link', linkForNotif)
            formData.append('time', chatTime)
            dispatch(updateChat(chatId, formData))
            // dispatch({
            //     type: APPEND_CHAT,
            //     payload:[messageData,...chats]
            // })

            setMessageList((list) => [messageData, ...list])

            setMessage("")

            socket.emit("send_message", messageData);

        }
    }

    const chatBubbles = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                {index == chatLength - 1 ?
                    <>
                        {<View>
                            <ChatBubble admin style={styles.chatBubbles}>
                                <Text style={[styles.chatText, { color: "grey", textAlign: "left" }]}>REMINDER: DO NOT SHARE ANY PERSONAL OR SENSITIVE INFORMATION TO OTHER PEOPLE</Text>
                            </ChatBubble>
                        </View>}
                        <View>
                            <ChatBubble style={styles.chatBubbles} sender={item && item.author === user ? false : true}>
                                <Text style={styles.chatText}>{item.message}</Text>
                            </ChatBubble>
                            <ChatBubble time timeSender={item && item.author === user ? false : true}><Text style={styles.time}>{item.time}</Text></ChatBubble>
                        </View>
                    </> :
                    <View>
                        <ChatBubble style={styles.chatBubbles} sender={item && item.author === user ? false : true}>
                            <Text style={styles.chatText}>{item.message}</Text>
                        </ChatBubble>
                        <ChatBubble time timeSender={item && item.author === user ? false : true}><Text style={styles.time}>{item.time}</Text></ChatBubble>
                    </View>
                }
            </View>
        )
    }

    const emptyList = ({ item }) => {
        return (
            <View style={{ transform: [{ scaleY: -1 }] }}>
                {!item ?
                    <View>
                        <ChatBubble admin style={styles.chatBubbles}>
                            <Text style={[styles.chatText, { color: "grey", textAlign: "left" }]}>REMINDER: DO NOT SHARE ANY PERSONAL OR SENSITIVE INFORMATION TO OTHER PEOPLE</Text>
                        </ChatBubble>
                    </View> :
                    null}
            </View>
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
        if (y <= 5) {
            scrolledToTop()
        }
        else {
            scrolledNotToTop()
        }
    }

    return (
        <>
            {/* {console.log("chatsLoading",chatLoading&&chatLoading)} */}
            {/* {  console.log("chats2",chats)} */}
            {/* {console.log("messageList", messageList)} */}
            <Animated.View style={[styles.header,
            {
                backgroundColor: animatedImage.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#1E5128', 'transparent']
                })
            }
            ]}>
                <Animated.Image
                    style={[{
                        transform: [
                            {
                                scaleX: animatedImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 3]
                                })
                            },
                            {
                                scaleY: animatedImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 3]
                                })
                            },
                            {
                                translateX: animatedImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 10]
                                })
                            },
                            {
                                translateY: animatedImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 10]
                                })
                            },
                        ]
                    }, styles.headerImage]}
                    source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1658224082/BasuraHunt/Static/BasuraHunt_-_logo_v2aymh.png" }}
                // resizeMode="cover"
                />
                
                <Animated.Text numberOfLines={1}
                    style={[styles.headerText, {
                        transform: [
                            {
                                translateX: animatedImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 65]
                                })
                            },
                            {
                                translateY: animatedImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 10]
                                })
                            },
                        ]
                    }, {
                        width: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['90%', '73%']
                        })
                    }, {
                        color: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['white', '#1E5128']
                        })
                    }, {
                        fontSize: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: [15, 18]
                        })
                    }, {
                        borderBottomWidth: animatedImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }]}>
                    Chat with Admin 
                    </Animated.Text>
                   

            </Animated.View>
            <View style={{ backgroundColor: "#1E5128", paddingHorizontal: 12}}>
                <Text style={{fontSize:10, width:deviceWidth, color:"white"}}>Report ID: {dumpId}</Text>
            </View>
            <View style={{ backgroundColor: "#1E5128",  paddingHorizontal: 12}}>
                <Text style={{fontSize:10, width:deviceWidth,  color:"white"}}>Location: {dumpLocation}</Text>
            </View>
            {/* {console.log("messageList", messageList === undefined || messageList.length <= 0)} */}
            <FlatList
                ref={flatlist}
                inverted={true}
                ListEmptyComponent={emptyList}
                // onLayout={() => flatlist.current.scrollToEnd({ animated: "true" })}
                // onScroll={(e) => scrollHandler(e)}
                style={styles.chatContainer}
                data={ messageList}
                renderItem={chatBubbles}
                keyExtractor={item => Math.random().toString(36)}

            />
            <View style={styles.chatInputContainer}>
                <TextInput cursorColor={"grey"} value={message} onChangeText={(text) => setMessage(text)} style={styles.chatInput} multiline={true} placeholder="Type your message here..." />
                <TouchableOpacity onPress={sendHandler} style={styles.sendBtn}><MaterialCommunityIcons name="send" style={styles.sendBtn2} /></TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    chatContainer: {
        paddingHorizontal: 5,
    },
    chatBubbles: {
        elevation: 5,
    },
    chatText: {
        textAlign: "justify",
        color: "white",
    },
    time: {
        color: "grey",
        fontSize: 12,
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