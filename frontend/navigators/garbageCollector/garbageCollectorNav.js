import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import AssignedNav from "./assignedNav";
import FinishedNav from "./finishedNav";


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarIndicatorStyle:{
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
            />
            <Tab.Screen
                name="Finished"
                component={FinishedNav}
                options={{
                    title: "Finished"
                }}
            />
      
        </Tab.Navigator>
    )
}

export default function GarbageCollectorNav(){
    return <MyTabs/>
}