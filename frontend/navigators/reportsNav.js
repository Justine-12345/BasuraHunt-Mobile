import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PublicReportsList from "../screens/home/reports/public-reports-list";
import PublicReportsView from "../screens/home/reports/public-reports-view";
import PublicReportsUpdate from "../screens/home/reports/public-reports-update";
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PublicReportsList"
                component={PublicReportsList}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="PublicReportsView"
                component={PublicReportsView}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="PublicReportsUpdate"
                component={PublicReportsUpdate}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function ReportsNav() {
    return <MyStack/>;
}