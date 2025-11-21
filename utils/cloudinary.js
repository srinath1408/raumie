export const uploadToCloudinary = async (localUri, cloudName, uploadPreset, fileType) => {
  const formData = new FormData();
  formData.append('file', {
    uri: localUri,
    type: fileType,
    name: `upload.${localUri.split('.').pop()}`,
  });
  formData.append('upload_preset', uploadPreset);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (!data.secure_url) throw new Error(data.error?.message || 'No secure_url returned');
  return data.secure_url;
};
