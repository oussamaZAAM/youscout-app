import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarGeneral from "../components/general/navbar";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";

import { Feather } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://cdn.myanimelist.net/images/characters/9/295367.jpg"
  );
  const [username, setUsername] = useState("Araragi Karen");
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
      <NavbarGeneral />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={chooseImage}
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
              action: setUsername
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
      </View>
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
  },
});
