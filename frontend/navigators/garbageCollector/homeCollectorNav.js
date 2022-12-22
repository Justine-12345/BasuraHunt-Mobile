import React, { useState } from "react";
import { Keyboard, View, Text } from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GarbageCollectorNav from "./garbageCollectorNav";
//import ScheduleNav from "./scheduleNav";
//import CollectorNav from "./collecorNav";
import GarbageCollectorSchedNav from "./garbageCollectorSchedNav";
import Profile from "../../screens/garbageCollector/profile/profile";
import Start from "../../screens/garbageCollector/schedule/start";
const Tab = createBottomTabNavigator();


const HomeCollectorNav = () => {
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
                name="GarbageCollectorSchedNav"
                component={GarbageCollectorSchedNav}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome
                            name="calendar"
                            color={props.color}
                            size={25}
                        />
                    }
                }}
            />
            <Tab.Screen
                name="GarbageCollectorNav"
                component={GarbageCollectorNav}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome
                            name="tasks"
                            color={props.color}
                            size={25}
                            class="fal fa"
                        />
                    }
                }}
            />

            <Tab.Screen
                name="CollectorProfile"
                component={Profile}
                options={{
                    tabBarIcon: (props) => {
                        return <FontAwesome
                            name="user"
                            color={props.color}
                            size={25}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="Start"
                component={Start}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
        </Tab.Navigator>
    )
}


export default HomeCollectorNav;