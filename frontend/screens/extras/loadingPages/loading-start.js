import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { HStack } from "native-base";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export default function LoadingStart() {

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo-green.png")}
        // resizeMode="center"
        style={styles.logo}
      />
      <HStack>
        <Skeleton style={styles.dot} LinearGradientComponent={LinearGradient} animation="pulse"/>
        <Skeleton style={styles.dot} LinearGradientComponent={LinearGradient} animation="pulse"/>
        <Skeleton style={styles.dot} LinearGradientComponent={LinearGradient} animation="pulse"/>
      </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#1E5128",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  logo: {
    height: 80,
    width: 80,
  },
  dot: {
    width: 10,
    height: 10,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#1E5128"
  }
})