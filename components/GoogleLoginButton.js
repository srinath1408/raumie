import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, Alert } from "react-native";
import { auth } from "../config/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "123576611739-2hs2qkdvpu73tp647db6nij05229ib9q.apps.googleusercontent.com",
    expoClientId: "123576611739-dp7t20jpkr815g8gjomvh09cm1a6jjro.apps.googleusercontent.com", // from Google Cloud Console OAuth client
  });

  const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true, // This will force correct HTTPS URI for Expo proxy
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Google Sign-In Successful");
          navigation.replace("Home");
        })
        .catch(error => Alert.alert("Authentication Error", error.message));
    }
  }, [response]);

//   const handleGoogleSignIn = () => {
//   // Log the redirect URI before calling promptAsync
//   console.log('redirectUri:', redirectUri);
//   promptAsync({ redirectUri });
// };
  
  return (
    <Button
      disabled={!request}
      title="Sign in with Google"
      onPress={() => promptAsync({ redirectUri })}
    />
    
  );
}
