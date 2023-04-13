import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { WINDOW_WIDTH } from "../assets/utils";
import { COLORS } from "../assets/styles";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const [showMore, setShowMore] = useState(false);
  const onTextLayout = useCallback((e) => {
    setShowMore(e.nativeEvent.lines.length > 3);
  }, []);

  return (
    <View style={styles.commentContainer}>
      <Image style={styles.avatar} source={{ uri: comment.user.avatar }} />
      <View style={styles.commentContent}>
        <View style={styles.userAndTime}>
          <Text style={styles.username}>{comment.user.name}</Text>
          <Text style={styles.timestamp}>{comment.timestamp}</Text>
        </View>
        <Text
          onTextLayout={onTextLayout}
          style={styles.commentText}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {comment.text}
        </Text>
        {showMore && (
          <Text onPress={handlePress} style={styles.expandButton}>
            {isExpanded ? "Read less" : "Read more"}
          </Text>
        )}
        <View style={styles.reactionsContainer}>
          <TouchableOpacity style={styles.reactionButton}>
            <AntDesign name="like2" size={16} color="black" />
            <Text style={styles.reactionButtonText}>{comment.likes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reactionButton}>
            <FontAwesome name="mail-reply" size={16} color="black" />
            <Text style={styles.reactionButtonText}>
              {comment?.replies?.length} Reply
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setShowReplies(true)}>
          {!showReplies && comment?.replies?.length ? (
            <Text style={styles.reactionButtonText}>
              View {comment?.replies?.length}{" "}
              {comment?.replies?.length === 1 ? "Reply" : "Replies"}
            </Text>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
        {showReplies && (
          <View>
            <FlatList
              data={comment.replies}
              renderItem={({ item }) => <Comment comment={item} />}
              keyExtractor={(item) => item.id.toString()}
              style={styles.repliesContainer}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => setShowReplies(false)}
                style={styles.hideReplies}
              >
                <Text>More</Text>
                <AntDesign name="pluscircle" size={16} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowReplies(false)}
                style={styles.hideReplies}
              >
                <AntDesign name="upcircleo" size={16} color="black" />
                <Text>Hide</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const Comments = ({comments}) => {
  
  const data = [
    {
      id: 1,
      user: {
        name: "Megumin",
        avatar:
          "https://ih1.redbubble.net/image.3613970471.1584/st,small,845x845-pad,1000x1000,f8f8f8.jpg",
      },
      text: "Kono Subarashii Sekai ni Bakuen en woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen wo!",
      timestamp: "1 hour ago",
      likes: 5,
      replies: [
        {
          id: 1,
          user: {
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          },
          text: "I agree, thanks for sharing!",
          timestamp: "30 minutes ago",
        },
        {
          id: 2,
          user: {
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          },
          text: "I agree, thanks for sharing!",
          timestamp: "30 minutes ago",
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      text: "Wow, this is really insightful!",
      timestamp: "2 hours ago",
      likes: 2,
      replies: [],
    },
    {
      id: 2,
      user: {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      text: "Wow, this is really insightful!",
      timestamp: "2 hours ago",
      likes: 2,
      replies: [],
    },
    {
      id: 2,
      user: {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      text: "Wow, this is really insightful!",
      timestamp: "2 hours ago",
      likes: 2,
      replies: [],
    },
    // more comments here...
  ];
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    // add new comment to data array
  };

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["6%", "75%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    
  }, []);

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={data}
    //     renderItem={({ item }) => <Comment comment={item} />}
    //     keyExtractor={(item) => item.id.toString()}
    //     style={styles.commentsList}
    //     scrollEnabled={false}
    //     showsVerticalScrollIndicator
    //   />
    //   <View style={styles.commentInputContainer}>
    //     <TextInput
    //       style={styles.commentInput}
    //       value={newComment}
    //       onChangeText={(text) => setNewComment(text)}
    //       placeholder="Add a comment..."
    //       placeholderTextColor="#999"
    //       multiline
    //     />
    //     <TouchableOpacity
    //       style={styles.commentButton}
    //       onPress={handleCommentSubmit}
    //     >
    //       <Ionicons name="send-outline" size={24} color={COLORS.blue} />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={{alignSelf: 'center', fontWeight: 600, fontSize: 16}}>{comments} Comments</Text>
          {data.map(comment => <Comment comment={comment}/>)}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleCommentSubmit}
            >
              <Ionicons name="send-outline" size={24} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    width: WINDOW_WIDTH,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  commentContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  timestamp: {
    color: "#999",
    fontSize: 12,
  },
  userAndTime: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  commentText: {
    marginBottom: 5,
  },
  expandButton: {
    color: COLORS.blue,
    marginTop: -7,
    marginBottom: 2,
  },
  reactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
    marginBottom: 0,
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 10,
    gap: 5,
  },
  reactionButtonText: {
    color: "#999",
    fontSize: 14,
  },
  repliesContainer: {
    marginTop: 5,
  },
  hideReplies: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 5,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: "black",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  commentButtonText: {
    color: "#fff",
    fontSize: 12,
  },
});
