import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';

export default function RoomDashboard({ route, navigation }) {
  const { roomId, user } = route.params;
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`http://10.104.216.23:5000/rooms/${roomId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then(data => setRoom(data.room))
      .catch(err => {
        console.error('Error fetching room:', err);
        Alert.alert('Error', 'Failed to load room details.');
      });
  }, [roomId]);

  if (!room) {
    return <Text style={styles.loading}>Loading room...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.code}>Room Code: {room.code}</Text>

      <Text style={styles.subtitle}>Members ({room.members.length}):</Text>
      {room.members.map((member, index) => (
        <Text key={index} style={styles.member}>{member}</Text>
      ))}

      {/* Placeholder for posts/media */}
      <Button title="Share Room Code" onPress={() => {
        // Copy to clipboard, later add sharing logic
        Alert.alert('Copied', 'Room code copied to clipboard!');
      }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  loading: { fontSize: 20, textAlign: 'center', marginTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  code: { fontSize: 16, marginBottom: 20 },
  subtitle: { fontSize: 20, marginBottom: 10 },
  member: { fontSize: 16, marginBottom: 5 }
});
