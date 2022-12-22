import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GScheduleUpcoming from "../../screens/garbageCollector/schedule/schedule-upcoming";
import Start from "../../screens/garbageCollector/schedule/start";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GScheduleUpcoming"
                component={GScheduleUpcoming}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="Start"
                component={Start}
                options={{
                    headerShown:false
                }}
            />
    
        </Stack.Navigator>
    )
}

export default function UpcomingNav() {
    return <MyStack/>;
}