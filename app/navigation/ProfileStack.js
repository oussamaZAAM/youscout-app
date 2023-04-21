import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../profile';
import EditProfileScreen from '../editprofile';
import EditProfileFieldScreen from '../../components/profile/editfield';

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
    )
  }