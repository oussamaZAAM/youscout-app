import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from "react-native";
import React from "react";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../assets/utils";
import Rating from "../assets/Rating";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Rate = ({
  skills,
  handleRate,
  modalVisible,
  setModalVisible,
  toggleModal,
}) => {
  const skillsStyle = skills.map((skill) => {
    return (
      <View
        key={skill.skill}
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18 }}>{skill.skill}</Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Rating
            rating={skill.rating}
            onRate={(i) => handleRate(i, skill.skill)}
          />
        </View>
      </View>
    );
  });
  const bottomTabHeight = useBottomTabBarHeight();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}/>
      </TouchableWithoutFeedback>
      <View style={{ position: 'absolute', right: 0, left: 0, bottom: WINDOW_HEIGHT / 3, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            width: WINDOW_WIDTH - 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
              marginTop: 4,
              marginBottom: 16,
            }}
          >
            Rate this skills
          </Text>
          {skillsStyle}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Rate;
