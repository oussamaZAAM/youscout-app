import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BottomSheet } from "react-native-btr";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";

import { WINDOW_WIDTH } from "../assets/utils";
import NavbarGeneral from "../components/general/navbar";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://cdn.myanimelist.net/images/characters/9/295367.jpg"
  );
  const [username, setUsername] = useState("karenbee7");
  const [email, setEmail] = useState("karenbee7@gmail.com");

  const [modalVisible, setModalVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setModalVisible(!modalVisible);
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Send Image to Backend
    }
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Send Image to Backend
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <NavbarGeneral title="Edit Profile" />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={toggleBottomNavigationView}
          style={styles.imageViewContainer}
        >
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.imageOverlay} />
          <Feather name="camera" size={26} />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditProfileField", {
              title: "Username",
              field: "username",
              value: username,
              action: setUsername,
            })
          }
          style={styles.fieldItemContainer}
        >
          <Text>Username</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{username}</Text>
            <Feather name="chevron-right" size={20} color="gray" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditProfileField", {
              title: "Email",
              field: "email",
              value: email,
              action: setEmail,
            })
          }
          style={styles.fieldItemContainer}
        >
          <Text>Email</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{email}</Text>
            <Feather name="chevron-right" size={20} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheet
        visible={modalVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                takeImage();
                toggleBottomNavigationView();
              }}
              style={styles.bottomSheetButton}
            >
              <Text style={styles.bottomSheetText}>Take Image</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                chooseImage();
                toggleBottomNavigationView();
              }}
              style={styles.bottomSheetButton}
            >
              <Text style={styles.bottomSheetText}>Select from Gallery</Text>
            </TouchableOpacity>
            <View style={styles.spacer}></View>
            <TouchableOpacity
              onPress={toggleBottomNavigationView}
              style={styles.bottomSheetCancelButton}
            >
              <Text style={styles.bottomSheetCencel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imageViewContainer: {
    backgroundColor: "gray",
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    position: "absolute",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    ...StyleSheet.absoluteFill,
  },
  fieldsContainer: {
    flex: 0,
    padding: 20,
    marginTop: 20,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  bottomNavigationView: {
    backgroundColor: "white",
    width: "100%",
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  bottomSheetButton: {
    paddingVertical: 20,
    width: WINDOW_WIDTH,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetCancelButton: {
    paddingVertical: 20,
    width: WINDOW_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomSheetCencel: {
    fontSize: 16,
    color: "gray",
  },
  spacer: {
    width: WINDOW_WIDTH,
    height: 10,
    backgroundColor: "#eee",
  },
});
