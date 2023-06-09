import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Octicons } from "react-native-vector-icons";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BottomSheet as EditBottomSheet } from "react-native-btr";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { handleRefreshToken } from "../../../assets/functions/refreshToken";
import { WINDOW_WIDTH, timeout } from "../../../assets/utils";
import VideosFlatList from "../../../components/posts/videosFlatlist";
import ProfileHeader from "../../../components/profile/header";
import ProfileNavbar from "../../../components/profile/navbar";
import ProfilePostList from "../../../components/profile/postList";
import { authenticationService, postService } from "../../../constants/env";
import AuthContext from "../../../context/authContext";
import { UserContext } from "../../../context/userContext";

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

  // Handle refreshing
  const [trigger, setTrigger] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    // Simulating a refresh action
    setIsRefreshing(true);

    fetchUser();
    setTrigger(prev => !prev);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };


  // Fetch the current authenticated user
  useEffect(() => {
    const fetchThisUser = async () => {
      try {
        const url = authenticationService + "/users/" + props.route.params.postUsername + "/profile";
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
    props.route.params?.postUsername && fetchThisUser();
  }, [isRefreshing]);

  // Abstract the user (current user / other users)
  const profileUser = props.route.params ? postUser : user;

  // Fetch the posts of the current user / post author
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchProfilePosts = async () => {
      try {
        const response = await axios.get(postService + "/posts/" + profileUser.username, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = response.data;
        setPosts(data);
      } catch (error) {
        if (error.response.status === 401) {
          handleRefreshToken(accessToken, saveAccessToken);
        }
      }
    }
    fetchProfilePosts();
  }, [profileUser.username]);

  return postEnabled === -1 ? (
    <SafeAreaView style={styles.refreshingContainer}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <ProfileNavbar
          profileUserName={profileUser.username}
          myProfile={user.username === profileUser.username}
          toggleBottomNavigationView={toggleBottomNavigationView}
        />
        <ProfileHeader profileUser={profileUser} trigger={trigger} setTrigger={setTrigger} />
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
      </ScrollView>
      <FlashMessage position="bottom" />
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

  refreshingContainer: {
    flex: 1,
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
