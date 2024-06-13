import { Platform } from "react-native";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export const socket = io.connect(`${process.env.EXPO_PUBLIC_API_URL}/`,
{
  extraHeaders: {
  Authorization: `Bearer ${useSelector((state) => state.userauth.token)}`,
}
});