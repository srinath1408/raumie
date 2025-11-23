import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import socket from './socket';

export default function PostsFeed({ posts, setPosts, navigation, user, currentRoomId }) {

  useEffect(() => {
  socket.emit('joinRoom', currentRoomId);

  const handleNewPost = (newPost) => {
    if (newPost.roomId.toString() === currentRoomId.toString()) {
      setPosts(prev => [newPost, ...prev]);
    }
  };

  const handleDeletePost = (deletedPostId) => {
    setPosts(prev => prev.filter(post => post._id !== deletedPostId));
  };

  socket.on('newPost', handleNewPost);
  socket.on('deletePost', handleDeletePost);

  return () => {
    socket.off('newPost', handleNewPost);
    socket.off('deletePost', handleDeletePost);
  };
}, [currentRoomId, setPosts]);



  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostViewerScreen', { post: item, user })}
      style={styles.postItem}
    >
      {item.mediaUrl.endsWith('.mp4') ? (
        <Video
          source={{ uri: item.mediaUrl }}
          style={styles.postMedia}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      ) : (
        <Image source={{ uri: item.mediaUrl }} style={styles.postMedia} />
      )}
      <Text style={styles.postCaption}>{item.caption}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.postsList}
      data={posts}
      keyExtractor={item => item._id}
      renderItem={renderPostItem}
      ListEmptyComponent={<Text style={styles.emptyText}>No posts yet</Text>}
    />
  );
}

const styles = StyleSheet.create({
  postsList: { flex: 1, backgroundColor: '#fff' },
  postItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  postMedia: { width: 200, height: 200, marginBottom: 8 },
  postCaption: { fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888' },
});
