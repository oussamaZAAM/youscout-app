import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarGeneral from "../../components/general/navbar";
import { notificationsData } from "../videosData";
import { COLORS } from "../../assets/utils";


const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.notificationItem, {backgroundColor: item.seen ?"#FFFFFF" : COLORS.verylight}]}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavbarGeneral title="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#F5F5F5",
  },
  listContentContainer: {
    paddingBottom: 16,
  },
  notificationItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#999999",
  },
});
