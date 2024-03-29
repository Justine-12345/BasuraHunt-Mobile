import React, { useState, useCallback, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, StyleSheet, Pressable, Dimensions, ActivityIndicator } from "react-native";
import { HStack, Select, VStack } from "native-base";
import Star from "../extras/Star";
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
import NotificationSender from "../../extras/notificationSender";
import RandomStringGenerator from "../../extras/randomStringGenerator";
import LoadingPublicReportsView from "../../extras/loadingPages/loading-reports-view";
import moment from 'moment'
import Empty1 from "../../../stylesheets/empty1";
import { SimpleLineIcons } from "@expo/vector-icons";
const socket = io.connect(SOCKET_PORT);
const windowWidth = Dimensions.get('window').width;
const swearjarEng = require('swearjar-extended2');
const swearjarFil = require('swearjar-extended2');
const PublicReportsView = (props) => {
    const item = props.route.params.item
    const item_id = props.route.params.item_id
    const dispatch = useDispatch()

    const { isDeleted, isUpdatedStatus, error: upDelError, loading: dumpLoading } = useSelector(state => state.dump)
    const { loading: commentLoading, comments, error: commentError } = useSelector(state => state.dumpComment)
    const { dump: dumpDetail, loading: dumpDetailLoading } = useSelector(state => state.dumpDetails)
    const { user: authUser } = useSelector(state => state.auth)
    const [openImages, setOpenImages] = useState(false);
    const [openImagesCleaned, setOpenImagesCleaned] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [imgIndexCleaned, setImgIndexCleaned] = useState(0);
    const [author, setAuthor] = useState('Alias')
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState(item ? item.comments : [])
    const [modalVisible, setModalVisible] = useState(false);
    // const creationDate = new Date(item.createdAt).toLocaleDateString()
    const [dump, setDump] = useState(item)
    const [status, setStatus] = useState(item ? item.status : "")
    const [user, setUser] = useState()
    const [messageList, setMessageList] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [imagesPreviewCleaned, setImagesPreviewCleaned] = useState([])

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
                props.navigation.navigate('User', { screen: 'MyReports', params: { screen: "UserReportsList" } });
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

            setImagesPreview([])
            dump && dump.images && dump.images.forEach(i => {
                setImagesPreview(items => [...items, { uri: i.url }])
            })

            setImagesPreviewCleaned([])
            dump && dump.images && dump.accomplished_images.forEach(i => {
                setImagesPreviewCleaned(items => [...items, { uri: i.url }])
            })

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
    }, [dumpDetail, item])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log("data", data)
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

    const showImagesCleaned = (index) => {
        setOpenImagesCleaned(true);
        setImgIndexCleaned(index);
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
            const notifCodeForComment = RandomStringGenerator(40)
            const linkForNotif = `/report/${dump && dump._id}/${dump && dump.coordinates && dump.coordinates.longtitude}/${dump && dump.coordinates && dump.coordinates.latitude}/#Comments`
            // console.log('comment1', notifCodeForComment)
            const formData = new FormData();
            formData.append('author', author);
            formData.append('comment', comment);
            formData.append('link', linkForNotif)
            formData.append('notifCode', notifCodeForComment);


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
            // console.log('comment2', notifCodeForComment)
            NotificationSender(`${authorForNotif} commented on your reported illegal dump: ${cleanCommentFil}`, user._id, dump && dump.user_id && dump.user_id._id, dump && dump.barangay, 'illegalDump-new-comment', notifCodeForComment, dump && dump)

        }
    }


    const getCleanedDuration = () => {
        // const date_created = new Date(dump && dump.createdAt)
        // const date_cleaned = new Date(dump && dump.date_cleaned)

        // const dif = Math.abs(date_cleaned - date_created);
        // const d = dif / (1000 * 3600 * 24)
        // return Math.ceil(d)
        const minute = moment(dump && dump.date_cleaned).diff(moment(dump && dump.createdAt), "minutes")
        const hour = moment(dump && dump.date_cleaned).diff(moment(dump && dump.createdAt), "hours")
        const day = moment(dump && dump.date_cleaned).diff(moment(dump && dump.createdAt), "days")

        if (day === 0 && hour >= 1) {
            return hour + ` hour${hour >= 2 ? "s" : ""}`
        }
        else if (day === 0 && hour === 0) {
            return minute + ` minute${minute >= 2 ? "s" : ""}`
        } else {
            return day + ` day${day >= 2 ? "s" : ""}`
        }
    }


    return (
        <>
            {dumpDetailLoading ?
                <LoadingPublicReportsView /> :


                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* {console.log("dump", dump)} */}
                    <View style={RandomStyle.vContainer}>
                        <View style={RandomStyle.vHeader}>
                            <Text style={RandomStyle.vText1}>Illegal Dump No. {dump && dump._id}</Text>
                            <HStack justifyContent={"space-between"}>
                                <VStack>
                                    <HStack style={{ flexWrap: 'wrap', alignItems: "flex-start" }}>
                                        <Text style={RandomStyle.vText2}>Status: </Text>

                                        {dump && dump.date_cleaned ?
                                            <Text>{status === "newReport" ? "New Report" : status === "Unfinish" ? "Unfinished" : status} {`after ${getCleanedDuration()}`} <Star rate={dump && dump.score / 10} /></Text> :
                                            <Text>{status === "newReport" ? "New Report" : status === "Unfinish" ? "Unfinished" : status} {status === "newReport" ? "" : `approximately ${dump && dump.approxDayToClean} `}  {status === "newReport" ? "" : "to clean"}</Text>
                                        }


                                    </HStack>
                                    {dump && dump.date_cleaned != null ?
                                        <HStack>
                                            <Text style={RandomStyle.vText2}>Date Cleaned: </Text>
                                            <Text>{new Date(dump.date_cleaned).toLocaleDateString()}</Text>
                                        </HStack>
                                        : null
                                    }
                                    <HStack>
                                        <Text style={RandomStyle.vText2}>Date Reported: </Text>
                                        <Text>{new Date(dump && dump.createdAt).toLocaleDateString()}</Text>
                                    </HStack>
                                    <HStack style={{ justifyContent: "space-between", width: windowWidth - 20 }}>
                                        {String(dump && dump.user_id && dump.user_id._id) === String(user && user._id) && status === "newReport" ?
                                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                                <Text style={RandomStyle.vDonationBtn} >Delete</Text>
                                            </TouchableOpacity> : ""
                                        }
                                        <View>
                                            {String(dump && dump.user_id && dump.user_id._id) === String(user && user._id) ?
                                                <TouchableOpacity onPress={() => { props.navigation.navigate('PublicReportsChat', { chat: dump && dump.chat_id && dump.chat_id.chats, chatDetail: dump && dump.chat_id, chatId: dump && dump.chat_id && dump.chat_id._id, dumpId: dump && dump._id, dumpLocation: dump && dump.complete_address, chatLength: dump && dump.chat_id && dump.chat_id.chats && dump.chat_id.chats.length, dumpObj: { _id: dump && dump._id, coordinates: { longtitude: dump && dump.coordinates && dump.coordinates.longtitude, latitude: dump && dump.coordinates && dump.coordinates.latitude }, barangay: dump && dump.barangay } }) }} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black", position: "relative", top: 7 }}>
                                                    <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat} />
                                                </TouchableOpacity>
                                                : null
                                            }
                                        </View>
                                    </HStack>
                                </VStack>
                                <HStack>


                                    {/* <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("TheAbout")
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
                                                            onPress={() => {
                                                                dispatch(deleteDump(dump && dump._id))

                                                            }}
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
                        <HStack>
                            <Text style={RandomStyle.vText2}>Barangay: </Text>
                            <Text>{dump && dump.barangay}</Text>
                        </HStack>
                        {
                            dump && dump.purok && (
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Purok: </Text>
                                    <Text>{dump && dump.purok}</Text>
                                </HStack>
                            )
                        }
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
                                images={imagesPreview}
                                imageIndex={imgIndex}
                                visible={openImages}
                                onRequestClose={() => setOpenImages(false)}
                            />
                        </View>


                        {dump && dump.accomplished_images && dump.accomplished_images.length >= 1 ?
                            <>
                                <Text style={RandomStyle.vText2}>After</Text>
                                <View style={RandomStyle.vImages}>
                                    {dump && dump.accomplished_images && dump.accomplished_images.map((img, index) =>
                                        <TouchableOpacity key={index} onPress={() => showImagesCleaned(index)}>
                                            <Image style={RandomStyle.vImage} source={{ uri: img.url }} resizeMode="cover" />
                                        </TouchableOpacity>
                                    )}
                                    <ImageView
                                        images={imagesPreviewCleaned}
                                        imageIndex={imgIndexCleaned}
                                        visible={openImagesCleaned}
                                        onRequestClose={() => setOpenImagesCleaned(false)}
                                    />
                                </View>
                            </> : null
                        }



                        <Text style={RandomStyle.vText2}>Type of Waste</Text>
                        <View style={RandomStyle.vContainer2}>
                            {dump && dump.waste_type && dump.waste_type.forEach(wt => {
                                if (!uniqueWt.includes(wt.type)) {
                                    uniqueWt.push(wt.type)
                                }
                            }
                            )}
                            {uniqueWt.map(wt => {
                                const color = {
                                    "Biodegradable Waste": "#5b9f2e",
                                    "Non-Biodegradable Waste": "#2b71a4",
                                    "Special Waste": "#c90421",
                                    "Residual Waste": "#181818",
                                    "Hazardous Waste": "#ffe200"
                                }

                                return (<Text key={wt} style={[RandomStyle.vOption, { backgroundColor: color[wt] }]}>{wt}</Text>)
                            }
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

                        {dump && dump.accessible_by ?
                            <>
                                <Text style={RandomStyle.vText2}>Category of Violation</Text>
                                <View style={RandomStyle.vContainer2}>
                                    <Text>{dump && dump.category_violation}</Text>
                                </View>
                            </>
                            : ""
                        }

                        {dump && dump.additional_desciption !== "null" ?
                            <>
                                <Text style={RandomStyle.vText2}>Additional Details</Text>
                                <View style={RandomStyle.vContainer2}>
                                    <Text>{dump && dump.additional_desciption}</Text>
                                </View>
                            </> : ""
                        }
                        <Text style={RandomStyle.vText2}>Reported by</Text>
                        <View style={RandomStyle.vContainer2}>
                            <Text>{dump && dump.report_using}</Text>
                        </View>

                        <Text style={RandomStyle.vText2}>Comment Section</Text>


                        {authUser && authUser.role === "user" ?
                            <>
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


                            </> :
                            <>
                                <Text style={Empty1.text1}>
                                    You cannot add comments yet!
                                </Text>
                                <Text style={Empty1.text2}>
                                    Please wait until your account has been verified. Thank you!
                                </Text>
                                <View style={{ marginVertical: 12 }}>

                                    <Text style={Empty1.text2}>Your account will be verified based on your first submitted report of illegal dumps. If it is real or eligible, your account can be verified.</Text>
                                </View>
                            </>

                        }





                    </View>
                </ScrollView >
            }
        </>
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