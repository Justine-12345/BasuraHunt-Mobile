import React, {useState} from "react";
import { Text, View, Dimensions, Pressable } from "react-native";
import { HStack } from 'native-base';
import Carousel, {ParallaxImage} from "react-native-snap-carousel";
import ImageView from "react-native-image-viewing";
import { ScrollView } from "react-native-gesture-handler";
import RandomStyle from "../../../stylesheets/randomStyle";

const {width} = Dimensions.get("window")

const NewsfeedView = (props) => {
        
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const item = props.route.params.item;
    
    let images = [];

    item.images.forEach((img, index) => {
        images.push({uri: img.url, index: index})
    });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const date = new Date(item.createdAt).toLocaleDateString()

    const settings = {
        sliderWidth: width,
        sliderHeight: 200,
        itemWidth: width-50,
        data: images,
        renderItem: ({item}, parallaxProps)=>{
            return(
                <Pressable onPress={()=>showImages(item.index)}>
                    <ParallaxImage
                        source={{uri: item.uri}}
                        containerStyle={{
                            width: "100%",
                            height: 250,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        {...parallaxProps}
                    />
                </Pressable>
            )},
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
                    onRequestClose={()=>setOpenImages(false)}
                />

            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>{item.title}</Text>
                    <HStack>
                        {/* tags */}
                        <Text style={RandomStyle.vText2}>Tags: </Text>
                        <Text>*tags tags tags*</Text>
                    </HStack>
                    <HStack>
                        {/* date published */}
                        <Text style={RandomStyle.vText2}>Date Published: </Text>
                        <Text>{date}</Text>
                    </HStack>
                    <HStack>
                        {/* author */}
                        <Text style={RandomStyle.vText2}>Author: </Text>
                        <Text>*author here*</Text>
                    </HStack>
                </View>

                <Text style={RandomStyle.vText3}>{item.content}</Text>
            </View>

        </ScrollView>
    )
}

export default NewsfeedView;