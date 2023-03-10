import { StyleSheet, Dimensions } from "react-native";

var { width, height } = Dimensions.get("window");

const RandomStyle = StyleSheet.create({
    // ranking
    rContainer: {
        backgroundColor: "green",
        flex: 1,
        position: "relative",
        paddingBottom: 10
    },
    rText1: {
        fontSize: 20,
        color: "#f7faf7",
        fontWeight: "bold",
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: "white",
    },
    rText2: {
        fontSize: 20,
        color: "#f7faf7",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 25
    },
    rText2Cont: {
        borderBottomWidth: 2,
        borderBottomColor: "white"
    },
    rItems: {
        backgroundColor: "#1E5128",
        // justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
        padding: 20,
    },
    rItem1: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
    rItem2: {
        color: "white",
        padding: 5,
        backgroundColor: "limegreen",
        position: "absolute",
        borderRadius: 100,
        alignSelf: "flex-end",
        right: 5,
        bottom: -5
    },
    rItem3: {
        color: "white",
    },
    rItem4: {
        position: "absolute",
        backgroundColor: "grey",
        color: "white",
        borderRadius: 100,
        textAlign: "center",
        fontSize: 15,
        minWidth: 20,
    },
    rItem5: {
        padding: 5,
        position: "absolute",
        alignSelf: "flex-end",
        right: 5,
        bottom: -15,
        width: 60,
        height: 60
    },
    rItem6: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        width: "90%"
    },
    // lists
    lLatestContainer: {
        // width: "100%",
        height: 300,
        borderRadius: 10,
        backgroundColor: "black",
        position: "relative",
        justifyContent: "flex-end",
        margin: 10
    },
    lContainerForTruckHistory: {
        // width: "100%",
        height: 145,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,
        position: "relative",
        marginHorizontal: 10,
        elevation: 4
    },
    lContainer: {
        // width: "100%",
        height: 100,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,
        position: "relative",
        marginHorizontal: 10,
        elevation: 3
    },
    lContainer2: {
        height: 100,
        borderRadius: 10,
        backgroundColor: "white",
        marginVertical: 5,
        position: "relative",
        marginHorizontal: 10,
        elevation: 3
    },
    lContainer3: {
        padding: 10,
    },
    lLatestTitle: {
        color: "#f7faf7",
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        width: "90%"
    },
    lTitle: {
        color: "#1E5128",
        fontSize: 15,
        fontWeight: "bold",
        margin: 5,
        width: width - 150
    },
    lLatestImg: {
        width: "100%",
        height: 300,
        position: "absolute",
        borderRadius: 10,
        opacity: .4,
        alignSelf: "center"
    },
    lImg: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    lLatestContent: {
        color: "white",
        width: "90%",
        margin: 10,
        fontSize: 15
    },
    lContent: {
        color: "black",
        width: width - 140,
        margin: 5,
        fontSize: 15
    },
    lType: {
        marginHorizontal: 5,
        color: "grey",
        width: width - 140,
    },
    lContainer4: {
        minHeight: 100,
        borderRadius: 10,
        backgroundColor: "#1E5128",
        marginVertical: 5,
        position: "relative",
        marginHorizontal: 10,
        elevation: 3,
    },
    lContainer4Grey: {
        minHeight: 100,
        borderRadius: 10,
        backgroundColor: "grey",
        marginVertical: 5,
        position: "relative",
        marginHorizontal: 10,
        elevation: 3,
    },
    lHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    lHeader1: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
        opacity: .7,
        textAlign: "center",
    },
    lItem: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        width: width / 2.3
    },
    lItem2: {
        fontSize: 15,
        color: "white",
        textAlign: "center"
    },
    // search
    searchContainer: {
        height: 40
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#1E5128",
        fontSize: 15,
        padding: 5,
        borderRadius: 5,
        alignSelf: "flex-start",
        flex: 1,
        height: "100%"
    },
    searchFilterContainer: {
        backgroundColor: "darkgrey",
        alignSelf: "flex-end",
        width: "15%",
        marginLeft: 5,
        height: "100%",
        justifyContent: "center",
        borderRadius: 5,
    },
    searchFilter: {
        textAlign: "center",
    },
    // view
    vContainer: {
        padding: 10,
        paddingBottom: 20
    },
    vHeader: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        paddingBottom: 10,
        marginBottom: 10
    },
    vMapContainer: {
        backgroundColor: "lightgrey",
        width: "100%",
        height: width / 1.5,
        marginVertical: 0,
    },
    vImages: {
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 2,
        marginVertical: 5
    },
    vImage: {
        height: 100,
        width: 100,
        margin: 2.5,
        borderRadius: 10
    },
    vContainer2: {
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        paddingBottom: 10,
        marginBottom: 10
    },
    vContainer3: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        paddingBottom: 10,
        marginBottom: 10
    },
    vOption: {
        backgroundColor: "#1E5128",
        margin: 2.5,
        padding: 5,
        borderRadius: 5,
        minWidth: width / 2.5,
        textAlign: "center",
        color: "white"
    },
    vText1: {
        fontWeight: "bold",
        fontSize: 20
    },
    vText2: {
        fontWeight: "bold"
    },
    vText3: {
        fontSize: 17
    },
    vText4: {
        color: "white",
        textAlign: "center"
    },
    vText5: {
        color: "green",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold",
    },
    vText6: {
        color: "white", textAlign: "center",
        backgroundColor: "#4F7942", marginBottom: 20, marginTop: 10,
        fontSize: 20
    },
    vMultiline: {
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: .5,
        padding: 10,
        textAlignVertical: "top"
    },
    vComment: {
        backgroundColor: "white",
        marginTop: 5,
        padding: 5,
    },
    vCommentDate: {
        alignSelf: "flex-end",
        color: "grey"
    },
    vCommentBtn: {
        padding: 10,
        backgroundColor: "#1E5128",
        width: 100,
        color: "white",
        textAlign: "center",
        marginVertical: 5,
        alignSelf: "flex-end",
        borderRadius: 5
    },
    vDonationBtn: {
        padding: 10,
        backgroundColor: "#1E5128",
        width: 100,
        color: "white",
        textAlign: "center",
        marginVertical: 5,
        alignSelf: "flex-start",
        borderRadius: 5
    },
    vChat: {
        color: "#1E5128",
    },
    vHeaderBtns: {
        justifyContent: "space-between",
        alignItems: "center"
    },
    vBadge: {
        position: "absolute",
        right: 0,
        top: -5,
        backgroundColor: "limegreen",
        color: "white",
        padding: 5,
        borderRadius: 5
    },
    vBadgeGrey: {
        position: "absolute",
        right: 0,
        top: -5,
        backgroundColor: "grey",
        color: "white",
        padding: 5,
        borderRadius: 5
    },
    // profile
    pContainer: {
        borderRadius: 5,
        backgroundColor: "#1E5128",
        padding: 10,
    },
    pText1: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    pText2: {
        color: "white"
    },
    pText3: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    pText4: {
        color: "white",
        fontWeight: "bold",
        width: 100
    },
    pText5: {
        color: "white",
        flex: 1
    },
    pText6: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
    pImage: {
        resizeMode: "cover",
        height: 120,
        width: 120,
        borderRadius: 100
    },
    pButton: {
        right: 0,
        backgroundColor: "limegreen",
        color: "white",
        padding: 2,
        borderRadius: 5,
        margin: 2
    },
    pContainer2: {
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 20
    },
    pBadge: {
        height: 80,
        width: 80,
        resizeMode: "cover"
    },
    pInfo: {
        backgroundColor: "forestgreen",
        padding: 2,
        color: "white",
        textAlign: "center",
        borderRadius: 5,
    },
    pContainer3: {
        marginHorizontal: 2,
        width: 80,
    },
    pStatistic: {
        paddingVertical: 10,
        textAlign: "center",
        borderRadius: 20,
        margin: 2
    },
    pButton2: {
        backgroundColor: "green",
        color: "white",
        fontSize: 20,
        borderRadius: 5,
        textAlign: "center",
        width: 250,
        alignSelf: "center",
        marginVertical: 10,
        padding: 2,
        elevation: 5
    },

    usContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexGrow: 1,
        flexBasis: "auto",
        flexShrink: 0,
        alignContent: "stretch",
        marginVertical: 10,
        position: "relative"
    },
    usSched: {
        padding: 10,
        margin: 5,
        backgroundColor: "#1E5128",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: width/2.33,
        minHeight: height/4.5,
        elevation: 5
    },
    usSchedLoading: {
        margin: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: width/2.33,
        minHeight: height/4.5,
        elevation: 5
    },
    usInfo: {
        fontWeight: "bold",
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    usAlt: {
        backgroundColor: "#1E9000",
    },
    usModal: {
        maxHeight: height,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    usPoints: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 10,
        width: width-100,
        elevation: 10
    },
    usClosec: {
        backgroundColor: "dimgrey",
        borderRadius: 5,
        marginTop: 10,
        padding: 5
    },
    usClose: {
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    nfAddInfoContainer: {
        borderRadius: 10,
        margin: 10,
        marginBottom: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignContent: "space-between",
    },
    nfAddInfo: {
        width: width/2.2,
        backgroundColor: "darkgreen",
        padding: 5,
        margin: 2,
        borderRadius: 5,
        flexGrow: 1
    },
    nfAddInfo1: {
        backgroundColor: "darkgreen",
    },
    nfAddInfo2: {
        backgroundColor: "darkred",
    },
    nfAddInfo3: {
        backgroundColor: "green",
    },
    nfAddInfo4: {
        backgroundColor: "goldenrod",
    },
    nfAddInfoSmall: {
        fontStyle: "italic",
        fontSize: 13,
        color: "white"
    },
    nfAddInfoText: {
        fontWeight: "bold",
        color: "white",
    },
    nfAddInfoModal: {
        zIndex: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    nfAddInfoModalView: {
        backgroundColor: "white"
    },
    nfAddInfoImg: {
        width: width-20,
        height: (width-20)*1.5,
    },
    nfClosec: {
        zIndex: 2,
        right: 0,
        position: "absolute",
        margin: 5
    }
})

export default RandomStyle;