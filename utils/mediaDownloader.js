// src/utils/mediaDownloader.js
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export async function requestPermission() {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access media library is required!');
    return false;
  }
  return true;
}

export async function downloadPost(mediaUrl) {
  const hasPermission = await requestPermission();
  if (!hasPermission) return;

  try {
    const fileUri = FileSystem.documentDirectory + mediaUrl.split('/').pop();
    const downloadResult = await FileSystem.downloadAsync(mediaUrl, fileUri);
    await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
    alert('Download complete!');
  } catch (error) {
    console.error('Download error:', error);
    alert('Download failed!');
  }
}
