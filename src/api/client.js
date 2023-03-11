import { create } from "apisauce";

const token = localStorage.getItem("token");

const apiClient = create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default apiClient;
