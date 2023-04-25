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

import * as Yup from "yup";

import { COLORS } from "../../assets/utils";

const LoginScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView style={{ paddingHorizontal: 25 }} ref={scrollViewRef}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 200, height: 200, marginTop: 30, marginBottom: 30 }}
            source={require("../../assets/logoRaw.png")}
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
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be at least 6 characters")
              .required("Required"),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
          })}
          onSubmit={(values) => {}}
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
                  padding: 10,
                  margin: 10,
                }}
                onChangeText={handleChange("name")}
                value={values.name}
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
                  padding: 10,
                  margin: 10,
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
          <Text>Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: COLORS.blue, fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
