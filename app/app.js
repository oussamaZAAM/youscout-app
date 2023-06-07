import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { COLORS } from "../assets/utils";
import AuthContext from "../context/authContext";
import NewVideoButton from "../components/general/NewVideoButton";
import { AuthenticationStack } from "./navigation/AuthenticationStack";
import { ChatScreenStack } from "./navigation/ChatScreenStack";
import { MainScreenStack } from "./navigation/MainScreenStack";
import { NewVideoStack } from "./navigation/NewVideoStack";
import { ProfileStack } from "./navigation/ProfileStack";
import DiscoverScreen from "./screens/discover";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const BottomTab = createBottomTabNavigator();

const App = () => {
    const { accessToken, saveAccessToken } = useContext(AuthContext);

    return (accessToken && accessToken.length !== 0
        ? (
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
        )
        : (
            <AuthenticationStack />
        )
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
