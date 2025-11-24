import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Menu, IconButton } from 'react-native-paper';
import Comments from '../components/Comments';
import { BASE_URL } from '../config';
import { downloadPost } from '../utils/mediaDownloader';  // import function

export default function PostViewerScreen({ navigation, route }) {
  const { post, user } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleDelete = async () => {
    setMenuVisible(false);
    Alert.alert('Delete', 'Are you sure you want to delete this post?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await fetch(`${BASE_URL}/posts/${post._id}`, { method: 'DELETE' });
          navigation.goBack();
        },
      },
    ]);
  };

  const handleDownload = async () => {
    await downloadPost(post.mediaUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: post.mediaUrl }} style={styles.fullImage} resizeMode="contain" />
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
      <View style={styles.commentsSection}>
        <Comments postId={post._id} user={user} />
      </View>
      <View style={styles.menuIcon}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item onPress={handleDelete} title="Delete" />
          <Menu.Item onPress={handleDownload} title="Download" />
          {/* { !room.isPrivate && (
            <Menu.Item onPress={handleDownload} title="Download" />
          )} */}
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8
  },
  fullImage: {
    width: '100%',
    height: 280,
    marginBottom: 8
  },
  caption: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8
  },
  commentsSection: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  menuIcon: {
    position: 'absolute',
    top: 40,
    right: 20
  }
});