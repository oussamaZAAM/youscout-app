import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../auth/login';
import RegisterScreen from '../auth/register';
import VideoItem from '../VideoItem';

import { FlatList } from "react-native";
import { createBottomTabNavigator, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from 'react';
import videosData from '../videosData';

const Stack = createNativeStackNavigator();


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