import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';
import { BASE_URL } from '../config';

export default function CreateRoomScreen({ navigation, route }) {
  const user = route.params?.user;
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const createRoom = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'User not logged in');
      return;
    }
    if (!roomName) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/rooms/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roomName, ownerId: user.uid, isPrivate }),
      });
      const json = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Room created! Your room code is: ${json.room.code}`);
        navigation.replace('RoomDashboard', {
          roomId: json.room._id,
          user,
        });
      } else {
        Alert.alert('Error', json.error || 'Failed to create room');
      }
    } catch (error) {
      Alert.alert('Network error', 'Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Room</Text>
      <TextInput
        placeholder="Room Name"
        value={roomName}
        onChangeText={setRoomName}
        style={styles.input}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
        <Text style={{ marginLeft: 8 }}>Private Room</Text>
      </View>
      <Button title="Create Room" onPress={createRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, borderRadius: 5 },
});
