import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../assets/styles";

const LoginScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        style={{ paddingHorizontal: 25 }}
        ref={scrollViewRef}
      >
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
          Login
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be at least 6 characters")
              .required("Required"),
          })}
          onSubmit={(values) => {}}
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
            onPress={() => {}}
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
            onPress={() => {}}
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
            onPress={() => {}}
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
          <Text>New to the app ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: COLORS.light, fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
