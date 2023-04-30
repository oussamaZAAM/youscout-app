import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";

const NewVideoButton = () => {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(-10.5)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  const hideTranslate = () => {
    Animated.timing(translateY, {
      toValue: 20,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const showTranslate = () => {
    Animated.timing(translateY, {
      toValue: -10.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        hideTranslate();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        showTranslate();
      }
    );

    // Don't forget to remove the listeners when the component is unmounted
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.newVideoButtonContainer,
        {
          transform: [
            {
              translateY: translateY,
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NewVideo");
        }}
      >
        <Animated.View
          style={[
            styles.gradientBorder,
            {
              transform: [
                {
                  rotate: spin,
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={["red", "orange", "purple"]}
            style={styles.gradientBorder}
          />
        </Animated.View>
        <View style={styles.newVideoButton}>
          <AntDesign name="plus" size={32} color="white" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NewVideoButton;

const styles = StyleSheet.create({
  newVideoButton: {
    width: 67,
    height: 67,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    margin: 5,
  },
  newVideoButtonContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 75,
    widht: 75,
  },
});
