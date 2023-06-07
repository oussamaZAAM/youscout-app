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
import AuthContext from "../../../context/authContext";
import { authenticationService } from "../../../constants/env";

const ResetScreen = ({ navigation }) => {
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
          Reset Password
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={async (values) => {
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
                  backgroundColor: "red",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Reset password
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <TouchableOpacity style={{ flex:1, flexDirection: "row", alignSelf: "center", marginTop: -20, marginBottom: 20, gap: 5 }} onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontWeight: "500" }}>
            Wanna
          </Text>
          <Text style={{ color: COLORS.light, fontWeight: "700" }}>
            login?
          </Text>
        </TouchableOpacity>
      </ScrollView>
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

export default ResetScreen;