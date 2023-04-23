import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewpostScreen from "../newpost/newvideo";
import SaveVideoScreen from "../newpost/savevideo";
import SkillsScreen from "../newpost/skills";

const Stack = createNativeStackNavigator();

export const NewVideoStack = () => {
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
