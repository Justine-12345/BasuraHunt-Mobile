import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CScheduleToday from "../../screens/garbageCollector/schedule/schedule-today";
import Start from "../../screens/garbageCollector/schedule/start";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CScheduleToday"
                component={CScheduleToday}
                options={{
                    headerShown:false
                }}
            />
            {/* <Stack.Screen
                name="Start"
                component={Start}
                options={{
                    headerShown:false
                }}
            /> */}
    
        </Stack.Navigator>
    )
}

export default function TodayNav() {
    return <MyStack/>;
}