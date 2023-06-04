import React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import App from "./app";
import AuthProvider from "../components/auth/authProvider";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const Main = () => {

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Main;

