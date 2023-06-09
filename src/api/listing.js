import client from "./client";

const endpoint = "/listing";
export const getListing = (id, token) => {
  return client.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addListing = (listing, token) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("location", listing.location);
  data.append("lat", listing.lat);
  data.append("lng", listing.lng);
  data.append("price", listing.price);
  data.append("type", listing.type);
  data.append("description", listing.description);
  data.append("rooms", listing.rooms);
  data.append("size", listing.size);
  data.append("perks", listing.perks);

  listing.images.forEach((image) => {
    data.append(`images`, image);
  });

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + token,
  };
  console.log(data);
  return client.post(endpoint, data, { headers });
};

export const editListing = (property, listingId, token) => {
  client.setHeaders({
    "Content-Type": property.images
      ? "multipart/form-data"
      : "application/json",
    Authorization: "Bearer " + token,
  });

  if (property.images) {
    const imageData = new FormData();
    property.images.forEach((image) => {
      console.log("IMAGE_UPLOAD", image);
      imageData.append(`images`, image);
    });
    return client.patch(`${endpoint}/${listingId}`, imageData);
  }

  return client.patch(`${endpoint}/${listingId}`, property);
};

export const deleteListing = (listingId, token) => {
  console.log("DELETE_TOKEN", token);
  client.setHeader("Authorization", "Bearer " + token);
  return client.delete(`${endpoint}/${listingId}`);
};
