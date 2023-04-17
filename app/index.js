import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './auth/login';
import RegisterScreen from './auth/register';
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";

import VideoItem from "./VideoItem";
import videosData from './videosData'
import { WINDOW_HEIGHT } from "../assets/utils";
import NewpostScreen from './newpost/newvideo';
import SaveVideoScreen from './newpost/savevideo';
import SkillsScreen from './newpost/skills';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NewVideo = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="NewVideo"
          component={NewpostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SaveVideo"
          component={SaveVideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Skills"
          component={SkillsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
          name="MainScreen"
          component={MainScreen}
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
          component={NewVideo}
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
          component={HomeScreen}
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
