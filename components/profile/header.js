import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ProfileHeader = ({ user }) => {
  const navigation = useNavigation();

  const CheckImage = ({ uri }) => {
    const [valid, setValid] = useState(false);
    Image.getSize(
      uri,
      (width, height) => {
        setValid(true);
      },
      (error) => {
        setValid(false);
      }
    );
    return valid ? (
      <Image
        style={{ height: 100, width: 100, borderRadius: 50 }}
        source={{ uri }}
      />
    ) : (
        <Avatar.Icon size={100} icon={"account"} />
    );
  };

  return (
    <View style={styles.container}>
      <CheckImage uri={user.uri} />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile")}
        style={styles.grayOutlinedButton}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  emailText: {
    padding: 20,
  },
  counterContainer: {
    paddingBottom: 20,
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  counterLabelText: {
    color: "gray",
    fontSize: 11,
  },
  grayOutlinedButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
});
