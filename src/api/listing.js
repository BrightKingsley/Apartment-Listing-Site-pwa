import client from "./client";

const endpoint = "/listing";
export const getListing = (id, token) =>
  client.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

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

  const images = Object.values(listing.images).map((image) => image);
  images.forEach((image) => {
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
  const headers = {
    "Content-Type": property.images
      ? "multipart/form-data"
      : "application/json",
    Authorization: "Bearer " + token,
  };

  if (property.images) {
    const imageData = new FormData();
    const images = Object.values(property.images).map((image) => image);
    images.forEach((image) => {
      imageData.append(`images`, image);
      return client.patch(`${endpoint}/${listingId}`, property, { headers });
    });
  }

  return client.patch(`${endpoint}/${listingId}`, property, { headers });
};

export const deleteListing = (listingId, token) => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  return client.delete(`${endpoint}/${listingId}`, { headers });
};
