import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";
import { WINDOW_WIDTH } from "../../assets/utils";
import VideosFlatList from "../../components/posts/videosFlatlist";
import ProfilePostList from "../../components/profile/postList";
import videosData from "../videosData";

const DiscoverScreen = () => {
  const [postEnabled, setPostEnabled] = useState(-1);
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      {postEnabled === -1 ? (
        <SafeAreaView style={styles.discoverContainer}>
          <View style={styles.searchBarContainer}>
            <Feather style={styles.searchBarIcon} name="search" size={16} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search for users"
              placeholderTextColor="gray"
              // onChangeText={(text) => rightButton.action(text)}
              // value={rightButton.value}
            />
          </View>
          <ProfilePostList
            posts={videosData}
            setPostEnabled={setPostEnabled}
            numColumns={4}
          />
        </SafeAreaView>
      ) : (
        <View>
          <View style={[styles.navContainer, { paddingTop: insets.top + 15 }]}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => setPostEnabled(-1)}
            >
              <Feather name="arrow-left" size={20} />
            </TouchableOpacity>
          </View>
          <VideosFlatList videosData={videosData} postEnabled={postEnabled} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  discoverContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
    flexDirection: "column",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingVertical: 5,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    width: 0,
  },
  searchBarContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 100,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarIcon: {
    marginHorizontal: 10,
  },

  // For videoFlatlist player navbar
  navContainer: {
    position: "absolute",
    zIndex: 100,
    width: WINDOW_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    opacity: 0.5,
  },
  returnButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});
