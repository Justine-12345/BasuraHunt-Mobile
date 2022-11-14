import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Newsfeed from "../screens/home/newsfeed/newsfeed";
import NewsfeedView from "../screens/home/newsfeed/newsfeed-view";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Newsfeed"
                component={Newsfeed}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="NewsfeedView"
                component={NewsfeedView}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function NewsfeedNav() {
    return <MyStack/>;
}