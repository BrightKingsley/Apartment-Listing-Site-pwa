import client from "./client";

export const signupUser = (data, token) => {
  client.setHeader("Authorization", "Bearer " + token);
  return client.post("/signup", data);
};

export const loginUser = (data, token) =>
  client.post("/login", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
