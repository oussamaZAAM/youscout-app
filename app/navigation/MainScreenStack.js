import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VideoItem from "../screens/VideoItem";
import LoginScreen from "../screens/auth/login";
import RegisterScreen from "../screens/auth/register";

import {
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { FlatList } from "react-native";
import { WINDOW_HEIGHT } from "../../assets/utils";
import videosData from "../videosData";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const bottomTabHeight = useBottomTabBarHeight();
  return (
    <FlatList
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
    />
  );
};

export const MainScreenStack = () => {
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
