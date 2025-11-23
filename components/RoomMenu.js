import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Menu, IconButton } from "react-native-paper";

export default function RoomMenu({ navigation, room, user }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const isOwner = user._id === room.owner;
  


  const handleDeleteOrExitRoom = async () => {
    console.log('user._id:', user._id, 'room.owner:', room.owner, 'isOwner:', isOwner);
    setMenuVisible(false);
    if (isOwner) {
      Alert.alert("Delete Room", "All room data will be lost. Are you sure?", [
        { text: "Cancel" },
        { text: "Delete", style: "destructive", onPress: async () => {
          await fetch(`http://10.104.216.23:5000/rooms/${room._id}`, { method: "DELETE" });
          navigation.goBack();
        }},
      ]);
    } else {
      Alert.alert("Exit Room", "Are you sure you want to exit?", [
        { text: "Cancel" },
        { text: "Exit", style: "destructive", onPress: async () => {
          await fetch(`http://10.104.216.23:5000/rooms/${room._id}/exit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id }),
          });
          navigation.goBack();
        }},
      ]);
    }
  };

  return (
    <View style={styles.menuIcon}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />
        }
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate("RoomDetails", { room }, {user});
          }}
          title="Room Details"
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate("PostsGrid", { roomId: room._id });
          }}
          title="Posts Grid"
        />
        <Menu.Item
          onPress={handleDeleteOrExitRoom}
          title={isOwner ? "Delete Room" : "Exit Room"}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuIcon: { marginRight: 5 },
});
