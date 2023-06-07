// import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "react-native-vector-icons";
import { CheckImage } from "../../assets/functions/functions";
import { handleRefreshToken } from "../../assets/functions/refreshToken";
import { COLORS } from "../../assets/utils";
import { socialGraphService } from "../../constants/env";
import AuthContext from "../../context/authContext";
import { UserContext } from "../../context/userContext";

const ProfileHeader = ({ profileUser }) => {
  const navigation = useNavigation();

  // Get the user informations and the access token
  const { accessToken, saveAccessToken, deleteAccessToken } = useContext(AuthContext);
  const { user, fetchUser } = useContext(UserContext);
  useEffect(() => {
    fetchUser();
  }, []);


  // Here we get the state of the user in the User Interactions service
  const [follows, setFollows] = useState({
    followers: 0,
    followings: 0,
  });
  const [isFollowed, setIsFollowed] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const followersResponse = await axios(socialGraphService + "/users/" + profileUser.username + "/followers/count", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const followers = followersResponse.data;

        const followingResponse = await axios(socialGraphService + "/users/" + profileUser.username + "/following/count", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const followings = followingResponse.data;

        const fetchIsFollowed = async () => {
          const isFollowedResponse = await axios(socialGraphService + "/users/" + user.username + "/isFollowing/" + profileUser.username, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const isFollowed = isFollowedResponse.data
          setIsFollowed(isFollowed);
        }

        profileUser.username !== user.username && fetchIsFollowed();
        setFollows({ followers, followings });
      } catch (error) {
        if (error.response.status === 401) {
          handleRefreshToken(accessToken, saveAccessToken);
        }
      }
    }
    fetchInteractions();
  }, [trigger, profileUser.username]);

  // Handle following and unfollowing actions
  const handleFollow = async () => {
    try {
      const url = socialGraphService + "/users/" + user.username + "/follow/" + profileUser.username;
      await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setTrigger(prev => !prev);
    } catch (error) {
      console.log(error.message)
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
      if (error.response.status === 403) {
        alert("You are already following this user");
      }
    }
  }

  const handleUnfollow = async () => {
    try {
      const url = socialGraphService + "/users/" + user.username + "/unfollow/" + profileUser.username;
      await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setTrigger(prev => !prev);
    } catch (error) {
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
      if (error.response.status === 403) {
        alert("Cannot unfollow a user already unfollowed!");
      }
    }
  }

  return (
    <View style={styles.container}>
      <CheckImage uri={profileUser.profilePicture} size={100} />
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
      {profileUser.username === user.username ? (
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
              onPress={handleUnfollow}
              style={styles.unfollowButton}
            >
              <Text>Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleFollow}
              style={styles.followButton}
            >
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Conversation", { username: profileUser.username, profilePicture: profileUser.profilePicture })}
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
