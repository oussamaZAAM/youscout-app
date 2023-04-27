import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarGeneral from "../components/general/navbar";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    message: "Hey there, how are you?",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    message: "I am good, thanks! What about you?",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    id: 3,
    name: "Mark Smith",
    message: "Have you seen the new movie?",
    avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
  },
  {
    id: 4,
    name: "Mia Johnson",
    message: "Can you help me with this task?",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    id: 5,
    name: "Steve Rogers",
    message: "Assemble!",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
  },
  // add more conversations here
];

const ChatScreen = ({}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(conversations);

    useEffect(() => {
        const results = conversations?.filter((element) =>
          element.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(results);
    }, [searchQuery]);

    const handleTextChange = (text) => {
        setSearchQuery(text);
    }

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity
            style={styles.conversation}
            onPress={() => navigation.navigate('Chat', { id: item.id })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.message}>{item.message}</Text>
              </View>
            </View>
            <Text style={styles.time}>12:30 PM</Text>
          </TouchableOpacity>
        );
      };
    
      return (
        <SafeAreaView style={styles.container}>
          <NavbarGeneral title="Inbox" rightButton={{display: true, name: 'search', action: handleTextChange, value: searchQuery}} />
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
        backgroundColor: '#f5f5f5',
      },
      conversation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      message: {
        fontSize: 14,
        color: '#888',
        maxWidth: 250,
      },
      time: {
        fontSize: 12,
        color: '#888',
      },
    });

export default ChatScreen;
