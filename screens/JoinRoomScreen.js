import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function JoinRoomScreen({ navigation }) {
  const [roomCode, setRoomCode] = useState('');

  const joinRoom = async () => {
    // call backend to join room by code and handle success/failure
    // navigation.navigate('RoomDashboard', { roomId: ... });
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
