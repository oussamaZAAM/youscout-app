import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavbarGeneral = ({
  title = "Navbar General",
  rightButton = { display: false },
}) => {
  const navigation = useNavigation();

  const check = () => {
    rightButton.action();
    navigation.goBack();
  }
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
          name={rightButton.name}
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
