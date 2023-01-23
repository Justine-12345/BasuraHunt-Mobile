import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Personal from "../screens/user/register/personal";
import Address from "../screens/user/register/address";
import Account from "../screens/user/register/account";
import Verification from "../screens/user/register/verification";
import Login from "../screens/user/login";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Octicons, Foundation, Entypo } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            title="Sign Up"
            backBehavior="history"
            screenOptions={{
                swipeEnabled: false,
                tabBarActiveTintColor: "white",
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                tabBarItemStyle: {
                    backgroundColor: "#1E5128",
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "limegreen",
                }
            }}
            screenListeners={{
                tabPress: e => {
                    e.preventDefault();
                }
            }}
        >
            <Tab.Screen
                name="Personal"
                component={Personal}
                options={{  
                    tabBarIcon: (props) => {
                        return <FontAwesome5
                            name="user-cog"
                            color={props.color}
                            size={20}
                        />
                    },
                    tabBarShowLabel: false,

                   

                }}
            />
            <Tab.Screen
                name="Address"
                component={Address}
                options={{  
                    tabBarIcon: (props) => {
                        return <Entypo
                            name="home"
                            color={props.color}
                            size={23}
                        />
                    },
                    tabBarShowLabel: false,

                   

                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{  
                    tabBarIcon: (props) => {
                        return <FontAwesome5
                            name="user-lock"
                            color={props.color}
                            size={20}
                        />
                    },
                    tabBarShowLabel: false,

                   

                }}
            />
            <Tab.Screen
                name="Verification"
                component={Verification}
                options={{  
                    tabBarIcon: (props) => {
                        return <MaterialCommunityIcons
                            name="clipboard-check"
                            color={props.color}
                            size={23}
                        />
                    },
                    tabBarShowLabel: false,

                   

                }}
            />


        </Tab.Navigator>
    )
}

export default function RegisterNav() {
    return <MyTabs />
}