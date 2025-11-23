// src/components/DownloadButton.js
import React from 'react';
import { Button } from 'react-native';
import { downloadPost } from '../utils/mediaDownloader';

export default function DownloadButton({ mediaUrl }) {
  return <Button title="Download" onPress={() => downloadPost(mediaUrl)} />;
}
