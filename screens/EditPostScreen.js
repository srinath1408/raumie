import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { uploadToCloudinary } from '../utils/cloudinary';

const getMimeType = (uri) => {
  const extension = uri.split('.').pop().toLowerCase();
  if (extension === 'png') return 'image/png';
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'mp4') return 'video/mp4';
  return 'application/octet-stream';
};

export default function EditPostScreen({ route, navigation }) {
  const { media, roomId, userId } = route.params;
  const [caption, setCaption] = useState('');

  const handleUpload = async () => {
    try {
      const mimeType = media.mimeType || getMimeType(media.uri);
      const cloudinaryUrl = await uploadToCloudinary(
        media.uri,
        'doseuydte',
        'demo_preset',
        mimeType
      );
      await fetch('http://10.104.216.23:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          userId,
          mediaUrl: cloudinaryUrl,
          caption,
        }),
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Upload error', err.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      {media.type === 'image' ? (
        <Image source={{ uri: media.uri }} style={styles.preview} />
      ) : (
        <Text>Video preview coming soon</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter caption"
        value={caption}
        onChangeText={setCaption}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Save Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  preview: { width: 300, height: 300, alignSelf: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 8, marginBottom: 20, borderRadius: 8 },
  button: { backgroundColor: '#2196F3', padding: 16, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
