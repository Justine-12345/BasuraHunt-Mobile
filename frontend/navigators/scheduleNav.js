import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ScheduleToday from "../screens/schedule/schedule-today";
import ScheduleUpcoming from "../screens/schedule/schedule-upcoming";

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
                    backgroundColor: "#1E5128"
                }
            }}
        >
            <Tab.Screen
                name="ScheduleToday"
                component={ScheduleToday}
                options={{
                    title: "Collection Today"
                }}
            />
            <Tab.Screen
                name="ScheduleUpcoming"
                component={ScheduleUpcoming}
                options={{
                    title: "Upcoming"
                }}
            />
        </Tab.Navigator>
    )
}

export default function ScheduleNav(){
    return <MyTabs/>
}