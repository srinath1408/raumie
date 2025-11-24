import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RoomDetailsScreen({ route }) {
  const { room } = route.params;
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text>Room Name: {room.name}</Text>
      <Text>Room Code: {room.code}</Text>
      <Text>Room Type: {room.isPrivate ? 'Private' : 'Public'}</Text>
      <Text>Owner: {room.owner?.name || "Unknown"}</Text>
      <Text>Members:</Text>
      {Array.isArray(room.members) && room.members.length > 0
      ? room.members.map((m, idx) => (
      <Text key={m._id || idx}>{m.name}</Text>
    ))
    : <Text>No members found</Text>
    }
    </View>
  );
}
