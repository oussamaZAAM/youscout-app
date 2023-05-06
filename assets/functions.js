import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Image } from "react-native";
import { Avatar } from "react-native-paper";

export function getTimeDifference(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInMs = now.getTime() - then.getTime() - 3600000; // We substract 1 hour from now (synchronization)
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds > 10) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

export const copyToClipboard = (text) => {
  Clipboard.setStringAsync(text);
};

export const CheckImage = ({ uri, size = 50 }) => {
  const [valid, setValid] = useState(false);
  Image.getSize(
    uri,
    (width, height) => {
      setValid(true);
    },
    (error) => {
      setValid(false);
    }
  );
  return valid ? (
    <Image
      style={{ height: size, width: size, borderRadius: size / 2 }}
      source={{ uri }}
    />
  ) : (
    <Avatar.Icon size={100} icon={"account"} />
  );
};
