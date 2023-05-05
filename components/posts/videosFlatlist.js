import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { FlatList } from "react-native";
import VideoItem from "./VideoItem";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../assets/utils";

const VideosFlatList = ({ videosData, styles={}, postEnabled = 1 }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const bottomTabHeight = useBottomTabBarHeight();
  return (
    <FlatList
      contentContainerStyle={styles}
      data={videosData}
      pagingEnabled
      renderItem={({ item, index }) => {
        return <VideoItem data={item} isActive={activeVideoIndex === index} />;
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
    />
  );
};

export default VideosFlatList;