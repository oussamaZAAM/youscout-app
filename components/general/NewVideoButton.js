import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Keyboard, StyleSheet, View, Animated } from "react-native";
import { AntDesign } from "react-native-vector-icons";

const NewVideoButton = () => {
  const translateY = useRef(new Animated.Value(-10.5)).current;

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
      <LinearGradient
        colors={["red", "orange", "purple"]}
        style={styles.gradientBorder}
      />
      <View style={styles.newVideoButton}>
        <AntDesign name="plus" size={32} color='white' />
      </View>
    </Animated.View>
  );
};

export default NewVideoButton;

const styles = StyleSheet.create({
  newVideoButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
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
    height: 70,
    widht: 70,
  },
});
