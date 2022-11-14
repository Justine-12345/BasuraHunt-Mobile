import React, {useState} from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { HStack, Select, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PublicDonationsView = (props) => {
    const item = props.route.params.item
    
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [identity, setIdentity] = useState("");

    const creationDate = new Date(item.createdAt).toLocaleDateString()

    let images = [];

    item.images.forEach(img => {
        images.push({uri: img.url})
    });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Donation ({item.name})</Text>
                    <HStack justifyContent={"space-between"}>
                        <VStack>
                            <HStack>
                                <Text style={RandomStyle.vText2}>Status: </Text>
                                <Text>{item.status}</Text>
                            </HStack>
                            {item.date_cleaned != null ?
                                <HStack>
                                    <Text style={RandomStyle.vText2}>Date Cleaned: </Text>
                                    <Text>{new Date(item.date_cleaned).toLocaleDateString()}</Text>
                                </HStack>
                            : null
                            }
                        </VStack>
                        <Text>{creationDate}</Text>
                    </HStack>
                    {/* Claim */}
                    <HStack style={RandomStyle.vHeaderBtns}>
                        <TouchableOpacity>
                            <Text style={RandomStyle.vDonationBtn}>Claim</Text>
                        </TouchableOpacity>
                        {/* Cancel */}
                        {/* <TouchableOpacity>
                            <Text style={RandomStyle.vDonationBtn}>Cancel</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="message-reply-text" size={40} style={RandomStyle.vChat}/>
                        </TouchableOpacity>
                    </HStack>
                </View>
                <HStack>
                    <Text style={RandomStyle.vText2}>Drop point: </Text>
                    <Text>{item.barangay_hall}</Text>
                </HStack>
                <View style={RandomStyle.vMapContainer}>
                    <Text>Map goes here</Text>

                </View>
                <View style={RandomStyle.vImages}>
                {item.images.map((img, index)=>
                    <TouchableOpacity key={index} onPress={()=>showImages(index)}>
                        <Image style={RandomStyle.vImage} source={{uri: img.url}} resizeMode="cover"/>
                    </TouchableOpacity>
                )}
                <ImageView
                    images={images}
                    imageIndex={imgIndex}
                    visible={openImages}
                    onRequestClose={()=>setOpenImages(false)}
                />
                </View>

                <Text style={RandomStyle.vText2}>Type</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text style={RandomStyle.vOption}>Tyasdaspe</Text>
                    <Text style={RandomStyle.vOption}>Type</Text>
                    <Text style={RandomStyle.vOption}>Type</Text>
                    <Text style={RandomStyle.vOption}>Type</Text>
                </View>

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>{item.additional_description}</Text>
                </View>
                
                <Text style={RandomStyle.vText2}>Donated by</Text>
                <View style={RandomStyle.vContainer2}>
                    <Text>*Donator*</Text>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default PublicDonationsView;