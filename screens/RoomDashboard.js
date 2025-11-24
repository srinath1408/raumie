import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PostsFeed from "../components/PostsFeed";
import MediaUploader from "../components/MediaUploader";
import RoomMenu from "../components/RoomMenu";
import { BASE_URL } from '../config';
import socket from "../components/socket";

export default function RoomDashboard({ route, navigation }) {
  const { roomId, user } = route.params;
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchRoomAndPosts = async () => {
    try {
      const roomRes = await fetch(`${BASE_URL}/rooms/${roomId}`);
      const roomData = await roomRes.json();
      setRoom(roomData.room);

      const postRes = await fetch(`${BASE_URL}/posts/room/${roomId}`);
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

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'POP') {
          // Back button press, leave the socket room here
          socket.emit('leaveRoom', roomId);
          if (route.params?.onRoomExit) {
            route.params.onRoomExit(roomId);
          }
          // Allow default back navigation without preventDefault
        }
      });

      return unsubscribe;
    }, [navigation, roomId, route.params])
  );

  useFocusEffect(
    React.useCallback(() => {
      socket.emit('setUser', user.uid);
      socket.emit('joinRoom', roomId);

      return () => {
        // Do NOT leave room here to avoid premature leave
      };
    }, [roomId, user.uid])
  );

  if (!room) return <Text style={styles.loading}>Loading room...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{room.name}</Text>
        <RoomMenu navigation={navigation} room={room} user={user} />
      </View>
      <MediaUploader roomId={roomId} userId={user.uid} navigation={navigation} />
      <PostsFeed
        posts={posts}
        setPosts={setPosts}
        navigation={navigation}
        user={user}
        currentRoomId={roomId}
      />
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
