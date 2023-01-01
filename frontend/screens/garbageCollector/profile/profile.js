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

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading: authLoading, isAuthenticated, error: authError, user: authUser } = useSelector(state => state.auth);

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
            dispatch(loadUser())
            // console.log("authUser", authUser)
        }, []))


    const logoutHandle = () => {
        dispatch(logout())
    }

    const ageCounter = (user) => {
		let age = null;
		if(user) {
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
                    <TouchableOpacity>
                        <Ionicons name="pencil" size={30} style={RandomStyle.pButton} />
                    </TouchableOpacity>
                    <TouchableOpacity>
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

export default Profile;