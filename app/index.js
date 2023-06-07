import React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import AuthProvider from "../context/authProvider";
import UserProvider from "../context/userContext";
import App from "./app";
import FeedProvider from "../context/feedContext";

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
        <FeedProvider>
          <App />
        </FeedProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Main;