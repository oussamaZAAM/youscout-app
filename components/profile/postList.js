import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

const ProfilePostListItem = ({ item, index, setPostEnabled }) => {
  return (
    <TouchableOpacity
      onPress={() => setPostEnabled(index)}
      style={styles.itemContainer}
    >
      <Image style={styles.image} source={{ uri: item.thumbUri }} />
    </TouchableOpacity>
  );
};

const ProfilePostList = ({ posts, setPostEnabled }) => {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
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
