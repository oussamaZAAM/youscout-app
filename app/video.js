import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Video } from 'expo-av'
import { useRef } from 'react';
import { Dimensions } from 'react-native';

const VideoScreen = () => {
    const data = [
        {
          id: '1',
          source: { uri: 'https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4' },
          title: 'Video 1',
        },
        {
          id: '2',
          source: { uri: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4' },
          title: 'Video 2',
        },
      ];

    const renderItem = ({ item }) => (
        <View style={[
            { flex: 1, height: Dimensions.get("window").height - 80}
          ]}>
            <Video
                source={item.source}
                style={{ width: '100%', flex: 1 }}
                useNativeControls
                resizeMode="cover"
            />
        </View>
    );     

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        decelerationRate={"normal"}
      />
    </View>
  )
}

export default VideoScreen