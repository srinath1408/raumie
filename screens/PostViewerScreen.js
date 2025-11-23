import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Menu, IconButton } from 'react-native-paper'; // or use react-native-popup-menu

export default function PostViewerScreen({ navigation, route }) {
  const { post } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleDelete = async () => {
    setMenuVisible(false);
    Alert.alert("Delete", "Are you sure you want to delete this post?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => {
        await fetch(`http://10.104.216.23:5000/posts/${post._id}`, { method: 'DELETE' });
        navigation.goBack(); // Return to dashboard, posts will refresh via focusEffect
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: post.mediaUrl }} style={styles.fullImage} resizeMode="contain" />
      <Text style={styles.caption}>{post.caption}</Text>
      <View style={styles.menuIcon}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item onPress={handleDelete} title="Delete" />
          {/* More options: Edit, etc */}
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: '100%', height: '80%' },
  caption: { color: '#fff', fontSize: 18, marginTop: 10, textAlign: 'center' },
  menuIcon: { position: 'absolute', top: 40, right: 20 },
});
