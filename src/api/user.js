import client from "./client";

const endpoint = "/user";
export const getUser = (userId, token) => {
  client.setHeader("Authorization", "Bearer " + token);
  return client.get(`${endpoint}/${userId}`);
};

export const updateUser = (token, body) => {
  const data = new FormData();

  const images = Object.values(body.image).map((image) => image);

  images.forEach((image) => {
    data.append("image", image);
  });

  client.setHeader("Authorization", "Bearer " + token);

  return client.patch(`${endpoint}`, data);
};
