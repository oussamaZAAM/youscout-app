import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Feather } from "react-native-vector-icons";

import { WINDOW_WIDTH } from "../../../assets/utils";
import VideosFlatList from "../../../components/posts/videosFlatlist";
import ProfileHeader from "../../../components/profile/header";
import ProfileNavbar from "../../../components/profile/navbar";
import ProfilePostList from "../../../components/profile/postList";
import videosData from "../../videosData";

const ProfileScreen = (props) => {
  const [postEnabled, setPostEnabled] = useState(-1);
  const insets = useSafeAreaInsets();

  // Fetch the authenticated user
  const user = {
    id: 10,
    username: "karenbee",
    email: "karenbee@gmail.com",
    profileImg: "https://cdn.myanimelist.net/images/characters/9/295367.jpg",
  };
  // If params exist, that means that we are accessing the profile page from a user's post
  // (which means it's not accessed from the profile button)
  const profileUser = props.route.params ? props.route.params.postUser : user;

  // Fetch the current user's posts
  const posts = videosData;

  return postEnabled === -1 ? (
    <SafeAreaView style={styles.container}>
      <ProfileNavbar
        profileUserName={profileUser.username}
        myProfile={user.id === profileUser.id}
      />
      <ProfileHeader profileUser={profileUser} />
      <ProfilePostList
        posts={posts}
        setPostEnabled={setPostEnabled}
        numColumns={3}
      />
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
});
