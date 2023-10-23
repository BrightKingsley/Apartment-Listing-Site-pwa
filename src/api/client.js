import { create } from "apisauce";
import { WEB_SERVER } from "../constants";

const apiClient = create({
  baseURL: WEB_SERVER,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://raale-brightkingsley.onrender.com",
  },
});

export default apiClient;
