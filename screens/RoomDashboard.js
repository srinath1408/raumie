import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PostsFeed from '../components/PostsFeed';
import MediaUploader from '../components/MediaUploader';

export default function RoomDashboard({ route, navigation }) {
  const { roomId, user } = route.params;
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchRoomAndPosts = async () => {
    try {
      const roomRes = await fetch(`http://10.104.216.23:5000/rooms/${roomId}`);
      const roomData = await roomRes.json();
      setRoom(roomData.room);

      const postRes = await fetch(`http://10.104.216.23:5000/posts/room/${roomId}`);
      const postData = await postRes.json();
      setPosts(postData.posts);
    } catch (err) {
      Alert.alert('Error', 'Failed to load room details or posts');
    }
  };
  useEffect(() => { fetchRoomAndPosts(); }, [roomId]);

  if (!room) {
    return <Text style={styles.loading}>Loading room...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{room.name}</Text>
      </View>
      <MediaUploader roomId={roomId} userId={user._id} onUpload={fetchRoomAndPosts} navigation={navigation} />  {/* pass navigation! */}
      <PostsFeed posts={posts} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60, paddingHorizontal: 15, justifyContent: 'center',
    backgroundColor: '#eee', borderBottomWidth: 1, borderColor: '#ccc',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  loading: { flex: 1, textAlign: 'center', marginTop: 50, fontSize: 20 },
});
