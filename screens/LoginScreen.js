import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Login Successful");
        // Navigate to main app screen or home screen
        navigation.replace("Home");
      })
      .catch(error => Alert.alert("Error", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5
  },
  link: { color: "blue", marginTop: 15, textAlign: "center" }
});
