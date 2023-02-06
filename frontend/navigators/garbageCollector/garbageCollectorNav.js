import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import AssignedNav from "./assignedNav";
import FinishedNav from "./finishedNav";


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            backBehavior="none"
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#1E5128",
                },
            }}
        >
            <Tab.Screen
                name="Assigned Illegal Dumps"
                component={AssignedNav}
                options={{
                    title: "Assigned Illegal Dumps"
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        console.log('route', route)
                        // Do something with the `navigation` object
                        navigation.navigate('AssignedList');

                    },
                })}
            />
            <Tab.Screen
                name="Finished"
                component={FinishedNav}
                options={{
                    title: "Finished"
                }}
                // listeners={({ navigation, route }) => ({
                //     tabPress: (e) => {
                //         // Prevent default action
                //         e.preventDefault();
                //         console.log('route', route)
                //         // Do something with the `navigation` object
                //         navigation.navigate('AssignedFinished');

                //     },
                // })}
            />

        </Tab.Navigator>
    )
}

export default function GarbageCollectorNav() {
    return <MyTabs />
}