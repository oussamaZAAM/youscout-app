import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import VideosFlatList from "../../components/posts/videosFlatlist";
import { videosData } from "../videosData";

import { useNavigation } from "@react-navigation/native";
import { Entypo } from "react-native-vector-icons";
import { notificationsData } from "../videosData";

const HomeScreen = () => {
  const badgeCount = notificationsData.filter((x) => !x.seen).length;
  const navigation = useNavigation();
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
      <VideosFlatList videosData={videosData} />
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
