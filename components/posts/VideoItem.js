import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Video } from "expo-av";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../assets/utils";
import Comments from "./comments";
import Rate from "./rate";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { postService } from "../../constants/env";
import { handleRefreshToken } from "../../assets/functions/refreshToken";
import { FeedContext } from "../../context/feedContext";

export default function VideoItem({ data, isActive, accessToken, saveAccessToken }) {
  // ----------------- Basic Parameters -----------------
  const navigation = useNavigation();
  const bottomTabHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const { _id, username, videoUrl, caption, likes, skills, commentsNum, userProfilePic } = data;
  // ---------------------------------------------------


  // ----------------- Fetching user /feed regeneration function ------------------
  const { user } = useContext(UserContext);
  //---------------------------------------------------

  const { fetchPosts } = useContext(FeedContext);

  // ----------------- Like + Animations -----------------
  const likeAnimation = useRef(new Animated.Value(0)).current;
  const handleLikeAnimation = () => {
    Animated.timing(likeAnimation, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const [like, setLike] = useState(likes.includes(user.username));
  const handleLike = async () => {
    try {
      const response = await axios.post(postService + "/posts/" + _id + "/like", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        fetchPosts();
      }
      if (like) {
        setLike(false);
        Animated.timing(likeAnimation, {
          toValue: 0, // Set the value of "likeAnimation" to 0 immediately
          duration: 0, // Immediately
          useNativeDriver: true,
        }).start();
      } else {
        setLike(true);
        handleLikeAnimation();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
    }
  }
  // ---------------------------------------------------

  // ----------------- Handle Video Play / Pause -----------------
  const [isPlaying, setIsPlaying] = useState(true);
  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };
  // ---------------------------------------------------

  // ----------------- Skills Rating -----------------
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const transformedArray = Object.entries(skills ?? {}).map(([skill, data]) => ({
    skill,
    rating: data[user.username] || 0
  }));
  
  const [skillsArray, setSkillsArray] = useState([]);
  useEffect(() => {
    skills && setSkillsArray(transformedArray);
  }, [skills]);

  const handleRate = async (value, skill) => {
    try {
      const url = postService + "/posts/" + _id + "/rate";
      const body = {
        skill: skill,
        rating: value
      };
      await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      setSkillsArray(prevList => {
        return prevList.map(item => {
          if (item.skill === skill) {
            return {
              ...item,
              rating: value
            };
          }
          return item;
        });
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
    }
  };
  // ---------------------------------------------------

  // ----------------- Comments Sheet Handling -----------------
  const bottomSheetRef = useRef(null);
  const [isComments, setIsComments] = useState(0);
  const handleSheetChanges = useCallback((index) => {
    // Fetch Comments if enabled
    setIsComments(index);
  }, []);
  useEffect(() => {
    const backAction = () => {
      bottomSheetRef.current.collapse();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  // ---------------------------------------------------

  // -------------- Delete a Post ----------------------
  const handleDeletePost = async () => {
    try {
      const url = postService + "/posts/" + _id;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      fetchPosts();
    } catch (error) {
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
    }
  }
  // ---------------------------------------------------

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            width: WINDOW_WIDTH,
            height:
              WINDOW_HEIGHT - bottomTabHeight + insets.top + insets.bottom,
          },
        ]}
      >
        <StatusBar barStyle={"light-content"} />
        <Video
          source={{ uri: videoUrl }}
          style={[
            styles.video,
            { width: WINDOW_WIDTH, height: WINDOW_HEIGHT - bottomTabHeight },
          ]}
          resizeMode="cover"
          // shouldPlay={isPlaying && isActive}
          shouldPlay={false}
          isLooping
          isMuted={false}
        />
        <TouchableOpacity
          style={[
            styles.controls,
            {
              backgroundColor: isPlaying
                ? "rgba(0, 0, 0, 0)"
                : "rgba(0, 0, 0, 0.25)",
              width: WINDOW_WIDTH,
              height: WINDOW_HEIGHT,
            },
          ]}
          onPress={handlePlayPause}
        >
          {isPlaying ? (
            <MaterialIcons
              name="play-arrow"
              size={56}
              color="white"
              style={{ opacity: 0 }}
            />
          ) : (
            <MaterialIcons name="pause" size={56} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.bottomSection}>
          <View style={styles.bottomLeftSection}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>
        <View style={styles.verticalBar}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", { postUsername: username })
            }
            style={[styles.verticalBarItem, styles.avatarContainer]}
          >
            <Image style={styles.avatar} source={{ uri: userProfilePic }} />
            <View style={styles.followButton}>
              <Image
                source={require("../../assets/images/plus-button.png")}
                style={styles.followIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLike}
            style={styles.verticalBarItem}
          >
            <Animated.View
              style={[
                styles.verticalBarIcon,
                {
                  transform: [
                    {
                      translateX: likeAnimation.interpolate({
                        inputRange: [0, 1, 1.95, 2],
                        outputRange: [0, -150, -150, 0],
                      }),
                    },
                    {
                      translateY: likeAnimation.interpolate({
                        inputRange: [0, 1, 1.95, 2],
                        outputRange: [0, -100, -100, 0],
                      }),
                    },
                    {
                      scale: likeAnimation.interpolate({
                        inputRange: [0, 1, 1.5, 1.95, 2],
                        outputRange: [1, 4, 8, 4, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {like ? (
                <Octicons style={styles.verticalBarIcon} name="heart-fill" size={32} color={'white'} />
              ) : (
                <Octicons style={styles.verticalBarIcon} name="heart" size={32} color={'white'} />
              )}
            </Animated.View>
            <Text style={styles.verticalBarText}>{likes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef?.current?.expand();
            }}
            style={styles.verticalBarItem}
          >
            <Image
              style={styles.verticalBarIcon}
              source={require("../../assets/images/message-circle.png")}
            />
            <Text style={styles.verticalBarText}>{commentsNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.verticalBarItem}>
              <Image
                style={styles.verticalBarIcon}
                source={require("../../assets/images/star.png")}
              />
              <Text style={styles.verticalBarText}>Rate</Text>
            </View>
          </TouchableOpacity>
          {user.username === username &&
            <TouchableOpacity onPress={handleDeletePost}>
              <View style={styles.verticalBarItem}>
                <Image
                  style={styles.verticalBarIcon}
                  source={require("../../assets/images/delete.png")}
                />
                <Text style={styles.verticalBarText}>Delete</Text>
              </View>
            </TouchableOpacity>}
        </View>
        <Rate
          skills={skillsArray}
          handleRate={handleRate}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          toggleModal={toggleModal}
        />
        {isComments === 1 && (
          <TouchableWithoutFeedback
            onPress={() => bottomSheetRef.current.collapse()}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
      </View>
      <Comments
        postId={data._id}
        commentsNumber={commentsNum}
        bottomSheetRef={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  commentSlider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSection: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 3,
    marginBottom: 20,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginRight: 50,
  },
  caption: {
    color: "white",
    marginVertical: 8,
    marginRight: 50,
  },
  musicNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: "white",
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: "center",
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: "white",
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: "absolute",
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: "absolute",
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: "white",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: WINDOW_HEIGHT / 3,
  },
});
