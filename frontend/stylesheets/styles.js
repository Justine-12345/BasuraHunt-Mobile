import { StyleSheet, Dimensions } from "react-native";

var {width} = Dimensions.get("window");

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E5128",
        paddingVertical: 30,
        marginBottom: 30
    },
    container2: {
        flex: 1,
        justifyContent: "center"
    },
    logo: {
        height: width / 3,
        width: width / 3,
        alignSelf: "center",

    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 40,
        alignSelf: "center"
    },
    text0: {
        color: "#1E5128",
        textAlign: "center",
    },
    text1: {
        fontSize: 25,
        fontWeight: "bold"
    },
    textI:{
        fontStyle: "italic"
    },
    touchable: {
        alignSelf: "center"
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#1E5128",
        fontSize: 20,
        margin: 20
    },
    loginBtn: {
        backgroundColor: "#1E5128",
        width: 200,
        padding: 5,
        borderRadius: 10,
        alignSelf: "center",
        margin: 30,
    },
    login: {
        color: "white",
        textAlign: "center",
        fontSize: 20
    }
})

export default Styles;
