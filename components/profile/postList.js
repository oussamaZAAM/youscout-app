import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import * as VideoThumbnails from "expo-video-thumbnails";

const ProfilePostListItem = ({ item, index, setPostEnabled }) => {
  const [thumbUri, setThumbUri] = useState("");
  const generateThumbnail = async (videoUrl) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, {
        time: 1000,
      });
      setThumbUri(uri);
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    generateThumbnail(item.videoUrl);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => setPostEnabled(index)}
      style={styles.itemContainer}
    >
      {thumbUri !== "" && <Image style={styles.image} source={{ uri: thumbUri }} />}
    </TouchableOpacity>
  );
};

const ProfilePostList = ({ posts, setPostEnabled, numColumns }) => {
  
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={numColumns}
        removeClippedSubviews
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ProfilePostListItem
            item={item}
            index={index}
            setPostEnabled={setPostEnabled}
          />
        )}
      />
    </View>
  );
};

export default ProfilePostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1 / 3,
    height: 200,
    backgroundColor: "gray",
  },
  image: {
    flex: 1,
  },
});
