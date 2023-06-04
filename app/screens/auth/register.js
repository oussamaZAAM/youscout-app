import {
  Octicons
} from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useRef } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import axios from "axios";
import * as Yup from "yup";

import { StyleSheet } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { COLORS, WINDOW_WIDTH, timeout } from "../../../assets/utils";
import { authenticationService } from "../../../constants/env";

const RegisterScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
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
            marginBottom: 15,
            marginHorizontal: 10,
          }}
        >
          Register
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .matches(
                /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$/,
                "Full name must contain at least two strings"
              )
              .required("Required"),
            username: Yup.string()
              .matches(/^[A-Za-z0-9.]{1,50}$/, "Username must be between 1 and 50 characters")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Must be at least 8 characters")
              .required("Required"),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
          })}
          onSubmit={async (values) => {
            await axios.post(authenticationService + '/api/v1/auth/register', {
              fullName: values.name,
              username: values.name,
              email: values.email,
              password: values.password
            })
              .then(response => {
                showMessage({
                  message: "response",
                  type: "success",
                  duration: timeout,

                  icon: () => (
                    <View style={styles.flashMessage}>
                      <Octicons name="sign-in" size={26} />
                      <Text style={styles.editCommentText}>An email is sent to {values.name}</Text>
                    </View>
                  ),
                });
                setTimeout(() => {
                  navigation.navigate("Login");
                }, timeout);
              })
              .catch(error => {
                showMessage({
                  message: "",
                  type: "danger",
                  duration: 500,
                  icon: () => (
                    <View style={styles.flashMessage}>
                      <Octicons name="sign-in" size={26} />
                      <Text style={styles.editCommentText}>Error while registering {error.message}</Text>
                    </View>
                  ),
                  // message: "Error while registering" + error
                });
                console.log('bad')
              });
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              {touched.name && (
                <Text
                  style={{
                    color: "red",
                    marginHorizontal: 10,
                    marginVertical: -5,
                  }}
                >
                  {errors.name}
                </Text>
              )}
              <TextInput
                name="name"
                placeholder="Full name"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  marginHorizontal: 10,
                  marginVertical: 7,
                }}
                onChangeText={handleChange("name")}
                value={values.name}
                onFocus={handleInputFocus}
              />

              {touched.username && (
                <Text
                  style={{
                    color: "red",
                    marginHorizontal: 10,
                    marginVertical: -5,
                  }}
                >
                  {errors.username}
                </Text>
              )}
              <TextInput
                name="username"
                placeholder="Username"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  marginHorizontal: 10,
                  marginVertical: 7,
                }}
                onChangeText={handleChange("username")}
                value={values.username}
                onFocus={handleInputFocus}
              />

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
                placeholder="Email Address"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  marginHorizontal: 10,
                  marginVertical: 7,
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
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  marginHorizontal: 10,
                  marginVertical: 7,
                }}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                onFocus={handleInputFocus}
              />

              {touched.confirmPassword && (
                <Text
                  style={{
                    color: "red",
                    marginHorizontal: 10,
                    marginVertical: -5,
                  }}
                >
                  {errors.confirmPassword}
                </Text>
              )}
              <TextInput
                name="confirmPassword"
                placeholder="Confirm Password"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  marginHorizontal: 10,
                  marginVertical: 7,
                }}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
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
                  backgroundColor: COLORS.blue,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: COLORS.blue, fontWeight: "700" }}>Login</Text>
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

export default RegisterScreen;
