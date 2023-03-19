import React, { useState } from "react";
import { FlatList, Text, View, Button, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import RandomStyle from "../../stylesheets/randomStyle";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import BhButton from "../../stylesheets/button";
import Empty1 from "../../stylesheets/empty1";

const AccessDenied = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={Empty1.container}>
            <Text style={Empty1.text1}>
                You cannot access this yet!
            </Text>
            <Text style={Empty1.text2}>
                Please wait until your account has been verified. Thank you!
            </Text>
            <View style={{marginVertical:12}}>
                {/* <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: "relative", top: -20 }}>
                    <SimpleLineIcons name="info" size={24} color="#757575" style={{ marginHorizontal: 8, alignSelf:"center", marginVertical: 30 }} />
                </TouchableOpacity> */}
                <Text  style={Empty1.text2}>Your account will be verified based on your first submitted report of illegal dumps. If it is real or eligible, your account can be verified.</Text>
            </View>

            <View style={{ flex: 1 }}>





                <Modal
                    useNativeDriver={true}
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <ScrollView>
                        <View style={{ flex: 1, margin: 15 }}>
                            <Text style={{ color: "#3e3e3e", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>How to become a Verified User?</Text>
                            <Text style={{ color: "#3e3e3e", marginBottom: 10 }}>Verifying the user is essential to every application because checking makes the system organized and standardized. In Basurahunt's application, we also need to verify every user so that our application will continue to operate and, at the same time, eliminate troublesome users. To become a verified user, you need to:</Text>
                            <Text style={{ color: "#3e3e3e", marginBottom: 10, fontSize: 16, fontWeight: "bold" }}>1. Report an illegal dump to our mobile application, and when the reported illegal dumps are collected and verified by the garbage collector
                            </Text>
                            <Image style={{
                                width: 320,
                                height: 650, resizeMode: "center"
                            }}
                                source={require("../../assets/report1.jpg")}
                            />



                            <BhButton medium onPress={() => setModalVisible(false)} style={{ alignSelf: "center" }} >
                                <Text style={{ color: "white" }}>Close</Text>
                            </BhButton>
                        </View>
                    </ScrollView>

                </Modal>


            </View>
        </View>
    )
}

export default AccessDenied;