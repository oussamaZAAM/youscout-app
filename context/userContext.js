import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authenticationService } from '../constants/env';
import AuthContext from '../components/auth/authContext';

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

    useEffect(() => {
        const fetchUser = async () => {
            console.log('test')
            try {
                const url = authenticationService + "/api/v1/users/me/profile";
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    console.log('good')
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
                console.log('bad')
                if (error.response.status) {
                    // Refresh Token for the future
                    deleteAccessToken(); // For the moment
                }
            }
        };

        fetchUser();
    }, []);

    // Return the UserProvider with the user state and its children
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;