import {
  Animated,
  BackHandler,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Video } from "expo-av";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { WINDOW_HEIGHT, WINDOW_WIDTH, getMusicNoteAnim } from "../assets/utils";
import Rate from "../components/rate";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "expo-router";
import Comments from "../components/comments";
import Comment from "../components/comments";

export default function VideoItem({ data, isActive }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const { channelName, uri, caption, musicName, likes, comments, avatarUri } =
    data;

  const bottomTabHeight = useBottomTabBarHeight();

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // The structure can be changed after
  const [skills, setSkills] = useState([
    {
      skill: "Dribble",
      rating: 0,
    },
    {
      skill: "Shooting",
      rating: 0,
    },
    {
      skill: "Jugging",
      rating: 0,
    },
  ]);

  const handleRate = (value, skill) => {
    setSkills((prevList) => {
      for (let i = 0; i < skills.length; i++) {
        if (skills[i].skill === skill) {
          skills[i].rating = value;
        }
      }
      return [...prevList];
    });
  };

  const bottomSheetRef = useRef(null);

  const [isComments, setIsComments] = useState(0);

  // callbacks
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

  return (
    <View style={[styles.container, {height: WINDOW_HEIGHT - bottomTabHeight}]}>
      <StatusBar barStyle={"light-content"} />
      <Video
        source={{ uri }}
        style={[styles.video, {height: WINDOW_HEIGHT - bottomTabHeight}]}
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
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>

      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avatarContainer]}>
          <Image style={styles.avatar} source={{ uri: avatarUri }} />
          <View style={styles.followButton}>
            <Image
              source={require("../assets/images/plus-button.png")}
              style={styles.followIcon}
            />
          </View>
        </View>

        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/heart.png")}
          />
          <Text style={styles.verticalBarText}>{likes}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.expand();
          }}
          style={styles.verticalBarItem}
        >
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/message-circle.png")}
          />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.verticalBarItem}>
            <Image
              style={styles.verticalBarIcon}
              source={require("../assets/images/star.png")}
            />
            <Text style={styles.verticalBarText}>Rate</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Rate
        skills={skills}
        handleRate={handleRate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        toggleModal={toggleModal}
      />
      {isComments === 1 && (
        <TouchableWithoutFeedback
          onPress={() => bottomSheetRef.current.collapse()}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
        <Comments comments={comments} bottomSheetRef={bottomSheetRef} handleSheetChanges={handleSheetChanges} />
        
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
  channelName: {
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
