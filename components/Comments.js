import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { BASE_URL } from '../config';

export default function Comments({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/comments/post/${postId}`)
      .then(res => res.json())
      .then(data => setComments(data.comments || []));
  }, [postId]);

  const handleAddComment = async () => {
    if (text.trim() === "") return;
    await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        userId: user.uid,
        userName: user.name,
        text
      })
    });
    setText("");
    const res = await fetch(`${BASE_URL}/comments/post/${postId}`);
    const data = await res.json();
    setComments(data.comments || []);
  };

  return (
    <View style={styles.commentsContainer}>
      <Text style={styles.header}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.user}>{item.userName}:</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.text}>No comments yet.</Text>}
        style={styles.commentsList}
        contentContainerStyle={{ paddingBottom: 48 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />
        <Button title="SEND" onPress={handleAddComment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    flex: 1,
    backgroundColor: '#111'
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 10,
    color: '#fff'
  },
  commentsList: {
    flex: 1,
    marginLeft: 10,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 5,
    
    alignItems: 'flex-start'
  },
  user: {
    fontWeight: "bold",
    marginRight: 4,
    color: '#fff'
  },
  text: {
    color: '#fff'
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#222",
    padding: 8,
    backgroundColor: '#111'
  },
  input: {
    flex: 1,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    color: '#fff',
    backgroundColor: '#222'
  }
});
