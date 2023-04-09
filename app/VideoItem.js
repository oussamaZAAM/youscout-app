import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Video } from "expo-av";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { WINDOW_HEIGHT, WINDOW_WIDTH, getMusicNoteAnim } from "../assets/utils";
import Rate from "../components/rate";
import BottomSheet from '@gorhom/bottom-sheet';

export default function VideoItem({ data, isActive }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const { channelName, uri, caption, musicName, likes, comments, avatarUri } =
    data;

  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, false);
  const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, true);

  const discAnimLoopRef = useRef();
  const musicAnimLoopRef = useRef();

  // console.log(fadeAnim)

  const triggerAnimation = useCallback(() => {
    discAnimLoopRef.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    discAnimLoopRef.current.start();
    musicAnimLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    );
    musicAnimLoopRef.current.start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

  useEffect(() => {
    if (isActive) {
      triggerAnimation();
    } else {
      discAnimLoopRef.current?.stop();
      musicAnimLoopRef.current?.stop();
      discAnimatedValue.setValue(0);
      musicNoteAnimatedValue1.setValue(0);
      musicNoteAnimatedValue2.setValue(0);
    }
    // Animated.timing(
    //   fadeAnim,
    //   {
    //     toValue: 0,
    //     duration: 1000, // 1 second
    //     useNativeDriver: true,
    //   }
    // ).start();
  }, [
    isActive,
    triggerAnimation,
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
  ]);

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

  // variables
  const snapPoints = useMemo(() => ['6%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // Fetch Comments if enabled
  }, []);

  return (
    <View
      style={[styles.container, { height: WINDOW_HEIGHT - bottomTabHeight }]}
    >
      <StatusBar barStyle={"light-content"} />
      <Video
        source={{ uri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={isPlaying && isActive}
        isLooping
      />
      <TouchableOpacity
        style={[
          styles.controls,
          {
            backgroundColor: isPlaying
              ? "rgba(0, 0, 0, 0)"
              : "rgba(0, 0, 0, 0.5)",
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT - bottomTabHeight,
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

        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/message-circle.png")}
          />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </View>

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
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>{comments} Comments</Text>
        </View>
      </BottomSheet>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
    marginBottom: 20
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  channelName: {
    color: "white",
    fontWeight: "bold",
    marginRight: 50
  },
  caption: {
    color: "white",
    marginVertical: 8,
    marginRight: 50
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
    alignItems: 'center',
  },
});
