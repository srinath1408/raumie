import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import EditPostScreen from '../screens/EditPostScreen';

export default function MediaUploader({ roomId, userId, navigation }) {
  // Use navigation prop to trigger navigation
  const handlePick = async () => {
    // Use ImagePicker as main option
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission required', 'Media access is needed to upload files.');
      return;
    }
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: false
    // });
    const result = await DocumentPicker.getDocumentAsync({type: '*/*'}); 
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selected = result.assets[0];
      navigation.navigate('EditPostScreen', {
        media: selected,
        roomId,
        userId
      });
    }
  };
  // For advanced users, offer DocumentPicker as alternative
  // // commented for clarity

  return (
    <TouchableOpacity style={styles.uploadButton} onPress={handlePick}>
      <Text style={styles.uploadButtonText}>Upload Media</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: '#2196F3', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25, alignSelf: 'center'
  },
  uploadButtonText: { color: '#fff', fontSize: 18 }
});
