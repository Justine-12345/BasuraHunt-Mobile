import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity, Modal, StyleSheet } from "react-native";
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
import { loadUser, getLevelExp } from "../../../Redux/Actions/userActions";
import LoadingProfile from "../../extras/loadingPages/loading-profile";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import * as Print from 'expo-print';
import { AntDesign } from "@expo/vector-icons";
import { LOGOUT_RESET } from "../../../Redux/Constants/userConstants";

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading: authLoading, isAuthenticated, isLogout, error: authError, user: authUser, userBrgyRank, userCityRank, reportedDumpCounts, donatedItemsCount } = useSelector(state => state.auth);
    const { levelExp } = useSelector(state => state.levelExp)
    const [hasUser, setHasUser] = useState()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImg, setModalImg] = useState("")
    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem("isAuthenticated")
                .then((res) => {
                    if (!res) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'Login' }
                                ],
                            })
                        );
                        navigation.navigate('Login')
                    }
                })
                .catch((error) => console.log(error))
            // return () => {
            //     setUser()
            // }

            // if (isAuthenticated) {
            //     setHasUser(true)
            // }

        }, [isAuthenticated, isLogout]))

    useFocusEffect(
        useCallback(() => {
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    if (res) {
                        dispatch(loadUser())
                    }
                })
                .catch((error) => console.log(error))

            // console.log("authUser", authUser)
        }, []))

    useFocusEffect(
        useCallback(() => {
            // if(isAuthenticated){
            // dispatch(getLevelExp())
            // }

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    if (res) {

                        dispatch(getLevelExp())

                    }
                })
                .catch((error) => console.log(error))
            // console.log(levelExp)
        }, [prog]))

    const logoutHandle = () => {

        dispatch(logout(authUser && authUser._id, expoPushToken, true))


    }

    const getAge = (d1, d2) => {
        d2 = d2 || new Date();
        var diff = d2.getTime() - d1.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
// get level
    const getLvlTotalExp = (level) => {
        let lvlTotalExp = 0

        if (level >= 1 && level <= 5) {
            lvlTotalExp = 200
        }
        if (level >= 6 && level <= 10) {
            lvlTotalExp = 300
        }
        if (level >= 11 && level <= 15) {
            lvlTotalExp = 400
        }
        if (level >= 16 && level <= 20) {
            lvlTotalExp = 500
        }

        return lvlTotalExp
    }

    const getOldExp = (level) => {
        let oldExp = 0

        if (level >= 2 && level <= 5) {
            oldExp = (level - 1) * 200
        }

        if (level === 6) {
            oldExp = 1000
        }
        if (level === 7) {
            oldExp = 1300
        }
        if (level === 8) {
            oldExp = 1600
        }
        if (level === 9) {
            oldExp = 1900
        }
        if (level === 10) {
            oldExp = 2200
        }
        if (level === 11) {
            oldExp = 2500
        }
        if (level === 12) {
            oldExp = 2900
        }
        if (level === 13) {
            oldExp = 3300
        }
        if (level === 14) {
            oldExp = 3700
        }
        if (level === 15) {
            oldExp = 4100
        }
        if (level === 16) {
            oldExp = 4500
        }
        if (level === 17) {
            oldExp = 5000
        }
        if (level === 18) {
            oldExp = 5500
        }
        if (level === 19) {
            oldExp = 6000
        }
        if (level === 20) {
            oldExp = 6500
        }


        return oldExp

    }


    const printPDF = async (first_name, last_name, level) => {
        // sample variables
        // let badge = "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge3_fuljyi.png";
        let badge = ""
        let rank = "";

        if (level >= 6 && level <= 10) {
            rank = "Eco Master"
            badge = "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge2_wdxfex.png";
        }

        if (level >= 11 && level <= 15) {
            rank = "Eco King"
            badge = "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge3_fuljyi.png"
        }

        if (level >= 16 && level <= 20) {
            rank = "Eco Hero"
            badge = "https://res.cloudinary.com/basurahunt/image/upload/v1659103340/BasuraHunt/Badges/badge4_x95wme.png"
        }
        const html = `
        <style>
            *{
                margin: 0;
            }
            @page{
                margin: 0;
            }
        </style>
        <div style="position: relative; color: rgb(0, 79, 12); font-weight: bold; padding: 0; margin: 0; display: flex; justify-content: center; flex-direction: column; width: 1056px; height: 816px">
            <img src="https://res.cloudinary.com/basurahunt/image/upload/v1672202353/BasuraHunt/Static/cert_cm6zfj.png" width="100%">
            <p style="font-size: 40px; position: absolute; bottom: 430px; right: 80px">${first_name} ${last_name}</p>
            <p style="margin: 0; font-size: 30px; position: absolute; bottom: 300px; right: 80px">
                <img src=${badge} width="40px">
                ${rank}
            </p>
            <p style="font-size: 13px; font-family: 'Courier New', monospace; font-weight: unset; position: absolute; bottom: 175px; right: 87px">${new Date(Date.now()).toDateString()}</p>
            </div>`;

        await Print.printAsync({
            html,
            orientation: 'landscape'
        })
    }

    const modalImgs = [
        "https://res.cloudinary.com/basurahunt/image/upload/v1677245067/BasuraHunt/Static/mb3_tqsuge.png",
        "https://res.cloudinary.com/basurahunt/image/upload/v1679216415/BasuraHunt/Static/ranks-updated_rkhjii.png"
    ]
    const getModalImg = (index) => {
        setModalImg(modalImgs[index]);
        setModalVisible(true);
    }


    let prog
    return (
        <>
            {authLoading ? <LoadingProfile /> :
                <ScrollView style={RandomStyle.vContainer}>
                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <ScrollView contentContainerStyle={RandomStyle.nfAddInfoModal}>
                                <View style={RandomStyle.nfAddInfoModalView}>
                                    <Image source={{ uri: modalImg }} style={RandomStyle.nfAddInfoImg} />
                                    <TouchableOpacity style={RandomStyle.nfClosec} onPress={() => setModalVisible(false)}>
                                        <AntDesign name="closecircleo" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>

                    </Modal>
                    <LinearGradient colors={['green', '#1E5128']} style={RandomStyle.pContainer}>
                        <HStack justifyContent={"space-between"}>
                            <Text style={RandomStyle.pText1}>Level {levelExp && levelExp.level}   </Text>
                            <TouchableOpacity onPress={() => getModalImg(0)}>
                                <Text style={{ position: "relative", top: 4 }}><Ionicons style={{ color: "white", fontWeight: '900', fontSize: 18 }} name="help-circle-outline"></Ionicons></Text>
                            </TouchableOpacity>
                        </HStack>
                        <Text style={{ display: "none" }}>
                            {prog = (levelExp && levelExp.exp - getOldExp(levelExp && levelExp.level)) / getLvlTotalExp(levelExp && levelExp.level)}
                        </Text>
                        <ProgressBar progress={!prog ? 0 : prog} color={"limegreen"} style={{ height: 15, borderRadius: 10, marginVertical: 10 }} />



                        <HStack justifyContent={"space-between"}>
                            <Text style={RandomStyle.pText2}>EXP:{levelExp && levelExp.exp - getOldExp(levelExp && levelExp.level)}</Text>
                            <Text style={RandomStyle.pText2}>{getLvlTotalExp(levelExp && levelExp.level) - (levelExp && levelExp.exp - getOldExp(levelExp && levelExp.level))} exp to reach next level!</Text>
                        </HStack>
                    </LinearGradient>
                    <View marginVertical={5} style={RandomStyle.pContainer}>
                        <HStack borderBottomColor={"lightgrey"} borderBottomWidth={0.5} paddingBottom={2.5}>
                            <VStack width={"40%"} alignItems={"center"}>
                                <Image style={RandomStyle.pImage} source={{ uri: `${authUser && authUser.avatar && authUser.avatar.url}` }} />
                            </VStack>
                            <VStack width={"60%"} flex={1} justifyContent={"flex-end"}>
                                <Text style={RandomStyle.pText3}>{authUser && authUser.first_name} {authUser && authUser.last_name}</Text>
                            </VStack>
                        </HStack>
                        <HStack position={"absolute"} right={0}>
                            <TouchableOpacity onPress={() => { navigation.navigate('User', { screen: 'ProfileNav', params: { screen: 'FeedbackNav'} }) }}>
                                <Ionicons name="md-megaphone" size={30} style={RandomStyle.pButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('User', { screen: 'ProfileNav', params: { screen: 'ProfileUpdate', params: { user: authUser } } }) }}>
                                <Ionicons name="pencil" size={30} style={RandomStyle.pButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('User', { screen: 'ProfileNav', params: { screen: 'ProfileUpdatePassword' } }) }}>
                                <Ionicons name="key" size={30} style={RandomStyle.pButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={logoutHandle}>
                                <Ionicons name="log-out" size={30} style={RandomStyle.pButton} />
                            </TouchableOpacity>
                        </HStack>
                        <VStack marginX={5}>
                            <HStack>
                                <Text style={RandomStyle.pText4}>Alias: </Text>
                                <Text style={RandomStyle.pText5}>{authUser && authUser.alias}</Text>
                            </HStack>
                            <HStack>
                                <Text style={RandomStyle.pText4}>Email: </Text>
                                <Text style={RandomStyle.pText5}>{authUser && authUser.email}</Text>
                            </HStack>
                            <HStack>
                                <Text style={RandomStyle.pText4}>Phone No.: </Text>
                                <Text style={RandomStyle.pText5}>
                                    {authUser && authUser.phone_number === undefined || authUser && authUser.phone_number === "undefined" ?
                                        <Text style={{ color: "gray", fontStyle: 'italic' }}>undefined</Text> :
                                        authUser && authUser.phone_number && authUser.phone_number.substring(0, 2) === "63" ? `+${authUser && authUser.phone_number}` : `${authUser && authUser.phone_number}`
                                    }

                                </Text>
                            </HStack>
                            <HStack>
                                <Text style={RandomStyle.pText4}>Age: </Text>
                                <Text style={RandomStyle.pText5}>{getAge(new Date(authUser && authUser.birthday))}</Text>
                            </HStack>
                            <HStack>
                                <Text style={RandomStyle.pText4}>Gender: </Text>
                                <Text style={RandomStyle.pText5}>
                                    {authUser && authUser.gender === undefined || authUser && authUser.gender === "undefined" ?
                                        <Text style={{ color: "gray", fontStyle: 'italic' }}>undefined</Text> :
                                        authUser && authUser.gender
                                    }
                                </Text>
                            </HStack>
                            <HStack>
                                <Text style={RandomStyle.pText4}>Address: </Text>
                                <Text style={RandomStyle.pText5}>{authUser && authUser.house_number} {authUser && authUser.street} {authUser && authUser.barangay}, Taguig City</Text>
                            </HStack>
                        </VStack>
                    </View>
                    <View style={[RandomStyle.pContainer, { marginBottom: 20 }]}>
                        <HStack justifyContent={"space-between"}>
                            <Text style={RandomStyle.pText4}>Rank</Text>
                            <TouchableOpacity onPress={() => getModalImg(1)}>
                                <Text style={{ position: "relative", top: 4 }}><Ionicons style={{ color: "white", fontWeight: '900', fontSize: 18 }} name="help-circle-outline"></Ionicons></Text>
                            </TouchableOpacity>
                        </HStack>

                        <View style={RandomStyle.pContainer2}>
                            {levelExp && levelExp.level && levelExp.level >= 1 && levelExp && levelExp.level && levelExp.level <= 5 ?
                                <VStack style={RandomStyle.pContainer3}>
                                    <Image style={RandomStyle.pBadge} source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge1_xokt97.png" }} />
                                    <Text style={RandomStyle.pInfo}>Eco Warrior</Text>
                                </VStack> : null
                            }

                            {levelExp && levelExp.level && levelExp.level >= 6 && levelExp && levelExp.level && levelExp.level <= 10 ?
                                <VStack style={RandomStyle.pContainer3}>
                                    <Image style={RandomStyle.pBadge} source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge2_wdxfex.png" }} />
                                    <Text style={RandomStyle.pInfo}>Eco Master</Text>
                                </VStack> : null
                            }

                            {levelExp && levelExp.level && levelExp.level >= 11 && levelExp && levelExp.level && levelExp.level <= 15 ?

                                <VStack style={RandomStyle.pContainer3}>
                                    <Image style={RandomStyle.pBadge} source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103339/BasuraHunt/Badges/badge3_fuljyi.png" }} />
                                    <Text style={RandomStyle.pInfo}>Eco King</Text>
                                </VStack> : null
                            }
                            {levelExp && levelExp.level && levelExp.level >= 16 && levelExp && levelExp.level && levelExp.level <= 20 ?
                                <VStack style={RandomStyle.pContainer3}>
                                    <Image style={RandomStyle.pBadge} source={{ uri: "https://res.cloudinary.com/basurahunt/image/upload/v1659103340/BasuraHunt/Badges/badge4_x95wme.png" }} />
                                    <Text style={RandomStyle.pInfo}>Eco Hero</Text>
                                </VStack> : null
                            }
                        </View>
                        <Text style={RandomStyle.pText4}>Statistics</Text>
                        <View style={[RandomStyle.pContainer2, { borderBottomColor: "lightgrey", borderBottomWidth: 0.5, paddingBottom: 10 }]}>
                            <VStack style={RandomStyle.pContainer3}>
                                <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                                    <Text onPress={() => { navigation.navigate('MyReports', { screen: 'UserReportsList' }) }} style={RandomStyle.pText6}>{reportedDumpCounts && reportedDumpCounts}</Text>
                                </LinearGradient>
                                <Text style={RandomStyle.pInfo}>Reported Dumps</Text>
                            </VStack>
                            <VStack style={RandomStyle.pContainer3}>
                                <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                                    <Text onPress={() => { navigation.navigate('MyDonations', { screen: 'UserDonationsList' }) }} style={RandomStyle.pText6}>{donatedItemsCount && donatedItemsCount}</Text>
                                </LinearGradient>
                                <Text style={RandomStyle.pInfo}>Donated Items</Text>
                            </VStack>
                            <VStack style={RandomStyle.pContainer3}>
                                <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                                    <Text style={RandomStyle.pText6}>{userBrgyRank && userBrgyRank}</Text>
                                </LinearGradient>
                                <Text style={RandomStyle.pInfo}>Barangay Ranking</Text>
                            </VStack>
                            <VStack style={RandomStyle.pContainer3}>
                                <LinearGradient colors={["mediumseagreen", "#1E9000"]} style={RandomStyle.pStatistic}>
                                    <Text style={RandomStyle.pText6}>{userCityRank && userCityRank}</Text>
                                </LinearGradient>
                                <Text style={RandomStyle.pInfo}>Overall Ranking</Text>
                            </VStack>
                        </View>
                        {levelExp && levelExp.level && levelExp.level >= 6 && levelExp && levelExp.level && levelExp.level <= 10 ?
                            <TouchableOpacity onPress={() => printPDF(authUser && authUser.first_name, authUser && authUser.last_name, 6)} activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}>
                                <Text style={RandomStyle.pButton2}>Download E-Certificate</Text>
                            </TouchableOpacity> : null
                        }
                    </View>
                </ScrollView>
            }
        </>
    )
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('To enable Notification, please make sure Notification (BasuraHunt) is enabled under Settings');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Token", token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
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

export default Profile;