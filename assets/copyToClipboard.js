import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
  };