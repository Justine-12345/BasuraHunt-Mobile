import React, { useState, useCallback, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { HStack, Select, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BhButton from "../../../stylesheets/button";
import MapViewer from "../../maps/MapViewer";
import { deleteDump } from "../../../Redux/Actions/dumpActions";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { DELETE_DUMP_RESET } from "../../../Redux/Constants/dumpConstants";
import Toast from 'react-native-toast-message';
import { SOCKET_PORT } from "../../../Redux/Constants/socketConstants";
import io from "socket.io-client"
import { addComment } from "../../../Redux/Actions/dumpActions";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { APPEND_CHAT, GET_CHAT_RESET } from "../../../Redux/Constants/chatConstants";
import Chat from "../../chat/chat";
const socket = io.connect(SOCKET_PORT);
const swearjarEng = require('swearjar-extended2');
const swearjarFil = require('swearjar-extended2');
const PublicReportsView = (props) => {
    const item = props.route.params.item
    const item_id = props.route.params.item_id
    const dispatch = useDispatch()

    const { isDeleted, isUpdatedStatus, error: upDelError, loading: dumpLoading } = useSelector(state => state.dump)
    const { loading: commentLoading, comments, error: commentError } = useSelector(state => state.dumpComment)
    const { dump: dumpDetail } = useSelector(state => state.dumpDetails)

    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [author, setAuthor] = useState('Alias')
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState(item ? item.comments : [])
    const [modalVisible, setModalVisible] = useState(false);
    // const creationDate = new Date(item.createdAt).toLocaleDateString()
    const [dump, setDump] = useState(item)
    const [status, setStatus] = useState(item ? item.status : "")
    const [user, setUser] = useState()
    const [messageList, setMessageList] = useState([])

    useFocusEffect(
        useCallback(() => {
            socket.disconnect()
            AsyncStorage.getItem("user")
                .then((res) => {
                    setUser(JSON.parse(res))
                })
            // .catch((error) => console.log(error))

            if (isDeleted) {
                Toast.show({
                    type: 'success',
                    text1: 'Deleted Successfully',
                    text2: 'Your illegal dump report has been deleted'
                });
                setModalVisible(!modalVisible)
                dispatch({ type: DELETE_DUMP_RESET })
                props.navigation.navigate('User', { screen: 'UserReportsList' });
            }
            if (upDelError) {
                Toast.show({
                    type: 'error',
                    text1: upDelError,
                    text2: 'Something went wrong, please try again later'
                });
            }

            if (commentError) {
                Toast.show({
                    type: 'error',
                    text1: commentError,
                    text2: 'Comment: Something went wrong, please try again later'
                });
            }

            socket.connect()
            socket.emit("join_room", [dump && dump.chat_id && dump.chat_id.room, 'basurahunt-notification-3DEA5E28CE9B6E926F52AF75AC5F7-94687284AF4DF8664C573E773CF31'])

            // return ()=>{
            //     socket.disconnect()
            // }
        }, [isDeleted, upDelError, commentError, dump, item])
    )

    useEffect(() => {
        // console.log("item_id", item_id)
        if (item_id) {
            setDump(dumpDetail)
            setAllComments(dumpDetail.comments)
            setStatus(dumpDetail.status)
        } else {
            setDump(item)
            setAllComments(item.comments)
            setStatus(item.status)
        }
    }, [dumpDetail])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("data", data)
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
                    setMessageList((list) => [...list, data])
                }
            }

        }
        )

    }, [socket])


    let images = [];

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }
    let uniqueWt = []

    const commentSubmit = () => {
        // console.log(author, comment)
        if (comment === "") {
            Toast.show({
                type: 'error',
                text1: "Please enter your comment",
                text2: 'Empty comment is invalid'
            });
        } else {
            const formData = new FormData();
            formData.append('author', author);
            formData.append('comment', comment);
            dispatch(addComment(dump && dump._id, formData))
            let authorForNotif

            if (author === "Anonymous") {
                authorForNotif = "Anonymous"
            }
            else if (author === "Real Name") {
                authorForNotif = `${user.first_name} ${user.last_name}`
            }
            else if (author === "Alias") {
                authorForNotif = `${user.alias}`
            }

            swearjarEng.setLang("en");
            const cleanCommentEng = swearjarEng.censor(comment);
            swearjarFil.setLang("ph");
            const cleanCommentFil = swearjarEng.censor(cleanCommentEng);

            const commentData = {
                room: dump && dump.chat_id && dump.chat_id.room,
                author: authorForNotif,
                comment: cleanCommentFil,
                createdAt: new Date(Date.now()),
                type: "comment"
            }
            socket.emit("send_message", commentData);
            setAllComments((oldComment) => [...oldComment, commentData])
            setComment('')

        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* {console.log("dump", dump)} */}
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Illegal Dump No. {dump && dump._id}</Text>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Text style={RandomStyle.vText2}>Status: </Text>
                                <Text>{status === "newReport" ? "New Report" : status}</Text>
                            </HStack>
                            {dump && dump.date_cleaned != null ?
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Cleaned: </Text>
                                    <Text>{new Date(dump.date_cleaned).toLocaleDateString()}</Text>
                                </HStack>
                                : null
                            }
                            <Text>{new Date(dump && dump.createdAt).toLocaleDateString()}</Text>
                        </VStack>
                        <HStack>
                            <TouchableOpacity onPress={() => { props.navigation.navigate('PublicReportsChat', { chat: dump && dump.chat_id && dump.chat_id.chats, chatDetail: dump && dump.chat_id, chatId: dump && dump.chat_id && dump.chat_id._id, dumpId: dump && dump._id, dumpLocation: dump && dump.complete_address, chatLength: dump && dump.chat_id && dump.chat_id.chats && dump.chat_id.chats.length }) }} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat} />
                            </TouchableOpacity>


                            {/* <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("MyPublicReportsUpdate", { item: item })
                                }} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                <MaterialCommunityIcons name="content-save-edit" size={40} style={RandomStyle.vChat} />
                            </TouchableOpacity> */}

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                {/* <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </Pressable>
                                    </View>
                                </View> */}
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Are you sure, you want to delete this Dump?</Text>

                                        {dumpLoading ?
                                            <ActivityIndicator size="small" color="#00ff00" />
                                            :
                                            <>
                                                <Pressable
                                                    style={[styles.button, styles.buttonClose]}
                                                    onPress={() => { dispatch(deleteDump(item._id)) }}
                                                >
                                                    <Text style={styles.textStyle}>Yes, Delete it!</Text>
                                                </Pressable>

                                                <Pressable
                                                    style={[styles.button, styles.buttonClose]}
                                                    onPress={() => setModalVisible(!modalVisible)}
                                                >
                                                    <Text style={styles.textStyle}>No</Text>
                                                </Pressable>
                                            </>
                                        }




                                    </View>

                                </View>
                            </Modal>


                            {/* <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                <MaterialCommunityIcons name="trash-can" size={40} style={RandomStyle.vChat} />
                            </TouchableOpacity> */}
                        </HStack>
                    </HStack>
                </View>
                <HStack style={{ flexWrap: 'wrap', alignItems: "flex-start" }}>
                    <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                    <Text>{dump && dump.complete_address}</Text>
                </HStack>
                <HStack>
                    <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                    <Text>{dump && dump.landmark}</Text>
                </HStack>
                {dump && dump.coordinates && dump.coordinates.longtitude ?
                    <View style={RandomStyle.vMapContainer}>
                        <MapViewer long={dump.coordinates.longtitude} lati={dump.coordinates.latitude} />
                    </View> : null
                }
                <View style={RandomStyle.vImages}>
                    {dump && dump.images && dump.images.map((img, index) =>
                        <TouchableOpacity key={index} onPress={() => showImages(index)}>
                            <Image style={RandomStyle.vImage} source={{ uri: img.url }} resizeMode="cover" />
                        </TouchableOpacity>
                    )}
                    <ImageView
                        images={images}
                        imageIndex={imgIndex}
                        visible={openImages}
                        onRequestClose={() => setOpenImages(false)}
                    />
                </View>

                <Text style={RandomStyle.vText2}>Type of Waste</Text>
                <View style={RandomStyle.vContainer2}>
                    {dump && dump.waste_type && dump.waste_type.forEach(wt => {
                        if (!uniqueWt.includes(wt.type)) {
                            uniqueWt.push(wt.type)
                        }
                    }
                    )}
                    {uniqueWt.map(wt =>
                        <Text key={wt} style={RandomStyle.vOption}>{wt}</Text>
                    )}
                </View>
                {dump && dump.waste_size ?
                    <>
                        <Text style={RandomStyle.vText2}>Size of Waste</Text>
                        <View style={RandomStyle.vContainer2}>
                            <Text style={RandomStyle.vOption}>{dump && dump.waste_size}</Text>
                        </View>
                    </>
                    :
                    ""}

                {dump && dump.accessible_by ?
                    <>
                        <Text style={RandomStyle.vText2}>Accessible by</Text>
                        <View style={RandomStyle.vContainer2}>
                            <Text style={RandomStyle.vOption}>{dump && dump.waste_size}</Text>
                        </View>
                    </>
                    : ""
                }

                <Text style={RandomStyle.vText2}>Category of Violation</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{dump && dump.category_violation}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{dump && dump.additional_desciption}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Reported by</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{dump && dump.report_using}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Comment Section</Text>

                <Select backgroundColor={"white"} marginY={1} placeholder="Select Identity" selectedValue={author} onValueChange={item => setAuthor(item)}>
                    <Select.Item label="Anonymous" value="Anonymous" />
                    <Select.Item label="Real Name" value="Real Name" />
                    <Select.Item label="Alias/Username" value="Alias" />
                </Select>
                <TextInput
                    placeholder="Type your comment here..."
                    style={RandomStyle.vMultiline}
                    multiline={true}
                    value={comment}
                    numberOfLines={5}
                    onChangeText={e => setComment(e)}
                />
                <BhButton right onPress={commentSubmit}>
                    <Text style={RandomStyle.vText4}>Post</Text>
                </BhButton>

                {allComments && allComments.length > 0 ?
                    allComments.map((item) =>
                        <View key={Math.random()} style={RandomStyle.vComment}>
                            <Text style={RandomStyle.vText2}>{item.author}</Text>
                            <Text>{item.comment}</Text>
                            <Text style={RandomStyle.vCommentDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                    ).reverse()
                    :
                    <Text>No comments yet.</Text>
                }

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#1e5128",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        borderColor: "white",
        borderWidth: 1,
        backgroundColor: "#1e5128",
        margin: 5,
        width: 200
    },
    buttonOpen: {
        backgroundColor: "#1e5128",
    },
    buttonClose: {
        backgroundColor: "#1e5128",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "700",
        lineHeight: 25,
        color: "white"
    }
});

export default PublicReportsView;