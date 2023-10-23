import client from "./client";

const endpoint = "/listings";
export const getListings = (token, sort, params) => {
  // console.log(params);
  client.setHeader("Authorization", "Bearer " + token);
  return client.get(
    `${endpoint}?sortBy=${sort}${params?.length > 1 ? params : ""}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
