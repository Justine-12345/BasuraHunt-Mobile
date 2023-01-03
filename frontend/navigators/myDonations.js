import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserDonationsList from "../screens/user/profile/user-donations-list";
import PublicDonationsView from "../screens/donation/donations/public-donations-view";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserDonationsList"
                component={UserDonationsList}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MyPublicDonationsView"
                component={PublicDonationsView}
                options={{
                    headerShown: false,
                    headerMode:"float"
                }}
            />

        </Stack.Navigator>
    )
}

export default function MyDonations() {
    return <MyStack />;
}