import React, { useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity, StyleSheet,ScrollView } from "react-native";
import { HStack, VStack } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import { FontAwesome } from "@expo/vector-icons";
const About= () => {

        return(
            <>
              <ScrollView>
                <View>
                    <HStack>
              
                        {/* <Text style={RandomStyle.vBadge}>ONGOING</Text> */}
                    <VStack style={{width: "100%"}}>
                            <Text style={styles.headerTitle}>ABOUT US</Text>
                             {/*<Text style={styles.line}/> */}
                            <Text style={styles.text}>BasuraHunt is a web application that lets a user report illegal dumps and donate usable items. 
                            This application aims to reduce and improve the environmental status, particularly in managing illegal dumps and providing self-awareness to the residents of Taguig City.
                           
                            </Text>  
                             <Text style={styles.headerMeet}>MEET THE TEAM</Text>
                             <Image style={styles.image} source= {require('../../../assets/haicel.jpg')}/>
                             <Text style={styles.name}>Haicel Marie E. Carlos</Text>
                             <Text style={styles.desc}>Web and Mobile Developer</Text>
                              <Text style={styles.line}/>
                             <Image style={styles.image} source= {require('../../../assets/justine.jpg')}/>
                             <Text style={styles.name}>Justine S. Castaneda</Text>
                             <Text style={styles.desc}>Web and Mobile Developer</Text>
                              <Text style={styles.line}/>
                             <Image style={styles.image} source= {require('../../../assets/erin.jpg')}/>
                             <Text style={styles.name}>Erin Jean V. Elpedes</Text>
                             <Text style={styles.desc}>Mobile Developer and Tester</Text>
                              <Text style={styles.line}/>
                             <Image style={styles.image} source= {require('../../../assets/denise.jpg')}/>
                             <Text style={styles.name}>Denise R. Fajardo</Text>
                             <Text style={styles.desc}>Mobile Developer and Tester</Text>
                              <Text style={styles.line}/>
                             <Image style={styles.image} source= {require('../../../assets/harris.jpg')}/>
                             <Text style={styles.name}>Harris A. Gurion</Text>
                             <Text style={styles.desc}>Web and Mobile Developer</Text>
                              <Text style={styles.line}/>
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
       paddingVertical: 10,
       textAlign:'left',
       fontSize: 18,
       color: 'white',
       backgroundColor: "#1e5128",
    },

    notifBtn: {
        alignSelf: "center",
        color: "#1E5128"
    }, 
    line :{
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
        fontSize: 40,
        paddingVertical: 10,
        borderBottomColor: '#1e5128',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#1e5128",
        alignSelf : "center",
        marginTop: 20
  },
  name: {
      
       textAlign:'center',
       fontSize: 24,
       color: '#1e5128',
       fontWeight: 'bold'
      
  },
  desc:{
         textAlign:'center',
       fontSize: 16,
  }
})

export default About;