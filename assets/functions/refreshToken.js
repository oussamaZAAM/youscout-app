import axios from "axios";
import { getLocalData } from "./asyncStore";
import { authenticationService } from "../../constants/env";

export const handleRefreshToken = async(accessToken, saveAccessToken, deleteAccessToken) => {
    console.log("Refreshing token ...")
    // --- refresh token ---
    try {
        const store = await getLocalData("@tokens");
        const refreshToken = store.refresh_token;
        const response = await axios.post(authenticationService + "/api/v1/auth/login", {
            grantType: 'REFRESH_TOKEN',
            withRefreshToken: true,
            refreshToken: refreshToken,
        });
        saveAccessToken(response.data);
        console.log("Refreshing Done");
    } catch (error) {
        if (error.response.status === 401) {
            console.log("Refreshing unauthorized")
            await axios.post(
                authenticationService + '/api/v1/auth/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            ).then(() => deleteAccessToken()).catch((error) => { });
        }
    }
    // -----------------------------
}