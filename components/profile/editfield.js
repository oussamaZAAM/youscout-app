import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { handleRefreshToken } from "../../assets/functions/refreshToken";
import { WINDOW_WIDTH } from "../../assets/utils";
import { authenticationService } from "../../constants/env";
import AuthContext from "../../context/authContext";
import NavbarGeneral from "../general/navbar";

const updateNormalProfile = async (userData, accessToken, saveAccessToken, deleteAccessToken) => {
  try {
    await axios.patch(
      `${authenticationService}/users/me/profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log("Updating normal profile:" + response.data)
        // Display flash message
      })
      .catch((error) => {
        console.error("Error while updating normal profile:" + error.response.data)
      })
  } catch (error) {
    // Handle error
    if (error.response) {
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken, deleteAccessToken);
      }
      console.error('Response data:', error.response.data);
    }
    console.error('No response received:', error.request);
  }
};

const updateProtectedProfile = async (userData, accessToken, saveAccessToken, deleteAccessToken) => {
  try {
    await axios.patch(
      `${authenticationService}/users/me`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then(async () => {
      deleteAccessToken();
      await axios.post(
        authenticationService + '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then(() => {}).catch((error) => { });
    });
  } catch (error) {
    // Handle error
    if (error.response) {
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken, deleteAccessToken);
      }
      alert(error.response.data.message);
    }
  }
};

const checkVariable = (field, value, action, password, accessToken, saveAccessToken, deleteAccessToken) => {
  if (field === "username") {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (password.length > 0) {
      if (value.length > 3) {
        if (value.length < 25) {
          if (usernameRegex.test(value)) {
            updateProtectedProfile({
              newUsername: value,
              password: password
            }, accessToken, saveAccessToken, deleteAccessToken);
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
    } else {
      alert("Please don't forget your password");
    }
  }

  if (field === "email") {
    const usernameRegex = /\S+@\S+\.\S+/;
    if (password.length > 0) {
      if (usernameRegex.test(value)) {
        if (value.length <= 30) {
          updateProtectedProfile({
            newEmail: value,
            password: password
          }, accessToken, saveAccessToken, deleteAccessToken);
          action(value.toLowerCase());
        } else {
          alert("Email should not contain more than 30 characters!");
        }
      } else {
        alert("Please insert a valid email address!");
      }
    } else {
      alert("Please don't forget your password");
    }
  }

  if (field === "password") {
    if (password.length > 0) {
      if (value.length >= 8) {
        updateProtectedProfile({
          newPassword: value,
          password: password
        }, accessToken, saveAccessToken, deleteAccessToken);
      } else {
        alert("Password should contain more than 8 characters!");
      }
    } else {
      alert("Please don't forget your password");
    }
  }

  if (field === "fullName") {
    const fullNameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
    if (fullNameRegex.test(value)) {
      if (value.length <= 50) {
        updateNormalProfile({
          fullName: value
        }, accessToken, saveAccessToken, deleteAccessToken);
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
      }, accessToken, saveAccessToken, deleteAccessToken);
      action(value);
    } else {
      alert("Profile Bio should not contain more than 100 characters!");
    }
  }

  if (field === "socialMedia") {
    // if (value.length <= 25) {
    updateNormalProfile({
      socialMediaLinks: value
    }, accessToken, saveAccessToken, deleteAccessToken)
    action(value);
    // } else {
    //   alert("Instagram username should not contain more than 25 characters!");
    // }
  }
};

const EditProfileFieldScreen = ({ route }) => {
  const { accessToken, saveAccessToken, deleteAccessToken } = useContext(AuthContext);

  // Password to verify some entries
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const { title, field, value, action } = route.params;
  const [newValue, setNewValue] = useState(value);
  const onSave = () => {
    if (newValue !== "") {
      checkVariable(field, newValue, action, password, accessToken, saveAccessToken, deleteAccessToken);
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
        <Text style={styles.title}>{field !== "socialMedia" && title}</Text>
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
        ) : (field === "username" || field === "email")
          ? (
            <View style={styles.columnContainer}>
              <TextInput
                style={styles.textInput}
                value={newValue}
                onChangeText={(text) => setNewValue(text)}
                autoFocus={true}
              />
              <Text style={styles.verifyText}>Verify with your current password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          )
          : (field === "password")
            ? <View style={styles.columnContainer}>
              <Text style={[styles.verifyText, { color: 'black' }]}>New password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                value={newValue}
                onChangeText={(text) => setNewValue(text)}
                autoFocus={true}
              />
              <Text style={[styles.verifyText, { color: 'black' }]}>Current password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            : (field === "socialMedia")
              ? Object.keys(newValue).map(socialMedia => {
                return (
                  <View>
                    <Text>{socialMedia}</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newValue[socialMedia]}
                      onChangeText={(text) => setNewValue({ ...newValue, [socialMedia]: text })}
                      autoFocus={true}
                    />
                  </View>
                )
              })
              : <TextInput
                secureTextEntry={field === "password"}
                style={styles.textInput}
                value={newValue}
                onChangeText={(text) => setNewValue(text)}
                autoFocus={true}
              />}
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
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  textInput: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: WINDOW_WIDTH
  },
  verifyText: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'red',
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
