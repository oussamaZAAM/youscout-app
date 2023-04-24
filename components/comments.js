import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, ICONS } from "../assets/styles";
import { WINDOW_WIDTH } from "../assets/utils";
import { commentsService } from "../constants/env";

const mockUser = 17;

const Comment = ({
  comment,
  handleLikeComment,
  setIsKeyboard,
  handleReplyOnComment,
}) => {
  const [replies, setReplies] = useState(null);
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

  const handleReply = async() => {
    if (reply.trim() !== "") {
      const modifiedCommentReplies = comment.replies;
      const newReply = {
        id: "644690e468db717eb80b03b8",
        body: reply
      }

      const response = await fetch(commentsService+"/api/comments/"+comment.id+"/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReply),
      });
      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
        return 0;
      }
      const data = await response.json();

      modifiedCommentReplies.push(data);
      const modifiedComment = { ...comment };
      modifiedComment.replies = modifiedCommentReplies;
      handleReplyOnComment(modifiedComment);
      setReply("");
    }
  };

  useEffect(() => {
    if (showReplies){
      const fetchData = async () => {
        try {
          const response = await fetch(
            commentsService+"/api/comments/"+comment.id+"/replies"
          );
          const replies = await response.json();
          setReplies(replies);
          return replies;
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      fetchData()
        .then((fetchedData) => {
          // console.log(fetchedData)
        })
        .catch((error) => {
          console.error(error)
        });
    }
  }, [showReplies])

  return (
    <View style={styles.commentContainer}>
      <Image
        style={styles.profileImg}
        source={{ uri: comment.author.profileImg }}
      />
      <View style={styles.commentContent}>
        <View style={styles.userAndTime}>
          <Text style={styles.username}>{comment.author.username}</Text>
          <Text style={styles.timestamp}>{comment.timestamp}</Text>
        </View>
        <Text
          onTextLayout={onTextLayout}
          style={styles.commentText}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {comment.body}
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
            <TextInput
              style={styles.commentInput}
              value={reply}
              onChangeText={(text) => setReply(text)}
              placeholder={"Reply to " + comment.author.username}
              placeholderTextColor="#999"
              onFocus={() => setIsKeyboard(2)}
              onBlur={() => setIsKeyboard(0)}
              multiline
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleReply}
            >
              <Ionicons name={ICONS.send} size={24} color={COLORS.blue} />
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
              data={replies}
              renderItem={({ item }) => <Comment comment={item} />}
              keyExtractor={(item) => item.id}
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
  const textinputRef = useRef();
  const [isKeyboard, setIsKeyboard] = useState(0);
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
    // more comments here...
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          commentsService+"/api/posts/001/comments?orderBy=timestampAsc"
        );
        const data = await response.json();
        setData(data);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData()
      .then((fetchedData) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const [newComment, setNewComment] = useState("");
  const handleLikeComment = (id) => {
    setData((prevArray) => {
      for (let i = 0; i < prevArray.length; i++) {
        if (prevArray[i].id === id) {
          if (!prevArray[i].likes.includes(mockUser)) {
            const newLikes = prevArray[i].likes.filter(
              (user) => user !== mockUser
            );
            newLikes.push(mockUser);
            prevArray[i].likes = newLikes;
          } else {
            const newLikes = prevArray[i].likes.filter(
              (user) => user !== mockUser
            );
            prevArray[i].likes = newLikes;
          }
        }
      }
      return [...prevArray];
    });
  };

  const handleCommentSubmit = async () => {
    // add new comment to data array
    if (newComment.trim() !== "") {
      // setData((prevArray) => {
      //   const comment = {
      //     id: prevArray.length + 1,
      //     author: {
      //       id: mockUser,
      //       username: "Yunyun",
      //       profileImg: "https://lthumb.lisimg.com/549/20838549.jpg",
      //     },
      //     body: newComment,
      //     timestamp: "1 minute ago",
      //     likes: [],
      //     replies: [],
      //   };
      //   prevArray.push(comment);
      //   return [...prevArray];
      // });

      const addComment = {
        id: "644690e468db717eb80b03b8",
        body: newComment,
        postId: "001",
      };

      const response = await fetch(commentsService+"/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addComment),
      });
      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
        return 0;
      }
      const data = await response.json();
      setData((prevArray) => {
        const comment = {
          id: prevArray.length + 1,
          author: {
            id: data.author.id,
            username: data.author.username,
            profileImg: data.author.profileImg,
          },
          body: newComment,
          timestamp: data.timestamp,
          likes: data.likes,
          replies: data.replies,
        };
        prevArray.push(comment);
        return [...prevArray];
      });

      setNewComment("");
    }
  };

  const handleReplyOnComment = (comment) => {
    const id = comment.id;
    setData((prevArray) => {
      const index = prevArray.findIndex((comment) => comment.id === id);
      const newArray = prevArray.filter((comment) => comment.id !== id);
      newArray.splice(index, 0, comment);
      return [...newArray];
    });
  };

  const snapPoints = useMemo(() => ["6%", "85%"], []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={(index) => {
        handleSheetChanges(index);
        textinputRef.current.blur();
      }}
      keyboardBlurBehavior="restore"
      keyboardBehavior="interactive"
    >
      <Text style={{ alignSelf: "center", fontWeight: 600, fontSize: 16 }}>
        {comments} Comments
      </Text>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
      >
        {data.map((comment) => (
          <Comment
            key={comment.id}
            handleLikeComment={handleLikeComment}
            comment={comment}
            setIsKeyboard={setIsKeyboard}
            handleReplyOnComment={handleReplyOnComment}
          />
        ))}
      </BottomSheetScrollView>
      <View
        style={[
          styles.commentInputContainer,
          isKeyboard === 0 && { marginBottom: 0 },
          isKeyboard === 1 && {},
          isKeyboard === 2 && { display: "none" },
        ]}
      >
        <TextInput
          ref={textinputRef}
          style={styles.commentInput}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          placeholder="Add a comment..."
          placeholderTextColor="#999"
          onFocus={() => setIsKeyboard(1)}
          onBlur={() => setIsKeyboard(0)}
          multiline
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleCommentSubmit}
        >
          <Ionicons name={ICONS.send} size={24} color={COLORS.blue} />
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
    paddingBottom: 10,
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
  profileImg: {
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
  moreReplies: {
    flex: 1,
    marginLeft: 10,
    marginTop: -10,
  },
  hideReplies: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 2,
    marginBottom: -15,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: "black",
    height: 50,
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
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
