import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Ranking1 from "../screens/home/ranking/ranking1";
import Ranking2 from "../screens/home/ranking/ranking2";
import Ranking3 from "../screens/home/ranking/ranking3";
import Ranking4 from "../screens/home/ranking/ranking4";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            title="Ranking"
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarLabelStyle: {
                    fontSize: 10,
                    letterSpacing: -.9,
                    fontWeight: "bold"
                },
                tabBarItemStyle: {
                    backgroundColor: "#1E5128",
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "limegreen"
                }
            }}
        >
            <Tab.Screen
                name="MostReported"
                component={Ranking1}
                options={{
                    title: "Most Reported"
                }}
            />
            <Tab.Screen
                name="MostCleaned"
                component={Ranking2}
                options={{
                    title: "Most Cleaned"
                }}
            />
            <Tab.Screen
                name="BarangayTop10"
                component={Ranking3}
                options={{
                    title: "Barangay"
                }}
            />
            <Tab.Screen
                name="TaguigTop10"
                component={Ranking4}
                options={{
                    title: "Taguig"
                }}
            />
        </Tab.Navigator>
    )
}

export default function RankingNav(){
    return <MyTabs/>
}