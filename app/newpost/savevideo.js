import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Appearance,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../assets/styles";
import { MaterialIcons } from "react-native-vector-icons";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

const renderItem = ({ item }) => {
  if (item.clicked === true) {
    return (<View style={styles.skillBorder}>
      <Text style={styles.skillText}>{item.name}</Text>
    </View>);
  }
};

const SaveVideoScreen = (props) => {
  const colorScheme = Appearance.getColorScheme();
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handlePost = () => {
    // Handle Posting the video
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
            navigation.navigate("Skills", { source: props.route.params.source })
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
                skills: props.route.params.skills
              })
            }
            style={styles.skillsChosen}
          >
            <FlatList
              contentContainerStyle={styles.skillsChosen}
              data={props.route.params.skills}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
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
    margin: 2
  },
  skillsChosen: {
    marginLeft: 20,
    alignItems: "stretch",
    width: WINDOW_WIDTH
  },
  skillText: {
    fontWeight: '300',
    fontSize: 10,
  }
});
