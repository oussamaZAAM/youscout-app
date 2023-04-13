import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  Keyboard,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { WINDOW_WIDTH } from "../assets/utils";
import { COLORS } from "../assets/styles";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

const mockUser = 17;

const Comment = ({ comment, handleLikeComment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const [showMore, setShowMore] = useState(false);
  const onTextLayout = useCallback((e) => {
    setShowMore(e.nativeEvent.lines.length > 3);
  }, []);

  const [replyArea, setReplyArea] = useState(false);
  const [reply, setReply] = useState("");

  const toggleReply = () => {
    setReplyArea((prevValue) => !prevValue);
  };

  const handleReply = () => {
    const modifiedCommentReplies = comment.replies;
    const newReply = {
      id: comment.replies.length + 1,
      user: {
        name: "Yunyun",
        avatar: "https://lthumb.lisimg.com/549/20838549.jpg",
      },
      text: reply,
      timestamp: "1 minute ago"
    }
    // modifiedComment.replies.push(newReply);
    modifiedCommentReplies.push(newReply);
    const modifiedComment = {...comment}
    modifiedComment.replies = modifiedCommentReplies;
    handleReplyOnComment(modifiedComment);
    setReply('');
  }

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
        {comment.likes && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity
              onPress={() => handleLikeComment(comment.id)}
              style={styles.reactionButton}
            >
              {comment.likes.includes(mockUser) ? (
                <AntDesign name="like1" size={16} color="black" />
              ) : (
                <AntDesign name="like2" size={16} color="black" />
              )}
              <Text style={styles.reactionButtonText}>
                {comment.likes.length}{" "}
                {comment.likes.length > 1 ? "Likes" : "Like"}
              </Text>
            </TouchableOpacity>
            {comment.likes && replyArea ? (
              <TouchableOpacity
                onPress={toggleReply}
                style={styles.reactionButton}
              >
                <AntDesign name="shrink" size={16} color="black" />
                <Text style={styles.reactionButtonText}>Collapse</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={toggleReply}
                style={styles.reactionButton}
              >
                <FontAwesome name="mail-reply" size={16} color="black" />
                <Text style={styles.reactionButtonText}>Reply</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {replyArea && (
          <View style={styles.replyInputContainer}>
            <BottomSheetTextInput
              style={styles.commentInput}
              value={reply}
              onChangeText={(text) => setReply(text)}
              placeholder={"Reply to " + comment.user.name}
              placeholderTextColor="#999"
              onFocus={() => setIsKeyboard(2)}
              onBlur={() => setIsKeyboard(0)}
              multiline
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleReply}
            >
              <Ionicons name="send-outline" size={24} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
        )}
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
            <TouchableOpacity
              onPress={() => setShowReplies(false)}
              style={styles.moreReplies}
            >
              <Text style={styles.reactionButtonText}>Show more</Text>
            </TouchableOpacity>
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

const Comments = ({ comments, bottomSheetRef, handleSheetChanges }) => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      user: {
        name: "Megumin",
        avatar:
          "https://ih1.redbubble.net/image.3613970471.1584/st,small,845x845-pad,1000x1000,f8f8f8.jpg",
      },
      text: "Kono Subarashii Sekai ni Bakuen en woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen wo!",
      timestamp: "1 hour ago",
      likes: [],
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
      likes: [],
      replies: [],
    },
    {
      id: 3,
      user: {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      text: "Wow, this is really insightful!",
      timestamp: "2 hours ago",
      likes: [],
      replies: [],
    },
    {
      id: 4,
      user: {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      text: "Wow, this is really insightful!",
      timestamp: "2 hours ago",
      likes: [],
      replies: [],
    },
    // more comments here...
  ]);
  const [newComment, setNewComment] = useState("");
  const handleLikeComment = (id) => {
    setData((prevArray) => {
      for (let i = 0; i < prevArray.length; i++) {
        if (prevArray[i].id === id) {
          if (!prevArray[i].likes.includes(mockUser)) {
            const newLikes = prevArray[i].likes.filter((user) => user !== mockUser)
            newLikes.push(mockUser);
            prevArray[i].likes = newLikes;
          } else {
            const newLikes = prevArray[i].likes.filter((user) => user !== mockUser)
            prevArray[i].likes = newLikes;
          }
        }
      }
      return [...prevArray];
    });
  };

  const handleCommentSubmit = () => {
    // add new comment to data array
    setData((prevArray) => {
      const addComment = {
        id: prevArray.length + 1,
        user: {
          name: "Yunyun",
          avatar: "https://lthumb.lisimg.com/549/20838549.jpg",
        },
        text: newComment,
        timestamp: "1 minute ago",
        likes: 0,
        replies: [],
      };
      prevArray.push(addComment);
      return [...prevArray];
    });
    setNewComment("");
  };

  // const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["6%", "75%"], []);

  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <Text style={{ alignSelf: "center", fontWeight: 600, fontSize: 16 }}>
        {comments} Comments
      </Text>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {data.map((comment) => (
          <Comment
            key={comment.id}
            handleLikeComment={handleLikeComment}
            comment={comment}
          />
        ))}
      </BottomSheetScrollView>
      <View
        style={[
          styles.commentInputContainer,
          isKeyboard && { marginBottom: -22 },
        ]}
      >
        <BottomSheetTextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          placeholder="Add a comment..."
          placeholderTextColor="#999"
          onFocus={() => setIsKeyboard(true)}
          onBlur={() => setIsKeyboard(false)}
          multiline
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleCommentSubmit}
        >
          <Ionicons name="send-outline" size={24} color={COLORS.blue} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
