import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "react-native-vector-icons";
import AuthContext from "../auth/authContext";
import { authenticationService } from "../../constants/env";
import axios from "axios";

const ProfileNavbar = ({ profileUserName, myProfile }) => {
  const { accessToken, saveAccessToken, deleteAccessToken } = useContext(AuthContext);

  const navigation = useNavigation();
  const handleLogout = async() => {
    try {
      const response = await axios.post(
        authenticationService + '/api/v1/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Logout successful');
  
      deleteAccessToken();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  return (
    <View style={styles.navContainer}>
      {myProfile ? (
        <TouchableOpacity>
          <Feather name="search" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{profileUserName}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Feather name="menu" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNavbar;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
});
