import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import AuthContext from "./authContext";
import { getLocalData } from "../../assets/functions/asyncStore";

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const retrieveAccessToken = async () => {
            try {
                var value;
                getLocalData("@tokens").then((response => {
                    value = response;
                }))

                if (value && (value.access_token !== accessToken)) {
                    setAccessToken(value.access_token);
                }
            } catch (e) {
                console.error(e)
            }
        };

        retrieveAccessToken();
    }, [accessToken]); // Add accessToken as a dependency

    const saveAccessToken = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("@tokens", jsonValue)
            setAccessToken(value ? value.access_token : '')
        } catch (e) {
            console.error(e)
        }
    };

    const deleteAccessToken = async () => {
        try {
            await AsyncStorage.removeItem("@tokens")
            setAccessToken()
        } catch (e) {
            console.error(e)
        }
    };

    const contextValue = {
        accessToken,
        saveAccessToken,
        deleteAccessToken
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;