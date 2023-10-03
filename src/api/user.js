import client from "./client";

const endpoint = "/user";
export const getUser = (userId, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  // client.set
  return client.get(`${endpoint}/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateUser = (token, body) => {
  const data = new FormData();

  const images =
    body.image && body.image && Object.values(body.image).map((image) => image);

  images &&
    images?.forEach((image) => {
      data.append("image", image);
    });

  body.prevPassword && data.append("prevPassword", body.prevPassword);
  body.newPassword && data.append("newPassword", body.newPassword);

  console.log("DATA", data, token);

  // client.setHeader("Authorization", "Bearer " + token);

  return client.patch(`${endpoint}`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
