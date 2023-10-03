import client from "./client";

export const addToBookmarks = (listingId, token) => {
  // client.setHeader("Authorization", "Bearer " + token);

  return client.patch(`/user/${token}/bookmarks/${listingId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const removeFromBookmarks = (listingId, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.delete(`/user/${token}/bookmarks/${listingId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
