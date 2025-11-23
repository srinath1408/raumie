import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RoomDetailsScreen({ route }) {
  const { room } = route.params;
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text>Room Name: {room.name}</Text>
      <Text>Room Code: {room.code}</Text>
      <Text>Owner: {room.ownerName || room.owner || "Unknown"}</Text>
      <Text>Members:</Text>
      {Array.isArray(room.members) && room.members.length > 0
        ? room.members.map((m, idx) => (
            <Text key={m._id || idx}>{m.name || String(m)}</Text>
          ))
        : <Text>No members found</Text>
      }
    </View>
  );
}
