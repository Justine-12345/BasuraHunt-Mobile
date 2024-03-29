import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../stylesheets/randomStyle";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadUser } from "../../Redux/Actions/userActions";
import { useDispatch } from "react-redux";
const SchedNotifView = (props) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState("")
    useEffect(() => {
        dispatch(loadUser())
        AsyncStorage.getItem("user")
            .then((res) => {
                setUser(JSON.parse(res))
            })
            .catch((error) => console.log(error))
        
    }, [])
    const title = props.route.params.title
    return (
        <>
            <View style={RandomStyle.lContainer4Grey}>

                <Text style={[RandomStyle.lHeader, { backgroundColor: "green", padding: 6, lineHeight: 25, borderTopRightRadius: 10, borderTopLeftRadius: 10 }]}>{title.split("|")[0]}</Text>
                <HStack>
                    <VStack style={{ width: "100%", paddingHorizontal: 10, backgroundColor: "white" }}>
                        <VStack paddingBottom={2}>
                            <Text style={[RandomStyle.lHeader, { color: "black", padding: 6, lineHeight: 25 }]}>
                                {title.split("|")[1]}
                            </Text>
                        </VStack>
                        <VStack paddingBottom={2}>
                            <Text style={[RandomStyle.lHeader, { color: "black", padding: 6, lineHeight: 25 }]}>
                                {title.split("|")[2]}
                            </Text>
                        </VStack>
                        <VStack paddingBottom={2}>
                            <Text style={[RandomStyle.lHeader, { color: "black", padding: 6, lineHeight: 25 }]}>
                                {title.split("|")[3]}
                            </Text>
                        </VStack>
                        <VStack paddingBottom={2}>
                            {console.log("user", user && user.role)}
                            {user && user.role === 'user' ?
                                <TouchableOpacity onPress={() => { props.navigation.navigate('ScheduleToday') }} activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}>
                                    <Text style={[RandomStyle.pButton2, { fontSize: 16, padding: 12 }]}>Show Collection Today</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => { props.navigation.navigate('GarbageCollectorSchedNav', {screen:"TodayNav", params:{screen:"CScheduleToday"}}) }} activeOpacity={0.8} style={{ width: 250, alignSelf: "center" }}>
                                    <Text style={[RandomStyle.pButton2, { fontSize: 16, padding: 12 }]}>Show My Collection Today</Text>
                                </TouchableOpacity>
                            }
                        </VStack>
                    </VStack>
                </HStack>
                <Text style={[RandomStyle.lHeader, { backgroundColor: "white", borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}></Text>
            </View>
        </>
    )


}

export default SchedNotifView;