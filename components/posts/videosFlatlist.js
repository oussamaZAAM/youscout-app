import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useContext, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../assets/utils";
import AuthContext from "../../context/authContext";
import { FeedContext } from "../../context/feedContext";
import VideoItem from "./VideoItem";

const VideosFlatList = ({ videosData, postEnabled = 0 }) => {
  // ----------------- Fetch Tokens ---------------------
  const { accessToken, saveAccessToken } = useContext(AuthContext);
  //-----------------------------------------------------

  // ----------------- Fetch Feed ---------------------
  const { fetchPosts } = useContext(FeedContext);
  //-----------------------------------------------------

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const bottomTabHeight = useBottomTabBarHeight();

  // Set refreshing logic
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    fetchPosts();

    // Update the data state and stop refreshing
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);

    // Fetch data again
    fetchData();
  };

  return (
    <FlatList
      data={videosData}
      pagingEnabled
      renderItem={({ item, index }) => {
        return <VideoItem data={item} isActive={activeVideoIndex === index} accessToken={accessToken} saveAccessToken={saveAccessToken} />;
      }}
      onScroll={(e) => {
        const index = Math.round(
          e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight)
        );
        setActiveVideoIndex(index);
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={postEnabled}
      getItemLayout={(data, index) => ({
        length: WINDOW_WIDTH,
        offset: WINDOW_WIDTH * index,
        index,
      })}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default VideosFlatList;
