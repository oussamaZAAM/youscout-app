import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
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
        <SafeAreaView style={styles.container}>
          <Text>DiscoverScreen</Text>
          <ProfilePostList
            posts={videosData}
            setPostEnabled={setPostEnabled}
            numColumns={4}
          />
        </SafeAreaView>
      ) : (
        <View>
          <View style={[styles.navContainer, { paddingTop: insets.top + 15 }]}>
            <TouchableOpacity onPress={() => setPostEnabled(-1)}>
              <Feather name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.text}>user.username</Text>
            <TouchableOpacity>
              <Feather name="menu" color="transparent" size={24} />
            </TouchableOpacity>
          </View>
          <VideosFlatList
            videosData={videosData}
            postEnabled={postEnabled}
          />
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
  navContainer: {
    position: "absolute",
    zIndex: 100,
    width: WINDOW_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    backgroundColor: "white",
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
});
