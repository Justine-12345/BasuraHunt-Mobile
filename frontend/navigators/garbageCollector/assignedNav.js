import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AssignedList from "../../screens/garbageCollector/assignedIllegalDumps/assigned-list";
import AssignedView from "../../screens/garbageCollector/assignedIllegalDumps/assigned-view";
import AssignedAccomplished from "../../screens/garbageCollector/assignedIllegalDumps/assigned-accomplished";
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AssignedList"
                component={AssignedList}
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
             <Stack.Screen
                name="AssignedAccomplished"
                component={AssignedAccomplished}
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