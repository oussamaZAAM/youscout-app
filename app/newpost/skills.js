import React, { useState, useEffect } from "react";
import {
  FlatList,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, name: "Shooting" },
  { id: 2, name: "Jugging" },
  { id: 3, name: "Dribbling" },
  { id: 11, name: "Shooting" },
  { id: 12, name: "Jugging" },
  { id: 13, name: "Dribbling" },
  { id: 21, name: "Shooting" },
  { id: 22, name: "Jugging" },
  { id: 23, name: "Dribbling" },
  { id: 31, name: "Shooting" },
  { id: 32, name: "Jugging" },
  { id: 33, name: "Dribbling" },
];

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

const addClickedToArray = (array) => {
    const newArray = array.map((skill) => {
        skill['clicked'] = false;
        return skill
    })
    return newArray
}

const SkillsScreen = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

//   const [skillsData, setSkillsData] = useState(addClickedToArray(data));
  const data = [
    { id: 1, name: "Shooting", clicked: false },
    { id: 2, name: "Jugging", clicked: false },
    { id: 3, name: "Dribbling", clicked: false },
  ]
  const [skillsData, setSkillsData] = useState(props.route.params.skills ? props.route.params.skills : data);
  console.log(props.route.params)

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

  useEffect(() => {
    const results = skillsData.filter((element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
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
        data={filteredData}
        renderItem={({ item }) => (
          <RenderItem item={item} handleClickSkill={handleClickSkill} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Feather name='x' size={24} color='black' />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.validateButton} onPress={() => navigation.navigate("SaveVideo", {skills: skillsData, source: props.route.params.source})}>
          <AntDesign name='checkcircleo' size={24} color='white' />
          <Text style={styles.validateButtonText}>Validate</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    padding: 10
  },
  skillTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 10
  },
  validateButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    borderColor: 'lightgrey',
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4
  },
  validateButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  },
  cancelButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16
  },
});

export default SkillsScreen;
