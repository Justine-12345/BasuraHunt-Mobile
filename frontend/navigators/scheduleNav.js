import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CScheduleToday from "../screens/garbageCollector/schedule/schedule-today";
// import ScheduleToday from "../screens/schedule/schedule-today";
import GScheduleUpcoming from "../screens/garbageCollector/schedule/schedule-upcoming";
// import ScheduleUpcoming from "../screens/schedule/schedule-upcoming";
import Start from "../screens/garbageCollector/schedule/start";
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
                name="CScheduleToday"
                component={CScheduleToday}
                options={{
                    title: "My Collection Today"
                }}
            />

            {/* <Tab.Screen
                name="Start"
                component={"Start"}
                options={{
                    title: "My Collection Today"
                }}
            /> */}
            
            {/* <Tab.Screen
                name="ScheduleToday"
                component={ScheduleToday}
                options={{
                    title: "My Collection Today"
                }}
            /> */}
            {/* <Tab.Screen
                name="Start"
                component={Start}
                options={{
                    title: "Start Now"
                }}
            /> */}
              <Tab.Screen
                name="GScheduleUpcoming"
                component={GScheduleUpcoming}
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