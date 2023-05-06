import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import PushNotification from "react-native-push-notification";
import { COLORS } from "../assets/utils";
import NewVideoButton from "../components/general/NewVideoButton";
import { ChatScreenStack } from "./navigation/ChatScreenStack";
import { MainScreenStack } from "./navigation/MainScreenStack";
import { NewVideoStack } from "./navigation/NewVideoStack";
import { ProfileStack } from "./navigation/ProfileStack";
import DiscoverScreen from "./screens/discover";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const BottomTab = createBottomTabNavigator();

const App = () => {
  // useEffect(() => {
  //   // Set up the push notification service
  //   PushNotification.configure({
  //     onNotification: function (notification) {
  //       console.log("NOTIFICATION:", notification);
  //     },
  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });

  //   // Schedule a mock notification after 5 seconds
  //   const notificationDelay = setTimeout(() => {
  //     PushNotification.localNotification({
  //       title: "Test Notification",
  //       message: "This is a test notification.",
  //     });
  //   }, 5000);

  //   return () => clearTimeout(notificationDelay);
  // }, []);
  return (
    <NavigationContainer independent={true}>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "black" },
          headerShown: false,
          tabBarActiveTintColor: COLORS.light,
          tabBarHideOnKeyboard: true,
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
          component={DiscoverScreen}
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
            tabBarIcon: ({ focused }) => <NewVideoButton />,
          }}
        />

        <BottomTab.Screen
          name="Inbox"
          component={ChatScreenStack}
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
});
