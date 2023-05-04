import { useState } from "react";

import { Image } from "react-native";
import { Avatar } from "react-native-paper";

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
      style={{ height: size, width: size, borderRadius: size/2 }}
      source={{ uri }}
    />
  ) : (
    <Avatar.Icon size={100} icon={"account"} />
  );
};
