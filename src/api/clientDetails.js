import client from "./client";

const endpoint = "/client";
export const getClientDetails = (id, token) => {
  return client.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addClientDetails = (details, token) => {
  const data = new FormData();
  data.append("dateTime", details.dateTime);
  data.append("ssn", details.ssn);
  // data.append("cardFront", details.front);
  // data.append("cardBack", details.back);
  // data.append("driversLicence", details.driversLicence);

  details.front &&
    Object.values(details.front)
      .map((image) => image)
      .forEach((image) => {
        data.append(`cards`, image);
      });

  details.back &&
    Object.values(details.back)
      .map((image) => image)
      .forEach((image) => {
        data.append(`cards`, image);
      });

  details.driversLicence &&
    Object.values(details.driversLicence)
      .map((image) => image)
      .forEach((image) => {
        data.append(`cards`, image);
      });

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + token,
  };
  return client.post(endpoint, data, { headers });
};

export const editClientDetails = (property, clientId, token) => {
  // client.setHeaders({
  //   "Content-Type": property.images
  //     ? "multipart/form-data"
  //     : "application/json",
  //   Authorization: "Bearer " + token,
  // });

  if (property.images) {
    const imageData = new FormData();
    property.images.forEach((image) => {
      imageData.append(`images`, image);
    });
    return client.patch(`${endpoint}/${clientId}`, imageData);
  }

  return client.patch(`${endpoint}/${clientId}`, property, {
    headers: {
      "Content-Type": property.images
        ? "multipart/form-data"
        : "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteClientDetails = (clientId, token) => {
  // client.setHeader("Authorization", "Bearer " + token);
  return client.delete(`${endpoint}/${clientId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
