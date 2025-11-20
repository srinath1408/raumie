import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function CreateRoomScreen({ navigation}) {
  const route = useRoute();
  const user = route.params?.user;
  const [roomName, setRoomName] = useState('');

  const createRoom = async () => {
      if (!user || !user.uid) {
    Alert.alert('Error', 'User not logged in');
    return;
  }
    if (!roomName) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    try {
  console.log('Sending create room request...');
  const response = await fetch('http://10.104.216.23:5000/rooms/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: roomName, ownerId: user.uid }),
  });
  
  console.log('Response received:', response.status);
  const json = await response.json();
  
  if (response.ok) {
    Alert.alert('Success', `Room created! Your room code is: ${json.room.code}`);
    navigation.navigate('RoomDashboard', { roomId: json.room._id });
  } else {
    Alert.alert('Error', json.error || 'Failed to create room');
  }
} catch (error) {
  console.log('Fetch error:', error);
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
      <Button title="Create Room" onPress={createRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, borderRadius: 5 }
});
