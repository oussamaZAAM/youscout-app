import RNFetchBlob from 'react-native-fetch-blob';

export async function convertToMultipart(fileUri) {
  const fileData = await RNFetchBlob.fs.readFile(fileUri, 'base64');

  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    type: 'multipart/form-data',
    name: 'file.mp4',
    data: fileData,
  });

  return formData;
}