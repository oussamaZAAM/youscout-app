import React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import App from "./app";
import AuthProvider from "../components/auth/authProvider";
import UserProvider from "../components/auth/userContext";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const Main = () => {

  return (
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  );
};

export default Main;