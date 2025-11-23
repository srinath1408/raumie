import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { BASE_URL } from '../config';

export default function JoinRoomScreen({ navigation, route }) {
  const [roomCode, setRoomCode] = useState('');
  const { user } = route.params; // get user from navigation params

  const joinRoom = async () => {
    
    if (!roomCode) {
      Alert.alert('Please enter a room code');
      return;
    }
    try {
      // Call backend to join the room
      const res = await fetch(`${BASE_URL}/rooms/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: roomCode, userId: user.uid })
      });
      const data = await res.json();
      console.log('join response:', data, 'status:', res.status);
      if (res.ok && data.room) {
        // Success - go to dashboard with room object and user
        navigation.replace('RoomDashboard', { roomId: data.room._id, user });
      } else {
        Alert.alert('Failed to join', data.error || 'Invalid room code');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not join room');
      
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={roomCode}
        placeholder="Enter Room Code"
        onChangeText={setRoomCode}
        style={{ borderWidth: 1, marginBottom: 15, padding: 10 }}
      />
      <Button title="Join Room" onPress={joinRoom} />
    </View>
  );
}
