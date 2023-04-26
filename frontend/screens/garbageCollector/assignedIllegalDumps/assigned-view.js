import React, { useState, useCallback, useEffect, Fragment } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { HStack, InputGroup, Select, VStack } from "native-base";
import moment from "moment";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectList from 'react-native-dropdown-select-list';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { updateDumpStatus, clearErrors } from "../../../Redux/Actions/dumpActions";
import RandomStringGenerator from "../../extras/randomStringGenerator";
import { UPDATE_DUMP_STATUS_RESET } from "../../../Redux/Constants/dumpConstants";
import NotificationSender from "../../extras/notificationSender";
import Star from "../../home/extras/Star";
//import item from "../../../assets/sampleData/items";
const socket = io.connect(SOCKET_PORT);
const swearjarEng = require('swearjar-extended2');
const swearjarFil = require('swearjar-extended2');

const AssignedView = (props) => {
    const item = props.route.params.item
    const item_id = props.route.params.item_id
    const dispatch = useDispatch()
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
    const [statusSelect, setStatusSelect] = useState("");
    const [rate, setRate] = useState(0)
    const [rateError, setRateError] = useState(false)
    const [newStatus, setNewStatus] = useState(false)
    const { isDeleted, isUpdatedStatus, error: upDelError, loading: dumpLoading } = useSelector(state => state.dump)
    const { loading: commentLoading, comments, error: commentError } = useSelector(state => state.dumpComment)
    const { dump: dumpDetail } = useSelector(state => state.dumpDetails)
    const statusList = ['Unfinish', 'Cleaned', 'Confirmed'];
    const [notifCode, setNotifCode] = useState(RandomStringGenerator(40))
    const [notifCode1, setNotifCode1] = useState(RandomStringGenerator(40))
    const [imagesPreview, setImagesPreview] = useState([])
    const [imagesPreviewCleaned, setImagesPreviewCleaned] = useState([])
    const [imgIndexCleaned, setImgIndexCleaned] = useState(0);
    const [openImagesCleaned, setOpenImagesCleaned] = useState(false);
    useFocusEffect(
        useCallback(() => {
            socket.disconnect()

            AsyncStorage.getItem("user")
                .then((res) => {
                    setUser(JSON.parse(res))
                })
                .catch((error) => console.log(error))

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
                console.log(upDelError)
                Toast.show({
                    type: 'error',
                    text1: upDelError,
                    text2: 'Something went wrong, please try again later'
                });
                dispatch(clearErrors())
            }

            if (commentError) {
                Toast.show({
                    type: 'error',
                    text1: commentError,
                    text2: 'Comment: Something went wrong, please try again later'
                });
            }
            if (isUpdatedStatus) {
                setModalVisible(false)
                const messageData = {
                    room: dump && dump.chat_id && dump.chat_id.room,
                    author: user && user._id,
                    message: newStatus,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                    type: "status"
                }

                socket.emit("send_message", messageData);


                let notifTitle
                if (newStatus === "Confirmed") {
                    notifTitle = "Your reported illegal dump has been confirmed by the admin"
                } if (newStatus === "Unfinish") {
                    notifTitle = "Your reported illegal dump is still not cleaned"
                } if (newStatus === "Cleaned") {
                    notifTitle = "Congratulations! Your reported illegal dump has been cleaned"
                } if (newStatus === "newReport") {
                    notifTitle = "Your reported illegal dump is still pending"
                } if (newStatus === "Rejected") {
                    notifTitle = "Your reported illegal dump is rejected"
                }

                NotificationSender(notifTitle, user && user._id, dump && dump.user_id && dump.user_id._id, dump && dump.barangay, 'illegalDump-update-status', notifCode, dump && dump)

                if (dump.user_id.role === "newUser" && messageStatus === "Cleaned") {
                    const notifTitle1 = "Congratulations you are now a verified user."
                    console.log("notifcode1", notifCode1)
                    NotificationSender(notifTitle1, user && user._id, dump.user_id._id, dump.barangay, 'user-verified', notifCode1, dump && dump)
                }
                dispatch({ type: UPDATE_DUMP_STATUS_RESET })

                Toast.show({
                    type: 'success',
                    text1: "Updated Successfully"
                });
                if (newStatus === "Cleaned") {
                    props.navigation.navigate('GarbageCollectorNav', { screen: 'Finished', params: { screen: 'AssignedFinished' } })
                } else {
                    props.navigation.navigate('GarbageCollectorNav', { screen: 'Assigned Illegal Dumps', params: { screen: 'AssignedList' } })
                }
            }
            setImagesPreview([])
            dump && dump.images && dump.images.forEach(i => {
                setImagesPreview(items => [...items, { uri: i.url }])
            })

            setImagesPreviewCleaned([])
            dump && dump.accomplished_images && dump.accomplished_images.forEach(i => {
                setImagesPreviewCleaned(items => [...items, { uri: i.url }])
            })

            socket.connect()
            socket.emit("join_room", [dump && dump.chat_id && dump.chat_id.room, 'basurahunt-notification-3DEA5E28CE9B6E926F52AF75AC5F7-94687284AF4DF8664C573E773CF31'])


        }, [isDeleted, upDelError, commentError, isUpdatedStatus, dump, item])
    )



    const showImages = (index) => {

        setOpenImages(true);
        setImgIndex(index);
    }
    const showImagesCleaned = (index) => {

        setOpenImagesCleaned(true);
        setImgIndexCleaned(index);
    }



    useEffect(() => {
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
            dispatch(addComment(dump._id, formData))
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

    const updateDumpStatusHandler = (new_status) => {
        if (new_status === "Cleaned") {
            props.navigation.navigate('AssignedAccomplished', { purok: dump && dump.purok, status: status, id: dump && dump._id, room: dump && dump.chat_id && dump.chat_id.room, role: dump && dump.user_id && dump.user_id.role, alias: dump && dump.user_id && dump.user_id.first_name, user_id: dump && dump.user_id && dump.user_id._id, barangay: dump && dump.barangay, long: dump && dump.coordinates && dump.coordinates.longtitude, lati: dump && dump.coordinates && dump.coordinates.latitude });
        } else {
            setNewStatus(new_status)
            if (status !== new_status) {
                setModalVisible(true)
            }
        }


        // console.log(new_status)
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    {/* {console.log("user", user && user._id)} */}
                    <Text style={RandomStyle.vText1}>Illegal Dump No. {dump && dump._id}</Text>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        // Alert.alert("Modal has been closed.");
                                        setModalVisible(!modalVisible);
                                    }}
                                >

                                    {newStatus !== "Cleaned" ?
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                                            <View style={styles.modalView}>
                                                <Text style={styles.modalText}> Are you sure, You want to change the status from {status} to {newStatus}?</Text>

                                                {dumpLoading ? <ActivityIndicator size="large" color="#00ff00" /> :

                                                    <>
                                                        <Pressable
                                                            style={[styles.button, styles.buttonClose]}
                                                            onPress={() => setModalVisible(!modalVisible)}
                                                        >
                                                            <Text style={styles.textStyle}>No</Text>
                                                        </Pressable>

                                                        <Pressable
                                                            style={[styles.button, styles.buttonClose]}
                                                            onPress={() => {
                                                                const formData = new FormData();
                                                                formData.append('old_status', status)
                                                                formData.append('new_status', newStatus)
                                                                formData.append('rate', rate)
                                                                formData.append('notifCode', notifCode);
                                                                formData.append('notifCode1', notifCode1);
                                                                dispatch(updateDumpStatus(dump._id, formData))

                                                            }}
                                                        >
                                                            <Text style={styles.textStyle}>Yes, Change it!</Text>
                                                        </Pressable>


                                                    </>
                                                }
                                                {/* } */}


                                            </View>

                                        </View>
                                        :
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                                            <View style={styles.modalView}>


                                                <Text style={styles.modalText}> Are you sure, You want to change the status from {status} to {newStatus}?</Text>

                                                {dumpLoading ? <ActivityIndicator size="large" color="#00ff00" /> :

                                                    <>
                                                        <Rating
                                                            showRating
                                                            startingValue={0}
                                                            onFinishRating={(rating_value) => setRate(rating_value)}
                                                            style={{ paddingVertical: 10 }}


                                                        />

                                                        <Pressable
                                                            style={[styles.button, styles.buttonClose]}
                                                            onPress={() => setModalVisible(!modalVisible)}
                                                        >
                                                            <Text style={styles.textStyle}>No</Text>
                                                        </Pressable>
                                                        {rateError ?
                                                            <Text style={[styles.textStyle, { color: "red", fontWeight: "normal", fontStyle: "italic" }]}>*Rate the item first</Text> : null
                                                        }
                                                        <Pressable
                                                            style={[styles.button, styles.buttonClose]}
                                                            onPress={() => {
                                                                if (rate <= 0) {
                                                                    setRateError(true)
                                                                } else {
                                                                    setRateError(false)
                                                                    const formData = new FormData();
                                                                    formData.append('old_status', status)
                                                                    formData.append('new_status', newStatus)
                                                                    formData.append('rate', rate)
                                                                    formData.append('notifCode', notifCode);
                                                                    formData.append('notifCode1', notifCode1);
                                                                    dispatch(updateDumpStatus(dump && dump._id, formData))
                                                                }
                                                            }}
                                                        >
                                                            <Text style={styles.textStyle}>Yes, I Change it!</Text>
                                                        </Pressable>


                                                    </>

                                                }

                                                {/* } */}


                                            </View>

                                        </View>

                                    }
                                </Modal>



                                <Text style={[RandomStyle.vText2, { marginVertical: 10, position: "relative", bottom: 10 }]}>Status: </Text>
                                {status === "Cleaned" ?
                                    <>
                                        {dump && dump.date_cleaned ?
                                            <Text style={{ borderWidth: 1, borderColor: "white" }}>{status === "newReport" ? "New Report" : status === "Unfinish" ? "Unfinished" : status} {`after ${getCleanedDuration()}`} <Star rate={dump && dump.score / 10} /></Text> :
                                            <Text>{status === "newReport" ? "New Report" : status === "Unfinish" ? "Unfinished" : status} {status === "newReport" ? "" : `approximately ${dump && dump.approxDayToClean} `} {status === "newReport" ? "" : dump && dump.approxDayToClean <= 1 ? "day" : "days"}  {status === "newReport" ? "" : "to clean"}</Text>
                                        }

                                    </>
                                    :
                                    <Select
                                        minWidth="200"
                                        selectedValue={status === "Confirmed" ? "Unfinish" : status}
                                        onValueChange={updateDumpStatusHandler}
                                    >
                                        <Select.Item key={"Unfinish"} value={"Unfinish"} label={"Unfinished"} style={status === "Unfinish" ? { display: "none" } : null} />
                                        <Select.Item key={"Cleaned"} value={"Cleaned"} label={"Cleaned"} style={status === "Cleaned" ? { display: "none" } : null} />
                                    </Select>
                                }


                                {/* <Text>{status === "newReport" ? "New Report" : status}</Text> */}
                            </HStack>
                            {dump && dump.date_cleaned != null ?
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Cleaned: </Text>
                                    <Text>{new Date(dump && dump.date_cleaned).toLocaleDateString()}</Text>
                                </HStack>
                                : null
                            }
                            <Text>{new Date(dump && dump.createdAt).toLocaleDateString()}</Text>
                        </VStack>
                        <HStack>
                            {user && user.role === 'user' || user && user.role === 'administrator' || user && user.role === 'newUser' ?
                                <TouchableOpacity style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                    <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat} />
                                </TouchableOpacity> : null
                            }
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
                <HStack>
                    <Text style={RandomStyle.vText2}>Purok: </Text>
                    <Text>{dump && dump.purok}</Text>
                </HStack>
                {dump && dump.coordinates && dump.coordinates.longtitude ?
                    <View style={RandomStyle.vMapContainer}>
                        <MapViewer long={dump.coordinates.longtitude} lati={dump.coordinates.latitude} />
                    </View> : null
                }
                {dump && dump.accomplished_images && dump.accomplished_images.length >= 1 ?
                    <Text style={RandomStyle.vText2}>Before</Text> : null
                }
                <View style={[RandomStyle.vImages, { marginBottom: 24 }]}>
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
                            <Text style={RandomStyle.vOption}>{dump && dump.accessible_by}</Text>
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
        backgroundColor: "white",
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
        color: "#1e5128"
    }
});


export default AssignedView;