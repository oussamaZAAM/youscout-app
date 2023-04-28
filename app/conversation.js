import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { Feather } from "react-native-vector-icons";
import { COLORS } from "../assets/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarGeneral from "../components/general/navbar";

const ConversationScreen = (props) => {
  const id = props.route.params.id;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Here we fetch the conversations list from the server (with the user id)
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: "2011-10-10T14:48:00.000+09:00",
        user: {
          _id: 1, // The user id (must be the same as is <GiftedChat> for the current user)
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello MF",
        createdAt: "2011-10-10T14:50:00.000+09:00",
        user: {
          _id: 2,
          name: "React Native",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFThFEFxAX9RcpbxJirTeRBOY_Xi6qEHxK1Q&usqp=CAU",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
          },
          right: {
            backgroundColor: COLORS.blue,
          },
        }}
        textStyle={{
          left: {
            color: "black",
          },
          right: {
            color: "white",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <Feather
          style={{ marginBottom: -5 }}
          name="send"
          color={COLORS.blue}
          size={24}
        />
      </Send>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
        primaryStyle={styles.inputPrimary}
        accessoryStyle={styles.inputAccessory}
      />
    );
  };

  const renderChatFooter = () => {
    return (
      <View style={styles.messagesContainer}>
        <GiftedChat />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavbarGeneral title={id} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, //Current user's id
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={renderChatFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  // Render Send
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  sendText: {
    color: "#0084FF",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Render Input Tool Bar
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputPrimary: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  inputAccessory: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  // Render Chat Footer
  messagesContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
});

export default ConversationScreen;
