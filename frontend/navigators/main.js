import React, { useState, useEffect } from "react";
import { Keyboard, View } from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./homeNav";
import ScheduleNav from "./scheduleNav";
import DonationsNav from "./donationsNav";
import UserNav from "./userNav";
import PublicReportsAdd from "../screens/home/reports/public-reports-add";
import Chat from "../screens/chat/chat";
import ChatDonation from "../screens/chat/chat-donation";
import ScheduleView from "../screens/schedule/schedule-view";
import AccessDenied from "../screens/extras/access-denied";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();


const Main = () => {
    const [user, setUser] = useState()
    const {user: authUser } = useSelector(state => state.auth);
    useEffect(() => {

        AsyncStorage.getItem("user")
            .then((res) => {
                setUser(JSON.parse(res))
            })
            .catch((error) => console.log(error))

            return ()=>{
                setUser()
            }

    }, [authUser])




    const [keyboardShown, setKeyboardShown] = useState(false);

    Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardShown(true);
    })
    Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardShown(false);
    })

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    backgroundColor: "#1E5128"
                },
                tabBarActiveTintColor: "#f7faf7",
                tabBarInactiveTintColor: "lightgrey",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNav}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome
                            name="home"
                            color={props.color}
                            size={25}
                        />
                    }
                }}
            />
            <Tab.Screen
                name="Schedule"
                component={ScheduleNav}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome
                            name="calendar"
                            color={props.color}
                            size={25}
                        />
                    }
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        // Do something with the `navigation` object
                        navigation.navigate('Schedule', { screen: 'TodaySchedNav', params: { screen: 'ScheduleToday' } });


                    },
                })}
            />
            <Tab.Screen
                name="ScheduleView"
                component={ScheduleView}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="Report"
                component={PublicReportsAdd}
                options={{
                    tabBarIcon: (props) => {
                        return <MaterialCommunityIcons
                            style={{ position: "absolute", bottom: 5, backgroundColor: "#1E6128", borderRadius: 100, padding: 5, elevation: 5 }}
                            name="target"
                            color={props.color}
                            size={keyboardShown ? 25 : 50}
                        />
                    }
                }}
            />
            <Tab.Screen
                name="Donation"
                component={DonationsNav}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome5
                            name="box"
                            color={props.color}
                            size={25}
                        />
                    }
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        // Do something with the `navigation` object

                        if (user.role === 'newUser') {
                            navigation.navigate('AccessDeniedDonation')
                        } else {
                            navigation.navigate('Donation', { screen: 'PublicDonationsList'});
                        }


                    },
                })}
            />
            <Tab.Screen
                name="AccessDeniedDonation"
                component={AccessDenied}
                options={{
                    tabBarButton: () => null
                }}
            />


            <Tab.Screen
                name="User"
                component={UserNav}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome
                            name="user"
                            color={props.color}
                            size={25}
                        />
                    }
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        // Do something with the `navigation` object
                        navigation.navigate('User', { screen: 'ProfileNav' });


                    },
                })}
            />

            <Tab.Screen
                name="PublicReportsChat"
                component={Chat}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}



            />

            <Tab.Screen
                name="PublicDonationsChat"
                component={ChatDonation}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}


            />
        </Tab.Navigator>
    )
}


export default Main;