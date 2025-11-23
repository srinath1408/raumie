import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';

export default function PostsGridScreen({ route, navigation }) {
  const { roomId } = route.params;
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://YOUR_BACKEND/posts/room/${roomId}`)
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  return (
    <FlatList
      data={posts}
      numColumns={3}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PostViewerScreen', { post: item })}>
          <Image source={{ uri: item.mediaUrl }} style={styles.imageThumbnail} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageThumbnail: { width: 120, height: 120, margin: 2 },
});
