
// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function MediaUploader({ roomId, userId, navigation }) {
   

//   const handlePick = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.status !== 'granted') {
//       Alert.alert('Permission required', 'Media access is needed to upload files.');
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false });
//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       const selected = result.assets[0];
//       navigation.navigate('EditPostScreen', {
//         media: selected,
//         roomId,
//         userId,
//       });
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.uploadButton} onPress={handlePick}>
//       <Text style={styles.uploadButtonText}>Upload Media</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   uploadButton: {
//     backgroundColor: '#2196F3', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25, alignSelf: 'center'
//   },
//   uploadButtonText: { color: '#fff', fontSize: 18 }
// });

import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import socket from '../components/socket';

export default function MediaUploader({ roomId, userId, navigation }) {
  const handlePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission required', 'Media access is needed to upload files.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selected = result.assets[0];
      // Navigate to EditPostScreen without leaving the main room socket
      navigation.navigate('EditPostScreen', {
        media: selected,
        roomId,
        userId,
      });
    }
  };


  useEffect(() => {
    // If you add post-specific socket join here on mount, add leave on unmount similarly
    return () => {
      // socket.emit('leavePost', postId);  // Implement if post socket joins are used
    };
  }, []);

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
