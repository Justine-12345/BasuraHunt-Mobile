import { StyleSheet, Dimensions } from "react-native";

var {width, height} = Dimensions.get("window");

const Empty1 = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        padding: 30
    },
    text1: {
        textAlign: "center",
        color: "#1E5128",
        fontSize: 25,
        fontWeight: "bold"
    },
    text2: {
        textAlign: "center",
        color: "#1E5128",
        fontSize: 15,
    }
})


export default Empty1;