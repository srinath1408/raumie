import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadToCloudinary } from '../utils/cloudinary';

// Utility function: gets correct MIME type based on file extension
const getMimeType = (uri) => {
  const extension = uri.split('.').pop().toLowerCase();
  if (extension === 'png') return 'image/png';
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'mp4') return 'video/mp4';
  return 'application/octet-stream';
};

export default function RoomDashboard({ route }) {
  const { roomId, user } = route.params;
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://10.104.216.23:5000/rooms/${roomId}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(data => setRoom(data.room))
      .catch(err => Alert.alert('Error', 'Failed to load room details'));

    fetch(`http://10.104.216.23:5000/posts/room/${roomId}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(data => setPosts(data.posts))
      .catch(err => Alert.alert('Error', 'Failed to load posts'));
  }, [roomId]);
// const handlePickAndUpload = async () => {
//   try {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     console.log('Permission result:', permissionResult);

//     console.log('About to launch picker');
//     const result = await ImagePicker.launchImageLibraryAsync({
//       // mediaTypes: [ImagePicker.MediaType.photo, ImagePicker.MediaType.video],
//       allowsEditing: false,
//     });
//     console.log('Picker result:', result);
//   } catch (error) {
//     console.log('Error after permission:', error);
//     Alert.alert('Picker error', error.message);
//   }
// };

  // Pick media, upload to Cloudinary, then post the media URL
const handlePickAndUpload = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  console.log('Permission result:', permissionResult);
console.log('About to launch picker');
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: false,
  });
  console.log('Picker result:', result);

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const selected = result.assets[0];
    const mimeType = selected.mimeType || getMimeType(selected.uri);

    try {
      const cloudinaryUrl = await uploadToCloudinary(
        selected.uri,
        'doseuydte',
        'demo_preset',
        mimeType
      );
      await fetch('http://10.104.216.23:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          userId: user._id,
          mediaUrl: cloudinaryUrl,
          caption: 'My post!',
        }),
      });
      // Refresh posts
      const resp = await fetch(`http://10.104.216.23:5000/posts/room/${roomId}`);
      const newData = await resp.json();
      setPosts(newData.posts);
    } catch (err) {
      Alert.alert('Upload error', err.message || 'Unknown error');
    }
  }
};

  if (!room) {
    return <Text style={styles.loading}>Loading room...</Text>;
  }

  // Conditionally render image or video
  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      {item.mediaUrl.endsWith('.mp4') ? (
        // You’ll need expo-av or react-native-video for video rendering. Here’s a placeholder:
        <Text>Video: {item.mediaUrl}</Text>
      ) : (
        <Image source={{ uri: item.mediaUrl }} style={styles.postMedia} />
      )}
      <Text style={styles.postCaption}>{item.caption}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{room.name}</Text>
      </View>
      <FlatList
        style={styles.postsList}
        data={posts}
        keyExtractor={item => item._id}
        renderItem={renderPostItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No posts yet</Text>}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handlePickAndUpload}>
        <Text style={styles.uploadButtonText}>Upload Media</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  postsList: { flex: 1, backgroundColor: '#fff' },
  postItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  postMedia: { width: 200, height: 200, marginBottom: 8 },
  postCaption: { fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888' },
  uploadButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  uploadButtonText: { color: '#fff', fontSize: 18 },
  loading: { flex: 1, textAlign: 'center', marginTop: 50, fontSize: 20 },
});
