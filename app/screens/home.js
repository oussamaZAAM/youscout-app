import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import VideosFlatList from "../../components/posts/videosFlatlist";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Entypo } from "react-native-vector-icons";
import { handleRefreshToken } from "../../assets/functions/refreshToken";
import AuthContext from "../../components/auth/authContext";
import { UserContext } from "../../components/auth/userContext";
import { feedService } from "../../constants/env";
import { notificationsData } from "../videosData";

const HomeScreen = () => {
  const badgeCount = notificationsData.filter((x) => !x.seen).length;
  const navigation = useNavigation();

  const [postsData, setPostsData] = useState([{
    _id: 0,
    username: "",
    videoUrl: "test",
    caption: "",
    likes: [],
    commentsNum: 0,
    userProfilePic: "test",
    createdAt: ""
  }]);

  const { accessToken, saveAccessToken } = useContext(AuthContext);
  const { user, fetchUser } = useContext(UserContext);
  // Fetch user and feed on first render
  useEffect(() => {
    fetchUser()
      .then(async (userInfos) => {
        try {
          const url = feedService + "/feed/" + userInfos.username;
          const response = await axios(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          setPostsData(response.data.content);
        } catch (error) {
          console.log(error.response.data.message)
          // If error response status 404 : Feed not found
          if (error.response.status === 401) {
            handleRefreshToken(accessToken, saveAccessToken);
          }
        }
      })

  }, []);

  // Fetch user and feed on navigation changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Trigger the fetchUser function when this screen comes into focus
      fetchUser()
        .then(async () => {
          try {
            const url = feedService + "/feed/" + user.username;
            console.log(url)
            const response = await axios(url, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            setPostsData(response.data.content);
          } catch (error) {
            console.log(error.message)
            console.log(error.status)
            if (error.response.status === 401) {
              handleRefreshToken(accessToken, saveAccessToken);
            }
          }
        })
        .catch((error) => console.log("Error"))
    });

    return () => {
      unsubscribe(); // Cleanup function
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notifications");
        }}
        style={styles.bellContainer}
      >
        <Entypo name="bell" size={36} color="white" />
        {badgeCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>{badgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <VideosFlatList videosData={postsData} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bellContainer: {
    position: "absolute",
    top: 40,
    right: 12,
    zIndex: 100,
  },
  badgeContainer: {
    position: "absolute",
    right: 0,
    top: -3,
    backgroundColor: "red",
    borderRadius: 8,
    height: 16,
    minWidth: 16,
    paddingVertical: 1,
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  badge: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
