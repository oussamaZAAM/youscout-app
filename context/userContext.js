import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { authenticationService } from '../constants/env';
import AuthContext from '../components/auth/authContext';
import { handleRefreshToken } from '../assets/functions/refreshToken';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
const UserProvider = ({ children }) => {
  const { accessToken, saveAccessToken, deleteAccessToken } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePicture: "",
    fullName: "",
    dateOfBirth: null,
    gender: null,
    country: null,
    cityOrRegion: null,
    bio: null,
    socialMediaLinks: {}
  });

  const fetchUser = async () => {
    try {
      const url = authenticationService + "/users/me/profile";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Profile: "+data)
        setUser({
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture,
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          country: data.country,
          cityOrRegion: data.cityOrRegion,
          bio: data.bio,
          socialMediaLinks: data.socialMediaLinks
        });
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
    }
  };

  return (
    <UserContext.Provider value={user}>
      <UserContext.Provider value={{ user, fetchUser }}>
        {children}
      </UserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;