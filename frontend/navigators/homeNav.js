import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Newsfeed from "../screens/home/newsfeed/newsfeed";
import NewsfeedNav from "./newsfeedNav";
import RankingNav from "./rankingNav";
import ReportsNav from "./reportsNav";
import About from "../screens/home/extras/about";
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
                tabBarIndicatorStyle:{
                    backgroundColor: "#1E5128",
                },
            }}
        >
            <Tab.Screen
                name="NewsfeedNav"
                component={NewsfeedNav}
                options={{
                    title: "Newsfeed"
                }}
            />
            <Tab.Screen
                name="Ranking"
                component={RankingNav}
                options={{
                    title: "Ranking"
                }}
            />
            <Tab.Screen
                name="ReportsNav"
                component={ReportsNav}
                options={{
                    title: "Illegal Dumps"
                }}
            />
             <Tab.Screen
                name="About"
                component={About}
                options={{
                    title: "About"
                }}
            />
        </Tab.Navigator>
    )
}

export default function HomeNav(){
    return <MyTabs/>
}