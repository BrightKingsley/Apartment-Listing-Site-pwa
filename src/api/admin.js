import client from "./client";

const endpoint = "/admin";
export const signupAdmin = (data, token) =>
  client.post(`${endpoint}/signup`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const loginAdmin = (data, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.post(`${endpoint}/login`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getAdmin = (adminId, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.get(`${endpoint}/${adminId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateAdmin = (token, body) => {
  const data = new FormData();

  const images = Object.values(body.image).map((image) => image);

  images.forEach((image) => {
    data.append("image", image);
  });

  // client.setHeader("Authorization", "Bearer " + token);

  return client.patch(`${endpoint}`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
