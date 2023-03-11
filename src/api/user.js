import client from "./client";

const endpoint = "/user";
export const getUser = (userId, token) => {
  return client.get(`${endpoint}/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateUser = (token, body) => {
  const data = new FormData();

  const images = Object.values(body.image).map((image) => image);

  images.forEach((image) => {
    data.append("image", image);
  });

  return client.patch(`${endpoint}`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
