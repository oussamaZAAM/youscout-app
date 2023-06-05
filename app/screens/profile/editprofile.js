import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { BottomSheet } from "react-native-btr";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../assets/utils";
import NavbarGeneral from "../../../components/general/navbar";
import { UserContext } from "../../../context/userContext";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const { user, fetchUser } = useContext(UserContext);
  useEffect(() => {
    console.log('test')
    fetchUser();
  }, []);

  const [image, setImage] = useState(user.profilePicture || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [fullName, setFullName] = useState(user.fullName || "");
  const [bio, setBio] = useState(user.bio || "");
  const [socials, setSocials] = useState({
    instagram: user.socialMediaLinks?.instagram || "",
    facebook: user.socialMediaLinks?.facebook || ""
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [displayImage, setDisplayImage] = useState(0); // Enabaled when when Viewing current profile image

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

  const toggle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(toggle, {
      toValue: displayImage ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [displayImage]);

  const displayProfielImage = async () => {
    setDisplayImage(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!displayImage ? (
        <NavbarGeneral title="Edit Profile" />
      ) : (
        <View style={styles.navbarContainer}>
          <TouchableOpacity
            onPress={() => setDisplayImage(0)}
            style={styles.button}
          >
            <Feather name="arrow-left" size={26} />
          </TouchableOpacity>

          <Text style={styles.title}>Profile image</Text>

          <TouchableOpacity style={styles.button}>
            <Feather name="menu" size={26} color="transparent" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={toggleBottomNavigationView}
          style={styles.imageViewContainer}
        >
          <Animated.Image
            source={{ uri: image }}
            style={{
              position: "absolute",
              width: toggle.interpolate({
                inputRange: [0, 1],
                outputRange: [100, WINDOW_WIDTH],
              }),
              height: toggle.interpolate({
                inputRange: [0, 1],
                outputRange: [100, WINDOW_WIDTH],
              }),
              borderRadius: toggle.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
              zIndex: toggle.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10],
              }),
              transform: [
                {
                  translateY: toggle.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, WINDOW_HEIGHT / 3],
                  }),
                },
              ],
            }}
          />
          {!displayImage && (
            <>
              <View style={styles.imageOverlay} />
              <Feather name="camera" size={26} />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Other Profile Settings */}
      {!displayImage && (
        <View style={styles.fieldsContainer}>
          <Divider />
          {/* Username */}
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
          {/* Email */}
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
          {/* Full Name */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfileField", {
                title: "Full name",
                field: "fullName",
                value: fullName,
                action: setFullName,
              })
            }
            style={styles.fieldItemContainer}
          >
            <Text>Full Name</Text>
            <View style={styles.fieldValueContainer}>
              <Text>{fullName || "Add your name"}</Text>
              <Feather name="chevron-right" size={20} color="gray" />
            </View>
          </TouchableOpacity>
          <Divider />
          {/* Bio */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfileField", {
                title: "Bio",
                field: "bio",
                value: bio,
                action: setBio,
              })
            }
            style={styles.fieldItemContainer}
          >
            <Text>Bio</Text>
            <View style={styles.fieldValueContainer}>
              <Text>{bio || "Add a bio"}</Text>
              <Feather name="chevron-right" size={20} color="gray" />
            </View>
          </TouchableOpacity>
          <Divider />

          {/* Social Media Section */}
          <View style={styles.socialMediaContainer}>
            <Text style={styles.socialMediaBanner}>Social Media</Text>
            {/* Instagram */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfileField", {
                  title: "Instagram",
                  field: "instagram",
                  value: socials.instagram,
                  action: (value) => {
                    setSocials({ ...socials, instagram: value })
                  },
                })
              }
              style={styles.fieldItemContainer}
            >
              <Text>Instagram</Text>
              <View style={styles.fieldValueContainer}>
                <Text>{socials.instagram || "Add an account"}</Text>
                <Feather name="chevron-right" size={20} color="gray" />
              </View>
            </TouchableOpacity>
            {/* Facebook */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfileField", {
                  title: "Facebook",
                  field: "facebook",
                  value: socials.facebook,
                  action: (value) => {
                    setSocials({ ...socials, facebook: value })
                  },
                })
              }
              style={styles.fieldItemContainer}
            >
              <Text>Facebook</Text>
              <View style={styles.fieldValueContainer}>
                <Text>{socials.facebook || "Add an account"}</Text>
                <Feather name="chevron-right" size={20} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bottom Sheet for Profile Image configuration */}
      {!displayImage && (
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
                <Text style={styles.bottomSheetText}>Take new Image</Text>
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
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  displayProfielImage();
                  toggleBottomNavigationView();
                }}
                style={styles.bottomSheetButton}
              >
                <Text style={styles.bottomSheetText}>View current Image</Text>
              </TouchableOpacity>
              <View style={styles.spacer}></View>
              <TouchableOpacity
                onPress={toggleBottomNavigationView}
                style={styles.bottomSheetCancelButton}
              >
                <Text style={styles.bottomSheetCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}
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
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 50,
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
    borderRadius: 50,
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
    justifyContent: "flex-end",
    maxWidth: WINDOW_WIDTH / 2,
  },
  socialMediaContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  socialMediaBanner: {
    color: 'gray',
    marginVertical: 10,
    // marginHorizontal: 10
  },
  bottomNavigationView: {
    backgroundColor: "white",
    width: "100%",
    height: 240,
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
  bottomSheetCancel: {
    fontSize: 16,
    color: "gray",
  },
  spacer: {
    width: WINDOW_WIDTH,
    height: 10,
    backgroundColor: "#eee",
  },
  navbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
