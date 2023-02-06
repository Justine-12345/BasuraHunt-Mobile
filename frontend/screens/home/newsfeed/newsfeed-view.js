import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, Pressable } from "react-native";
import { HStack } from 'native-base';
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import ImageView from "react-native-image-viewing";
import { ScrollView } from "react-native-gesture-handler";
import RandomStyle from "../../../stylesheets/randomStyle";
import { useSelector } from "react-redux";
import LoadingNewsfeedView from "../../extras/loadingPages/loading-nf-view";

const { width } = Dimensions.get("window")

const NewsfeedView = (props) => {

    const [openImages, setOpenImages] = useState(false);
    const [images, setImages] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);
    const { error, newsfeed, loading } = useSelector(state => state.newsfeedDetails);
    
    // const item = props.route.params.item;
    const [item, setItem] = useState()
    // let images = [];

    useEffect(() => {
        setItem(newsfeed)
        setImages([])
        newsfeed && newsfeed.images && newsfeed.images.forEach((img, index) => {
            // images.push({ uri: img.url, index: index })
            setImages(oldImages => [...oldImages, { uri: img.url, index: index }])
        });

    }, [newsfeed])

    useEffect(() => {
        return () => {
            setItem()
            setImages([])
        }
    }, [])
    // item.images.forEach((img, index) => {
    //     images.push({uri: img.url, index: index})
    // });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const formatDate = (newsfeedDate) => {
        let dateCreated = new Date(newsfeedDate);

        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const month = months[dateCreated.getMonth()];
        const year = dateCreated.getFullYear();

        const formattedDate = month + " " + dateCreated.getDate() + ", " + year;

        return formattedDate;
    }

    const getTags = (tags) => {
        let tagLists = "";

        for (let i = 0; i < tags.length; i++) {

            if (i !== tags.length - 1) {
                tagLists = tagLists + tags[i].tag + ", "
            }
            else {
                tagLists = tagLists + tags[i].tag
            }
        }

        return tagLists;
    }

    // const date = new Date(item.createdAt).toLocaleDateString()

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
        <>
            {loading ? <LoadingNewsfeedView /> :


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
                            <Text style={RandomStyle.vText1}>{item && item.title}</Text>
                            <HStack>
                                {/* tags */}
                                <Text style={RandomStyle.vText2}>Tags: </Text>
                                <Text>{item && item.tags && getTags(item.tags)}</Text>
                            </HStack>
                            <HStack>
                                {/* date published */}
                                <Text style={RandomStyle.vText2}>Date Published: </Text>
                                <Text>{item && item.createdAt && formatDate(item.createdAt)}</Text>
                            </HStack>
                            <HStack>
                                {/* author */}
                                <Text style={RandomStyle.vText2}>Author: </Text>
                                <Text>{item && item.user_id && item.user_id.first_name + " " + item && item.user_id && item.user_id.last_name}</Text>
                            </HStack>
                        </View>

                        <Text style={RandomStyle.vText3}>{item && item.content}</Text>
                    </View>

                </ScrollView>
            }
        </>
    )
}

export default NewsfeedView;