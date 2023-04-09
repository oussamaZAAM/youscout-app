import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Video } from "expo-av";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { WINDOW_HEIGHT, WINDOW_WIDTH, getMusicNoteAnim } from "../assets/utils";

  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState);
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

  const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, false)
  const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, true)

  useEffect(() => {
    Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
    Animated.loop(
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
    ).start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

  const bottomTabHeight = useBottomTabBarHeight();
  return (
      <TouchableOpacity style={[styles.controls, {backgroundColor: isPlaying ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.5)', width: WINDOW_WIDTH, height: WINDOW_HEIGHT - bottomTabHeight}]} onPress={handlePlayPause}>
        {isPlaying
        ? <MaterialIcons name="play-arrow" size={56} color="white" style={{opacity: 0}} />
        : <MaterialIcons name="pause" size={56} color="white" />}
      </TouchableOpacity>

      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.caption}>{caption}</Text>
          <View style={styles.musicNameContainer}>
            <Image
              source={require("../assets/images/music-note.png")}
              style={styles.musicNameIcon}
            />
            <Text style={styles.musicName}>{musicName}</Text>
          </View>
        </View>

        <View style={styles.bottomRightSection}>
          <Animated.Image
            source={require("../assets/images/floating-music-note.png")}
            style={[styles.floatingMusicNote, musicNoteAnimation1]}
          />
          <Animated.Image
            source={require("../assets/images/floating-music-note.png")}
            style={[styles.floatingMusicNote, musicNoteAnimation2]}
          />
          <Animated.Image
            source={require("../assets/images/disc.png")}
            style={[styles.musicDisc, discAnimation]}
          />
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

        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/reply.png")}
          />
          <Text style={styles.verticalBarText}>Share</Text>
        </View>
      </View>
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
  bottomSection: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  channelName: {
    color: "white",
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    marginVertical: 8,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
