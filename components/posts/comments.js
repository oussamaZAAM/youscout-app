import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet as EditBottomSheet } from "react-native-btr";

import FlashMessage, { showMessage } from "react-native-flash-message";
import { Divider } from "react-native-paper";
import { copyToClipboard } from "../../assets/functions";
import { getTimeDifference } from "../../assets/functions";
import { COLORS, ICONS, WINDOW_WIDTH } from "../../assets/utils";
import { commentsService } from "../../constants/env";

const userId = 2;

const Comment = ({
  comment,
  handleLikeComment,
  setIsKeyboard,
  handleReplyOnComment,
  setFetching,
}) => {
  const [replies, setReplies] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const [showMore, setShowMore] = useState(false); // Showing / Hide long text state
  // Get the text length (Hide texts > 3 lines by default)
  const onTextLayout = useCallback((e) => {
    setShowMore(e.nativeEvent.lines.length > 3);
  }, []);

  const [replyArea, setReplyArea] = useState(false); // Stores the reply area switch state
  const [reply, setReply] = useState(""); // Stores the reply body

  // Enables or disables the replying area
  const toggleReply = () => {
    setReplyArea((prevValue) => !prevValue);
  };

  const [modalVisible, setModalVisible] = useState(false);

  // Edit the comments
  const [editedComment, setEditedComment] = useState(comment?.body);
  const [isCommentEditable, setIsCommentEditable] = useState(false);

  const toggleBottomNavigationView = () => {
    setModalVisible(!modalVisible);
  };

  const handleReply = async () => {
    try {
      if (reply.trim() !== "") {
        // Check if reply is not empty
        const modifiedCommentReplies = comment.replies; // Initialize with list of comment's replies
        const newReply = {
          id: userId, // The user's ID
          body: reply,
        };

        // Sent post request to save new reply
        const response = await fetch(
          commentsService + "/api/comments/" + comment.id + "/replies",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReply),
          }
        );

        // Break function in case of error and send Alert message
        if (!response.ok) {
          alert(`HTTP error! status: ${response.status}`);
          return 0;
        }
        const data = await response.json();

        modifiedCommentReplies.push(data); // Add to new comment's replies in case reply is saved in backend
        const modifiedComment = { ...comment };
        modifiedComment.replies = modifiedCommentReplies;
        handleReplyOnComment(modifiedComment); // Send new comment to Comment Component
        setReply("");

        toggleReply(); // Close replying area after creating a new reply
      }
    } catch (e) {
      // Break the function and display an alert message in case of no response from server
      alert(e);
      return 0;
    }
  };

  // Edit a comment (takes commentId and new comment)
  const handleEditComment = async (commentId, commentBody) => {
    try {
      const newComment = {
        body: commentBody,
      };
      const response = await fetch(
        commentsService + "/api/comments/" + commentId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
      if (!response.ok) {
        return `HTTP error! status: ${response.status}`;
      }
      const data = await response.text();
      setFetching(true);
      return data;
    } catch (error) {
      return `Server error! ${error}`;
    }
  };

  // Delete a comment (takes commentId)
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        commentsService + "/api/comments/" + commentId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        return `HTTP error! status: ${response.status}`;
      }
      const data = await response.text();
      setFetching(true);
      return data;
    } catch (error) {
      return `Server error! ${error}`;
    }
  };

  // Fetch replies of the comment if "View {n} Reply(ies)"" is clicked
  useEffect(() => {
    if (showReplies) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            commentsService +
              "/api/comments/" +
              comment.id +
              "/replies?orderBy=recent"
          );
          const replies = await response.json();
          setReplies(replies);
          return replies;
        } catch (error) {
          alert("Error fetching data:", error); // Send alert message in case of error
          throw error;
        }
      };
      fetchData()
        .then((fetchedData) => {
          // Disable Skeleton / Loading
        })
        .catch((error) => {
          // Disable Skeleton / Loading
          console.error(error);
        });
    }
  }, [showReplies]);

  return (
    <View style={styles.commentContainer}>
      <Image
        style={styles.profileImg}
        source={{ uri: comment?.author?.profileImg }}
      />
      <View style={styles.commentContent}>
        <View style={styles.userAndTime}>
          <Text style={styles.username}>{comment?.author?.username}</Text>
          <Text style={styles.timestamp}>
            {getTimeDifference(comment?.timestamp)}
          </Text>
        </View>
        <View style={styles.commentContentContainer}>
          {!isCommentEditable ? (
            <View style={styles.commentContentContainer}>
              <View style={styles.commentBodyContainer}>
                <Text
                  onTextLayout={onTextLayout}
                  style={styles.commentText}
                  numberOfLines={isExpanded ? undefined : 3}
                >
                  {comment?.body}
                </Text>
                {showMore && (
                  <Text onPress={handlePress} style={styles.expandButton}>
                    {isExpanded ? "Read less" : "Read more"}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={toggleBottomNavigationView}
                style={styles.textEditButton}
              >
                <MaterialCommunityIcons name="dots-horizontal" size={24} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.EditCommentContentContainer}>
              <View style={styles.commentBodyContainer}>
                <TextInput
                  autoFocus={true}
                  value={editedComment}
                  onChangeText={(text) => setEditedComment(text)}
                  multiline
                />
              </View>
              <View style={styles.commentEditButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleEditComment(comment.id, editedComment);
                    setIsCommentEditable(false);
                  }}
                  style={styles.textEditButton}
                >
                  <MaterialIcons name="check" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsCommentEditable(false);
                  }}
                  style={styles.textEditButton}
                >
                  <MaterialIcons name="highlight-remove" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {comment?.likes && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity
              onPress={() => handleLikeComment(comment.id, comment.likes)}
              style={styles.reactionButton}
            >
              {comment.likes.includes(userId) ? (
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
              placeholder={"Reply to " + comment?.author?.username}
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
      <EditBottomSheet
        visible={modalVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        {/* Check if user is the author of comment */}
        {userId === comment?.author?.id ? (
          <View style={styles.editCommentSection}>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard(comment?.body);
                toggleBottomNavigationView();
                showMessage({
                  message: "",
                  type: "success",
                  duration: 1000,
                  icon: () => (
                    <View style={styles.flashMessage}>
                      <MaterialIcons name="content-copy" size={26} />
                      <Text style={styles.editCommentText}>
                        Copied to Clipboard
                      </Text>
                    </View>
                  ),
                });
              }}
              style={styles.editCommentButton}
            >
              <MaterialIcons name="content-copy" size={26} />
              <View style={styles.editCommentTextContainer}>
                <Text style={styles.editCommentText}>Copy this comment</Text>
              </View>
            </TouchableOpacity>
            <Divider style={{ width: WINDOW_WIDTH }} />
            <TouchableOpacity
              onPress={() => {
                toggleBottomNavigationView();
                setIsCommentEditable(true);
              }}
              style={styles.editCommentButton}
            >
              <MaterialIcons name="edit" size={26} />
              <View style={styles.editCommentTextContainer}>
                <Text style={styles.editCommentText}>Edit this comment</Text>
              </View>
            </TouchableOpacity>
            <Divider style={{ width: WINDOW_WIDTH }} />
            <TouchableOpacity
              onPress={() => {
                handleDeleteComment(comment.id)
                  .then((response) => {
                    showMessage({
                      message: "",
                      type: "warning",
                      duration: 500,
                      icon: () => (
                        <View style={styles.flashMessage}>
                          <MaterialIcons name="content-copy" size={26} />
                          <Text style={styles.editCommentText}>{response}</Text>
                        </View>
                      ),
                    });
                  })
                  .catch((error) => {
                    showMessage({
                      message: "",
                      type: "warning",
                      duration: 1500,
                      icon: () => (
                        <View style={styles.flashMessage}>
                          <MaterialIcons name="content-copy" size={26} />
                          <Text style={styles.editCommentText}>{error}</Text>
                        </View>
                      ),
                    });
                  });
                toggleBottomNavigationView();
              }}
              style={styles.editCommentButton}
            >
              <MaterialIcons name="delete" size={26} />
              <View style={styles.editCommentTextContainer}>
                <Text style={styles.editCommentText}>Delete this comment</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editCommentSection}>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard(comment?.body);
                toggleBottomNavigationView();
                showMessage({
                  message: "",
                  type: "success",
                  duration: 1000,
                  icon: () => (
                    <View style={styles.flashMessage}>
                      <MaterialIcons name="content-copy" size={26} />
                      <Text style={styles.editCommentText}>
                        Copied to Clipboard
                      </Text>
                    </View>
                  ),
                });
              }}
              style={styles.editCommentButton}
            >
              <MaterialIcons name="content-copy" size={26} />
              <View style={styles.editCommentTextContainer}>
                <Text style={styles.editCommentText}>Copy this comment</Text>
              </View>
            </TouchableOpacity>
            <Divider style={{ width: WINDOW_WIDTH }} />
            <TouchableOpacity
              onPress={() => console.log(comment.body + " deleted!")}
              style={styles.editCommentButton}
            >
              <MaterialIcons name="report" size={26} />
              <View style={styles.editCommentTextContainer}>
                <Text style={styles.editCommentText}>Report this comment</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </EditBottomSheet>
    </View>
  );
};

const Comments = ({ commentsNumber, bottomSheetRef, handleSheetChanges }) => {
  const textinputRef = useRef();
  const [isKeyboard, setIsKeyboard] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        id: 1,
        username: "Megumin",
        profileImg:
          "https://ih1.redbubble.net/image.3613970471.1584/st,small,845x845-pad,1000x1000,f8f8f8.jpg",
      },
      body: "Kono Subarashii Sekai ni Bakuen en woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen woKono Subarashii Sekai ni Bakuen wo!",
      timestamp: "1 hour ago",
      likes: [],
      replies: [
        {
          id: 1,
          author: {
            id: 2,
            username: "Jane Smith",
            profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
          },
          body: "I agree, thanks for sharing!",
          timestamp: "30 minutes ago",
        },
      ],
    },
    {
      id: 2,
      author: {
        id: 2,
        username: "Bob Johnson",
        profileImg: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      body: "Wow, this is really insightful!",
      timestamp: "2 hours ago",
      likes: [],
      replies: [],
    },
    // more comments here...
  ]);

  const [loading, setLoading] = useState(true); // Stores the state loading
  const [fetching, setFetching] = useState(true); // Stores the state of fetching need

  // Fetch comments if Bottomsheet is enabled
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          commentsService + "/api/posts/001/comments?orderBy=recent"
        );
        const data = await response.json();
        setComments(comments);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    // Fetch only if bottomsheet is enabled
    if (fetching) {
      fetchData()
        .then((fetchedData) => {
          setFetching(false);
          setLoading(false);
        })
        .catch((error) => {
          setFetching(false);
          setLoading(false);
        });
    }
  }, [fetching]);

  const [newComment, setNewComment] = useState(""); //Stores the new comment body
  // Like / Unlike a comment
  const handleLikeComment = async (id, likes) => {
    try {
      const user = {
        id: userId,
      };
      var response;
      if (likes.includes(userId)) {
        response = await fetch(
          commentsService + "/api/comments/" + id + "/unlike",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
      } else {
        response = await fetch(
          commentsService + "/api/comments/" + id + "/like",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
      }
      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
        return 0;
      }
      setComments((prevArray) => {
        for (let i = 0; i < prevArray.length; i++) {
          if (prevArray[i].id === id) {
            if (!prevArray[i].likes.includes(userId)) {
              const newLikes = prevArray[i].likes.filter(
                (user) => user !== userId
              );
              newLikes.push(userId);
              prevArray[i].likes = newLikes;
            } else {
              const newLikes = prevArray[i].likes.filter(
                (user) => user !== userId
              );
              prevArray[i].likes = newLikes;
            }
          }
        }
        return [...prevArray];
      });
    } catch (e) {
      // Break the function and display an alert message in case of no response from server
      alert(e);
      return 0;
    }
  };

  const handleCommentSubmit = async () => {
    try {
      // add new comment to data array
      if (newComment.trim() !== "") {
        // Check if comment is not empty
        const addComment = {
          id: userId, // User's ID
          body: newComment,
          postId: "001", // Post's ID
        };

        // Send a post request to create a new comment
        const response = await fetch(commentsService + "/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addComment),
        });

        // Break the function and display an alert message in case of a non ok response from server
        if (!response.ok) {
          alert(`HTTP error! status: ${response.status}`);
          return 0;
        }
        const data = await response.json();
        // Set data state in case of a valid response
        setComments((prevArray) => {
          const comment = {
            id: data.id,
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
        setNewComment(""); // Set new comment body to empty string
      }
    } catch (e) {
      // Break the function and display an alert message in case of no response from server
      alert(e);
      return 0;
    }
  };

  // Handle adding the comment's new replies to the comments state
  const handleReplyOnComment = (comment) => {
    const id = comment.id;
    setComments((prevArray) => {
      const index = prevArray.findIndex((comment) => comment.id === id);
      const newArray = prevArray.filter((comment) => comment.id !== id);
      newArray.splice(index, 0, comment);
      return [...newArray];
    });
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        textinputRef.current.blur();
      }
    );

    // Don't forget to remove the listeners when the component is unmounted
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const snapPoints = useMemo(() => ["6%", "85%"], []); // State of BottomSheet's snapPoints

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={(index) => {
        handleSheetChanges(index);
        if (index === 1) {
          setFetching(true);
        } else if (index === 0) {
          setFetching(false);
        }
        textinputRef.current.blur();
      }}
      keyboardBlurBehavior="restore"
      keyboardBehavior="interactive"
    >
      <Text style={{ alignSelf: "center", fontWeight: 600, fontSize: 16 }}>
        {commentsNumber} Comments
      </Text>
      <BottomSheetFlatList
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        data={comments}
        renderItem={({ item }) => (
          <Comment
            key={item.id}
            handleLikeComment={handleLikeComment}
            comment={item}
            setIsKeyboard={setIsKeyboard}
            handleReplyOnComment={handleReplyOnComment}
            setFetching={setFetching}
          />
        )}
        refreshing={loading}
        onRefresh={() => setFetching(true)}
      />
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

      <FlashMessage position="bottom" />
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
  textEditButton: {
    marginHorizontal: 5,
    width: 26,
  },
  commentContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  EditCommentContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ddd",
    padding: 1,
  },
  commentEditButtonsContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentBodyContainer: {
    flex: 1,
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
  editCommentSection: {
    width: WINDOW_WIDTH,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  editCommentButton: {
    height: 60,
    paddingVertical: 15,
    width: WINDOW_WIDTH / 2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  editCommentText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  editCommentTextContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  flashMessage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
