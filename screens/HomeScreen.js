import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import { auth } from "../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

// Add a modal for name input
export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
  const [rooms, setRooms] = useState([]);
  const [userName, setUserName] = useState("");        // Stores user name
  const [modalVisible, setModalVisible] = useState(false);

  // Check for user name on mount
  useEffect(() => {
  if (user?.uid) {
    fetch(`http://10.104.216.23:5000/user/${user.uid}`)
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          setUserName(data.name);
          setModalVisible(false); // Hide input
        } else {
          setModalVisible(true); // Prompt once
        }
      }).catch(() => setModalVisible(true));
  }
}, [user?.uid]);


  // Save user name to backend
  const handleSetName = async () => {
    await fetch(`http://10.104.216.23:5000/user/${user.uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName })
    });
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
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
            setRooms(data.rooms);
          })
          .catch(err => {
            Alert.alert("Error fetching rooms");
          });
      }
    }, [user?.uid])
  );

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => navigation.navigate('RoomDashboard', { roomId: item._id, user: { uid: user.uid, email: user.email, name: userName } })}
    >
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomCode}>Code: {item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userName || user?.email || "User"}!</Text>
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
          onPress={() => navigation.navigate("CreateRoom", { user: { uid: user.uid, email: user.email, name: userName } })}
        />
        <Button
          title="Join Room"
          onPress={() => navigation.navigate("JoinRoom", { user: { uid: user.uid, email: user.email, name: userName } })}
        />
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter your Name:</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
              placeholder="Your name"
            />
            <Button title="Save" onPress={handleSetName} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ...add modal styles to your stylesheet
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  welcome: { fontSize: 22, textAlign: "center", marginBottom: 20 },
  buttons: { marginBottom: 30, flexDirection: "row", justifyContent: "space-around" },
  roomItem: { padding: 15, borderWidth: 1, borderColor: '#bbb', borderRadius: 8, marginBottom: 10 },
  roomName: { fontSize: 18, fontWeight: 'bold' },
  roomCode: { color: '#666' },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.25)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#fff", padding: 24, borderRadius: 16, width: 300, alignItems: "center" },
  input: { width: "100%", borderColor: "#ccc", borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 12 }
});
