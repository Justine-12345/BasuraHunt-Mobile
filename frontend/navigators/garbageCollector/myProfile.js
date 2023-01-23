import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../../screens/garbageCollector/profile/profile";
import ProfileUpdate from "../../screens/garbageCollector/profile/profile-update-collector";
import ProfileUpdatePasswordCollector from "../../screens/garbageCollector/profile/profile-update-password-collector";
const Stack = createStackNavigator();

function MyStack() {

    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="ProfileUpdateCollector"
                component={ProfileUpdate}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="ProfileUpdatePasswordCollector"
                component={ProfileUpdatePasswordCollector}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function MyProfile() {
    return <MyStack/>;
}