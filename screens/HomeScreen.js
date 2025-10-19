import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged out");
        navigation.replace("Login");
      })
      .catch(error => Alert.alert("Error logging out", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.email || "User"}!</Text>
      <View style={styles.buttons}>
        <Button
          title="Create Room"
          onPress={() => navigation.navigate("CreateRoom")}
        />
        <Button
          title="Join Room"
          onPress={() => navigation.navigate("JoinRoom")}
        />
      </View>
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  welcome: { fontSize: 22, textAlign: "center", marginBottom: 40 },
  buttons: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
