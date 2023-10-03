import client from "./client";

export const signupUser = (data, token) => {
  console.log("USER_DATA: ", data);
  return client.post("/signup", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const loginUser = (data, token) =>
  client.post("/login", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
