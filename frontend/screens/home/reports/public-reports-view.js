import React, { useState, useCallback } from "react";
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
const PublicReportsView = (props) => {
    const item = props.route.params.item
    const dispatch = useDispatch()
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [identity, setIdentity] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const creationDate = new Date(item.createdAt).toLocaleDateString()

    const { isDeleted, isUpdatedStatus, error: upDelError, loading: dumpLoading } = useSelector(state => state.dump)

    useFocusEffect(
        useCallback(() => {
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

        }, [isDeleted, upDelError])
    )

    let images = [];

    item.images.forEach(img => {
        images.push({ uri: img.url })
    });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }
    let uniqueWt = []
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>


                    <Text style={RandomStyle.vText1}>Illegal Dump No. {item._id}</Text>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Text style={RandomStyle.vText2}>Status: </Text>
                                <Text>{item.status === "newReport" ? "New Repert" : item.status}</Text>
                            </HStack>
                            {item.date_cleaned != null ?
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Cleaned: </Text>
                                    <Text>{new Date(item.date_cleaned).toLocaleDateString()}</Text>
                                </HStack>
                                : null
                            }
                            <Text>{creationDate}</Text>
                        </VStack>
                        <HStack>

                            <TouchableOpacity style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("MyPublicReportsUpdate", { item: item })
                                }} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                <MaterialCommunityIcons name="content-save-edit" size={40} style={RandomStyle.vChat} />
                            </TouchableOpacity>

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


                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignSelf: "flex-end", borderWidth: 0, borderColor: "black" }}>
                                <MaterialCommunityIcons name="trash-can" size={40} style={RandomStyle.vChat} />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                </View>
                <HStack>
                    <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                    <Text>{item.complete_address}</Text>
                </HStack>
                <HStack>
                    <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                    <Text>{item.landmark}</Text>
                </HStack>
                <View style={RandomStyle.vMapContainer}>
                    <MapViewer long={item.coordinates.longtitude} lati={item.coordinates.latitude} />

                </View>
                <View style={RandomStyle.vImages}>
                    {item.images.map((img, index) =>
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
                    {item.waste_type.forEach(wt => {
                        if (!uniqueWt.includes(wt.type)) {
                            uniqueWt.push(wt.type)
                        }
                    }
                    )}
                    {uniqueWt.map(wt =>
                        <Text key={wt} style={RandomStyle.vOption}>{wt}</Text>
                    )}
                </View>
                {item.waste_size ?
                    <>
                        <Text style={RandomStyle.vText2}>Size of Waste</Text>
                        <View style={RandomStyle.vContainer2}>
                            <Text style={RandomStyle.vOption}>{item.waste_size}</Text>
                        </View>
                    </>
                    :
                    ""}

                {item.accessible_by ?
                    <>
                        <Text style={RandomStyle.vText2}>Accessible by</Text>
                        <View style={RandomStyle.vContainer2}>
                            <Text style={RandomStyle.vOption}>{item.accessible_by}</Text>
                        </View>
                    </>
                    : ""
                }

                <Text style={RandomStyle.vText2}>Category of Violation</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{item.category_violation}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{item.additional_desciption}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Reported by</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{item.report_using}</Text>
                </View>

                <Text style={RandomStyle.vText2}>Comment Section</Text>

                <Select backgroundColor={"white"} marginY={1} placeholder="Select Identity" selectedValue={identity} onValueChange={item => setIdentity(item)}>
                    <Select.Item label="Anonymous" value="Anonymous" />
                    <Select.Item label="Real Name" value="Real Name" />
                    <Select.Item label="Alias/Username" value="Alias/Username" />
                </Select>
                <TextInput
                    placeholder="Type your comment here..."
                    style={RandomStyle.vMultiline}
                    multiline={true}
                    numberOfLines={5}
                />
                <BhButton right>
                    <Text style={RandomStyle.vText4}>Post</Text>
                </BhButton>

                {item.comments.length > 0 ?
                    item.comments.map((item) =>
                        <View key={item._id.$oid} style={RandomStyle.vComment}>
                            <Text style={RandomStyle.vText2}>{item.author}</Text>
                            <Text>{item.comment}</Text>
                            <Text style={RandomStyle.vCommentDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                    )
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