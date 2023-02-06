import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RankingNav from "./rankingNav";
import AccessDenied from "../screens/extras/access-denied";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();



function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RankingNav"
                component={RankingNav}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AccessDeniedRanking"
                component={AccessDenied}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default function RankingMainNav() {
    return <MyStack />;
}