import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";
import { WINDOW_WIDTH } from "../../assets/utils";
import VideosFlatList from "../../components/posts/videosFlatlist";
import ProfilePostList from "../../components/profile/postList";
import { videosData } from "../videosData";
import axios from "axios";
import { authenticationService } from "../../constants/env";
import AuthContext from "../../context/authContext";
import { handleRefreshToken } from "../../assets/functions/refreshToken";

const DiscoverScreen = () => {
  // -------------- User Validation ------------------
  const { accessToken, saveAccessToken } = useContext(AuthContext);

  // -------------- Search styling -------------------
  const [postEnabled, setPostEnabled] = useState(-1);
  const insets = useSafeAreaInsets();
  const renderUserSeparator = () => {
    return <View style={styles.userSeparator} />;
  };

  // ----------- handle searching users ----------------
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      searchQuery !== "" ? performSearchRequest(searchQuery) : setUsers("");
    }, 1000);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const performSearchRequest = async (query) => {
    try{
      const response = await axios.get(authenticationService + "/users/search?username=" + query, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = response.data;
      setUsers(data.content);
    } catch(error) {
      if (error.response.status === 401) {
        handleRefreshToken(accessToken, saveAccessToken);
      }
    }
  };

  console.log(users)

  return (
    <SafeAreaView style={styles.container}>
      {postEnabled === -1 ? (
        <SafeAreaView style={styles.discoverContainer}>
          <View style={styles.searchBarContainer}>
            <Feather style={styles.searchBarIcon} name="search" size={16} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search for users"
              placeholderTextColor="gray"
              onChangeText={handleSearchQueryChange}
              value={searchQuery}
            />
          </View>
          {users.length !== 0 && <View style={styles.overlayContainer}>
            <View style={styles.searchingContainer}>
              <FlatList
                data={users}
                keyExtractor={(item) => item.username}
                renderItem={({ item }) => (
                  <View style={styles.userContainer}>
                    <Image source={{ uri: item.profilePicture || "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" }} style={styles.userImage} />
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>
                )}
                ItemSeparatorComponent={renderUserSeparator}
              />
            </View>
          </View>}
          <ProfilePostList
            posts={videosData}
            setPostEnabled={setPostEnabled}
            numColumns={4}
          />
        </SafeAreaView>
      ) : (
        <View>
          <View style={[styles.navContainer, { paddingTop: insets.top + 15 }]}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => setPostEnabled(-1)}
            >
              <Feather name="arrow-left" size={20} />
            </TouchableOpacity>
          </View>
          <VideosFlatList videosData={videosData} postEnabled={postEnabled} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  discoverContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
    flexDirection: "column",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingVertical: 5,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    width: 0,
    height: 40
  },
  searchBarContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 100,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarIcon: {
    marginHorizontal: 10,
  },

  // For videoFlatlist player navbar
  navContainer: {
    position: "absolute",
    zIndex: 100,
    width: WINDOW_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    opacity: 0.5,
  },
  returnButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 15,
  },

  // For users Flatlist
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: 45,
    zIndex: 10
  },
  searchingContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userSeparator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});
