import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Feather } from "react-native-vector-icons";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../assets/utils";
import ProfileHeader from "../../components/profile/header";
import ProfileNavbar from "../../components/profile/navbar";
import ProfilePostList from "../../components/profile/postList";
import VideoItem from "./VideoItem";

const ProfileScreen = (props) => {
  const [postEnabled, setPostEnabled] = useState(-1);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const bottomTabHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  // Fetch the authenticated user
  const user = {
    id: 10,
    username: "karenbee",
    email: "karenbee@gmail.com",
    uri: "https://cdn.myanimelist.net/images/characters/9/295367.jpg",
  };
  // If params exist, that means that we are accessing the profile page from a user's post 
  // (which means it's not accessed from the profile button)
  const profileUser = props.route.params ? props.route.params.postUser : user;

  // Fetch the current user's posts
  const posts = [
    {
      id: 1,
      channelName: "cutedog",
      uri: "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4",
      thumbUri: "https://i.ibb.co/fNqWrJX/image-2023-04-18-002637131.png",
      caption:
        "Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy",
      musicName: "Song #1",
      likes: 4321,
      comments: 2841,
      avatarUri: "https://wallpaperaccess.com/full/1669289.jpg",
    },
    {
      id: 2,
      channelName: "meow",
      uri: "https://v.pinimg.com/videos/mc/720p/11/05/2c/11052c35282355459147eabe31cf3c75.mp4",
      thumbUri: "https://i.ibb.co/6Z7pLq0/image-2023-04-18-003250756.png",
      caption: "Doggies eating candy #cute #puppy",
      musicName: "Song #2",
      likes: 2411,
      comments: 1222,
      avatarUri: "https://wallpaperaccess.com/thumb/266770.jpg",
    },
    {
      id: 3,
      channelName: "yummy",
      uri: "https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4",
      thumbUri: "https://i.ibb.co/RNStBKZ/image.png",
      caption: "Brown little puppy #cute #puppy",
      musicName: "Song #3",
      likes: 3100,
      comments: 801,
      avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
    },
  ];

  return postEnabled === -1 ? (
    <SafeAreaView style={styles.container}>
      <ProfileNavbar profileUserName={profileUser.username} myProfile={user.id === profileUser.id} />
      <ProfileHeader profileUser={profileUser} />
      <ProfilePostList posts={posts} setPostEnabled={setPostEnabled} />
    </SafeAreaView>
  ) : (
    <View style={styles.FlatlistContainer}>
      <View style={[styles.navContainer, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => setPostEnabled(-1)}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>
        <Text style={styles.text}>{user.username}</Text>
        <TouchableOpacity>
          <Feather name="menu" color="transparent" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={[
          styles.Flatlist,
          { height: WINDOW_HEIGHT - bottomTabHeight + insets.top },
        ]}
        data={posts}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y /
              (WINDOW_HEIGHT - bottomTabHeight - 30)
          );
          setActiveVideoIndex(index);
        }}
        pagingEnabled
        renderItem={({ item, index }) => {
          return (
            <VideoItem data={item} isActive={activeVideoIndex === index} />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={postEnabled}
        getItemLayout={(data, index) => ({
          length: WINDOW_WIDTH,
          offset: WINDOW_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  FlatlistContainer: {
    position: "relative",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  Flatlist: {},
  navContainer: {
    position: "absolute",
    zIndex: 100,
    width: WINDOW_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    backgroundColor: "white",
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
});
