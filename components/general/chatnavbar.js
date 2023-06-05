import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Feather } from "react-native-vector-icons";
import { CheckImage } from "../../assets/functions/functions";

const ChatNavbarGeneral = ({ username = "Unknown", profilePicture }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.button}
      >
        <Feather name="arrow-left" size={26} color={"black"} />
      </TouchableOpacity>

      <View style={styles.userBanner}>
        <CheckImage uri={profilePicture} />
        <Text style={styles.title}>{username}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Feather name="menu" size={26} color="transparent" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatNavbarGeneral;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    width: 0,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingVertical: 7.5,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 10,
    width: 0,
  },
  userBanner: {
    alignItems: 'center'
  }
});
