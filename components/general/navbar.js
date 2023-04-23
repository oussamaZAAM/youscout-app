import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "react-native-vector-icons";

const NavbarGeneral = ({
  title = "Navbar",
  rightButton = { display: false },
}) => {
  const navigation = useNavigation();

  const check = () => {
    rightButton.action();
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Feather name="arrow-left" size={26} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        onPress={() => (rightButton.display ? check() : null)}
        style={styles.button}
      >
        <Feather
          name={rightButton.name || "menu"}
          size={26}
          color={!rightButton.display ? "transparent" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavbarGeneral;

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
});
