import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Pressable, ActivityIndicator } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../stylesheets/randomStyle";
import Empty1 from "../stylesheets/empty1";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import BhButton from "../stylesheets/button";
import { createStackNavigator } from "@react-navigation/stack";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserFeedbacks, newfeedback } from "../Redux/Actions/feedbackActions";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { NEW_FEEDBACK_RESET } from "../Redux/Constants/feedbackConstants";
import NotificationSender from "../screens/extras/notificationSender";
import RandomStringGenerator from "../screens/extras/randomStringGenerator";

const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="FeedbackList"
                component={Feedback}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="FeedbackView"
                component={FeedbackView}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

const { height, width } = Dimensions.get("window");

const Feedback = ({ navigation }) => {

    const { error: newfeedbackError, loading, success, feedback: newFeedback } = useSelector(state => state.newFeedback)
    const { error: allFeddbacksError, feedbacks } = useSelector(state => state.allFeedBacks)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    // const sampleFeedback = require("../assets/sampleData/items.json");
    const [feedback, setFeedback] = useState();

    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [content, setContent] = useState('')
    const [subject, setSubject] = useState('')
    const [notifCode, setNotifCode] = useState('')

    useFocusEffect(useCallback(() => {
        setNotifCode(RandomStringGenerator(40))
        dispatch(getUserFeedbacks())

        if (success) {
            Toast.show({
                type: 'success',
                text1: 'Feedback submitted successfully!!!'
            });
            NotificationSender(`New feedback has been added`, user && user._id, null, user && user.barangay, 'feedback-new', notifCode, null)
            setImagesPreview([])
            setImages([])
            setContent('')
            setSubject('')
            dispatch({ type: NEW_FEEDBACK_RESET })
        }

    }, [success]))

    useEffect(() => {
        setFeedback(feedbacks)
    }, [feedbacks])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.1
        });

        if (!result.canceled) {
            let imageUri = result ? `data:image/jpg;base64,${result.assets[0].base64}` : null;
            setImages(items => [...items, imageUri])
            setImagesPreview(items => [...items, { uri: result.assets[0].uri, base64: imageUri }])
        }
    }

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const search = (text) => {
        if (text == "") {
            setFeedback(feedbacks)
        }
        setFeedback(
            feedbacks.filter((item) =>
                item.subject.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const submitHandler = () => {
        // setNotifCode(cryptoRandomString({ length: 20, type: 'url-safe' }))

        if (images.length <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Please select an image/s'
            });
        } else if (subject === '') {
            Toast.show({
                type: 'error',
                text1: 'Please input your subject'
            });
        } else if (content === '') {
            Toast.show({
                type: 'error',
                text1: 'Please input your complaint/feedback'
            });
        } else {
            const formData = new FormData();
            formData.append('subject', subject)
            formData.append('feedback', content)
            formData.append('notifCode', notifCode)
            images.forEach(images => {
                formData.append('images', images)
            })
            dispatch(newfeedback(formData))
            // NotificationSender(`New feedback has been added`, user && user._id, null, user && user.barangay, 'feedback-new', notifCode, newFeedback && newFeedback)
        }

    }

    return (
        <ScrollView>
            <View style={[RandomStyle.vContainer, { paddingBottom: 10 }]}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Feedback</Text>
                </View>
                {loading ?
                    <View style={{ position: "relative" }}>
                        <ActivityIndicator size="large" color="#1E5128" />
                        <Text style={[{ color: "grey", textAlign: "center", marginVertical: 24, fontStyle: "italic" }]}>Submitting Feedback </Text>
                    </View> :

                    <>
                        <HStack justifyContent={"space-between"}>
                            <BhButton fullwidth onPress={pickImage}>
                                <Text style={{ color: "white" }}>Upload Image/Screenshot</Text>
                            </BhButton>
                        </HStack>

                        <View style={RandomStyle.vImages}>
                            {imagesPreview.length > 0 ?
                                imagesPreview.map((img, index) =>
                                    <View key={index}>
                                        <TouchableOpacity style={{ zIndex: 999 }} onPress={() => { setImagesPreview(imagesPreview.filter(image => image.uri !== img.uri)); setImages(images.filter(image => image !== img.base64)) }}>
                                            <MaterialCommunityIcons size={20} style={RandomStyle.vBadge} name="close" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => showImages(index)}>
                                            <Image style={RandomStyle.vImage} source={{ uri: img.uri }} resizeMode="cover" />
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            }
                            <ImageView
                                images={imagesPreview}
                                imageIndex={imgIndex}
                                visible={openImages}
                                onRequestClose={() => setOpenImages(false)}
                            />
                        </View>

                        <TextInput
                            placeholder="Subject"
                            style={[RandomStyle.vMultiline, { marginBottom: 3, textAlignVertical: "center" }]}
                            value={subject}
                            onChangeText={e => setSubject(e)}
                        />
                        <TextInput
                            placeholder="Type your complaint/feedback here..."
                            style={[RandomStyle.vMultiline, { maxHeight: height / 5 }]}
                            multiline={true}
                            value={content}
                            numberOfLines={5}
                            onChangeText={e => setContent(e)}
                        />
                        <BhButton onPress={submitHandler} right>
                            <Text style={RandomStyle.vText4}>Send</Text>
                        </BhButton>
                    </>
                }
            </View>


            <View style={[RandomStyle.vContainer, { borderTopWidth: 1, borderTopColor: "lightgrey" }]}>
                <VStack>
                    <Text style={RandomStyle.vText1}>My Feedbacks</Text>
                    <TextInput style={[RandomStyle.searchInput, { width: '100%' }]} placeholder="Search" onChangeText={(text) => search(text)} />
                </VStack>
            </View>
            {feedback && feedback.length > 0 ?
                feedback.map(item => {
                    let img = item.images.map(img => img.url)[0]
                    const date = new Date(item.createdAt).toLocaleDateString()
                    return (
                        <TouchableOpacity key={item._id} onPress={() => navigation.navigate("FeedbackView", { item })} activeOpacity={.8}>
                            <View style={RandomStyle.lContainer2}>
                                <HStack>
                                    <Image source={{ uri: img.toString() }} resizeMode="cover" style={RandomStyle.lImg} />
                                    <VStack>
                                        <Text numberOfLines={1} style={RandomStyle.lTitle}>{item.subject}</Text>
                                        <Text numberOfLines={2} style={RandomStyle.lContent}>{item.feedback}</Text>
                                        <View style={{ flex: 1, justifyContent: "flex-end", }}>
                                            <Text style={{ alignSelf: "flex-end" }}>{date}</Text>
                                        </View>
                                    </VStack>
                                </HStack>
                            </View>
                        </TouchableOpacity>
                    )
                })
                :
                <View style={Empty1.container}>
                    <Text style={Empty1.text1}>
                        No feedback yet!
                    </Text>
                </View>
            }
        </ScrollView>
    )
}


const FeedbackView = (props) => {
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const item = props.route.params.item;

    let images = [];

    item.images.forEach((img, index) => {
        images.push({ uri: img.url, index: index })
    });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const date = new Date(item.createdAt).toLocaleDateString()

    const settings = {
        sliderWidth: width,
        sliderHeight: 200,
        itemWidth: width - 50,
        data: images,
        renderItem: ({ item }, parallaxProps) => {
            return (
                <Pressable onPress={() => showImages(item.index)}>
                    <ParallaxImage
                        source={{ uri: item.uri }}
                        containerStyle={{
                            width: "100%",
                            height: 250,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        {...parallaxProps}
                    />
                </Pressable>
            )
        },
        hasParallaxImages: true
    }

    return (
        <ScrollView>
            <Carousel
                loop
                layout="stack"
                {...settings}
            />

            <ImageView
                images={images}
                imageIndex={imgIndex}
                visible={openImages}
                onRequestClose={() => setOpenImages(false)}
            />

            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>{item.subject}</Text>
                    <HStack>
                        {/* date sent */}
                        <Text style={RandomStyle.vText2}>Date Sent: </Text>
                        <Text>{date}</Text>
                    </HStack>
                </View>

                <Text style={RandomStyle.vText3}>{item.feedback}</Text>
            </View>

        </ScrollView>
    )
}

export default function FeedbackNav() {
    return <MyStack />;
}