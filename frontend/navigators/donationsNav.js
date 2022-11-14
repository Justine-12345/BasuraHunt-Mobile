import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import PublicDonationsList from "../screens/donation/donations/public-donations-list";
import PublicDonationsView from "../screens/donation/donations/public-donations-view";

import PublicDonationsAdd from "../screens/donation/public-donations-add";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PublicDonationsList"
                component={PublicDonationsList}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="PublicDonationsView"
                component={PublicDonationsView}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarIndicatorStyle:{
                    backgroundColor: "#1E5128"
                }
            }}
        >
            <Tab.Screen
                name="PublicDonationsNav"
                component={MyStack}
                options={{
                    title: "Find Items"
                }}
            />
            <Tab.Screen
                name="PublicDonationsAdd"
                component={PublicDonationsAdd}
                options={{
                    title: "Donate Items"
                }}
            />
        </Tab.Navigator>
    )
}

export default function DonationsNav(){
    return <MyTabs/>
}