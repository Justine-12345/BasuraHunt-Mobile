import React from "react";
import { Text, StyleSheet, Image, View, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

var {width} = Dimensions.get("window");

const Header = () => {
    return(
        <SafeAreaView>
        <View style={styles.headerContainer}>
            <View style={styles.headerTitle}>
                <Image
                    source={require("../assets/icon_header.png")}
                    resizeMode="cover"
                    style={styles.img}
                />
                <Text style={styles.title}>BasuraHunt</Text>
            </View>
            <FontAwesome name="bell" size={20} style={styles.notifBtn}/>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: width,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
    },
    headerTitle: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    img: {
        height: 50,
        width: 50,
    },
    title: {
        fontWeight: "bold",
        color: "#1E5128",
        fontSize: 20
    },
    notifBtn: {
        alignSelf: "center",
        color: "#1E5128"
    }

})

export default Header;