import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import VideosFlatList from "../../components/posts/videosFlatlist";

import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "react-native-vector-icons";
import { FeedContext } from "../../context/feedContext";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => {
    setTrigger(prev => !prev)
  }

  // Fetch feed on first render
  const { postsData, fetchPosts } = useContext(FeedContext);
  useEffect(() => {
    fetchPosts();
  }, [trigger]);

  // Fetch feed on navigation changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Trigger the fetchUser function when this screen comes into focus
      fetchPosts();
    });

    return () => {
      unsubscribe(); // Cleanup function
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!(postsData.length <= 0 || (postsData.length === 1 && postsData[0]._id === 0))
        ? <VideosFlatList videosData={postsData} />
        :
          <TouchableOpacity onPress={handleTrigger} style={styles.noFeedContainer}>
            <FontAwesome name="refresh" size={80} color="gray" />
            <Text style={styles.noFeedText}>No Feed Available, try following more people</Text>
          </TouchableOpacity>
      }
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
  noFeedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFeedText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'gray',
    width: '75%'
  },
});
