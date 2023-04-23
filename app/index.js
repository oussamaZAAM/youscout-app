import { createBottomTabNavigator, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import { WINDOW_HEIGHT } from "../assets/utils";
import VideoItem from "./VideoItem";
import { MainScreenStack } from './navigation/MainScreenStack';
import { NewVideoStack } from './navigation/NewVideoStack';
import { ProfileStack } from './navigation/ProfileStack';
import videosData from './videosData';
import * as ScreenOrientation from 'expo-screen-orientation';

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  
  const bottomTabHeight = useBottomTabBarHeight();
  return  (
    <FlatList
      data={videosData}
      pagingEnabled
      renderItem={({item, index}) => {
        return (
          <VideoItem data={item} isActive={activeVideoIndex === index} />
        )
      }}
      onScroll={e => {
        const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight))
        setActiveVideoIndex(index)
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
)};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "black" },
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarHideOnKeyboard: true
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={MainScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/home.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        
        <BottomTab.Screen
          name="Discover"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/search.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="NewVideo"
          component={NewVideoStack}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/new-video.png")}
                style={[
                  styles.newVideoButton,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/message.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/user.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  BottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  BottomTabIconFocused: {
    tintColor: "white",
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
});
