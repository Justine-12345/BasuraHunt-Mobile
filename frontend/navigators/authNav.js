import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/user/profile/profile";
import Login from "../screens/user/login";
import RegisterNav from "./registerNav";
import Main from "./main";
// import OTP from "../screens/user/otp-temp";
import OTP from "../screens/user/otp";
import IntroLoading from "../screens/extras/IntroLoading";
import ForgotPassword from "../screens/user/forgot-password";
import ResetPassword from "../screens/user/reset-password";
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="IntroLoading"
                component={IntroLoading}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Register"
                component={RegisterNav}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OTP"
                component={OTP}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                    headerShown: false
                }}
            />



        </Stack.Navigator>
    )
}

export default function AuthNav() {
    return <MyStack />;
}