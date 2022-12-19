import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AssignedFinished from "../../screens/garbageCollector/assignedIllegalDumps/assigned-finished";
import AssignedView from "../../screens/garbageCollector/assignedIllegalDumps/assigned-view";
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AssignedFinished"
                component={AssignedFinished}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="AssignedView"
                component={AssignedView}
                options={{
                    headerShown:false
                }}
            />
    
        </Stack.Navigator>
    )
}

export default function AssignedNav() {
    return <MyStack/>;
}