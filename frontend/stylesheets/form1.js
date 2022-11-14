import { StyleSheet, Dimensions } from "react-native";

var {width, height} = Dimensions.get("window");

const Form1 = StyleSheet.create({
    headerContainer: {
        width: width,
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    title: {
        fontWeight: "bold",
        color: "#1E5128",
        fontSize: 20
    },
    formContainer: {
        padding: 30,
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#1E5128",
        fontSize: 20,
        marginBottom: 20 
    },
    textInput2: {
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 5,
        fontSize: 15,
        padding: 5,
        width: "100%"
    },
    birthdate:{
        fontSize: 20,
        textAlign: "center"
    },
    birthdateContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#1E5128",
        width: "100%",
        marginBottom: 20, 
    },
    btnLabel: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },    
    formBtn: {
        backgroundColor: "#1E5128",
        width: 200,
        padding: 5,
        borderRadius: 10,
        alignSelf: "center",
        margin: 20,
    },
    formBtnDisable: {
        backgroundColor: "gray",
        width: 200,
        padding: 5,
        borderRadius: 10,
        alignSelf: "center",
        margin: 20,
    },
    formBtn1: {
        backgroundColor: "#1E5128",
        width: 250,
        padding: 5,
        borderRadius: 10,
        alignSelf: "center",
        margin: 20,
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
    },
    picContainer: {
        alignSelf: "center",
        position: "relative"
    },
    profilePic: {
        width: width/2,
        height: width/2,
        borderRadius: 100,
    },
    pencil: {
        fontSize: 30,
        position: "absolute",
        color: "#1E5128",
        bottom: 0,
        alignSelf: "flex-end",
    }


})

export default Form1;