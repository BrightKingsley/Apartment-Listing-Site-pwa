import client from "./client";

const endpoint = "/conversations";
export const getConversations = (id, token) => {
  return client.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addConversation = (body, token) => {
  return client.post(`${endpoint}`, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
