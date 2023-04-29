import React, { useCallback } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";

const About = () => {


    const supportedURL = 'https://verdant-cassata-948ce2.netlify.app/';

    const unsupportedURL = 'slack://open?team=123456';

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <TouchableOpacity style={{ backgroundColor: "#1e5128", elevation:5 }} borderRadius={0} onPress={handlePress}>
            <Text style={{ fontSize: 20, textAlign: "center", color: "white",padding: 20, }} >{children}</Text>
        </TouchableOpacity>
            ;
    };

    return (
        <>
            <ScrollView>
                <View>
                    <HStack>

                        {/* <Text style={RandomStyle.vBadge}>ONGOING</Text> */}
                        <VStack style={{ width: "100%" }}>
                            <Text style={styles.headerTitle}>ABOUT US</Text>

                            {/*<Text style={styles.line}/> */}
                            <Text style={styles.text}>BasuraHunt is a web and mobile application that lets users report illegal dumps.
                                This application aims to improve the environmental status, particularly in managing illegal dumps and providing self-awareness to the residents of Taguig City.

                            </Text>

                            <Image style={styles.imageLogo} source={require('../../../assets/TUP_LOGO.png')} />
                            <Text style={styles.name}>Technological University of the Philippines - Taguig</Text>
                            <Text style={styles.line} />
                            <Text style={styles.headerMeet}>MEET THE TEAM</Text>
                            <Image style={styles.image} source={{ uri: ('https://res.cloudinary.com/basurahunt/image/upload/v1679672954/BasuraHunt/Developers/bh_xg8jam.jpg') }} />
                            <Text style={styles.name}>Denise R. Fajardo</Text>
                            <Text style={styles.desc}>Mobile Developer and Tester</Text>
                            <Text style={styles.line} />
                            <Image style={styles.image} source={{ uri: ('https://res.cloudinary.com/basurahunt/image/upload/v1679672916/BasuraHunt/Developers/bh_xt3lqv.jpg') }} />
                            <Text style={styles.name}>Justine S. Castaneda</Text>
                            <Text style={styles.desc}>Web and Mobile Developer</Text>
                            <Text style={styles.line} />
                            <Image style={styles.image} source={{ uri: ('https://res.cloudinary.com/basurahunt/image/upload/v1679672971/BasuraHunt/Developers/bh_nqfbvd.jpg') }} />
                            <Text style={styles.name}>Erin Jean V. Elpedes</Text>
                            <Text style={styles.desc}>Mobile Developer and Tester</Text>
                            <Text style={styles.line} />
                            <Image style={styles.image} source={{ uri: ('https://res.cloudinary.com/basurahunt/image/upload/v1679672963/BasuraHunt/Developers/bh_tvujnr.jpg') }} />
                            <Text style={styles.name}>Harris A. Gurion</Text>
                            <Text style={styles.desc}>Web and Mobile Developer</Text>
                            <Text style={styles.line} />
                            <Image style={styles.image} source={{ uri: ('https://res.cloudinary.com/basurahunt/image/upload/v1679672979/BasuraHunt/Developers/bh_yvlqyl.jpg') }} />
                            <Text style={styles.name}>Haicel Marie E. Carlos</Text>
                            <Text style={styles.desc}>Web and Mobile Developer</Text>


                            <View style={{ height: 20 }}></View>
                            <OpenURLButton url={supportedURL}>Visit BasuraHunt Website</OpenURLButton>
                        </VStack>

                    </HStack>
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({

    headerTitle: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#1e5128",
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        paddingVertical: 10,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        backgroundColor: "#1e5128",
    },

    notifBtn: {
        alignSelf: "center",
        color: "#1E5128"
    },
    line: {
        borderBottomColor: '#1e5128',
        borderBottomWidth: StyleSheet.hairlineWidth,


    },

    headerMeet: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        color: '#1e5128',
        fontWeight: 'bold',
        fontSize: 30,
        paddingVertical: 10,
        borderBottomColor: '#1e5128',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 200 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#1e5128",
        alignSelf: "center",
        marginTop: 20
    },
    imageLogo: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden",
        alignSelf: "center",
        marginTop: 20
    },
    name: {
        textAlign: 'center',
        fontSize: 20,
        color: '#1e5128',
        fontWeight: 'bold',
        paddingHorizontal: 5
    },
    desc: {
        textAlign: 'center',
        fontSize: 15,
    }
})

export default About;