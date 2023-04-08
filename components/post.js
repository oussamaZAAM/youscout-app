import { View, Text } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Video } from 'expo-av'

const PostSingle = forwardRef((props, parentRef) => {
    const ref = useRef(null)
    useImperativeHandle(parentRef, () => ({
      play,
      stop,
      unload
    }))

    const play = async () => {
      if (ref.current === null) {
        return;
      }

      const status = await ref.current.getStatusAsync();
      if (status?.isPlaying){
        return;
      }

      try{
        await ref.current.playAsync();
      } catch (err) {
        console.error(err)
      }
    }

    const stop = async () => {
      if (ref.current === null) {
        return;
      }

      const status = await ref.current.getStatusAsync();
      if (!status?.isPlaying){
        return;
      }

      try{
        await ref.current.stopAsync();
      } catch (err) {
        console.error(err)
      }
    }

    const unload = async () => {
      if (ref.current === null) {
        return;
      }

      try{
        await ref.current.unloadAsync();
      } catch (err) {
        console.error(err)
      }
    }

  return (
    <View>
      <Video 
        ref={ref}
        style={styles.container}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay={true}
        source={{url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4'}}
      />
    </View>
  )
})

export default PostSingle;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})