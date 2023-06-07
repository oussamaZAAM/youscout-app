import { Octicons } from "@expo/vector-icons";
import { AntDesign, Feather } from "@expo/vector-icons";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Appearance,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "react-native-vector-icons";

import { COLORS, timeout } from "../../../assets/utils";
import AuthContext from "../../../context/authContext";
import axios from "axios";
import { postService } from "../../../constants/env";
import { handleRefreshToken } from "../../../assets/functions/refreshToken";
import FlashMessage, { showMessage } from "react-native-flash-message";

const renderItem = ({ item }) => {
  if (item.clicked === true) {
    return (
      <View style={styles.skillBorder}>
        <Text style={styles.skillText}>{item.name}</Text>
      </View>
    );
  }
};

const SaveVideoScreen = (props) => {
  const { accessToken, saveAccessToken } = useContext(AuthContext);

  const colorScheme = Appearance.getColorScheme();
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handlePost = async () => {
    const chosenSkills = (props.route?.params?.skills)
      ? (props.route.params.skills
        .filter(skill => skill.clicked))
      : [];
    if (chosenSkills.length < 1) {
      alert("Please select at least one Skill!");
    }

    const skillsObject = chosenSkills.reduce((obj, skill) => {
      const skillName = skill.name;
      obj[skillName] = {};
      return obj;
    }, {});

    const videoUrl = props.route.params.source;
    // Upload the video in S3
    const formData = new FormData();
    formData.append('video', {
      uri: videoUrl,
      name: videoUrl.split('/').pop(),
      type: 'video/mp4',
    });

    const userObject = {
      caption: description,
      userProfilePic: "123",
      skills: skillsObject
    };

    formData.append('post', JSON.stringify(userObject));

    try {
      const response = await axios.post(
        `${postService}/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Flash Message: Video updated
      showMessage({
        message: "",
        type: "success",
        duration: timeout,
        icon: () => (
          <View style={styles.flashMessage}>
            <Octicons name="diff-added" size={26} />
            <Text style={styles.editCommentText}>Post added successfully</Text>
          </View>
        ),
      });

      setTimeout(() => {
        navigation.navigate("NewVideo");
      }, timeout);
    } catch (error) {
      console.log(error.message)
      if (error.response?.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.formContainer,
          { borderBottomColor: colorScheme === "dark" ? "#eee" : "#555" },
        ]}
      >
        <TextInput
          style={styles.inputText}
          value={description}
          placeholder="Add a description"
          maxLength={150}
          onChangeText={(text) => setDescription(text)}
          multiline
        />

        <Image
          style={styles.mediaPreview}
          source={{ uri: props.route.params.source }}
        />
      </View>
      <View style={styles.skillsContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Skills", {
              source: props.route.params.source,
              skills: props.route.params.skills,
              sourceThumb: props.route.params.sourceThumb,
            })
          }
          style={styles.skillsButton}
        >
          <View style={styles.iconText}>
            <MaterialIcons name="sports-handball" size={24} />
            <Text>Add a skill(s)</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} />
        </TouchableOpacity>
        {props.route.params.skills && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Skills", {
                source: props.route.params.source,
                skills: props.route.params.skills,
                sourceThumb: props.route.params.sourceThumb,
              })
            }
            style={styles.skillsChosen}
          >
            <FlatList
              contentContainerStyle={styles.skillsChosen}
              data={props.route.params.skills}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              numColumns={5}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <AntDesign name="up-square-o" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage style={{flex: 1, alignItems: 'center', justifyContent: "center"}} position="center" />
    </View>
  );
};

export default SaveVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
  },
  skillsContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  skillsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    width: 60,
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
    gap: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
  },
  cancelButton: {
    alignItems: "center",
    flex: 1,
    borderColor: "lightgrey",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
  },
  postButtonText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  cancelButtonText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  skillBorder: {
    borderColor: COLORS.light,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 2,
    margin: 2,
  },
  skillsChosen: {
    marginLeft: 20,
    alignItems: "stretch",
    width: WINDOW_WIDTH,
  },
  skillText: {
    fontWeight: "300",
    fontSize: 10,
  },
  editCommentText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  flashMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
