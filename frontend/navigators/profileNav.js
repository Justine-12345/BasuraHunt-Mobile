import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/user/profile/profile";
import ProfileUpdate from "../screens/user/profile/profile-update";
import ProfileUpdatePassword from "../screens/user/profile/profile-update-password";
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
                name="ProfileUpdate"
                component={ProfileUpdate}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="ProfileUpdatePassword"
                component={ProfileUpdatePassword}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function ProfileNav() {
    return <MyStack/>;
}