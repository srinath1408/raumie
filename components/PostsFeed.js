import React, { useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Video } from 'expo-video';
import { Video } from 'expo-av';


export default function PostsFeed({ posts }) {

const videoRef = useRef(null);

// const renderPostItem = ({ item }) => (
//   <View style={styles.postItem}>
//     {item.mediaUrl.endsWith('.mp4') ? (
//       <Video
//         source={{ uri: item.mediaUrl }}
//         style={{ width: 300, height: 200 }}
//         useNativeControls
//         resizeMode="contain"
//         isLooping
//       />
//     ) : (
//       <Image source={{ uri: item.mediaUrl }} style={styles.postMedia} />
//     )}
//     <Text style={styles.postCaption}>{item.caption}</Text>
//   </View>
// );
const renderPostItem = ({ item }) => (
  <View style={styles.postItem}>
    {item.mediaUrl.endsWith('.mp4') ? (
        <Video
  source={{ uri: item.mediaUrl }}
  style={{ width: 300, height: 200 }}
  useNativeControls
  resizeMode="contain"
  isLooping
  shouldPlay={false}
/>

    ) : (
      <Image source={{ uri: item.mediaUrl }} style={styles.postMedia} />
    )}
    <Text style={styles.postCaption}>{item.caption}</Text>
  </View>
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
