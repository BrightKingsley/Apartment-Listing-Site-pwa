import client from "./client";
// import openSocket from "socket.io-client";

const endpoint = "/socket";
export const connectToSocket = () => {
  return client.get(endpoint);
};
