import { Platform } from "react-native";
const liveHost = "https://us-central1-fooddelivery-b9acf.cloudfunctions.net";
const localHost = "http://127.0.0.1:5001/fooddelivery-b9acf/us-central1";
export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = false;
export const host = localHost;
