import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { authenticationService, feedService } from '../constants/env';
import AuthContext from './authContext';
import { handleRefreshToken } from '../assets/functions/refreshToken';
import { UserContext } from './userContext';

// Create the UserContext
export const FeedContext = createContext();

// Create the UserProvider component
const FeedProvider = ({ children }) => {
  const { accessToken, saveAccessToken, deleteAccessToken } = useContext(AuthContext);
  const { user, fetchUser } = useContext(UserContext);

  const [postsData, setPostsData] = useState([{
    _id: 0,
    username: "",
    videoUrl: "test",
    caption: "",
    likes: [],
    commentsNum: 0,
    userProfilePic: "test",
    createdAt: ""
  }]);

  const fetchPosts = () => {
      fetchUser()
          .then(async (userInfos) => {
            try {
              const url = feedService + "/feed/" + userInfos.username;
              const response = await axios(url, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
              setPostsData(response.data.content);
            } catch (error) {
              console.log(error.response.data.message)
              // If error response status 404 : Feed not found
              if (error.response.status === 401) {
                handleRefreshToken(accessToken, saveAccessToken);
              }
            }
          })
  }


  return (
    <FeedContext.Provider value={postsData}>
      <FeedContext.Provider value={{ postsData, fetchPosts }}>
        {children}
      </FeedContext.Provider>
    </FeedContext.Provider>
  );
};

export default FeedProvider;