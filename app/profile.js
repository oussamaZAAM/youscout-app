import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileNavbar from "../components/profile/navbar";
import ProfileHeader from "../components/profile/header";
import ProfilePostList from "../components/profile/postList";
import VideoItem from "./VideoItem";
import { Feather } from "react-native-vector-icons";

const ProfileScreen = () => {
    const [postEnabled, setPostEnabled] = useState(-1);
  // Fetch the authenticated user
  const user = {
    username: "karenbee",
    email: "karenbee@gmail.com",
    uri: "https://cdn.myanimelist.net/images/characters/9/295367.jpg"
  };

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
  return (postEnabled === -1) ? (
    <SafeAreaView style={styles.container}>
      <ProfileNavbar user={user} />
      <ProfileHeader user={user} />
      <ProfilePostList posts={posts} setPostEnabled={setPostEnabled} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.FlatlistContainer}>
        <View style={styles.navbarContainer}>
            <TouchableOpacity onPress={()=>setPostEnabled(-1)}>
                <Feather name="arrow-left-circle" size={20} />
            </TouchableOpacity>
            <Text style={styles.text}>{user.username}</Text>
            <TouchableOpacity>
            </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.Flatlist}
          data={posts}
          initialScrollIndex={postEnabled}
          pagingEnabled
          renderItem={({ item }) => {
            return <VideoItem data={item} />;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
    </SafeAreaView>
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
  },
  Flatlist: {
    marginTop: -80,
  },
  navbarContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
});
