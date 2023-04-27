import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "react-native-vector-icons";
import { COLORS } from "../../assets/utils";

const NewVideoButton = () => {
  return (
    <View style={styles.newVideoButtonContainer}>
      <LinearGradient
        colors={["red", "orange", "purple"]}
        style={styles.gradientBorder}
      />
      <View style={styles.newVideoButton}>
        <AntDesign name="plus" size={32} />
      </View>
    </View>
  );
};

export default NewVideoButton;

const styles = StyleSheet.create({
    
  newVideoButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  newVideoButtonContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        translateY: -10.5,
      },
    ],
    
  },
  gradientBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 70,
    widht: 70,
  },
});
