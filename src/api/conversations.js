import client from "./client";

const endpoint = "/conversations";
export const getConversations = (userId, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.get(`${endpoint}/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addConversation = (body, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.post(`${endpoint}`, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getConversationAdmin = (token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.get(`${endpoint}/admin`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
