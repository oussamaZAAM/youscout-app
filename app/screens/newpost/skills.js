import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../assets/utils";
import { WINDOW_HEIGHT } from "../../../assets/utils";
import { skillsService } from "../../../constants/env";

const RenderItem = ({ item, handleClickSkill }) => {
  return (
    <TouchableOpacity
      onPress={() => handleClickSkill(item)}
      style={[
        styles.item,
        item.clicked && { backgroundColor: "rgba(255, 173, 175, 1)" },
      ]}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const SkillsScreen = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [previousSkills, setPreviousSkills] = useState(props.route?.params?.skills);

  const [filteredData, setFilteredData] = useState(previousSkills);

  const [skillsData, setSkillsData] = useState(previousSkills);

  const navigation = useNavigation();

  const handleClickSkill = (item) => {
    setSkillsData((prevArray) => {
      const newArray = prevArray.map((skill) => {
        const isClicked = skill.clicked;
        if (skill.id === item.id) {
          skill.clicked = !isClicked;
        }
        return skill;
      });
      return newArray;
    });
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();

        unsubscribe();
        navigation.dispatch(e.data.action);
      });
      return unsubscribe;
    }, [navigation])
  );

  useEffect(()=>{
    const fetchSkills = async() => {
      console.log(skillsService + "/api/skills")
      try {
        const response = await fetch(skillsService + "/api/skills");
        const skills = await response.json();
        setSkillsData(skills);
        setFilteredData(skills);
      } catch(e) {
        alert(e);
      }
    }
    (!props.route.params.skills || props.route.params.skills.length===0) && fetchSkills();
  },[])

  useEffect(() => {
    const results = skillsData?.filter((element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
    !props.route.params.skills &&
      skillsData?.forEach((skill) => (skill.clicked = false));
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skillTitleContainer}>
        <Text style={styles.skillTitle}>Skills</Text>
      </View>
      <TextInput
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        style={{ height: WINDOW_HEIGHT - 400 }}
        data={filteredData}
        keyboardShouldPersistTaps="always"
        renderItem={({ item }) => (
          <RenderItem item={item} handleClickSkill={handleClickSkill} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonsContainer}>
        {/* <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Feather name='x' size={24} color='black' />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.validateButton}
          onPress={() =>
            navigation.navigate("SaveVideo", {
              skills: skillsData,
              source: props.route.params.source,
              sourceThumb: props.route.params.sourceThumb,
            })
          }
        >
          <AntDesign name="checkcircleo" size={24} color="white" />
          <Text style={styles.validateButtonText}>Validate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchBar: {
    margin: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  skillTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    padding: 10,
  },
  skillTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
    gap: 10,
  },
  validateButton: {
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
  validateButtonText: {
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
});

export default SkillsScreen;
