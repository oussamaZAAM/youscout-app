import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import NavbarGeneral from "../general/navbar";
import { useNavigation } from "@react-navigation/native";
import { authenticationService } from "../../constants/env";
import axios from "axios";
import AuthContext from "../auth/authContext";

const updateNormalProfile = async (userData, accessToken) => {
  try {
    await axios.patch(
      `${authenticationService}/api/v1/users/me/profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.error)
      })
  } catch (error) {
    // Handle error
    if (error.response) {
      if (error.response.status === 401) {
        //logout
      }
      console.error('Response data:', error.response.data);
    }
    console.error('No response received:', error.request);
  }
};

const updateProtectedProfile = async (userData, accessToken,) => {
  try {
    await axios.patch(
      `${authenticationService}/api/v1/users/me/profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.error)
      })
  } catch (error) {
    // Handle error
    if (error.response) {
      if (error.response.status === 401) {
        //logout
      }
      console.error('Response data:', error.response.data);
    }
    console.error('No response received:', error.request);
  }
};

const checkVariable = (field, value, action, accessToken) => {
  if (field === "username") {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (value.length > 3) {
      if (value.length < 25) {
        if (usernameRegex.test(value)) {
          action(value.toLowerCase());
        } else {
          alert("Username should not contain symbols other than underscores!");
        }
      } else {
        alert("Username should not contain more than 25 characters!");
      }
    } else {
      alert("Username should be at least 3 characters!");
    }
  }

  if (field === "email") {
    const usernameRegex = /\S+@\S+\.\S+/;
    if (usernameRegex.test(value)) {
      if (value.length <= 30) {
        action(value.toLowerCase());
      } else {
        alert("Email should not contain more than 30 characters!");
      }
    } else {
      alert("Please insert a valid email address!");
    }
  }

  if (field === "fullName") {
    const fullNameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
    if (fullNameRegex.test(value)) {
      if (value.length <= 50) {
        updateNormalProfile({
          fullName: value
        }, accessToken);
        action(value);
      } else {
        alert("Full name should not contain more than 50 characters!");
      }
    } else {
      alert("Please insert a valid first name and last name!");
    }
  }

  if (field === "bio") {
    if (value.length <= 100) {
      updateNormalProfile({
        bio: value
      }, accessToken);
      action(value);
    } else {
      alert("Profile Bio should not contain more than 100 characters!");
    }
  }

  if (field === "instagram") {
    if (value.length <= 25) {
      action(value);
    } else {
      alert("Instagram username should not contain more than 25 characters!");
    }
  }

  if (field === "facebook") {
    const faceebookRegex = /^[a-zA-Z' .]{1,50}$/;
    if (faceebookRegex.test(value)) {
      action(value);
    } else {
      alert("Please enter a valid Facebook name!");
    }
  }
};

const EditProfileFieldScreen = ({ route }) => {
  const { accessToken } = useContext(AuthContext);

  const navigation = useNavigation();
  const { title, field, value, action } = route.params;
  const [newValue, setNewValue] = useState(value);
  const onSave = () => {
    if (newValue !== "") {
      checkVariable(field, newValue, action, accessToken);
    } else {
      console.log("error1");
    }
    navigation.goBack();
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
        {field === "bio" ? (
          <View>
            <TextInput
              style={styles.textInput}
              value={newValue}
              onChangeText={(text) => {
                setNewValue(text);
              }}
              autoFocus={true}
              multiline
            />
            <Text style={styles.characterCount}>{newValue.length}/100</Text>
          </View>
        ) : field === ("password" || "username" || "email")
          ? (
            <View style={{flex: 1, flexDirection: "column", gap: 10}}>
              <TextInput
                style={styles.textInput}
                value={newValue}
                onChangeText={(text) => setNewValue(text)}
                autoFocus={true}
              />
              <Text style={{marginTop: 20, marginBottom: 10}}>Validate with your current password</Text>
              <TextInput
                style={styles.textInput}
                value={newValue}
                onChangeText={(text) => setNewValue(text)}
                autoFocus={true}
              />
            </View>
          )
          : (<TextInput
            style={styles.textInput}
            value={newValue}
            onChangeText={(text) => setNewValue(text)}
            autoFocus={true}
          />)}
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
  characterCount: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
