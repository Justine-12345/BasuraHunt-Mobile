import React, {useState} from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, ImagePickerIOS } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckboxBtn from "../../stylesheets/checkboxBtn";
import BhButton from "../../stylesheets/button";
import Form1 from "../../stylesheets/form1";
import * as ImagePicker from "expo-image-picker";

const PublicReportsAdd = () => {
    
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [identity, setIdentity] = useState("");
    const [images, setImages] = useState([]);
    const [type, setType] = useState("");
    const [barangay, setBarangay] = useState("");

    const [typeFO, setTypeFO] = useState(false);
    const [typeCL, setTypeCL] = useState(false);
    const [typeME, setTypeME] = useState(false);
    const [typeAP, setTypeAP] = useState(false);
    const [typeFU, setTypeFU] = useState(false);
    const [typeOther, setTypeOther] = useState(false);

    const [btnAdd, setBtnAdd] = useState(false);

    (async() => {
        if(Platform.OS !== "web"){
            const {status} = await ImagePicker.requestCameraPermissionsAsync();
            if(status !== "granted"){
                alert("Permission to access camera is needed to upload images")
            }
        }
    })();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        });

        if (!result.canceled){
            setImages(items=>[...items, {uri: result.uri}])
        }
    }

    const capImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true
        });

        if(!result.canceled){
            setImages(items=>[...items, {uri: result.uri}])
        }
    }

    console.log(images)

    // item.images.forEach(img => {
    //     images.push({uri: img.url})
    // });

    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    
    const barangayList = [
        {value:"Bagumbayan"},
        {value:"Bambang"},
        {value:"Calzada"},
        {value:"Hagonoy"},
        {value:"Ibayo-Tipas"},
        {value:"Ligid-Tipas"},
        {value:"Lower Bicutan"},
        {value:"New Lower Bicutan"},
        {value:"Napindan"},
        {value:"Palingon"},
        {value:"San Miguel"},
        {value:"Santa Ana"},
        {value:"Tuktukan"},
        {value:"Ususan"},
        {value:"Wawa"},
        {value:"Central Bicutan"},
        {value:"Central Signal Village"},
        {value:"Fort Bonifacio"},
        {value:"Katuparan"},
        {value:"Maharlika Village"},
        {value:"North Daang Hari"},
        {value:"North Signal Village"},
        {value:"Pinagsama"},
        {value:"South Daang Hari"},
        {value:"South Signal Village"},
        {value:"Tanyag"},
        {value:"Upper Bicutan"},
        {value:"Western Bicutan"}
    ];

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Donate items</Text>
                </View>
                
                <HStack justifyContent={"space-between"}>
                    <BhButton medium onPress={pickImage}>
                        <Text style={{color: "white"}}>Upload Image</Text>
                    </BhButton>
                    <BhButton medium onPress={capImage}>
                        <Text style={{color: "white"}}>Capture Image</Text>
                    </BhButton>
                </HStack>

                <View style={RandomStyle.vImages}>
                    {images.length > 0 ?
                        images.map((img, index)=>
                            <View key={index}>
                                <TouchableOpacity style={{zIndex: 999}} onPress={()=>setImages(images.filter(image=>image.uri !== img.uri))}>
                                    <MaterialCommunityIcons size={20} style={RandomStyle.vBadge} name="close"/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>showImages(index)}>
                                    <Image style={RandomStyle.vImage} source={{uri: img.uri}} resizeMode="cover"/>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                        <ImageView
                            images={images}
                            imageIndex={imgIndex}
                            visible={openImages}
                            onRequestClose={()=>setOpenImages(false)}
                        />
                    
                </View>

                <Text style={RandomStyle.vText2}>Barangay Hall: </Text>
                <Text style={{fontStyle: "italic"}}>(To ensure the security of both parties, the meetup location for donation should only be in the Barangay Hall of one of the involved parties. )</Text>
                <View style={RandomStyle.vContainer3}>
                    <Select marginTop={1} placeholder="Select Barangay" selectedValue={barangay} onValueChange={item=>setBarangay(item)}>
                        {barangayList.length > 0 ? 
                            barangayList.map(item=>{
                                return(  
                                    <Select.Item key={item} label={item.value} value={item.value}/>
                                )
                            })
                        : null}
                    </Select>
                </View>

                <Text style={RandomStyle.vText2}>Type of Donation</Text>
                <View style={RandomStyle.vContainer2}>
                    <CheckboxBtn isChecked={typeFO} onPress={()=>setTypeFO(!typeFO)}>
                        <Text style={{color: "white"}}>Food</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={typeCL} onPress={()=>setTypeCL(!typeCL)}>
                        <Text style={{color: "white"}}>Clothes</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={typeME} onPress={()=>setTypeME(!typeME)}>
                        <Text style={{color: "white"}}>Medical</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={typeAP} onPress={()=>setTypeAP(!typeAP)}>
                        <Text style={{color: "white"}}>Applicances</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={typeFU} onPress={()=>setTypeFU(!typeFU)}>
                        <Text style={{color: "white"}}>Furnitures</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={typeOther} onPress={()=>setTypeOther(!typeOther)}>
                        <Text style={{color: "white"}}>Other</Text>
                    </CheckboxBtn>

                    {typeOther === true ?
                        <TextInput style={Form1.textInput2} placeholder="If other, please specify here"/>
                    :null
                    }
                </View>

                <Text style={RandomStyle.vText2}>Item Name: </Text>
                <View style={RandomStyle.vContainer2}>
                    <TextInput placeholder="..." style={Form1.textInput2}/>
                </View>

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <View style={RandomStyle.vContainer2}>
                    <TextInput textAlignVertical="top" numberOfLines={3} style={Form1.textInput2}/>
                </View> 
                
                <Text style={RandomStyle.vText2}>Donated by: </Text>
                <View style={RandomStyle.vContainer3}>
                    <Select marginTop={1} placeholder="Name to be shown" selectedValue={barangay} onValueChange={item=>setBarangay(item)}>
                        <Select.Item label="Real Name" />
                        <Select.Item label="Alias" />
                        <Select.Item label="Anonymous" />
                    </Select>
                </View>


                <BhButton center medium>
                    <Text style={{color: "white"}}>Submit</Text>
                </BhButton>
            </View>
        </ScrollView>
    )
}

export default PublicReportsAdd;