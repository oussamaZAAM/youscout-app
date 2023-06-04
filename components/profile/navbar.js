import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "react-native-vector-icons";

const ProfileNavbar = ({ profileUserName, myProfile, toggleBottomNavigationView }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      {myProfile ? (
        <TouchableOpacity>
          <Feather name="search" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{profileUserName}</Text>
      <TouchableOpacity onPress={toggleBottomNavigationView}>
        <Feather name="menu" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNavbar;

const styles = StyleSheet.create({
  navContainer: {
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
