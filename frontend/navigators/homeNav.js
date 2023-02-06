import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import Newsfeed from "../screens/home/newsfeed/newsfeed";
import NewsfeedNav from "./newsfeedNav";
import RankingMainNav from "./rankingMainNav";
import ReportsNav from "./reportsNav";
import About from "../screens/home/extras/about";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "native-base";
import { useSelector } from "react-redux";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    const {user: authUser } = useSelector(state => state.auth);
    const [user, setUser] = useState()
    useEffect(() => {

        AsyncStorage.getItem("user")
            .then((res) => {
                setUser(JSON.parse(res))
            })
            .catch((error) => console.log(error))

        return () => {
            setUser()
        }

    }, [authUser])

    return (
        <Tab.Navigator
            backBehavior="history"
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
                name="NewsfeedNav"
                component={NewsfeedNav}
                options={{
                    title: "Newsfeed"
                }}
            />
            <Tab.Screen
                name="Ranking"
                component={RankingMainNav}
                options={{
                    title: "Ranking"
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        // Do something with the `navigation` object

                        if (user.role === 'newUser') {
                            navigation.navigate('Ranking', { screen: 'AccessDeniedRanking'});
                        } else {
                            navigation.navigate('Ranking', { screen: 'RankingNav'});
                        }


                    },
                })}
            />

            
            <Tab.Screen
                name="ReportsNav"
                component={ReportsNav}
                options={{
                    title: "Illegal Dumps"
                }}
            />
            {/* <Tab.Screen
                name="About"
                component={About}
                options={{
                    title: "About"
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default function HomeNav() {
    return <MyTabs />
}