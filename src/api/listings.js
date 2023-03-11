import client from "./client";

const endpoint = "/listings";
export const getListings = (token) => {
  return client.get(endpoint, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
