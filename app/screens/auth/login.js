import { Octicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useContext, useRef } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome, MaterialIcons } from "react-native-vector-icons";

import FlashMessage, { showMessage } from "react-native-flash-message";
import * as Yup from "yup";
import { COLORS, timeout } from "../../../assets/utils";
import { authenticationService } from "../../../constants/env";
import AuthContext from "../../../context/authContext";

const LoginScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const { accessToken, saveAccessToken } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView style={{ paddingHorizontal: 25 }} ref={scrollViewRef}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            style={{ width: 200, height: 200, marginTop: 30, marginBottom: 30 }}
            source={require("../../../assets/logoRaw.png")}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            marginHorizontal: 10,
          }}
        >
          Login
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .test(
                "emailOrUsername",
                "Invalid email address or username",
                function (value) {
                  // Check if the value is a valid email address
                  if (Yup.string().email().isValidSync(value)) {
                    return true; // Valid email address
                  }

                  // Check if the value is a valid username
                  const usernameRegex = /^[a-zA-Z0-9.-]+$/;
                  if (usernameRegex.test(value)) {
                    return true; // Valid username
                  }

                  return false; // Invalid email address and username
                }
              )
              .required("Required"),
            password: Yup.string()
              .min(8, "Must be at least 8 characters")
              .required("Required")
          })}
          onSubmit={async (values) => {
            try {
              const payload = {
                grantType: 'PASSWORD',
                username: values.email,
                password: values.password,
                withRefreshToken: "true"
              };

              const response = await fetch(authenticationService + "/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });

              if (response.ok) {
                showMessage({
                  message: "",
                  type: "success",
                  duration: timeout,
                  icon: () => (
                    <View style={styles.flashMessage}>
                      <Octicons name="sign-in" size={26} />
                      <Text style={styles.editCommentText}>Logged in successfully 👍</Text>
                    </View>
                  ),
                });
                const data = await response.json();
                setTimeout(() => {
                  saveAccessToken(data);
                }, timeout);
              } else {
                const body = JSON.parse(await response.text())
                showMessage({
                  message: "",
                  type: "info",
                  duration: timeout,
                  icon: () => (
                    <View style={styles.flashMessage}>
                      <Octicons name="sign-in" size={26} />
                      <Text style={[styles.editCommentText, {}]}>{body.message.split("Please check your inbox")[0]}</Text>
                    </View>
                  ),
                });
              }
            } catch (error) {
              console.log(error.response);
            }

          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              {touched.email && (
                <Text
                  style={{
                    color: "red",
                    marginHorizontal: 10,
                    marginVertical: -5,
                  }}
                >
                  {errors.email}
                </Text>
              )}
              <TextInput
                name="email"
                placeholder="Email Address or Username"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                }}
                onChangeText={handleChange("email")}
                value={values.email}
                onFocus={handleInputFocus}
              />

              {touched.password && (
                <Text
                  style={{
                    color: "red",
                    marginHorizontal: 10,
                    marginVertical: -5,
                  }}
                >
                  {errors.password}
                </Text>
              )}
              <TextInput
                name="password"
                placeholder="Password"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                }}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                onFocus={handleInputFocus}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  borderColor: "#ddd",
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  marginVertical: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: COLORS.light,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <TouchableOpacity style={{ alignSelf: "center", marginTop: -20, marginBottom: 20 }} onPress={() => navigation.navigate("Reset")}>
          <Text style={{ color: COLORS.light, fontWeight: "700" }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FontAwesome color="#DB4437" name="google" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <MaterialIcons color="#3b5998" name="facebook" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FontAwesome color="#1DA1F2" name="twitter" size={40} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: COLORS.light, fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FlashMessage position="bottom" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editCommentText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  flashMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

export default LoginScreen;
