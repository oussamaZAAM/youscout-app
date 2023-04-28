import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import { WINDOW_WIDTH } from "../../assets/utils";

const NavbarGeneral = ({
  title = "Navbar",
  rightButton = { display: false },
}) => {
  const [isSearchBarEnabled, setIsSearchBarEnabled] = useState(false);
  const translateX = useRef(new Animated.Value(-WINDOW_WIDTH)).current;
  const navigation = useNavigation();

  const check = () => {
    rightButton.display && rightButton.name === "search"
      ? enableSearchBar()
      : rightButton.action();
  };

  const enableSearchBar = () => {
    setIsSearchBarEnabled(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const disableSearchBar = () => {
    Animated.timing(translateX, {
      toValue: -WINDOW_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(()=>{
      setIsSearchBarEnabled(false);
    }, 100);
  };

  return (
    <View style={styles.container}>
      {!isSearchBarEnabled && (
        <TouchableOpacity
          onPress={() => {
            rightButton.name !== "search" && navigation.goBack()
          }}
          style={styles.button}
        >
          <Feather name="arrow-left" size={26} color={rightButton.name !== "search" ? 'black' : 'transparent'} />
        </TouchableOpacity>
      )}

      {!isSearchBarEnabled && <Text style={styles.title}>{title}</Text>}

      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            display: isSearchBarEnabled ? "flex" : "none",
            transform: [{ translateX: translateX }],
          },
        ]}
      >
        {isSearchBarEnabled && <TextInput
          style={styles.searchBar}
          placeholder="Search for users"
          placeholderTextColor="gray"
          onChangeText={(text) => rightButton.action(text)}
          value={rightButton.value}
        />}
      </Animated.View>
      {!isSearchBarEnabled ? (
        <TouchableOpacity
          onPress={() => (rightButton.display ? check() : null)}
          style={styles.button}
        >
          <Feather
            name={rightButton.name || "menu"}
            size={26}
            color={!rightButton.display ? "transparent" : "black"}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={disableSearchBar}
          style={styles.button}
        >
          <Feather name={"check"} size={26} color={"black"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavbarGeneral;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    width: 0,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingVertical: 7.5,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 10,
    width: 0,
  },
});
