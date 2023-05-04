import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../assets/utils";
import NavbarGeneral from "../../../components/general/navbar";

const conversations = [
  {
    id: 1,
    username: "John Doe",
    lastMessage: "Hey there, how are you?",
    profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
    newMessages: 1114,
  },
  {
    id: 2,
    username: "Jane Doe",
    lastMessage: "I am good, thanks! What about you?",
    profileImg: "https://randomuser.me/api/portraits/women/31.jpg",
    newMessages: 1,
  },
  {
    id: 3,
    username: "Mark Smith",
    lastMessage: "Have you seen the new movie?",
    profileImg: "https://randomuser.me/api/portraits/lego/5.jpg",
    newMessages: 1,
  },
  {
    id: 4,
    username: "Mia Johnson",
    lastMessage: "Can you help me with this task?",
    profileImg: "https://randomuser.me/api/portraits/women/60.jpg",
    newMessages: 0,
  },
  {
    id: 5,
    username: "Steve Rogers",
    lastMessage: "Assemble!",
    profileImg: "https://randomuser.me/api/portraits/men/83.jpg",
    newMessages: 0,
  },
  // add more conversations here
];

const ChatScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(conversations);

  const navigation = useNavigation();
  
  useEffect(() => {
    const results = conversations?.filter((element) =>
      element.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  }, [searchQuery]);

  const handleTextChange = (text) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item }) => { 
    return (
      <TouchableOpacity
        style={styles.conversation}
        onPress={() => navigation.navigate("Conversation", { id: item.id, username: item.username, profileImg: item.profileImg})}
      >
        {item.newMessages > 0 && (
          <Image
            style={styles.newMessageIcon}
            source={require("../../../assets/images/new.png")}
          />
        )}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: item.profileImg }} style={styles.profileImg} />
          <View style={{ marginLeft: 8 }}>
            {item.newMessages === 0 ? (
              <Text style={styles.username}>{item.username}</Text>
            ) : (
              <Text style={styles.newMessageName}>{item.username}</Text>
            )}
            {item.newMessages === 0 ? (
              <Text numberOfLines={1} style={styles.lastMessage}>
                {item.lastMessage}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.newMessage}>
                {item.lastMessage}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.messageInfoContainer}>
          {item.newMessages === 0 ? (
            <Text style={styles.time}>12:30 PM</Text>
          ) : (
            <Text style={styles.newMessageTime}>12:30 PM</Text>
          )}
          {item.newMessages !== 0 && (
            <Text style={styles.numOfNewMessages}>{item.newMessages}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavbarGeneral
        title="Inbox"
        rightButton={{
          display: true,
          name: "search",
          action: handleTextChange,
          value: searchQuery,
        }}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  conversation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  newMessageIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 25,
    width: 25,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  newMessageName: {
    fontSize: 16,
    fontWeight: 900,
    // color: COLORS.blue,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
    maxWidth: 250,
  },
  newMessage: {
    fontSize: 14,
    fontWeight: 500,
    // color: COLORS.blue,
    maxWidth: 250,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  newMessageTime: {
    fontSize: 12,
    color: COLORS.light,
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  numOfNewMessages: {
    alignSelf: "center",
    textAlign: "center",
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: COLORS.light,
    minWidth: 25,
    borderRadius: 15,
    padding: 1,
  },
});

export default ChatScreen;
