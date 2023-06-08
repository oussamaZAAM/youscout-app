import React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import AuthProvider from "../context/authProvider";
import FeedProvider from "../context/feedContext";
import UserProvider from "../context/userContext";
import App from "./app";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const Main = () => {

  return (
    <AuthProvider>
      <UserProvider>
        <FeedProvider>
          <App />
        </FeedProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Main;