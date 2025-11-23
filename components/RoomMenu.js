import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import { BASE_URL } from '../config';

export default function RoomMenu({ navigation, room, user }) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const isOwner = user.uid === room.owner._id;

  const handleDeleteOrExitRoom = async () => {
    setMenuVisible(false);
    if (isOwner) {
      Alert.alert('Delete Room', 'All room data will be lost. Are you sure?', [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await fetch(`${BASE_URL}/rooms/${room._id}`, { method: 'DELETE' });
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Exit Room', 'Are you sure you want to exit?', [
        { text: 'Cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: async () => {
            await fetch(`${BASE_URL}/rooms/${room._id}/exit`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: user.uid }),
            });
            navigation.goBack();
          },
        },
      ]);
    }
  };

  return (
    <View style={{ marginRight: 5 }}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('RoomDetails', { room, user });
          }}
          title="Room Details"
        />
        {!room.isPrivate && (
          <>
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('PostsGrid', { roomId: room._id });
              }}
              title="Posts Grid"
            />
            <Menu.Item
              onPress={handleDeleteOrExitRoom}
              title={isOwner ? 'Delete Room' : 'Exit Room'}
            />
          </>
        )}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuIcon: { marginRight: 5 },
});