import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Octicons } from "react-native-vector-icons";

import axios from "axios";
import { BottomSheet as EditBottomSheet } from "react-native-btr";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { WINDOW_WIDTH, timeout } from "../../../assets/utils";
import AuthContext from "../../../components/auth/authContext";
import VideosFlatList from "../../../components/posts/videosFlatlist";
import ProfileHeader from "../../../components/profile/header";
import ProfileNavbar from "../../../components/profile/navbar";
import ProfilePostList from "../../../components/profile/postList";
import { authenticationService } from "../../../constants/env";
import { UserContext } from "../../../components/auth/userContext";
import { videosData } from "../../videosData";
import { useNavigation } from "@react-navigation/native";
import { handleRefreshToken } from "../../../assets/functions/refreshToken";

const ProfileScreen = (props) => {
  const { accessToken, saveAccessToken, deleteAccessToken } = useContext(AuthContext);

  const [postEnabled, setPostEnabled] = useState(-1);
  const insets = useSafeAreaInsets();

  // handle Logout
  const [modalVisible, setModalVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        authenticationService + '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toggleBottomNavigationView();

      showMessage({
        message: "",
        type: "danger",
        duration: timeout,
        icon: () => (
          <View style={styles.flashMessage}>
            <Octicons name="sign-out" size={26} />
            <Text style={styles.editCommentText}>Logout successful</Text>
          </View>
        ),
      });
      setTimeout(() => {
        deleteAccessToken();
      }, timeout);

    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  // Listen to navigation changes (goBack doesn't re-render normally)
  const navigation = useNavigation();

  // Fetch the authenticated user
  const { user, fetchUser } = useContext(UserContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Trigger the fetchUser function when this screen comes into focus
      fetchUser();
    });

    return () => {
      unsubscribe(); // Cleanup function
    };
  }, [navigation]);

  // If params exist, that means that we are accessing the profile page from a user's post
  // (which means it's not accessed from the profile button) 

  const [postUser, setPostUser] = useState({
    username: "",
    email: "",
    profilePicture: "",
    fullName: "",
    dateOfBirth: null,
    gender: null,
    country: null,
    cityOrRegion: null,
    bio: null,
    socialMediaLinks: {}
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = authenticationService + "/users/"+props.route.params.postUsername+"/profile";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.status === 200) {
          const data = response.data;
          console.log("Fetching post user informations...")
          const userInfos = {
            username: data.username,
            email: data.email,
            profilePicture: data.profilePicture,
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            country: data.country,
            cityOrRegion: data.cityOrRegion,
            bio: data.bio,
            socialMediaLinks: data.socialMediaLinks
          }
          setPostUser(userInfos);
          console.log("Post user informations fetched!");
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching user infos:", error.response.message);
        if (error.response.status === 401) {
          handleRefreshToken(accessToken, saveAccessToken);
        }
      }
    }
    props.route.params.postUsername && fetchUser();
  }, []);

  const profileUser = props.route.params ? postUser : user;

  // Fetch the current user's posts
  const posts = videosData;

  return postEnabled === -1 ? (
    <SafeAreaView style={styles.container}>
      <ProfileNavbar
        profileUserName={profileUser.username}
        myProfile={user.username === profileUser.username}
        toggleBottomNavigationView={toggleBottomNavigationView}
      />
      <ProfileHeader profileUser={profileUser} />
      <ProfilePostList
        posts={posts}
        setPostEnabled={setPostEnabled}
        numColumns={3}
      />

      <EditBottomSheet
        visible={modalVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.editCommentSection}>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.editCommentButton}
          >
            <Octicons name="sign-out" size={26} />
            <View style={styles.editCommentTextContainer}>
              <Text style={styles.editCommentText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </EditBottomSheet>
      <FlashMessage position="top" />
    </SafeAreaView>
  ) : (
    <View>
      <View style={[styles.navContainer, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => setPostEnabled(-1)}
        >
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>
      </View>
      <VideosFlatList videosData={posts} postEnabled={postEnabled} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  editCommentSection: {
    width: WINDOW_WIDTH,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  editCommentButton: {
    height: 60,
    paddingVertical: 15,
    width: WINDOW_WIDTH / 2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  editCommentText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  editCommentTextContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },

  // For videoFlatlist player navbar
  navContainer: {
    position: "absolute",
    zIndex: 100,
    width: WINDOW_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    opacity: 0.5,
  },
  returnButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 15,
  },
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
