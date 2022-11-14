import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Profile from "../screens/user/profile/profile";
import UserReportsList from "../screens/user/profile/user-reports-list";
import UserDonationsList from "../screens/user/profile/user-donations-list";
import UserClaimedDonationsList from "../screens/user/profile/user-claimed-donations-list";
import PublicReportsView from "../screens/home/reports/public-reports-view";
import MyReports from "./myreports";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#1E5128"
                }
            }}
        >
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "Profile"
                }}
            />
            <Tab.Screen
                name="MyReports"
                component={MyReports}
                options={{
                    title: "Reports"
                }}
            />
            <Tab.Screen
                name="UserDonationsList"
                component={UserDonationsList}
                options={{
                    title: "Donated Items"
                }}
            />
            <Tab.Screen
                name="UserClaimedDonationsList"
                component={UserClaimedDonationsList}
                options={{
                    title: "Claimed Items"
                }}
            />

        </Tab.Navigator>
    )
}

export default function UserNav() {
    return <MyTabs />
}