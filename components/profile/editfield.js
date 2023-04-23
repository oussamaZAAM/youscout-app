import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarGeneral from "../general/navbar";
import { Divider } from "react-native-paper";

const checkVariable = (field, value, action) => {
  if (field === "username") {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (value.length > 3) {
      if (value.length < 25) {
        if (usernameRegex.test(value)) {
          action(value.toLowerCase());
        } else {
          alert("username should not contain symbols other than underscores!");
        }
      } else {
        alert("username should not contain more than 25 characters!");
      }
    } else {
      alert("username should be at least 3 characters!");
    }
  }

  if (field === "email") {
    const usernameRegex = /\S+@\S+\.\S+/;
    if (usernameRegex.test(value)) {
      action(value.toLowerCase());
    } else {
      alert("Please insert a valid email address!");
    }
  }
};

const EditProfileFieldScreen = ({ route }) => {
  const { title, field, value, action } = route.params;
  const [newValue, setNewValue] = useState(value);
  const onSave = () => {
    if (newValue !== "") {
      checkVariable(field, newValue, action);
    } else {
      console.log("error1");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <NavbarGeneral
        title={title}
        rightButton={{ display: true, name: "check", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={newValue}
          onChangeText={(text) => setNewValue(text)}
          autoFocus={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileFieldScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    borderColor: "lightgray",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mainContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    color: "gray",
  },
});
