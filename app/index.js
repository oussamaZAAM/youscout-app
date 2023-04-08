import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './login';
import RegisterScreen from './register';
import FeedScreen from './feed';
import { Constants } from 'expo-constants';
import firebase from 'firebase/app'
import VideoScreen from './video';

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(Constants.manifest.web.config.firebase)
// }

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Feed"
          component={FeedScreen}
        /> */}
        <Stack.Screen
          name="Video"
          component={VideoScreen}
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

export default App;