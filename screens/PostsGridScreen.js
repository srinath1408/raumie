import React from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../config';

export default function PostsGridScreen({ route, navigation }) {
  const { roomId } = route.params;
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    console.log('Fetching posts for room:', roomId);
    fetch(`${BASE_URL}/posts/room/${roomId}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched posts:', data.posts);
        setPosts(data.posts || []);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, [roomId]);

  return (
    <FlatList
      data={posts}
      numColumns={9}
      keyExtractor={item => item._id}
      contentContainerStyle={{ padding: 2 }}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PostViewerScreen', { post: item, user })}>
          <Image source={{ uri: item.mediaUrl }} style={styles.imageThumbnail} />
        </TouchableOpacity>
      )}
      ListEmptyComponent={<View><Text>No posts found.</Text></View>}
    />
  );
}

const styles = StyleSheet.create({
  imageThumbnail: {
    width: 35,
    height: 35,
    margin: 2,
  },
});
