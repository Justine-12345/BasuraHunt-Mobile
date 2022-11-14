import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Personal from "../screens/user/register/personal";
import Address from "../screens/user/register/address";
import Account from "../screens/user/register/account";
import Verification from "../screens/user/register/verification";
import Login from "../screens/user/login";

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
                    title: "Personal"
                }}
            />
            <Tab.Screen
                name="Address"
                component={Address}
                options={{
                    title: "Address"
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    title: "Account"
                }}
            />
            <Tab.Screen
                name="Verification"
                component={Verification}
                options={{
                    title: "Verification"
                }}
            />

            
        </Tab.Navigator>
    )
}

export default function RegisterNav() {
    return <MyTabs />
}