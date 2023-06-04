import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");

export const COLORS = {
  light: "#2cdce9",
  blue: "#25acb2",
  verylight: "#bde6e7",
};

export const ICONS = {
  send: "send-outline",
};

export const timeout = 4000;
