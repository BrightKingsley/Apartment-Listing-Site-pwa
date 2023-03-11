import client from "./client";

const endpoint = "/users";
export const getUsers = (token) => {
  return client.get(`${endpoint}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
