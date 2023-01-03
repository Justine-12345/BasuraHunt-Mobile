import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserClaimedDonations from "../screens/user/profile/user-claimed-donations-list";
import PublicDonationsView from "../screens/donation/donations/public-donations-view";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserClaimedDonations"
                component={UserClaimedDonations}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MyPublicClaimedDonationsView"
                component={PublicDonationsView}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default function MyClaimed() {
    return <MyStack />;
}