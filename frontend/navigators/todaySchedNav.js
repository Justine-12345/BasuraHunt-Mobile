import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import ScheduleToday from "../screens/schedule/schedule-today";
import SchedNotifView from "../screens/schedule/schedule-notification-view";
const Stack = createStackNavigator();

function MyStack() {

    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ScheduleToday"
                component={ScheduleToday}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="SchedNotifView"
                component={SchedNotifView}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function TodaySchedNav() {
    return <MyStack/>;
}