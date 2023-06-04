// import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "react-native-vector-icons";
import { COLORS } from "../../assets/utils";
import { useNavigation } from "expo-router";
import { CheckImage } from "../../assets/functions/functions";

const ProfileHeader = ({ profileUser }) => {
  const user = {
    id: 10,
    username: "karenbee",
    email: "karenbee@gmail.com",
    uri: "https://cdn.myanimelist.net/images/characters/9/295367.jpg",
  };

  const navigation = useNavigation();

  // Here we get the state of the user in the User Interactions service
  const [follows, setFollows] = useState({
    followers: 0,
    followings: 0,
  });
  const [isFollowed, setIsFollowed] = useState(false);
  // const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    var followers = 0;
    var followings = 0;
    const response = [
      {
        userId: 1,
        isFollowing: true,
        isblocking: false,
        isFollowed: true,
        isBlocked: false,
      },
      {
        userId: 2,
        isFollowing: false,
        isblocking: false,
        isFollowed: true,
        isBlocked: false,
      },
      {
        userId: 3,
        isFollowing: false,
        isblocking: true,
        isFollowed: false,
        isBlocked: false,
      },
      {
        userId: 4,
        isFollowing: false,
        isblocking: false,
        isFollowed: true,
        isBlocked: false,
      },
      {
        userId: 10, //Karen Araragi
        isFollowing: false,
        isblocking: false,
        isFollowed: true,
        isBlocked: false,
      },
    ];
    response.forEach((thisUser) => {
      if (thisUser.isFollowing) followers++;
      if (thisUser.isFollowed) followings++;
      if (thisUser.userId === user.id) {
        if (thisUser.isFollowing) setIsFollowed(true); else setIsFollowed(false);
        // if (user.isFollowed) setIsFollowing(true); else setIsFollowing(false);
      }
    });
    setFollows({ followers, followings });
  }, []);

  return (
    <View style={styles.container}>
      <CheckImage uri={profileUser.profileImg} size={100} />
      <Text style={styles.emailText}>{profileUser.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{follows.followings}</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{follows.followers}</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      {profileUser.id === user.id ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.grayOutlinedButton}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.otherUsersButtons}>
          {isFollowed ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.unfollowButton}
            >
              <Text>Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.followButton}
            >
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Conversation", {id: profileUser.id, username: profileUser.username, profileImg: profileUser.profileImg})}
            style={styles.grayOutlinedButton}
          >
            <Text>Chat</Text>
            <Entypo name="new-message" size={18} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  emailText: {
    padding: 20,
  },
  counterContainer: {
    paddingBottom: 20,
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  counterLabelText: {
    color: "gray",
    fontSize: 11,
  },
  grayOutlinedButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  followButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 150,
    backgroundColor: COLORS.light
  },
  followText: {
    fontWeight: 'bold',
    fontSize: 14
  },
  unfollowButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 150,
  },
  otherUsersButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
