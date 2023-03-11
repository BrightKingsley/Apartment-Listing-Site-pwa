import client from "./client";

const endpoint = "/messages";
export const getMessages = (senderId, token) => {
  return client.get(`${endpoint}/${senderId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const sendMessage = (body, token) => {
  return client.post(`${endpoint}`, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
