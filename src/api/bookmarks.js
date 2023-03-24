// localhost:3001/api/user/63ff4579ba8c2a31fff70420/bookmarks/63f63577f6c13405a1b691b6

import client from "./client";

export const addToBookmarks = (listingId, token) => {
  client.setHeader("Authorization", "Bearer " + token);

  return client.patch(`/user/${token}/bookmarks/${listingId}`);
};

export const removeFromBookmarks = (listingId, token) => {
  client.setHeader("Authorization", "Bearer " + token);
  return client.delete(`/user/${token}/bookmarks/${listingId}`);
};
