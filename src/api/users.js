import client from "./client";

const endpoint = "/users";
export const getUsers = (token) => {
  client.setHeader("Authorization", "Bearer " + token);
  return client.get(`${endpoint}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
