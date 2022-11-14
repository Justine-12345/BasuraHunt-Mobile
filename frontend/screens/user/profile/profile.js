import React, {useCallback, useState} from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { logout } from "../../../Redux/Actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CommonActions } from "@react-navigation/native";
const Profile = ({navigation}) => {
    const dispatch = useDispatch()
    const { loading: authLoading, isAuthenticated, error: authError, user: authUser } = useSelector(state => state.auth);
    const [user, setUser] = useState()

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem("isAuthenticated")
            .then((res) => {
                if(!res){
                    navigation.navigate('Login')
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'Login' }
                          ],
                        })
                      );
                }
            })
            .catch((error) => console.log(error))
            return () => {
                setUser()
            }
        }, [isAuthenticated]))

        
    const logoutHandle = () => {
        dispatch(logout())
    }



    return (
        <ScrollView style={RandomStyle.vContainer}>
            <LinearGradient colors={['green','#1E5128']} style={RandomStyle.pContainer}>
                <Text style={RandomStyle.pText1}>Level 999</Text>
                <ProgressBar progress={0.5} color={"limegreen"} style={{height: 15, borderRadius: 10, marginVertical: 10}}/>
                <HStack justifyContent={"space-between"}>
                    <Text style={RandomStyle.pText2}>EXP: 10000</Text>
                    <Text style={RandomStyle.pText2}>999 exp to reach next level!</Text>
                </HStack>
            </LinearGradient>
            <View marginVertical={5} style={RandomStyle.pContainer}>
                <HStack borderBottomColor={"lightgrey"} borderBottomWidth={0.5} paddingBottom={2.5}>
                    <VStack width={"40%"} alignItems={"center"}>
                        <Image style={RandomStyle.pImage} source={{uri: "https://images.pexels.com/photos/588776/pexels-photo-588776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}/>
                    </VStack>
                    <VStack width={"60%"} flex={1} justifyContent={"flex-end"}>
                        <Text style={RandomStyle.pText3}>Lorem Ipsum</Text>
                    </VStack>
                </HStack>
                <HStack position={"absolute"} right={0}>
                    <TouchableOpacity>
                        <Ionicons name="pencil" size={30} style={RandomStyle.pButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="key" size={30} style={RandomStyle.pButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logoutHandle}>
                        <Ionicons name="log-out" size={30} style={RandomStyle.pButton}/>
                    </TouchableOpacity>
                </HStack>
                <VStack marginX={5}>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Alias: </Text>
                        <Text style={RandomStyle.pText5}>Lorems</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Email: </Text>
                        <Text style={RandomStyle.pText5}>loremIpsumSoCool123@gmail.com</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Phone No.: </Text>
                        <Text style={RandomStyle.pText5}>+631234567890</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Age: </Text>
                        <Text style={RandomStyle.pText5}>30</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Gender: </Text>
                        <Text style={RandomStyle.pText5}>Female</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Address: </Text>
                        <Text style={RandomStyle.pText5}>100 Dolor Lorem Sit Amet Ipsum, Taguig City</Text>
                    </HStack>
                </VStack>
            </View>
            <View style={[RandomStyle.pContainer, {marginBottom: 20}]}>
                <Text style={RandomStyle.pText4}>Rank</Text>
                <View style={RandomStyle.pContainer2}>
                    <VStack style={RandomStyle.pContainer3}>
                        <Image style={RandomStyle.pBadge} source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge1_xokt97.png"}}/>
                        <Text style={RandomStyle.pInfo}>Eco Warrior</Text>
                    </VStack>
                    <VStack style={RandomStyle.pContainer3}>
                        <Image style={RandomStyle.pBadge} source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge2_wdxfex.png"}}/>
                        <Text style={RandomStyle.pInfo}>Eco Master</Text>
                    </VStack>
                    <VStack style={RandomStyle.pContainer3}>
                        <Image style={RandomStyle.pBadge} source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge3_fuljyi.png"}}/>
                        <Text style={RandomStyle.pInfo}>Eco King</Text>
                    </VStack>
                    <VStack style={RandomStyle.pContainer3}>
                        <Image style={RandomStyle.pBadge} source={{uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103340/BasuraHunt/Badges/badge4_x95wme.png"}}/>
                        <Text style={RandomStyle.pInfo}>Eco Hero</Text>
                    </VStack>
                </View>
                <Text style={RandomStyle.pText4}>Statistics</Text>
                <View style={[RandomStyle.pContainer2, {borderBottomColor: "lightgrey", borderBottomWidth: 0.5, paddingBottom: 10}]}>
                    <VStack style={RandomStyle.pContainer3}>
                        <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                            <Text style={RandomStyle.pText6}>90000</Text>
                        </LinearGradient>
                        <Text style={RandomStyle.pInfo}>Reported Dumps</Text>
                    </VStack>
                    <VStack style={RandomStyle.pContainer3}>
                        <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                            <Text style={RandomStyle.pText6}>90000</Text>
                        </LinearGradient>
                        <Text style={RandomStyle.pInfo}>Donated Items</Text>
                    </VStack>
                    <VStack style={RandomStyle.pContainer3}>
                        <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                            <Text style={RandomStyle.pText6}>1</Text>
                        </LinearGradient>
                        <Text style={RandomStyle.pInfo}>Barangay Ranking</Text>
                    </VStack>
                    <VStack style={RandomStyle.pContainer3}>
                        <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                            <Text style={RandomStyle.pText6}>20</Text>
                        </LinearGradient>
                        <Text style={RandomStyle.pInfo}>Overall Ranking</Text>
                    </VStack>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{width: 250, alignSelf: "center"}}>
                    <Text style={RandomStyle.pButton2}>Download E-Certificate</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Profile;