import React, { useCallback, useState } from "react";
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
import { loadUser } from "../../../Redux/Actions/userActions";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading: authLoading, isAuthenticated, error: authError, user: authUser } = useSelector(state => state.auth);
    const [expoPushToken, setExpoPushToken] = useState('');

    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem("isAuthenticated")
                .then((res) => {
                    if (!res) {
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

            }
        }, [isAuthenticated]))

    useFocusEffect(
        useCallback(() => {
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
            dispatch(loadUser())
            // console.log("authUser", authUser)
        }, []))


    const logoutHandle = () => {
        dispatch(logout(authUser && authUser._id, expoPushToken, true))
    }

    const ageCounter = (user) => {
        let age = null;
        if (user) {
            const dateToday = new Date();
            const birthDate = new Date(user.birthday);
            age = dateToday.getFullYear() - birthDate.getFullYear();
        }
        return age;
    }

    return (
        <ScrollView style={RandomStyle.vContainer}>
            {console.log(authUser && authUser)}
            <View marginVertical={5} style={RandomStyle.pContainer}>
                <HStack borderBottomColor={"lightgrey"} borderBottomWidth={0.5} paddingBottom={2.5}>
                    <VStack width={"40%"} alignItems={"center"}>
                        <Image style={RandomStyle.pImage} source={{ uri: (authUser && authUser.avatar && authUser.avatar.url) }} />
                    </VStack>
                    {/* <VStack width={"60%"} flex={1} justifyContent={"flex-end"}>
                        <Text style={RandomStyle.pText3}>Lorem Ipsum</Text>
                    </VStack> */}
                </HStack>
                <HStack position={"absolute"} right={0}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CollectorProfile', { screen: 'ProfileUpdateCollector', params: { user: authUser } }) }}>
                        <Ionicons name="pencil" size={30} style={RandomStyle.pButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('CollectorProfile', { screen: 'ProfileUpdatePasswordCollector' }) }} >
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
                        <Text style={RandomStyle.pText5}>{authUser && authUser.phone_number}</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Age: </Text>
                        <Text style={RandomStyle.pText5}>{ageCounter(authUser && authUser)}</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Gender: </Text>
                        <Text style={RandomStyle.pText5}>{authUser && authUser.gender}</Text>
                    </HStack>
                    <HStack>
                        <Text style={RandomStyle.pText4}>Address: </Text>
                        <Text style={RandomStyle.pText5}>{authUser && (authUser.house_number + " " + authUser.street + ", " + authUser.barangay)}</Text>
                    </HStack>
                </VStack>
            </View>

        </ScrollView>
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
            alert('Failed to get push token for push notification!');
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

export default Profile;