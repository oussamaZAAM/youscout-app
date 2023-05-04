import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfileFieldScreen from "../../components/profile/editfield";
import EditProfileScreen from "../screens/profile/editprofile";
import ProfileScreen from "../screens/profile/profile";

const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileField"
          component={EditProfileFieldScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
