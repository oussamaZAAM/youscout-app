import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import * as ScreenOrientation from "expo-screen-orientation";
import AuthProvider from "../components/auth/authProvider";
import UserProvider from "../components/auth/userContext";
import App from "./app";

// const linking = {
//   prefixes: ['http://youscout.com', 'youscout://'],
//   config: {
//     screens: {
//       Home: 'home',
//       Login: 'login',
//     },
//   },
// };

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const Main = () => {

  // const navigation = useNavigation();

  // const [data, setData] = useState(null);

  // function handleDeepLink(event) {
  //   let data = Linking.parse(event.url);
  //   setData('data');
  // }

  // useEffect(() => {
  //   Linking.addEventListener('url', handleDeepLink);
  //   return () => (
  //     Linking.removeEventListener('url')
  //   )
  // }, [])
  
  // console.log(data)

  return (
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
  );
};

export default Main;