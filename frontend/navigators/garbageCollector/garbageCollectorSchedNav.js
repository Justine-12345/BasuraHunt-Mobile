import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TodayNav from "./todayNav";
import UpcomingNav from "./upcomingNav";

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
                name="TodayNav"
                component={TodayNav}
                options={{
                    title: "My Collection Today"
                }}
            />
            <Tab.Screen
                name="UpcomingNav"
                component={UpcomingNav}
                options={{
                    title: "Upcoming"
                }}
            />
           
      
        </Tab.Navigator>
    )
}

export default function GarbageCollectorSchedNav(){
    return <MyTabs/>
}