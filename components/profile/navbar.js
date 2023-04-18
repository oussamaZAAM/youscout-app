import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileNavbar = ({ user }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={20} />
      </TouchableOpacity>
      <Text style={styles.text}>{user.username}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
});
