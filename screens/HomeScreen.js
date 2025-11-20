import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import { auth } from "../config/firebaseConfig";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
  if (user?.uid) {
    fetch(`http://10.104.216.23:5000/rooms/user/${user.uid}`)
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched rooms:', data.rooms);
        setRooms(data.rooms);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        Alert.alert("Error fetching rooms");
      });
  }
}, [user?.uid]);



  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => navigation.navigate('RoomDashboard', { roomId: item._id, user: { uid: user.uid, email: user.email } })}
    >
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomCode}>Code: {item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.email || "User"}!</Text>

      <FlatList
        data={rooms}
        keyExtractor={item => item._id}
        renderItem={renderRoomItem}
        ListEmptyComponent={<Text>No rooms created or joined yet.</Text>}
        style={{ marginBottom: 20 }}
      />

      <View style={styles.buttons}>
        <Button
          title="Create Room"
          onPress={() => navigation.navigate("CreateRoom", { user: { uid: user.uid, email: user.email } })}
        />
        <Button
          title="Join Room"
          onPress={() => navigation.navigate("JoinRoom", { user: { uid: user.uid, email: user.email } })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  welcome: { fontSize: 22, textAlign: "center", marginBottom: 20 },
  buttons: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  roomItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    marginBottom: 10,
  },
  roomName: { fontSize: 18, fontWeight: 'bold' },
  roomCode: { color: '#666' },
});
