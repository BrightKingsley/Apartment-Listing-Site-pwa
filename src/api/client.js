import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://localhost:3001/api",
});

export default apiClient;
