import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PostsFeed from "../components/PostsFeed";
import MediaUploader from "../components/MediaUploader";
import RoomMenu from "../components/RoomMenu";

export default function RoomDashboard({ route, navigation }) {
  const { roomId, user } = route.params; // user is passed with 'name' prop from HomeScreen
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchRoomAndPosts = async () => {
    console.log('RoomDashboard user:', user);
    try {
      const roomRes = await fetch(`http://10.104.217.20:5000/rooms/${roomId}`);
      const roomData = await roomRes.json();
      setRoom(roomData.room);

      const postRes = await fetch(`http://10.104.217.20:5000/posts/room/${roomId}`);
      const postData = await postRes.json();
      setPosts(postData.posts);
    } catch (err) {
      Alert.alert("Error", "Failed to load room details or posts");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRoomAndPosts();
    }, [roomId])
  );

  if (!room) return <Text style={styles.loading}>Loading room...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{room.name}</Text>
        <RoomMenu navigation={navigation} room={room} user={user} />
      </View>
      <MediaUploader roomId={roomId} userId={user.uid} navigation={navigation} />
      <PostsFeed posts={posts} navigation={navigation} user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  title: { fontSize: 24, fontWeight: "bold", flex: 1 },
  loading: { flex: 1, textAlign: "center", marginTop: 50, fontSize: 20 }
});
