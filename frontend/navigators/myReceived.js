import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserReceivedDonations from "../screens/user/profile/user-received-donation-list";
import PublicDonationsView from "../screens/donation/donations/public-donations-view";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserReceivedDonations"
                component={UserReceivedDonations}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MyPublicReceivedDonationsView"
                component={PublicDonationsView}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default function MyReceived() {
    return <MyStack />;
}